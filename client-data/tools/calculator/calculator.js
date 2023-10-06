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


(function calculator() { //Code isolation

	var toggle = 0;
	var opened = false;
	var msg = {
		"type": "e",
		"state":"",
	};
	var win = {
		toggle : 0,
		max:false
	 };
	var calculatorSVG = '<div class="tool-selected"><svg class="tool-icon-svg calc-svg" width="38" height="37" style="margin-left: -6px;" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8267_29312)"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.89893 4.625H30.7285C31.2705 4.625 31.7583 4.8418 32.1196 5.20312C32.481 5.56445 32.6978 6.05225 32.6978 6.59424V30.4238C32.6978 30.9658 32.481 31.4536 32.1196 31.8149C31.7583 32.1763 31.2705 32.3931 30.7285 32.3931H6.89893C6.35693 32.3931 5.86914 32.1763 5.50781 31.8149C5.14648 31.4536 4.92969 30.9658 4.92969 30.4238V6.59424C4.92969 6.05225 5.14648 5.56445 5.50781 5.20312C5.86914 4.8418 6.35693 4.625 6.89893 4.625Z" fill="#BDBDBD"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.89648 4.625H30.7261C31.2681 4.625 31.7559 4.8418 32.1172 5.20312C32.4785 5.56445 32.6953 6.05225 32.6953 6.59424V14.1821H4.94531V6.59424C4.94531 6.05225 5.16211 5.56445 5.52344 5.20312C5.88477 4.8418 6.37256 4.625 6.91455 4.625H6.89648Z" fill="#424242"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.85938 23.125H17.6514H18.2295V23.6489V28.9604V29.4844H17.6514H7.85938H7.28125V28.9604V23.6489V23.125H7.85938Z" fill="#0288D1"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.85938 15.0312H17.6514H18.2295V15.5552V20.8667V21.3906H17.6514H7.85938H7.28125V20.8667V15.5552V15.0312H7.85938Z" fill="#33691E"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.85938 21.3906H17.6514H18.2295V21.4448V21.9146V21.9688H17.6514H7.85938H7.28125V21.9146V21.4448V21.3906H7.85938Z" fill="#2F5C1E"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.85938 30.0625H17.6514H18.2295V30.0083V29.5386V29.4844H17.6514H7.85938H7.28125V29.5386V30.0083V30.0625H7.85938Z" fill="#0277BD"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.9609 21.3906H29.7529H30.3311V21.4448V21.9146V21.9688H29.7529H19.9609H19.3828V21.9146V21.4448V21.3906H19.9609Z" fill="#EF6C00"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.9609 30.0625H29.7529H30.3311V30.0083V29.5386V29.4844H29.7529H19.9609H19.3828V29.5386V30.0083V30.0625H19.9609Z" fill="#BC040B"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.9609 15.0312H29.7529H30.3311V15.5552V20.8667V21.3906H29.7529H19.9609H19.3828V20.8667V15.5552V15.0312H19.9609Z" fill="#F57F17"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.9609 23.125H29.7529H30.3311V23.6489V28.9604V29.4844H29.7529H19.9609H19.3828V28.9604V23.6489V23.125H19.9609Z" fill="#D50000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.85938 6.9375H29.7559H30.334V7.51562V12.7188V13.2969H29.7559H7.85938H7.28125V12.7188V7.51562V6.9375H7.85938Z" fill="#81D4FA"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.8672 20.2344V19.0781H10.7109V17.9219H11.8672V16.7656H13.0234V17.9219H14.1797V19.0781H13.0234V20.2344H11.8672Z" fill="#E1F5FE"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.2539 28.2373L12.4409 27.4062L11.6279 28.2373L10.7969 27.4062L11.6279 26.5933L10.7969 25.7803L11.6279 24.9492L12.4409 25.7803L13.2539 24.9492L14.085 25.7803L13.2539 26.5933L14.085 27.4062L13.2539 28.2373Z" fill="#E1F5FE"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.8359 17.9219H26.8828V19.0781H22.8359V17.9219Z" fill="#E1F5FE"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.8359 26.8828H26.8828V28.0391H22.8359V26.8828Z" fill="#E1F5FE"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.8359 25.1484H26.8828V26.3047H22.8359V25.1484Z" fill="#E1F5FE"/></g><defs><clipPath id="clip0_8267_29312"><rect width="37" height="37" fill="white" transform="translate(0.304688)"/></clipPath></defs></svg></div><label id="tool-calculator-localization" class="label-tool" style="font-size:10px;line-height: 2px; font-weight:400;margin-top: 14px;"><p>Calculator</p></label>';
	var elt = document.getElementById('calculator');
	var container = document.getElementById('calc-container');
	var calculator = Desmos.GraphingCalculator(elt);
	var lastState;
	calculator.observeEvent('change', relayChanges);
	

    //elt.style.width = '600px';
	//elt.style.height = '400px';
	//calculator.resize();

	function toggleCalc() {
		var btn = document.getElementById("toolID-Calculator");
		if(toggle){
			container.style.display = "none";
			btn.style.backgroundColor = "";
			btn.style.borderRadius = "";
			toggle=0;
		}else{
			Tools.focusWindow(container);
			if(win.max)pos_max_win()
			else pos_win()
			// btn.style.backgroundColor = "#eeeeff";
			btn.style.borderRadius = "8px";
			container.style.display = "block";
			toggle=1;
			if(opened) return;
			opened = true;
			init_window();
			
		}
	};

	function relayChanges() {
		msg.state = calculator.getState();
		diff(msg,lastState,msg.state);
		lastState = msg.state;
		Tools.send(msg,"Calculator");
	};

	//diff and merge "should" allow people to work on different expressions without interrupting each other
	function diff(state){
		const [olist,nlist] = getLists(lastState,state);
		let prevExpressions = {};
		let ids = new Set();
		olist.forEach(
			expression => {
				prevExpressions[expression.id]=expression
				ids.add(expression.id);
			}
		);
		nlist.forEach(
			expression => {
				if(JSON.stringify(expression)==JSON.stringify(prevExpressions[expression.id])){
					ids.delete(expression.id);
				}else{
					ids.add(expression.id);
				}
			}
		);
		msg.diff = Array.from(ids);
	};

	function merge(state,newDiff){
		const [olist,nlist] = getLists(lastState,state);
		let newExpressions = {};
		olist.forEach(
			expression => {
				if(!newDiff.includes(expression.id)){
					newExpressions[expression.id]=expression
				}
			}
		);
		nlist.forEach(
			expression => {
				if(newDiff.includes(expression.id) || !newExpressions[expression.id]){
					newExpressions[expression.id]=expression
				}
			}
		);
		if(!state.expressions)state.expressions = {};
		state.expressions.list = [];
		for (const id in newExpressions) {
			state.expressions.list.push(newExpressions[id])
		}
	};

	function getLists(
		{
			expressions: {
				list: olist = []
			} = {}
		} = {},
		{
			expressions: {
				list: nlist = []
			} = {}
		}
	){
		return [olist,nlist]
	};

	function draw(data) {
		var elem;
		switch (data.type) {
			case "e":
				calculator.unobserveEvent('change');
				merge(data.state,data.diff);
				calculator.setState(data.state);
				lastState = data.state;
				calculator.observeEvent('change', relayChanges);
				break;
			default:
				console.error("Clear: 'calc' instruction with unknown type. ", data);
				break;
		}
	}

	function init_window(){
		document.getElementById("close-calc").addEventListener("click", toggleCalc);
		document.getElementById("max-calc").addEventListener("click", toggleMax);
		dragElement(document.getElementById("calc-container"));
		function dragElement(elmnt) {

			var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
			var header = document.getElementById(elmnt.id + "-header")
			if (document.getElementById(header)) {
			/* if present, the header is where you move the DIV from:*/
			//	if(!isTouchDevice){
					header.addEventListener("mousedown",dragMouseDown,false);
				//}else{
					header.addEventListener("touchstart",dragMouseDown,{ 'passive': false });
				//}
			} else {
				/* otherwise, move the DIV from anywhere inside the DIV:*/
				//if(!isTouchDevice){
					header.addEventListener("mousedown",dragMouseDown,false);
				//}else{
					header.addEventListener("touchstart",dragMouseDown,{ 'passive': false });
				//}
			}
		
			function dragMouseDown(e) {
				e = e || window.event;
				if(win.max)return;
				//e.preventDefault();
				// get the mouse cursor position at startup:
				if(e.type.startsWith("touch")){
					if (e.changedTouches.length === 1) {
						var touch = e.changedTouches[0];
						pos3 = touch.pageX
						pos4 = touch.pageY
					}
				}else{
					pos3 = e.clientX;
					pos4 = e.clientY;
				}
				Tools.focusWindow(elmnt);
				// call a function whenever the cursor moves:
				//if(!isTouchDevice){
					document.addEventListener("mouseup",closeDragElement,false);
					document.addEventListener("mousemove",elementDrag,false);
				//}else{
					document.addEventListener("touchend",closeDragElement,{ 'passive': false });
					document.addEventListener("touchmove",elementDrag,{ 'passive': false });
				//}
			
			}
		
			function elementDrag(e) {
				e = e || window.event;
				e.preventDefault();
				// calculate the new cursor position:
				if(e.type.startsWith("touch")){
					if (e.changedTouches.length === 1) {
						var touch = e.changedTouches[0];
						pos1 = pos3 - touch.pageX;
						pos2 = pos4 - touch.pageY;
						pos3 = touch.pageX
						pos4 = touch.pageY
					}
				}else{
					pos1 = pos3 - e.clientX;
					pos2 = pos4 - e.clientY;
					pos3 = e.clientX;
					pos4 = e.clientY;
				}
				
				// set the element's new position:
				elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
				elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
			}
		
			function closeDragElement(e) {
				//e.preventDefault();
			/* stop moving when mouse button is released:*/
				document.removeEventListener("mouseup",closeDragElement,false);
				document.removeEventListener("mousemove",elementDrag,false);
				document.removeEventListener("touchend",closeDragElement,false);
				document.removeEventListener("touchmove",elementDrag,false);
			}
		}
	};

	function toggleMax() {
		if(win.max){
			pos_win();
			win.max=false;
		}else{
			pos_max_win()
			win.max=true;
		}
	};

	function pos_win(){
		container.style.position = "";
		container.style.zIndex= "";
		container.style.left =  (win.l? win.l - document.documentElement.scrollLeft: (65+document.documentElement.scrollLeft)) + "px";
		container.style.top =   (win.t? win.t - document.documentElement.scrollTop: (19+document.documentElement.scrollTop)) + "px"; 
		container.style.width = ''; 
		container.style.height = '';
	};
	function pos_max_win(){
		container.style.position = "fixed";
		container.style.zIndex=100;
		win.l = $(container).offset().left;
		win.t = $(container).offset().top;
		container.style.left =  '0px'; 
		container.style.top =  '0px'; 
		container.style.width = '100%'; 
		container.style.height = '100%';
	};


	Tools.add({ //The new tool
		"name": "Calculator",
		// "icon": "🗑",
		// "iconHTML":"<i id='calc-icon' style='color: #FF8C00;margin-top:7px' class='fas fa-calculator'></i>",
		"iconHTML": calculatorSVG,
		//"shortcut": "e",
		"listeners": {},
		"draw": draw,
		"oneTouch":true,
		"isExtra":true,
		"onstart":toggleCalc,
		"mouseCursor": "crosshair",
		"stylesheet": "tools/calculator/calculator.css"
	});

})(); //End of code isolation