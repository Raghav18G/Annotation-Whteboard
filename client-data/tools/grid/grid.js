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

 (function grid() { //Code isolation

    var toggle=0; //grid on by default ( now grid will be off by default)
    var msg = {
        "type": "grid",
        "id":"",
        "toggle":toggle
    };

	var gridSVG = '<svg class="tool-icon-svg" width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8294_29575)"><path d="M6.30194 4.04492H27.952C28.3127 4.04492 28.6403 4.19211 28.8775 4.42927C29.1146 4.66642 29.2618 4.99398 29.2618 5.35468V27.0048C29.2618 27.3655 29.1146 27.693 28.8775 27.9302C28.6403 28.1673 28.3127 28.3145 27.952 28.3145H6.30194C5.94124 28.3145 5.61369 28.1673 5.37653 27.9302C5.13937 27.693 4.99219 27.3655 4.99219 27.0048V5.35468C4.99219 4.99398 5.13937 4.66642 5.37653 4.42927C5.61369 4.19211 5.94124 4.04492 6.30194 4.04492ZM27.952 5.05618H6.30194C6.22037 5.05618 6.14583 5.08992 6.09151 5.14425C6.03718 5.19857 6.00344 5.27311 6.00344 5.35468V27.0048C6.00344 27.0864 6.03718 27.1609 6.09151 27.2152C6.14583 27.2695 6.22037 27.3033 6.30194 27.3033H27.952C28.0336 27.3033 28.1082 27.2695 28.1625 27.2152C28.2168 27.1609 28.2505 27.0864 28.2505 27.0048V5.35468C28.2505 5.27311 28.2168 5.19857 28.1625 5.14425C28.1082 5.08992 28.0336 5.05618 27.952 5.05618Z" fill="#212121"/><path d="M9.2208 5.56152V8.32912H13.8166V5.56152H14.8278V8.32912H19.4237V5.56152H20.4349V8.32912H25.0307V5.56152H26.042V8.32912H27.7437V9.34037H26.042V13.2256H27.7437V14.2369H26.042V18.1221H27.7437V19.1333H26.042V23.0185H27.7437V24.0298H26.042V26.7974H25.0307V24.0298H20.4349V26.7974H19.4237V24.0298H14.8278V26.7974H13.8166V24.0298H9.2208V26.7974H8.20954V24.0298H6.50781V23.0185H8.20954V19.1333H6.50781V18.1221H8.20954V14.2369H6.50781V13.2256H8.20954V9.34037H6.50781V8.32912H8.20954V5.56152H9.2208ZM9.2208 9.34037V13.2256H13.8166V9.34037H9.2208ZM14.8278 9.34037V13.2256H19.4236V9.34037H14.8278ZM20.4349 9.34037V13.2256H25.0307V9.34037H20.4349ZM9.2208 14.2369V18.1221H13.8166V14.2369H9.2208ZM14.8278 14.2369V18.1221H19.4236V14.2369H14.8278ZM20.4349 14.2369V18.1221H25.0307V14.2369H20.4349ZM9.2208 19.1333V23.0185H13.8166V19.1333H9.2208ZM14.8278 19.1333V23.0185H19.4236V19.1333H14.8278ZM20.4349 19.1333V23.0185H25.0307V19.1333H20.4349Z" fill="#66BB6A"/> </g><defs><clipPath id="clip0_8294_29575"><rect width="32.3594" height="32.3594" fill="white" transform="translate(0.945312)"/></clipPath></defs></svg><label id="tool-grid-localization" class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;"><p>Grid</p></label>';
	
	function toggleGrid(evt) {
        // if($("#menu").width()>Tools.menu_width+3)return;
    if(evt)evt.preventDefault();
        if(toggle){
            toggle=0;
        }else{
            toggle=1;
        }
        msg.id = Tools.generateUID("g");   //g for grid
        msg.toggle=toggle;
        draw(msg);
    };

    function draw(data) {
        switch (data.type) {
            //TODO: add the ability to erase only some points in a line
            case "grid":
                var elem = Tools.svg.getElementById("rect_1");
                elem.setAttribute("fill",(data.toggle?"url(#grid)":"white"));
                break;
            default:
                console.error("Clear: 'clear' instruction with unknown type. ", data);
                break;
        }
    }

    var svg = Tools.svg;

    Tools.add({ //The new tool
        "name": "Grid",
        // "icon": "🗑",
        // "iconHTML":"<i style='color:gray;margin-top:7px'  class='fas fa-th'></i>",
        "iconHTML": gridSVG,
        // "shortcuts": {
        //     "actions":[{"key":"9","action":toggleGrid}],
        // },
        "listeners": {},
        "draw": draw,
        "oneTouch":true,
        "onstart":toggleGrid,
        "mouseCursor": "crosshair",
    });

})(); //End of code isolation