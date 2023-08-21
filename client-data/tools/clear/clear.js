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

(function clear() { //Code isolation


	var msg = {
		"type": "clear"
	};
	var binSVG = '<svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 17"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M11,3a3.48,3.48,0,0,0-6.9,0H0V4H2V14a3,3,0,0,0,3,3h5a3,3,0,0,0,3-3V4h2V3ZM7.5,1A2.5,2.5,0,0,1,10,3H5.05A2.5,2.5,0,0,1,7.5,1ZM12,14a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2V4h9Z"/></g></g></svg>';
	function clearBoard(evt) {
		// if($("#menu").width()>Tools.menu_width+3)return;
		if (evt) evt.preventDefault();
		Tools.acceptMsgs = false;
		draw(msg, true);
		Tools.send(msg, "Clear");
		// clear the Table modal
	};

	function draw(data) {
		var elem;
		switch (data.type) {
			//TODO: add the ability to erase only some points in a line
			case "clear":
				Tools.clearBoard(false);
				break;
			default:
				console.error("Clear: 'clear' instruction with unknown type. ", data);
				break;
		}
	}

	Tools.add({ //The new tool
		"name": "Clear",
		// "icon": "🗑",
		"iconHTML": binSVG,
		"shortcuts": {
			"actions": [{ "key": "shift-C", "action": clearBoard }]
		},
		"listeners": {},
		"draw": draw,
		"oneTouch": true,
		"onstart": clearBoard,
		"mouseCursor": "crosshair",
	});

})(); //End of code isolation