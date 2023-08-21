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

(function () { //Code isolation
    var origin = {
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        x: 0.0,
        y: 0.0,
        clientY: 0,
        scale: 1.0
    };
    var moved = false, pressed = false;
    // var zoomOutSVG = '<svg xmlns="http://www.w3.org/2000/svg" class="tool-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 2.75C6.66751 2.75 2.75 6.66751 2.75 11.5C2.75 16.3325 6.66751 20.25 11.5 20.25C16.3325 20.25 20.25 16.3325 20.25 11.5C20.25 6.66751 16.3325 2.75 11.5 2.75ZM1.25 11.5C1.25 5.83908 5.83908 1.25 11.5 1.25C17.1609 1.25 21.75 5.83908 21.75 11.5C21.75 14.0605 20.8111 16.4017 19.2589 18.1982L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L18.1982 19.2589C16.4017 20.8111 14.0605 21.75 11.5 21.75C5.83908 21.75 1.25 17.1609 1.25 11.5ZM8.25 11.5C8.25 11.0858 8.58579 10.75 9 10.75H14C14.4142 10.75 14.75 11.0858 14.75 11.5C14.75 11.9142 14.4142 12.25 14 12.25H9C8.58579 12.25 8.25 11.9142 8.25 11.5Z" fill="#1C274C"/></svg><label id="tool-zoomout-localization" class="label-tool"  style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;"><p>Zoom out</p></label>';

    var zoomOutSVG = '<svg xmlns="http://www.w3.org/2000/svg"  class="tool-icon-svg" width="28" height="27" viewBox="0 0 28 27" fill="none"><circle cx="13.8047"cy="12.5" r="10.5" fill="#FDC500" fill-opacity="0.5"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.2422 3.09375C7.80563 3.09375 3.39844 7.50095 3.39844 12.9375C3.39844 18.3741 7.80563 22.7812 13.2422 22.7812C18.6787 22.7812 23.0859 18.3741 23.0859 12.9375C23.0859 7.50095 18.6787 3.09375 13.2422 3.09375ZM1.71094 12.9375C1.71094 6.56897 6.87365 1.40625 13.2422 1.40625C19.6107 1.40625 24.7734 6.56897 24.7734 12.9375C24.7734 15.8181 23.7172 18.452 21.9709 20.473L25.6513 24.1534C25.9808 24.4829 25.9808 25.0171 25.6513 25.3466C25.3218 25.6761 24.7876 25.6761 24.4581 25.3466L20.7777 21.6662C18.7566 23.4125 16.1228 24.4688 13.2422 24.4688C6.87365 24.4688 1.71094 19.306 1.71094 12.9375ZM9.58594 12.9375C9.58594 12.4715 9.9637 12.0938 10.4297 12.0938H16.0547C16.5207 12.0938 16.8984 12.4715 16.8984 12.9375C16.8984 13.4035 16.5207 13.7812 16.0547 13.7812H10.4297C9.9637 13.7812 9.58594 13.4035 9.58594 12.9375Z" fill="#424242"/></svg><label id="tool-zoomout-localization" class="label-tool"  style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;"><p>Zoom out</p></label>';


    function zoom(origin, scale) {
        var oldScale = origin.scale;
        var newScale = Tools.setScale(scale);
        window.scrollTo(
            origin.scrollX + origin.x * (newScale - oldScale),
            origin.scrollY + origin.y * (newScale - oldScale)
        );
    }

    var animation = null;
    function animate(scale) {
        cancelAnimationFrame(animation);
        animation = requestAnimationFrame(function () {
            zoom(origin, scale);
        });
    }

    function setOrigin(x, y, evt, isTouchEvent) {
        origin.scrollX = window.scrollX;
        origin.scrollY = window.scrollY;
        origin.x = x;
        origin.y = y;
        origin.scale = Tools.getScale();
    }

    function setHashScale(){
        var coords = window.location.hash.slice(1).split(',');
        var x = coords[0] | 0;
        var y = coords[1] | 0;
        var scale = Tools.getScale().toFixed(2);
        var hash = '#' + (x | 0) + ',' + (y | 0) + ',' + scale;
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
	    Tools.scaleIndex=Math.max(Tools.scaleIndex-1,0);
            var scale = Tools.scaleDefaults[Tools.scaleIndex];
            zoom(origin, scale);
	    setHashScale();	
        }
        pressed = false;
    }

    var timer;
    var curscale;
    var inc = 0;
    var inc2 = 0;
    var zoomScale = Tools.scaleDefaults[0];

    function animate_out() {
        inc+=10;
        var size = curscale - (curscale-zoomScale)/(60)*inc;
        animate(size);
        if(inc!=60){
            setTimeout(animate_out, 20);
        }else{
            inc = 0;
            setHashScale();
        }
    };

    function animate_in(){
        inc2+=10;
        var size = zoomScale - (zoomScale-curscale)/(60)*inc2;
        animate(size);
        if(inc2!=60){
            setTimeout(animate_in, 20);
        }else{
            inc2 = 0;
            setHashScale();
            Tools.zoomComplete = true;
        }
    };

    function homeIn(e) {
        e.preventDefault();
        e.stopPropagation();
        clearTimeout(timer);
        var x,y;
        var scale = Tools.getScale();

        if(e.type.startsWith("touch")){
            if (e.changedTouches.length === 1) {
                x = touch.pageX/scale;
                y = touch.pageY/scale;
            }
        }else if(e.type.startsWith("mouse")){
                x = e.pageX/scale
                y = e.pageY/scale
        }
        setOrigin(x, y);
        timer = setTimeout(animate_in, 20);
        Tools.svg.removeEventListener('mousedown',homeIn, true);
        Tools.svg.removeEventListener('touchstart',homeIn, false);
    };

    function wideout(){
        if(!Tools.zoomComplete)return;
        Tools.zoomComplete = false;
        var scale = Tools.getScale();
        //find middle of page
        var pageX =  window.scrollX + Math.max(document.documentElement.clientWidth, window.innerWidth || 0)/2;
        var pageY =   window.scrollY + Math.max(document.documentElement.clientHeight, window.innerHeight || 0)/2;
        var x = pageX / scale;
        var y = pageY / scale;
        setOrigin(x, y);
        curscale = Tools.scaleDefaults[Tools.scaleIndex];
        timer = setTimeout(animate_out, 20);
        Tools.svg.addEventListener('mousedown',homeIn,true);
        Tools.svg.addEventListener('touchstart',homeIn,false);
     }

     function keyZoomOut(){
        if(!Tools.zoomComplete)return;
        var scale = Tools.getScale();
        //find middle of page
        var pageX =  window.scrollX + Math.max(document.documentElement.clientWidth, window.innerWidth || 0)/2;
        var pageY =   window.scrollY + Math.max(document.documentElement.clientHeight, window.innerHeight || 0)/2;
        var x = pageX / scale;
        var y = pageY / scale;
        setOrigin(x, y);
        Tools.scaleIndex=Math.max(Tools.scaleIndex-1,0);
        var scale = Tools.scaleDefaults[Tools.scaleIndex];
        zoom(origin, scale);
        setHashScale();
     }


    Tools.add({ //The new tool
         "icon": "🔎",
    // "iconHTML":"<i style='color: #B10DC9;margin-top:7px' class='fas fa-search-minus'></i>",
    "iconHTML": zoomOutSVG,
        "name": "Zoom Out",
        //"icon": "",
        // "shortcuts": {
        //     "actions":[{"key":"z","action":wideout},{"key":"shift-X","action":keyZoomOut}]
        // },
        "listeners": {
            "press": press,
	    "release": release,
        },
        "mouseCursor": "zoom-out",
	"isExtra":false
    });
})(); //End of code isolation
