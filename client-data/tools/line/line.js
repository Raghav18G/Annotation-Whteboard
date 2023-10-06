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
  var lineSVG =
  '<div class="tool-selected"><svg class="lines-svg line-background-icon" width="35" height="35" style="margin-top: -4px;margin-left: -4px"viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.8922 28.1625C22.8922 28.4937 23.161 28.7625 23.4922 28.7625C23.8234 28.7625 24.0922 28.4937 24.0922 28.1625C24.0922 27.8313 23.8234 27.5625 23.4922 27.5625C23.161 27.5625 22.8922 27.8313 22.8922 28.1625ZM5.86719 13.1367V15.6867H8.41719V13.1367H5.86719ZM24.8044 13.1367H22.2544V15.6867H24.8044V13.1367ZM41.6044 13.1367H39.0544V15.6867H41.6044V13.1367ZM19.279 36.7125H27.8296V34.7613H19.279V36.7125Z" fill="#FBCF26"/><path d="M37.2575 11.3369V13.5113H26.6063V11.3369H20.4575V13.5113H10.2191V11.3369H4.07031V17.4863H10.2191V15.3113H20.4575V17.4863H22.1087C21.5861 18.7451 20.1863 21.4613 17.2313 23.5805L16.5383 24.0797L17.0003 24.7985C18.2303 26.7047 18.5663 28.8131 18.5663 30.5243C18.5663 31.5287 18.4511 32.3861 18.3437 32.9615H17.4827V38.5109H29.6321V32.9615H28.7219C28.6139 32.3861 28.4975 31.5287 28.4987 30.5225C28.4975 28.8125 28.8335 26.7047 30.0647 24.7973L30.5273 24.0797L29.8337 23.5805C27.8213 22.1339 26.5313 20.4197 25.7453 19.0679C25.3769 18.4349 25.1237 17.8877 24.9569 17.4857H26.6075V15.3107H37.2587V17.4857H43.4075V11.3369H37.2575ZM8.41971 15.6863H5.86971V13.1363H8.41971V15.6863ZM22.2569 13.1363H24.8069V15.6863H22.2569V13.1363ZM23.4941 27.5615C23.8253 27.5633 24.0935 27.8297 24.0941 28.1621C24.0929 28.4933 23.8247 28.7609 23.4941 28.7621C23.1635 28.7609 22.8953 28.4933 22.8941 28.1621C22.8953 27.8297 23.1635 27.5633 23.4941 27.5615ZM27.8321 36.7121H19.2815V34.7609H27.8321V36.7121ZM28.1255 24.5435C26.9993 26.6255 26.6987 28.7873 26.6975 30.5237C26.6975 31.4891 26.7905 32.3249 26.8949 32.9627H20.1695C20.2727 32.3267 20.3657 31.4897 20.3657 30.5255C20.3657 28.7891 20.0645 26.6261 18.9389 24.5435C20.6249 23.1941 21.7955 21.7103 22.5941 20.4365V25.9409C21.7151 26.2967 21.0947 27.1553 21.0947 28.1627C21.0947 29.4881 22.1681 30.5621 23.4947 30.5621C24.8201 30.5621 25.8947 29.4881 25.8947 28.1627C25.8947 27.1553 25.2737 26.2973 24.3953 25.9409V20.3189C25.1939 21.6179 26.3885 23.1521 28.1255 24.5435ZM41.6069 15.6863H39.0569V13.1363H41.6069V15.6863Z" fill="#424242"/></svg></div><label id="tool-lines-localization" class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;"><p>Lines</p></label>';

    var curLineId = "",
    end = false,
    startX,
    startY,
    curLine = "line",
    size = 4;
  lastTime = performance.now(); //The time at which the last point was drawn

  var dashmode =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="-47 -57 250 250" style="enable-background:new -47 -57 250 250;"><g><path id="submenu-rect-path" fill="';

  var dashmode2 =
    '" d="M60.669,89.331l35.592-35.592l10.606,10.608L71.276,99.938L60.669,89.331z M131.944,39.27l28.663-28.662L150.001,0 l-28.663,28.662L131.944,39.27z M35.593,114.407L0.001,150l10.606,10.607l35.592-35.593L35.593,114.407z"/></g></svg>';

  var icons = {
    line: {
      icon: `— <br> <label id="tool-solidline-localization" class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400;margin-top: 7px; margin-left: -3px;">Solid Line</label>`,
      isHTML: true,
      isSVG: false,
    },
    arrw: {
      icon: `→<br> <label id="tool-arrow-line-localization" class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400;margin-top: 7px; margin-left: -3px;">Arrow Line</label>`,
      isHTML: true,
      isSVG: false,
    },
    dashline: {
      icon:
        `--- <br> <label id="tool-dashed-line-localization" class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400;margin-top: 7px; margin-left: -3px;">Dashed Line</label>`,
      isHTML: true,
      isSVG: false,
    },
  };

  function startLine(x, y, evt) {
    //Prevent the press from being interpreted by the browser
    evt.preventDefault();
    Tools.suppressPointerMsg = true;
    curLineId = Tools.generateUID("s"); //"s" for straight line
    startX = x;
    startY = y;
    size = Tools.getSize();
    Tools.drawAndSend({
      type: "straight",
      id: curLineId,
      line: curLine,
      color: Tools.getColor(),
      size: Tools.getSize(),
      opacity: Tools.getOpacity(),
      x: x,
      y: y,
    });
  }

  function continueLine(x, y, evt) {
    /*Wait 70ms before adding any point to the currently drawing line.
		This allows the animation to be smother*/
    if (curLineId !== "") {
      if (anglelock) {
        var alpha = Math.atan2(y - startY, x - startX);
        var d = Math.hypot(y - startY, x - startX);
        var increment = (2 * Math.PI) / 12;
        var r = alpha / increment;
        r =
          Math.abs(Math.abs(r % 3) - 1.5) < 0.25
            ? Math.floor(r) + 0.5
            : Math.round(r);
        alpha = r * increment;
        x = startX + d * Math.cos(alpha);
        y = startY + d * Math.sin(alpha);
      }
      var curUpdate = {
        //The data of the message that will be sent for every new point
        type: "update",
        id: curLineId,
        line: curLine,
        x2: x,
        y2: y,
      };
      if (performance.now() - lastTime > 70 || end) {
        Tools.drawAndSend(curUpdate);
        lastTime = performance.now();
        if (wb_comp.list["Measurement"]) {
          var arg = {
            type: "line",
            x: x,
            y: y,
            x2: startX,
            y2: startY,
          };
          if (curLine == "arrw") {
            var d = Math.hypot(x - arg.x2, y - arg.y2);
            var r = (d + 5.5 * size) / d;
            arg.x2 = x + (arg.x2 - x) * r;
            arg.y2 = y + (arg.y2 - y) * r;
          }
          wb_comp.list["Measurement"].update(arg);
        }
      } else {
        draw(curUpdate);
      }
    }
    if (evt) evt.preventDefault();
  }

  function stopLine(x, y, evt) {
    evt.preventDefault();
    //Add a last point to the line
    end = false;
    continueLine(x, y);
    end = true;
    Tools.suppressPointerMsg = false;
    curLineId = "";
  }

  function draw(data) {
    Tools.drawingEvent = true;
    switch (data.type) {
      case "straight":
        if (data.line == "arrw") {
          createPolyLine(data);
        } else {
          createLine(data);
        }
        break;
      case "update":
        var line = svg.getElementById(data["id"]);
        if (!line) {
          console.error(
            "Straight line: Hmmm... I received a point of a line that has not been created (%s).",
            data["id"]
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
        if (data.line == "arrw") {
          updatePolyLine(line, data);
        } else {
          updateLine(line, data);
        }
        break;
      default:
        console.error(
          "Straight Line: Draw instruction with unknown type. ",
          data
        );
        break;
    }
  }

  var svg = Tools.svg;
  function createLine(lineData) {
    //Creates a new line on the canvas, or update a line that already exists with new information
    var line =
      svg.getElementById(lineData.id) || Tools.createSVGElement("line");
    line.id = lineData.id;
    line.x1.baseVal.value = lineData["x"];
    line.y1.baseVal.value = lineData["y"];
    line.x2.baseVal.value = lineData["x2"] || lineData["x"];
    line.y2.baseVal.value = lineData["y2"] || lineData["y"];
    //If some data is not provided, choose default value. The line may be updated later
    if (Tools.useLayers) line.setAttribute("class", "layer-" + Tools.layer);
    line.setAttribute("stroke", lineData.color || "black");
    line.setAttribute("stroke-width", lineData.size || 10);
    if (lineData.line == "dashline") {
      // line.setAttribute("stroke-dasharray", "10 10" || "10 10");
      line.setAttribute("stroke-dasharray", "20 52" || "10 10");
    }
    line.setAttribute(
      "opacity",
      Math.max(0.1, Math.min(1, lineData.opacity)) || 1
    );
    if (lineData.data) {
      line.setAttribute("data-lock", lineData.data);
    }
    if (lineData.transform) line.setAttribute("transform", lineData.transform);
    if (lineData.marker) {
      var marker = Tools.createSVGElement("marker", {
        id: "arrw_" + lineData.id,
        markerWidth: "6",
        markerHeight: "4",
        refX: "0",
        refY: "2",
        orient: "auto",
      });
      var polygon = Tools.createSVGElement("polygon", {
        id: "arrw_poly_" + lineData.id,
        points: "0 0, 6 2, 0 4",
        fill: lineData.color || "black",
      });
      marker.appendChild(polygon);
      document.getElementById("defs").appendChild(marker);
      line.setAttribute("marker-end", "url(#arrw_" + lineData.id + ")");
    }
    Tools.group.appendChild(line);
    return line;
  }

  
  function updateLine(line, data) {
    line.x2.baseVal.value = data["x2"];
    line.y2.baseVal.value = data["y2"];
  }

  function createPolyLine(lineData) {
	// console.log("lineData",lineData,)
    //Creates a new line on the canvas, or update a line that already exists with new information
    var line =
      svg.getElementById(lineData.id) || Tools.createSVGElement("polyline");
    line.id = lineData.id;
    var x2 =
      (lineData["x2"] !== undefined ? lineData["x2"] : lineData["x"]) - 0;
    var y2 =
      (lineData["y2"] !== undefined ? lineData["y2"] : lineData["y"]) - 0;

    line.setAttribute(
      "points",
      lineData["x"] +
        "," +
        lineData["y"] +
        " " +
        x2 +
        "," +
        y2 +
        buildArrow(
          (lineData.size || 10) / 2,
          x2,
          y2,
          Math.atan2(y2 - (lineData["y"] - 0), x2 - (lineData["x"] - 0))
        )
    );
    //If some data is not provided, choose default value. The line may be updated later
    if (Tools.useLayers) line.setAttribute("class", "layer-" + Tools.layer);
    line.setAttribute("stroke", lineData.color || "black");
    line.setAttribute("stroke-width", lineData.size || 10);
    line.setAttribute("fill", lineData.color || "black");
    line.setAttribute(
      "opacity",
      Math.max(0.1, Math.min(1, lineData.opacity)) || 1
    );
    if (lineData.data) {
      line.setAttribute("data-lock", lineData.data);
    }
    if (lineData.transform) line.setAttribute("transform", lineData.transform);
    if (lineData.marker) {
      var marker = Tools.createSVGElement("marker", {
        id: "arrw_" + lineData.id,
        markerWidth: "6",
        markerHeight: "4",
        refX: "0",
        refY: "2",
        orient: "auto",
      });
      var polygon = Tools.createSVGElement("polygon", {
        id: "arrw_poly_" + lineData.id,
        points: "0 0, 6 2, 0 4",
        fill: lineData.color || "black",
      });
      marker.appendChild(polygon);
      document.getElementById("defs").appendChild(marker);
      line.setAttribute("marker-end", "url(#arrw_" + lineData.id + ")");
    }
    Tools.group.appendChild(line);
    return line;
  }

  function updatePolyLine(line, data) {
    var pts = line.getAttributeNS(null, "points").split(/[\s,]+/);
    var sz = line.getAttributeNS(null, "stroke-width");
    line.setAttribute(
      "points",
      pts[0] +
        "," +
        pts[1] +
        " " +
        data["x2"] +
        "," +
        data["y2"] +
        buildArrow(
          sz / 2,
          data["x2"] - 0,
          data["y2"] - 0,
          Math.atan2(data["y2"] - pts[1], data["x2"] - pts[0])
        )
    );
  }

  function buildArrow(w, x0, y0, theta) {
    var x = 11 * w - w * Math.sqrt(10);
    var y = x / 3;
    var a1 = x0 - y * Math.sin(theta);
    var a2 = y0 + y * Math.cos(theta);
    var b1 = x0 + x * Math.cos(theta);
    var b2 = y0 + x * Math.sin(theta);
    var c1 = x0 + y * Math.sin(theta);
    var c2 = y0 - y * Math.cos(theta);
    return (
      " " +
      a1 +
      "," +
      a2 +
      " " +
      b1 +
      "," +
      b2 +
      " " +
      c1 +
      "," +
      c2 +
      " " +
      x0 +
      "," +
      y0
    );
  }

  function toggle(elem) {
    if (Tools.menus["Line"].menuOpen()) {
      Tools.menus["Line"].show(false);
    } else {
      Tools.menus["Line"].show(true);
    }
    if (!menuInitialized) initMenu(elem);
  }

  var menuInitialized = false;
  var anglelock = false;

  var menuSelected = "Line";
  var button;

  function initMenu(elem) {
    button = elem;
    var btns = document.getElementsByClassName("submenu-line");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", menuButtonClicked);
    }
    var elem = document.getElementById("angle-lock");
    elem.addEventListener("click", anglelockClicked);
    updateMenu("line");
    menuInitialized = true;
  }

  var menuButtonClicked = function () {
    menuSelected = this.id.substr(13);
    curLine = menuSelected;
    updateMenu(menuSelected);
    changeButtonIcon();
  };

  var changeButtonIcon = function () {
    if (icons[curLine].isHTML) {
      button.getElementsByClassName("tool-icon")[0].innerHTML =
        icons[curLine].icon;
    } else {
      button.getElementsByClassName("tool-icon")[0].textContent =
        icons[curLine].icon;
    }
  };

  var updateMenu = function (line) {
    var btns = document.getElementsByClassName("submenu-line");
    for (var i = 0; i < btns.length; i++) {
      if (icons[btns[i].id.substr(13)].isSVG) {
        btns[i].getElementsByClassName("tool-icon")[0].innerHTML =
          icons[btns[i].id.substr(13)].menuIcon;
      }
      btns[i].style.backgroundColor = "#fff";
      btns[i].style.color = "gray";
      btns[i].style.borderRadius = "8px";
    }
    /*if(shape=="Ellipse"){
			var extender = document.getElementById("submenu-line-extend")
			extender.style.display = 'block';
			$(extender).animate({width:250,height:200});
		}*/
    var btn = document.getElementById("submenu-line-" + line);
    if (icons[btn.id.substr(13)].isSVG) {
      btn.getElementsByClassName("tool-icon")[0].innerHTML =
        icons[btn.id.substr(13)].menuIconActive;
    }
    btn.style.backgroundColor = "#eeeeff";
    btn.style.color = "green";
    btn.style.borderRadius = "8px";
  };

  function anglelockClicked() {
    var elem = document.getElementById("angle-lock");
    if (anglelock) {
      elem.style.color = "gray";
      anglelock = false;
      elem.setAttribute("class", "fas fa-unlock");
    } else {
      elem.setAttribute("class", "fas fa-lock");
      elem.style.color = "orange";
      anglelock = true;
    }
  }

  function menuListener(elem, onButton, onMenu, e) {
    if (!onMenu && !onButton) {
      e.stopPropagation();
      return true;
    }
    return false;
  }

  Tools.add({
    //The new tool
    // "name": "Straight line",
    //  "icon": "☇",
    iconHTML: lineSVG,
    title: "Lines",
    name: "Line",
    isExtra: true,
    //"icon": "",
    listeners: {
      press: startLine,
      move: continueLine,
      release: stopLine,
    },
    // shortcuts: {
    //   changeTool: "2",
    // },
    toggle: toggle,
    menu: {
      title: "Lines",
      content:
        `<div class="tool-extra submenu-line" id="submenu-line-line">
            <span title="solid line" class="tool-icon" id="line1">—</span>
						</div>

						<div class="tool-extra submenu-line" id="submenu-line-arrw">
							<span title="solid arrow" class="tool-icon" id="line2">→</span>
						</div>

						<div class="tool-extra submenu-line" id="submenu-line-dashline">
							<span title="dashed line" class="tool-icon"  id="line3">---</span>
						</div>

						<div style="width:143px;display:block" class="tool-extra"  id="submenu-line-angleLock">
							<div style="margin-top:5px;padding:5px;font-size:.8rem;color: gray"><i style="font-size:1rem;margin-left:5px" id="angle-lock" class="fas fa-unlock"></i> &nbsp;0-30-45-60-90°</div>
						</div>`,
      listener: menuListener,
    },
    draw: draw,
    mouseCursor: "crosshair",
    stylesheet: "tools/line/line.css",
  });
})(); //End of code isolation
