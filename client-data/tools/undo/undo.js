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

(function undo() {
  //Code isolation

  var msg = {
    type: "undo",
  };

  function undo(evt) {
    if (evt) evt.preventDefault();
    draw(msg);
    Tools.send(msg, "Undo");
  }

  function draw(data) {
    var elem;
    const regex = /dragLogo/g;
    const doesExist = regex.test(Tools.svg.outerHTML);
    if (doesExist) {
      console.log("dragLogo exists in the SVG string.");
    } else {
      console.log("dragLogo does not exist in the SVG string.");
    }

    switch (data.type) {
      //TODO: add the ability to erase only some points in a line
      case "undo":
        break;
      default:
        console.error("Clear: 'clear' instruction with unknown type. ", data);
        break;
    }
  }

  var UndoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="M11.272 36.728A17.943 17.943 0 0 0 24 42c9.941 0 18-8.059 18-18S33.941 6 24 6c-4.97 0-9.47 2.015-12.728 5.272C9.614 12.93 6 17 6 17"/><path d="M6 9v8h8"/></g></svg>`;

  Tools.add({
    //The new tool
    class: "myundo",
    name: "Undo",
    // "icon": "🗑",
    // icon: UndoSvg,
    // showMarker: true,
    // iconHTML: UndoSvg,
    iconHTML: `<div class="tool-selected">${UndoSvg}</div><label id="tool-undo-localization" class="label-undo" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;">Undo</label>`,
    // iconHTML:
    //   "<p style='font: normal normal normal 15px/20px CircularXX;  font-family: CircularXXWeb-Book; letter-spacing: 0px; color: #8B8B8B;opacity: 1;' id='undo-tag'>Undo</p>",
    shortcuts: {
      actions: [{ key: "shift-U", action: undo }],
    },
    listeners: {},
    draw: draw,
    isExtra: false,
    oneTouch: true,
    onstart: undo,
    mouseCursor: "crosshair",
  });
})(); //End of code isolation
