/**
 *                        WHITEBOPHIR
 *********************************************************
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2013  Ophir LOJKINE
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend
 */

(function () {
  //Code isolation

  //Indicates the id of the line the user is currently drawing or an empty string while the user is not drawing
  var pencilSVG =

    '<div class="tool-selected"><svg viewBox="0 0 34 34" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8294_29475)"><path d="M28.7342 11.1573L9.06375 30.8348L7.95875 29.0002C7.49833 28.2352 7.90917 28.476 6.11 27.881C5.50792 26.0818 5.76292 26.4643 4.98375 26.0323L3.15625 24.9343L22.8337 5.25684L28.7342 11.1573Z" fill="#FFCC66"/><path d="M28.0284 10.4489C13.3164 25.161 13.4509 25.501 10.7876 26.2093C9.56091 26.5019 8.27949 26.473 7.06719 26.1256C5.85489 25.7782 4.75272 25.1239 3.86719 24.226L22.8364 5.25684L28.0284 10.4489Z" fill="#FFDE76"/><path d="M9.06677 30.834L4.81677 32.0736C4.20548 30.7963 3.17571 29.7666 1.89844 29.1553C2.3801 27.5261 2.09677 28.4965 3.13802 24.9053L5.59594 26.3786L6.09177 27.8519L7.5651 28.3478C8.49302 29.9132 8.16719 29.3465 9.06677 30.834Z" fill="#F6CCAF"/><path d="M8.31625 29.5944C5.13583 30.1682 2.98958 28.2982 2.28125 27.9298L3.15958 24.9336L5.6175 26.4069L6.11333 27.8803L7.58667 28.3761L8.31625 29.5944Z" fill="#FFDEC7"/><path d="M4.83979 32.0736C4.83979 32.1444 4.90354 32.0736 0.703125 33.2919C1.27687 31.3369 1.00063 32.2649 1.92146 29.1553C3.19575 29.7708 4.2243 30.7993 4.83979 32.0736Z" fill="#374F68"/><path d="M4.08875 30.8836L1.15625 31.7407L1.92125 29.1553C2.76604 29.5587 3.50742 30.1498 4.08875 30.8836Z" fill="#425B72"/><path d="M27.2721 9.69016L7.96292 28.9993C7.50958 28.2414 7.77875 28.4397 6.84375 28.121L26.2733 8.69141L27.2721 9.69016Z" fill="#FFBA55"/><path d="M25.3065 7.72849L5.86979 27.1581C5.55104 26.216 5.74937 26.4497 4.98438 26.0318L24.3006 6.72266L25.3065 7.72849Z" fill="#FFBA55"/><path d="M25.3086 7.72849L6.95573 26.0743C6.46439 25.925 5.98967 25.7256 5.53906 25.4793L24.3028 6.72266L25.3086 7.72849Z" fill="#FFCC66"/><path d="M32.6799 7.22531L30.7107 9.20864L24.7891 3.28697L26.7724 1.31781C27.1686 0.934798 27.6982 0.720703 28.2493 0.720703C28.8004 0.720703 29.3299 0.934798 29.7261 1.31781L32.6799 4.25031C33.0693 4.64753 33.2873 5.18158 33.2873 5.73781C33.2873 6.29403 33.0693 6.82808 32.6799 7.22531Z" fill="#DB5669"/><path d="M33.1634 5.03656C32.618 6.59489 30.2026 7.26781 28.7364 5.80156L25.4922 2.57864L26.7672 1.31781C27.1634 0.934798 27.693 0.720703 28.2441 0.720703C28.7952 0.720703 29.3247 0.934798 29.7209 1.31781C32.9864 4.58322 32.9651 4.46989 33.1634 5.03656Z" fill="#F26674"/><path d="M30.7055 9.20878L28.7364 11.1779L22.8359 5.25628L24.7839 3.28711L30.7055 9.20878Z" fill="#DAD7E5"/><path d="M29.9998 8.50044C29.6652 8.83437 29.2117 9.02191 28.739 9.02191C28.2662 9.02191 27.8128 8.83437 27.4781 8.50044L23.5469 4.54794L24.7865 3.28711L29.9998 8.50044Z" fill="#EDEBF2"/><path d="M27.2732 9.6899L10.7903 26.2082C10.0739 26.378 9.33656 26.4425 8.60156 26.3995L26.3099 8.72656L27.2732 9.6899Z" fill="#FFCC66"/></g><defs><clipPath id="clip0_8294_29475"><rect width="34" height="34" fill="white"/></clipPath></defs></svg></div><label id="tool-pencil-localization" class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;">Pencil</label>';
  // var eraserSVG =
  //   '<svg class="tool-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 17"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M13,0,0,13l4,4h8l9-9Zm6.59,8L14.5,13.09,7.91,6.5,13,1.41Zm-8,8H4.42l-3-3,5.8-5.79,6.58,6.58Z"/></g></g></svg> <label id="tool-eraser-localization" class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;">Eraser</label>';

  var curLineId = "",
    startX = 0,
    startY = 0,
    // penIcons = ["✏","W"],
    penIcons = [pencilSVG];
  (lastTime = performance.now()), //The time at which the last point was drawn
    (end = false);
  var curPen = {
    mode: "Pencil",
    penSize: 3,
    eraserSize: 16,
  };
  //The data of the message that will be sent for every new point
  function PointMessage(x, y) {
    this.type = "child";
    this.parent = curLineId;
    this.x = x - (Tools.showMarker ? 25 : 0);
    this.y = y - (Tools.showMarker ? 25 : 0);
  }

  function onStart() {
    if (curPen.mode == "White out") {
      Tools.setSize(curPen.eraserSize);
      Tools.showMarker = true;
    }
  }

  function onQuit() {
    if (curPen.mode == "White out") {
      Tools.setSize(curPen.penSize);
    }
    Tools.showMarker = false;
    var cursor = Tools.svg.getElementById("mycursor");
    if (cursor) {
      cursor.remove();
    }
  }

  function startLine(x, y, evt) {
    //Prevent the press from being interpreted by the browser
    evt.preventDefault();

    Tools.suppressPointerMsg = true;
    curLineId = Tools.generateUID("l"); //"l" for line

    Tools.drawAndSend({
      type: "line",
      id: curLineId,
      color: curPen.mode == "Pencil" ? Tools.getColor() : "white",
      size: Tools.getSize(),
      opacity: Tools.getOpacity(),
    });
    startX = x;
    startY = y;
    //Immediatly add a point to the line
    continueLine(x, y);
  }

  function continueLine(x, y, evt) {
    /*Wait 20ms before adding any point to the currently drawing line.
		This allows the animation to be smother*/
    if (curLineId !== "" && (performance.now() - lastTime > 20 || end)) {
      Tools.drawAndSend(new PointMessage(x, y));
      lastTime = performance.now();
      if (wb_comp.list["Measurement"]) {
        wb_comp.list["Measurement"].update({
          type: "Path",
          x: startX,
          y: startY,
          x2: x,
          y2: y,
        });
      }
    }
    if (evt) evt.preventDefault();
  }

  function stopLine(x, y, evt) {
    evt.preventDefault();
    //Add a last point to the line
    end = true;
    continueLine(x, y);
    end = false;
    curLineId = "";
    Tools.suppressPointerMsg = false;
  }

  var renderingLine = {};
  function draw(data) {
    Tools.drawingEvent = true;
    switch (data.type) {
      case "line":
        renderingLine = createLine(data);
        if (data.pts) addPoints(renderingLine, data.pts);
        break;
      case "child":
        var line =
          renderingLine.id == data.parent
            ? renderingLine
            : svg.getElementById(data.parent);
        if (!line) {
          console.error(
            "Pencil: Hmmm... I received a point of a line that has not been created (%s).",
            data.parent
          );
          return false;
        } else {
          if (Tools.useLayers) {
            if (line.getAttribute("class") != "layer" + Tools.layer) {
              line.setAttribute("class", "layer-" + Tools.layer);
              Tools.group.appendChild(line);
            }
          }
        }
        addPoints(line, [[data.x, data.y]], true);
        break;
      case "endline":
        //TODO?
        break;
      default:
        console.error("Pencil: Draw instruction with unknown type. ", data);
        break;
        ``;
    }
  }

  function dist(x1, y1, x2, y2) {
    //Returns the distance between (x1,y1) and (x2,y2)
    return Math.hypot(x2 - x1, y2 - y1);
  }

  function getPathData(line) {
    var pathData = Tools.pathDataCache[line.id];
    if (!pathData) {
      pathData = line.getPathData();
      Tools.pathDataCache[line.id] = pathData;
    }
    return pathData;
  }

  var svg = Tools.svg;
  function addPoints(line, npts, single) {
    var pts = getPathData(line); //The points that are already in the line as a PathData
    for (var i = 0; i < npts.length; i++) {
      var npoint;
      var x = npts[i][0];
      var y = npts[i][1];
      var nbr = pts.length; //The number of points already in the line
      switch (nbr) {
        case 0: //The first point in the line
          //If there is no point, we have to start the line with a moveTo statement
          npoint = { type: "M", values: [x, y] };
          break;
        case 1: //There is only one point.
          //Draw a curve that is segment between the old point and the new one
          npoint = {
            type: "C",
            values: [pts[0].values[0], pts[0].values[1], x, y, x, y],
          };
          break;
        default: //There are at least two points in the line
          //We add the new point, and smoothen the line
          var ANGULARITY = 3; //The lower this number, the smoother the line
          var prev_values = pts[nbr - 1].values; // Previous point
          var ante_values = pts[nbr - 2].values; // Point before the previous one
          var prev_x = prev_values[prev_values.length - 2];
          var prev_y = prev_values[prev_values.length - 1];
          var ante_x = ante_values[ante_values.length - 2];
          var ante_y = ante_values[ante_values.length - 1];

          //We don't want to add the same point twice consecutively
          if (!((prev_x == x && prev_y == y) || (ante_x == x && ante_y == y))) {
            var vectx = x - ante_x,
              vecty = y - ante_y;
            var norm = Math.hypot(vectx, vecty);
            var dist1 = dist(ante_x, ante_y, prev_x, prev_y) / norm,
              dist2 = dist(x, y, prev_x, prev_y) / norm;
            vectx /= ANGULARITY;
            vecty /= ANGULARITY;
            //Create 2 control points around the last point
            var cx1 = prev_x - dist1 * vectx,
              cy1 = prev_y - dist1 * vecty, //First control point
              cx2 = prev_x + dist2 * vectx,
              cy2 = prev_y + dist2 * vecty; //Second control point
            prev_values[2] = cx1;
            prev_values[3] = cy1;

            npoint = {
              type: "C",
              values: [cx2, cy2, x, y, x, y],
            };
          } else {
            if (single) return;
          }
      }
      if (npoint) pts.push(npoint);
    }
    line.setPathData(pts);
  }

  function createLine(lineData) {
    //Creates a new line on the canvas, or update a line that already exists with new information
    var line =
      svg.getElementById(lineData.id) || Tools.createSVGElement("path");
    line.id = lineData.id;
    //If some data is not provided, choose default value. The line may be updated later
    line.setAttribute("stroke", lineData.color || "black");
    line.setAttribute("stroke-width", lineData.size || 10);
    if (Tools.useLayers) line.setAttribute("class", "layer-" + Tools.layer);
    if (lineData.data) {
      line.setAttribute("data-lock", lineData.data);
    }
    if (lineData.transform) line.setAttribute("transform", lineData.transform);
    line.setAttribute(
      "opacity",
      Math.max(0.1, Math.min(1, lineData.opacity)) || 1
    );
    Tools.group.appendChild(line);
    return line;
  }

  // function toggle(elem) {
  //   var index = 0;
  //   var getEleLanEraser = null;
  //   var getEleLanPencil = null;

  //   if (document.getElementById("tool-eraser-localization")) {
  //     getEleLanEraser = document.getElementById(
  //       "tool-eraser-localization"
  //     ).innerHTML;
  //   }
  //   if (document.getElementById("tool-pencil-localization")) {
  //     getEleLanPencil = document.getElementById(
  //       "tool-pencil-localization"
  //     ).innerHTML;
  //   }

    
  //     if (curPen.mode == "Pencil") {
  //       curPen.mode = "White out";
  //       curPen.penSize = Tools.getSize();
  //       Tools.setSize(curPen.eraserSize);
  //       Tools.showMarker = false;
  //       index = 1;
      
      
  //   }
	// console.log(index,"index")
  //   elem.getElementsByClassName("tool-icon")[0].innerHTML = penIcons[index];

  //   // Update the title attribute based on the current mode
  //   elem.setAttribute(
  //     "title",
  //     curPen.mode === "Pencil"
  //       ? "For Eraser click to toggle"
  //       : "For Pencil click to toggle"
  //   );
  // }

  function toggle(elem) {
    if (curPen.mode === "Pencil") {
      // If the current mode is already pencil, do nothing
      return;
    }
  
    curPen.mode = "Pencil"; // Set the mode to Pencil
    curPen.penSize = Tools.getSize(); // Store the current pen size
    Tools.setSize(curPen.penSize); // Set the pen size for drawing
  
    // Update the pencil icon
    elem.getElementsByClassName("tool-icon")[0].innerHTML = penIcons[0];
  
    // Update the title attribute
    elem.setAttribute("title", "Pencil");
  }


  Tools.add({
    iconHTML: pencilSVG, // Replace with the SVG icon for the pencil tool
    name: "Pencil",
    title: "Pencil",
    isExtra:false,
    listeners: {
      press: startLine,
      move: continueLine,
      release: stopLine,
    },
    draw: draw,
    toggle: toggle,
    onstart: onStart,
    onquit: onQuit,
    mouseCursor: "crosshair",
  });
})(); //End of code isolation
