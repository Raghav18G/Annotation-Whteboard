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
	var textSVG = '<svg class="tool-icon-svg" style="width: 35px;height: 40px;margin-top: -8px" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8294_29509)"><path d="M33.6211 23.5425C32.797 23.8816 31.5651 24.1649 29.9254 24.401C28.9939 24.534 28.3329 24.6843 27.9509 24.8517C27.5646 25.0191 27.2641 25.2638 27.058 25.59C26.8477 25.9119 26.7404 26.2682 26.7404 26.6631C26.7404 27.2683 26.9722 27.7705 27.4272 28.174C27.8822 28.5732 28.5518 28.7749 29.4318 28.7749C30.3031 28.7749 31.08 28.5861 31.7582 28.204C32.4364 27.822 32.9386 27.2983 33.2562 26.6373C33.5009 26.1265 33.6211 25.3711 33.6211 24.3752L33.6211 23.5425ZM33.81 28.5989C32.9687 29.3115 32.1617 29.8137 31.3891 30.1098C30.6121 30.4017 29.7794 30.5477 28.8909 30.5477C27.4229 30.5477 26.2983 30.1914 25.5085 29.4746C24.723 28.7577 24.3281 27.8392 24.3281 26.7275C24.3281 26.0707 24.4741 25.4741 24.7745 24.9332C25.0707 24.3924 25.4613 23.9589 25.9421 23.6327C26.4271 23.3064 26.9679 23.0575 27.5731 22.8901C28.0153 22.7742 28.6849 22.6583 29.582 22.551C31.4105 22.3321 32.7583 22.0745 33.6211 21.7698C33.6297 21.4607 33.634 21.2633 33.634 21.1817C33.634 20.2589 33.4194 19.6064 32.9901 19.233C32.4149 18.7179 31.5522 18.4646 30.4147 18.4646C29.3502 18.4646 28.5647 18.6492 28.0539 19.0227C27.5474 19.3961 27.174 20.0571 26.9293 21.0057L24.7187 20.701C24.9205 19.7566 25.251 18.9883 25.7102 18.4088C26.1695 17.8251 26.8391 17.3744 27.7105 17.061C28.5819 16.7477 29.5906 16.5889 30.7409 16.5889C31.8827 16.5889 32.8056 16.7262 33.5181 16.9923C34.2306 17.2628 34.7543 17.5976 35.0934 18.0053C35.4282 18.4131 35.66 18.9239 35.7973 19.5463C35.8703 19.9326 35.9089 20.628 35.9089 21.6324V24.6499C35.9089 26.7575 35.9562 28.0881 36.0549 28.6419C36.1493 29.1999 36.3425 29.7364 36.6258 30.2472H34.2607C34.0289 29.7793 33.8744 29.2299 33.81 28.5989Z" fill="#424242"/><path d="M11.4979 22.6755H17.7519L15.8247 17.5719C15.2409 16.0223 14.8031 14.7475 14.5198 13.7474C14.2837 14.9321 13.9532 16.1039 13.524 17.2714L11.4979 22.6755ZM6.17969 30.2473L13.2621 11.8115H15.8891L23.4351 30.2473H20.6536L18.5031 24.6629H10.794L8.77228 30.2473H6.17969Z" fill="#424242"/></g><defs><clipPath id="clip0_8294_29509"><rect width="42.3594" height="42.3594" fill="white" transform="translate(0.226562)"/></clipPath></defs></svg><label id="tool-text-localization" class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 6px;"><p>Text</p></label>';
	var board = Tools.board, svg = Tools.svg;

	var input = document.createElement("input");
	input.id = "textToolInput";
	input.type = "text";
	input.setAttribute("autocomplete", "off");

	var curText = {
		"x": 0,
		"y": 0,
		"size": 36,
		"rawSize":16,
		"oldSize":0,
		"opacity": 1,
		"color": "#000",
		"id": 0,
		"sentText": "",
		"lastSending": 0
	};


	function onStart(evt){
		curText.oldSize=Tools.getSize();
		Tools.setSize(curText.rawSize);
	};

	function onQuit(){
		Tools.setSize(curText.oldSize);
	};

	function clickHandler(x, y, evt, isTouchEvent) {
		// if($("#menu").width()>Tools.menu_width+3)return;
		if (evt.target == input) return;
		if (evt.target.tagName === "text") {
			editOldText(evt.target);
			evt.preventDefault();
			return;
		}
		curText.rawSize = Tools.getSize();
		curText.size = parseInt(curText.rawSize * 1.5 + 12);
		curText.opacity = Tools.getOpacity();
		curText.color = Tools.getColor();
		curText.x = x;
		curText.y = y + curText.size / 2;
		stopEdit();
		startEdit();
		evt.preventDefault();
	}

	function editOldText(elem) {
		curText.id = elem.id;
		var r = elem.getBoundingClientRect();
		var x = (r.x+document.documentElement.scrollLeft)/Tools.scale;
		var y = (r.y+r.height+document.documentElement.scrollTop)/Tools.scale;
				
		curText.x = x;
		curText.y = y;
		curText.size = parseInt(elem.getAttribute("font-size"));
		curText.opacity = parseFloat(elem.getAttribute("opacity"));
		curText.color = elem.getAttribute("fill");
		startEdit();
		input.value = elem.textContent;
	}
	
	
	function stopEdit() {
		input.blur();
		curText.id=0;
		curText.sentText=""
		input.removeEventListener("keyup", textChangeHandler);
	}

	
	function startEdit() {
		if (!input.parentNode) board.appendChild(input);
		input.value="";
		var left = curText.x-scrollX +'px';
		var clientW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var x = curText.x*Tools.scale-scrollX;
		if(x+250>clientW){
			x = Math.max(60,clientW-260)
		}
		
		input.style.left=x +'px';
		input.style.top=curText.y*Tools.scale-scrollY + 20 +'px';
		input.focus();
		input.addEventListener("keyup", textChangeHandler);
		input.addEventListener("blur", textChangeHandler);
		input.addEventListener("blur", blur);
	}


	function blur(){
		input.style.top='-1000px';
	};

	function textChangeHandler(evt) {
		if (evt.which === 13) {
			curText.y += 1.5 * curText.size;
			stopEdit();
			startEdit();
		}
		if (performance.now() - curText.lastSending > 100) {
			if (curText.sentText !== input.value) {
				//If the user clicked where there was no text, then create a new text field
				if(curText.id==0){
					curText.id = Tools.generateUID("t"); //"t" for text
					Tools.drawAndSend({
						'type': 'new',
						'id': curText.id,
						'color': curText.color,
						'size': curText.size,
						'opacity': curText.opacity,
						'x': curText.x,
						'y': curText.y
					})
				}
				Tools.drawAndSend({
					'type': "update",
					'id': curText.id,
					'txt': input.value.slice(0, 280)
				});
				curText.sentText = input.value;
				curText.lastSending = performance.now();
			}
		} else {
			clearTimeout(curText.timeout);
			curText.timeout = setTimeout(textChangeHandler, 500, evt);
		}
	}

	function draw(data, isLocal) {
		Tools.drawingEvent=true;
		switch (data.type) {
			case "new":draw
				createTextField(data);
				break;
			case "update":
				var textField = document.getElementById(data.id);
				if (textField === null) {
					console.error("Text: Hmmm... I received text that belongs to an unknown text field");
					return false;
				}else{
					if(Tools.useLayers){
						if(textField.getAttribute("class")!="layer"+Tools.layer){
							textField.setAttribute("class","layer-"+Tools.layer);
							Tools.group.appendChild(textField);
						}
					}
				};
				updateText(textField, data.txt);
				break;
			default:
				console.error("Text: Draw instruction with unknown type. ", data);
				break;
		}
	}

	function updateText(textField, text) {
		textField.textContent = text;
	}

	function createTextField(fieldData) {
		var elem = Tools.createSVGElement("text");
		elem.id = fieldData.id;
		elem.setAttribute("x", fieldData.x);
		elem.setAttribute("y", fieldData.y);
		if(Tools.useLayers)
		elem.setAttribute("class","layer-"+Tools.layer);
		elem.setAttribute("font-size", fieldData.size);
		elem.setAttribute("fill", fieldData.color);
		elem.setAttribute("opacity", Math.max(0.1, Math.min(1, fieldData.opacity)) || 1);
		if (fieldData.txt) elem.textContent = fieldData.txt;
		if(fieldData.data){
			elem.setAttribute("data-lock",fieldData.data);
		}
		if(fieldData.transform)
			elem.setAttribute("transform",fieldData.transform);
		Tools.group.appendChild(elem);
		return elem;
	}

	Tools.add({ //The new tool
		// "name": "Text",
		//  "icon": "T",
		iconHTML: textSVG,
        "name": "Text",
        //"icon": "",
		"listeners": {
			"press": clickHandler
		},
		// "shortcuts": {
        //     "changeTool":"4"
        // },
		"onstart":onStart,
		"onquit":onQuit,
		"draw": draw,
		"mouseCursor": "text",
		"stylesheet": "tools/text/text.css"
	});

})(); //End of code isolation
