const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);

var iolib = require("socket.io"),
  BoardData = require("./boardData.js").BoardData,
  config = require("./configuration.js");
const fs = require("fs");
// Map from name to *promises* of BoardData
var boards = {};
var io;

var _FileNameListWithDir = [];
const testFolder = "./server-data";

function getFileNameWithDir(rootFolder, parentFolder) {
  fs.readdirSync(rootFolder, { withFileTypes: true }).forEach((item) => {
    const itemPath = rootFolder + `/${item.name}`;
    console.log(item.isDirectory());
    if (item.isDirectory()) {
      getFileNameWithDir(itemPath, item.name); // Recursively traverse subdirectories
    } else {
      if (!item.name.startsWith(".")) {
        if (parentFolder) {
          _FileNameListWithDir.push(
            `${parentFolder.replace("board-", "")}/${item.name}`
          );
        }
      }
    }
  });
}

function noFail(fn) {
  return function noFailWrapped(arg) {
    try {
      return fn(arg);
    } catch (e) {
      console.trace(e);
    }
  };
}

function startIO(app) {
  io = iolib(app);
  io.on("connection", noFail(socketConnection));
  return io;
}

/** Returns a promise to a BoardData with the given name*/
function getBoard(name) {
  console.log("board name", name);
  if (boards.hasOwnProperty(name)) {
    return boards[name];
  } else {
    var board = BoardData.load(name);
    boards[name] = board;
    return board;
  }
}

function getConnectedSockets() {
  return Object.values(io.of("/").connected);
}

function socketConnection(socket) {
  console.log("Socket");

  function joinBoard(name) {
    // Default to the public board
    if (!name) name = "anonymous";

    // Join the board
    socket.join(name);

    return getBoard(name).then((board) => {
      board.users.add(socket.id);
      console.log(
        new Date() +
          ": " +
          board.users.size +
          " users in " +
          board.name +
          ". Socket ID: " +
          socket.id
      );
      return board;
    });
  }

  (function readingBoardDataDirectory() {
    var boardNames = [];
    if (!fs.existsSync(testFolder)) {
      fs.mkdirSync(testFolder);
    }
    _FileNameListWithDir = [];
    getFileNameWithDir(testFolder);
    fs.readdir(testFolder, (err, files) => {
      files.forEach((file) => {
        let name = file.replace("board-", "");
        if (name) {
          let currName = name.split(".")[0];
          currName.length ? boardNames.push(currName) : undefined;
        }
      });
      socket.emit("boardName", { boardNames, structure: _FileNameListWithDir });
    });
    console.log({ _FileNameListWithDir });
  })();

  socket.on("joinRoom", (data) => {
    console.log("socket data coming from another frontend", data);

    socket.join(data);
  });

  socket.on(
    "getboard",
    noFail(function onGetBoard(name) {
      joinBoard(name).then((board) => {
        //Send all the board's data as soon as it's loaded
        var batches = board.getAll();
        _FileNameListWithDir = [];
        if (!fs.existsSync(testFolder)) {
          fs.mkdirSync(testFolder);
        }
        getFileNameWithDir(testFolder);
        console.log({ _FileNameListWithDir });
        socket.emit("broadcast", {
          _children: batches[0] || [],
          _more: batches.length > 1,
          userCount: board.users.size,
          structure: _FileNameListWithDir,
        });
        for (var i = 1; i < batches.length; i++) {
          socket.emit("broadcast", {
            _children: batches[i],
            _more: i != batches.length - 1,
            structure: _FileNameListWithDir,
          });
        }
        // const testFolder = "./server-data";
        // if (!fs.existsSync(testFolder)) {
        //   fs.mkdirSync(testFolder);
        // }
        // getFileNameWithDir(testFolder)
        console.log({ _FileNameListWithDir });

        socket.broadcast.to(board.name).emit("broadcast", {
          userCount: board.users.size,
          structure: _FileNameListWithDir,
        });
      });
    })
  );

  socket.on("screen-shot", () => {
    console.log("ScreenShot Emitted");
    socket.emit("screen-shot", "screen-shot");
    io.to("secondFrontEnd").emit("screen-shot", "Screen Captured");
  });

  socket.on("joinboard", noFail(joinBoard));

  var lastEmitSecond = (Date.now() / config.MAX_EMIT_COUNT_PERIOD) | 0;
  var emitCount = 0;
  socket.on(
    "broadcast",
    noFail(function onBroadcast(message) {
      var currentSecond = (Date.now() / config.MAX_EMIT_COUNT_PERIOD) | 0;
      if (currentSecond === lastEmitSecond) {
        emitCount++;
        if (emitCount > config.MAX_EMIT_COUNT) {
          var request = socket.client.request;
          console.log(
            JSON.stringify({
              event: "banned",
              user_agent: request.headers["user-agent"],
              original_ip:
                request.headers["x-forwarded-for"] ||
                request.headers["forwarded"],
              time: currentSecond,
              emit_count: emitCount,
            })
          );
          socket.disconnect(true);
          return;
        }
      } else {
        emitCount = 0;
        lastEmitSecond = currentSecond;
      }

      var boardName = message.board || "anonymous";
      if (!socket.rooms.hasOwnProperty(boardName)) socket.join(boardName);

      getBoard(boardName).then((board) => {
        var data = message.data;
        if (!data) {
          console.warn(
            "Received invalid message: %s.",
            JSON.stringify(message)
          );
          return;
        }
        handleMsg(board, data, socket);
      });
    })
  );

  socket.on("disconnecting", function onDisconnecting(reason) {
    Object.keys(socket.rooms).forEach(function disconnectFrom(room) {
      if (boards.hasOwnProperty(room)) {
        boards[room].then((board) => {
          board.users.delete(socket.id);
          var userCount = board.users.size;
          console.log(
            userCount + " users in " + room + " Socket ID: " + socket.id
          );
          if (userCount === 0) {
            board.save();
            delete boards[room];
          } else {
            socket.broadcast
              .to(board.name)
              .emit("broadcast", { userCount: board.users.size });
          }
        });
      }
    });
  });
}

function handleMsg(board, message, socket) {
  if (message.type != "c" && message.type != "e") {
    board.updateMsgCount(socket.id);
  }

  //Broadcast socket Id when displaying pointer so we know whose pointer it is.
  //Update and child events will also broadcast pointer location
  if (
    config.DISPLAY_POINTERS &&
    (message.type == "c" ||
      (message.type == "update" &&
        message.txt === undefined &&
        message.data === undefined) ||
      message.type == "child")
  ) {
    message.socket = socket.id;
  }

  if (
    message.type == "clear" ||
    message.type == "undo" ||
    message.type == "redo"
  ) {
    /*Actions requiring sync. There is no way to enforce order of events with a broadcast
     * system. Thus, it is possible that clients sometimes may see an inconsistent picture.
     * The server itself, though, should maintain a consistent environment. When a client
     * calls "clear", "undo", or "redo", the server broadcasts its current state to all clients,
     * essentially causing a page refresh. This is done in an effort to maintain a degree of
     * consistency between the clients that would be difficult to acheive by other means;
     * however, it may, at least in the case of "undo" and "redo", be an expensive operation,
     * especially for large boards with many users.
     */

    var success = true;
    if (message.type == "clear") {
      success = board.clear();
    } else if (message.type == "undo") {
      console.log("BOARD DATA", BoardData);
      console.log("BOard", board);
      success = board.undo();
    } else {
      success = board.redo();
    }
    if (success) {
      var sockets = getConnectedSockets();
      sockets.forEach(function (s, i) {
        var batches = board.getAll();
        s.emit("broadcast", {
          type: "sync",
          id: socket.id,
          _children: batches[0] || [],
          _more: batches.length > 1,
          msgCount: board.getMsgCount(s.id),
        });
        for (var i = 1; i < batches.length; i++) {
          s.emit("broadcast", {
            _children: batches[i],
            subtype: "sync",
            _more: i != batches.length - 1,
            msgCount: board.getMsgCount(s.id),
          });
        }
      });
    } else if (message.type == "clear") {
      socket.emit("broadcast", {
        type: "sync",
        id: socket.id,
        msgCount: board.getMsgCount(socket.id),
      });
    }
  } else {
    //Send message to all other users connected on the same board
    socket.broadcast.to(board.name).emit("broadcast", message);

    //Not going to save the socket
    delete message.socket;
    switch (message.type) {
      case "c": //cursor
        break;
      case "e": //echo
        break;
      case "delete":
        if (message.id) board.delete(message.id, socket.id);
        break;
      case "update":
        if (message.id) board.update(message.id, message, socket.id);
        break;
      case "child":
        board.addChild(message.parent, message, socket.id);
        break;
      default: //Add message
        if (!message.id) throw new Error("Invalid message: ", message);
        board.set(message.id, message, socket.id);
    }
  }
}

function generateUID(prefix, suffix) {
  var uid = Date.now().toString(36); //Create the uids in chronological order
  uid += Math.round(Math.random() * 36).toString(36); //Add a random character at the end
  if (prefix) uid = prefix + uid;
  if (suffix) uid = uid + suffix;
  return uid;
}

if (exports) {
  exports.start = startIO;
}
