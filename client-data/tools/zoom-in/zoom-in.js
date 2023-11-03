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
  var origin = {
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    x: 0.0,
    y: 0.0,
    clientY: 0,
    scale: 1.0,
  };
  var moved = false,
    pressed = false;

  var zoomOutSVG =
  '<div class="tool-selected"><svg xmlns="http://www.w3.org/2000/svg"  class="tool-icon-svg" width="29" height="28" viewBox="0 0 29 28" fill="none"><circle cx="13.8047" cy="13.5" r="10.5" fill="#3399FF" fill-opacity="0.5"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.724 3.20801C8.08605 3.20801 3.51563 7.77843 3.51563 13.4163C3.51563 19.0542 8.08605 23.6247 13.724 23.6247C19.3619 23.6247 23.9323 19.0542 23.9323 13.4163C23.9323 7.77843 19.3619 3.20801 13.724 3.20801ZM1.76562 13.4163C1.76562 6.81194 7.11955 1.45801 13.724 1.45801C20.3284 1.45801 25.6823 6.81194 25.6823 13.4163C25.6823 16.4036 24.5869 19.135 22.776 21.2309L26.5927 25.0476C26.9344 25.3893 26.9344 25.9434 26.5927 26.2851C26.251 26.6268 25.697 26.6268 25.3552 26.2851L21.5385 22.4684C19.4427 24.2793 16.7112 25.3747 13.724 25.3747C7.11955 25.3747 1.76562 20.0207 1.76562 13.4163ZM13.724 9.62467C14.2072 9.62467 14.599 10.0164 14.599 10.4997V12.5413H16.6406C17.1239 12.5413 17.5156 12.9331 17.5156 13.4163C17.5156 13.8996 17.1239 14.2913 16.6406 14.2913H14.599V16.333C14.599 16.8163 14.2072 17.208 13.724 17.208C13.2407 17.208 12.849 16.8163 12.849 16.333V14.2913H10.8073C10.324 14.2913 9.93229 13.8996 9.93229 13.4163C9.93229 12.9331 10.324 12.5413 10.8073 12.5413H12.849V10.4997C12.849 10.0164 13.2407 9.62467 13.724 9.62467Z" fill="#424242"/></svg></div><label id="tool-zoomin-localization" class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;"><p>Zoom in</p></label>';
 
  function zoom(origin, scale) {
    var oldScale = origin.scale;
    var newScale = Tools.setScale(scale);
    window.scrollTo(
      origin.scrollX + origin.x * (newScale - oldScale),
      origin.scrollY + origin.y * (newScale - oldScale)
    );
  }

  function setOrigin(x, y, evt, isTouchEvent) {
    origin.scrollX = window.scrollX;
    origin.scrollY = window.scrollY;
    origin.x = x;
    origin.y = y;
    //origin.clientY = getClientY(evt, isTouchEvent);
    origin.scale = Tools.getScale();
  }

  function setHashScale() {
    var coords = window.location.hash.slice(1).split(",");
    var x = coords[0] | 0;
    var y = coords[1] | 0;
    var scale = Tools.getScale().toFixed(2);
    var hash = "#" + (x | 0) + "," + (y | 0) + "," + scale;
    window.history.pushState({}, "", hash);
  }

  function press(x, y, evt, isTouchEvent) {
    // if($("#menu").width()>Tools.menu_width+3)return;
    evt.preventDefault();
    setOrigin(x, y, evt, isTouchEvent);
    moved = false;
    pressed = true;
  }

  //Tools.board.addEventListener("wheel", onwheel,{ 'passive': false });

  function release(x, y, evt, isTouchEvent) {
    if (evt) evt.preventDefault();
    if (pressed && !moved) {
      Tools.scaleIndex = Math.min(
        Tools.scaleIndex + 1,
        Tools.scaleDefaults.length - 1
      );
      var scale = Tools.scaleDefaults[Tools.scaleIndex];
      zoom(origin, scale);
      setHashScale();
    }
    pressed = false;
  }

  Tools.zoomComplete = true;

  function keyZoomIn() {
    if (!Tools.zoomComplete) return;
    var scale = Tools.getScale();
    //find middle of page
    var pageX =
      window.scrollX +
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
        2;
    var pageY =
      window.scrollY +
      Math.max(document.documentElement.clientHeight, window.innerHeight || 0) /
        2;
    var x = pageX / scale;
    var y = pageY / scale;
    setOrigin(x, y);
    Tools.scaleIndex = Math.min(
      Tools.scaleIndex + 1,
      Tools.scaleDefaults.length - 1
    );
    scale = Tools.scaleDefaults[Tools.scaleIndex];
    zoom(origin, scale);
    setHashScale();
  }

  function toggle(){

  }

  Tools.add({
    //The new tool
    icon: "🔎",
    // "iconHTML":"<i style='color: #B10DC9;margin-top:7px' class='fas fa-search-plus'></i>",
    iconHTML: zoomOutSVG,
    name: "Zoom In",
    //"icon": "",
    // shortcuts: {
    //   actions: [{ key: "x", action: keyZoomIn }],
    // },
    listeners: {
      press: press,
      release: release,
    },
    // provided in order to go into if condition inside Tools.onClick in orderto remove listner
    toggle:toggle,
    mouseCursor: "zoom-in",
    isExtra: true,
  });
})(); //End of code isolation
