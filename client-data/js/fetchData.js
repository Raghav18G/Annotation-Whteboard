//initially disable button
var select = document.getElementById("newBoard--Select");
var btn = document.getElementById("go-btn");

if (!select.options[select.selectedIndex].value) {
  btn.disabled = true;
}

var Tools = {};

(function () {
  window.addEventListener("hashchange", function () {
    const newHash = window.location.hash;
    console.log("Hash changed to:", newHash);
  });
  const form = document.getElementById("startNewBoardForm");
  const input = document.getElementById("board");
  console.log("Gorm", form);

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    const inputValue = input.value;
    console.log("Form", form);
    window.location.href = `board.html?board=${inputValue}&file=1`;
  });

  var myform = document.getElementById("existingBoardForm");
  myform.addEventListener("submit", function (event) {
    event.preventDefault();
    var select = document.getElementById("newBoard--Select");
    var board_name = select.options[select.selectedIndex].value;
    console.log("BOARD NAMe", board_name);
    window.location.href = `board.html?board=${board_name}&file=1`;
    window.localStorage.setItem("selectedBoard", board_name);
    window.localStorage.setItem("currentFile", "1.json");
  });
})();

window.localStorage.setItem("generatedImages", JSON.stringify([]));

//after Selecting a board name unable the GO button
function checkDisable() {
  var select = document.getElementById("newBoard--Select");
  const btnCheck = document.getElementById("go-btn");
  if (select.options[select.selectedIndex].value) {
    btnCheck.classList.add("goSubmit");
    btnCheck.disabled = false;
  }
}

(Tools.socket = null),
  (Tools.connect = function () {
    var self = this;
    if (self.socket) {
      self.socket.destroy();
      delete self.socket;
      self.socket = null;
    }

    this.socket = io.connect("", {
      reconnection: true,
      reconnectionDelay: 100, //Make the xhr connections as fast as possible
      timeout: 1000 * 60 * 20, // Timeout after 20 minutes
    });

    this.socket.on("connect", function () {
      console.log("Connected to the Server on the Landing Page");
    });

    this.socket.on("disconnect", function () {
      //console.log( 'disconnected from server' );
      window.setTimeout("Tools.connect()", 20);
    });

    this.socket.on("reconnect", function onReconnection() {
      console.log("Reconnecting to the Server");
    });

    this.socket.on("boardName", function (data) {
      console.log("DATA 1", data);
      var dropdown = document.getElementsByClassName("newBoard--Select");
      data.boardNames.map((name) => {
        dropdown[0].innerHTML =
          dropdown[0].innerHTML +
          `<option  value=${name}>${decodeURI(name)}</option>`;
      });
      window.localStorage.setItem("structure", data.structure);
    });
  });

Tools.connect();
