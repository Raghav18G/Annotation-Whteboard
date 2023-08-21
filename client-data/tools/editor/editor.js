/**
 *                        WB
 *********************************************************
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2020  Robert Beach
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

 (function editor() { //Code isolation

	var win = {
		toggle : 0,
		opened : false,
		max:false
	 };

	 // All this so the current word doesn't get highlighted by the spell checker
	 var notesSVG = '<svg class="tool-icon-svg" width="37" height="37" style="margin-left: -4px;" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8294_29518)"><path d="M26.1975 20.1557C25.6859 20.3662 24.9213 20.542 23.9037 20.6885C23.3256 20.7711 22.9153 20.8643 22.6782 20.9682C22.4384 21.0721 22.2519 21.224 22.124 21.4265C21.9935 21.6263 21.9269 21.8474 21.9269 22.0925C21.9269 22.4681 22.0708 22.7798 22.3532 23.0302C22.6355 23.278 23.0512 23.4032 23.5973 23.4032C24.1381 23.4032 24.6203 23.286 25.0412 23.0489C25.4622 22.8118 25.7739 22.4868 25.971 22.0765C26.1229 21.7595 26.1974 21.2906 26.1974 20.6725L26.1975 20.1557ZM26.3147 23.294C25.7925 23.7362 25.2917 24.0479 24.8121 24.2318C24.3299 24.4129 23.8131 24.5035 23.2616 24.5035C22.3505 24.5035 21.6525 24.2824 21.1623 23.8375C20.6748 23.3926 20.4297 22.8224 20.4297 22.1325C20.4297 21.7248 20.5203 21.3545 20.7067 21.0189C20.8906 20.6832 21.133 20.4141 21.4314 20.2116C21.7324 20.0092 22.0681 19.8546 22.4437 19.7507C22.7181 19.6788 23.1337 19.6069 23.6905 19.5403C24.8254 19.4044 25.662 19.2446 26.1975 19.0554C26.2028 18.8636 26.2054 18.741 26.2054 18.6904C26.2054 18.1177 26.0722 17.7127 25.8058 17.4809C25.4488 17.1612 24.9134 17.0041 24.2074 17.0041C23.5467 17.0041 23.0591 17.1186 22.7421 17.3504C22.4277 17.5822 22.196 17.9924 22.0441 18.5812L20.6721 18.3921C20.7973 17.806 21.0025 17.3291 21.2875 16.9694C21.5726 16.6071 21.9882 16.3274 22.529 16.1329C23.0698 15.9384 23.6959 15.8398 24.4098 15.8398C25.1185 15.8398 25.6913 15.9251 26.1335 16.0903C26.5758 16.2581 26.9008 16.4659 27.1112 16.719C27.319 16.9721 27.4629 17.2891 27.5482 17.6754C27.5934 17.9152 27.6174 18.3468 27.6174 18.9702V20.843C27.6174 22.1511 27.6467 22.977 27.708 23.3206C27.7666 23.667 27.8865 24 28.0623 24.317H26.5944C26.4505 24.0266 26.3546 23.6856 26.3147 23.294Z" fill="#424242"/><path d="M12.4727 19.6178H16.3543L15.1581 16.4502C14.7958 15.4885 14.5241 14.6972 14.3482 14.0765C14.2017 14.8118 13.9966 15.5391 13.7302 16.2637L12.4727 19.6178ZM9.17188 24.3173L13.5677 12.875H15.1981L19.8816 24.3173H18.1552L16.8205 20.8513H12.0358L10.781 24.3173H9.17188Z" fill="#424242"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7402 5.15039H6.59019C5.90733 5.15039 5.25216 5.42169 4.76954 5.90431C4.28692 6.38692 4.01562 7.0421 4.01562 7.72496C4.01562 9.22171 4.01562 11.3792 4.01562 12.875C4.01562 13.3493 4.40043 13.7341 4.87381 13.7341C5.3472 13.7341 5.732 13.3493 5.732 12.875V7.72496C5.732 7.49795 5.82243 7.27925 5.98392 7.11869C6.14448 6.9572 6.36319 6.86677 6.59019 6.86677H11.7402C12.2146 6.86677 12.5994 6.48197 12.5994 6.00858C12.5994 5.53519 12.2146 5.15039 11.7402 5.15039Z" fill="#AFB9D2"/><path fill-rule="evenodd" clip-rule="evenodd" d="M26.3379 6.86579H31.4879C31.7149 6.86579 31.9336 6.95623 32.0942 7.11771C32.2557 7.27828 32.3461 7.49697 32.3461 7.72398V12.874C32.3461 13.3483 32.7309 13.7331 33.2043 13.7331C33.6777 13.7331 34.0625 13.3483 34.0625 12.874V7.72398C34.0625 7.04112 33.7912 6.38594 33.3086 5.90333C32.826 5.42071 32.1708 5.14941 31.4879 5.14941C29.9912 5.14941 27.8337 5.14941 26.3379 5.14941C25.8636 5.14941 25.4788 5.53421 25.4788 6.0076C25.4788 6.48099 25.8636 6.86579 26.3379 6.86579Z" fill="#AFB9D2"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7481 31.7602H6.598C6.371 31.7602 6.1523 31.6698 5.99173 31.5083C5.83025 31.3477 5.73981 31.129 5.73981 30.902V25.7519C5.73981 25.2776 5.35501 24.8928 4.88163 24.8928C4.40824 24.8928 4.02344 25.2776 4.02344 25.7519V30.902C4.02344 31.5849 4.29474 32.24 4.77735 32.7226C5.25997 33.2053 5.91514 33.4766 6.598 33.4766C8.09476 33.4766 10.2522 33.4766 11.7481 33.4766C12.2224 33.4766 12.6072 33.0918 12.6072 32.6184C12.6072 32.145 12.2224 31.7602 11.7481 31.7602Z" fill="#AFB9D2"/><path fill-rule="evenodd" clip-rule="evenodd" d="M26.3379 33.4766H31.4879C32.1708 33.4766 32.826 33.2053 33.3086 32.7226C33.7912 32.24 34.0625 31.5849 34.0625 30.902C34.0625 29.4052 34.0625 27.2478 34.0625 25.7519C34.0625 25.2776 33.6777 24.8928 33.2043 24.8928C32.7309 24.8928 32.3461 25.2776 32.3461 25.7519V30.902C32.3461 31.129 32.2557 31.3477 32.0942 31.5083C31.9336 31.6698 31.7149 31.7602 31.4879 31.7602H26.3379C25.8636 31.7602 25.4788 32.145 25.4788 32.6184C25.4788 33.0918 25.8636 33.4766 26.3379 33.4766Z" fill="#AFB9D2"/></g><defs><clipPath id="clip0_8294_29518"><rect width="36.3594" height="36.3594" fill="white" transform="translate(0.585938)"/> </clipPath></defs></svg><label id="tool-editor-localization" class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;"><p>Editor</p></label>';
	  var startline = 0;
	 var linenum = 0;
	 var changeCalled = false;
	 var cursorLock = false;
	 var changeLock = false;


	 var initialized = false;
	 var input_init;
	 var overlay_initialized = false;

	 var codeMirror;

	 var typoOverlay;
	 var spellCheck=false;
	 var live = false;
	
	 var img1 = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" height="30" width="30" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><g><path fill="gray" d="M74.999,61.237c-0.43-0.276-0.966-0.313-1.477-0.342c-1.167-0.067-2.334-0.134-3.501-0.201    c-1.205-0.069-2.441-0.135-3.591,0.231c-1.308,0.415-2.174,1.321-2.397,2.638c-0.046,0.274,0.153,3.136,0.015,3.136    c0,2.977-0.419,4.33,2.976,4.271c1.564-0.027,3.141-0.213,4.699-0.047c0.07,0.008,0.144,0.017,0.22,0.028    c0.996,0.141,2.478,0.513,3.229-0.304c1.589-1.73,0.902-4.706,0.8-6.847C75.926,62.848,75.8,61.75,74.999,61.237z"/><path d="M74.999,45.338c-0.43-0.276-0.966-0.313-1.477-0.342c-1.167-0.067-2.334-0.134-3.501-0.201    c-1.205-0.069-2.441-0.135-3.591,0.231c-1.308,0.415-2.174,1.321-2.397,2.638c-0.046,0.274,0.153,3.136,0.015,3.136    c0,2.977-0.419,4.33,2.976,4.271c1.564-0.027,3.141-0.213,4.699-0.047c0.07,0.007,0.144,0.017,0.22,0.028    c0.996,0.141,2.478,0.513,3.229-0.304c1.589-1.73,0.902-4.706,0.8-6.847C75.926,46.949,75.8,45.851,74.999,45.338z"/><path d="M64.049,34.901c0,2.977-0.419,4.33,2.976,4.271c1.564-0.027,3.141-0.213,4.699-0.047c0.07,0.007,0.144,0.017,0.22,0.028    c0.996,0.141,2.478,0.513,3.229-0.304c1.589-1.73,0.902-4.706,0.8-6.847c-0.045-0.951-0.172-2.049-0.973-2.562    c-0.43-0.276-0.966-0.313-1.477-0.342c-1.167-0.067-2.334-0.134-3.501-0.201c-1.205-0.069-2.441-0.135-3.591,0.231    c-1.308,0.415-2.174,1.321-2.397,2.638C63.987,32.039,64.187,34.901,64.049,34.901z"/><path d="M54.766,61.237c-0.43-0.276-0.966-0.313-1.477-0.342c-1.167-0.067-2.334-0.134-3.501-0.201    c-1.205-0.069-2.441-0.135-3.591,0.231c-1.308,0.415-2.174,1.321-2.397,2.638c-0.046,0.274,0.153,3.136,0.015,3.136    c0,2.977-0.419,4.33,2.976,4.271c1.564-0.027,3.141-0.213,4.699-0.047c0.07,0.008,0.144,0.017,0.22,0.028    c0.996,0.141,2.478,0.513,3.229-0.304c1.589-1.73,0.902-4.706,0.8-6.847C55.693,62.848,55.567,61.75,54.766,61.237z"/><path d="M54.766,45.338c-0.43-0.276-0.966-0.313-1.477-0.342c-1.167-0.067-2.334-0.134-3.501-0.201    c-1.205-0.069-2.441-0.135-3.591,0.231c-1.308,0.415-2.174,1.321-2.397,2.638c-0.046,0.274,0.153,3.136,0.015,3.136    c0,2.977-0.419,4.33,2.976,4.271c1.564-0.027,3.141-0.213,4.699-0.047c0.07,0.007,0.144,0.017,0.22,0.028    c0.996,0.141,2.478,0.513,3.229-0.304c1.589-1.73,0.902-4.706,0.8-6.847C55.693,46.949,55.567,45.851,54.766,45.338z"/><path d="M34.766,61.237c-0.43-0.276-0.966-0.313-1.477-0.342c-1.167-0.067-2.334-0.134-3.501-0.201    c-1.205-0.069-2.441-0.135-3.591,0.231c-1.308,0.415-2.174,1.321-2.397,2.638c-0.046,0.274,0.153,3.136,0.015,3.136    c0,2.977-0.419,4.33,2.976,4.271c1.564-0.027,3.141-0.213,4.699-0.047c0.07,0.008,0.144,0.017,0.22,0.028    c0.996,0.141,2.478,0.513,3.229-0.304c1.589-1.73,0.902-4.706,0.8-6.847C35.693,62.848,35.567,61.75,34.766,61.237z"/></g></g></svg>`
	 var resize = ["<span style='margin-top:-3px;margin-left:-3px;opacity:.5;'>"+`<img style="pointer-events:none;" draggable="false" src='data:image/svg+xml;utf8,`+img1+`' >`+"</span>"];
	 var resizer;
	 var modeIndex = 0;
	 var mode = [{
		 	name:"Text",
			klipse:'eval-javascript',
			codeMirror:'null',
			defaultText:'Hello there!'
		},
		{
			name:"Js",
			klipse:'eval-javascript',
			codeMirror:'javascript',
			defaultText:'Hello there!',
			template1:`var str = "BEGIN:\\n";
function print(arg){
	str += arg + "\\n";
}
// Begin Workspace

for(var i = 0;i < 5;i++){
	print("Hello there world!")
}

var canvas = document.getElementById("wb-canvas");
canvas.innerHTML = \`<div style="width:100px;height:
100px;position:absolute;top:50px;left:50px;
background-color:red"></div>\`

// End Workspace
str +="END";`
		},
		{
			"name":"Py",
		 	klipse:'eval-python-client',
		 	codeMirror:'python',
			 defaultText:'Hello there!',
			 template1:`import turtle

print "Hello world!"
			 
t = turtle.Turtle()
			 
for c in ['red', 'green', 'yellow', 'blue']:
	t.color(c)
	t.forward(75)
	t.left(90)`
		},
		{
			name:"C++",
			klipse:'eval-cpp',
			codeMirror:'text/x-c++src',
			defaultText:'Hello there!',
			template1:`#include <iostream>
using namespace std;
int main() {
	int a = 10;
	//cin >> a;
	cout << a*10 << endl;
	cout << "Hello World!";
	return 0;
}`
		}];

	var container = document.getElementById('wb-editor-container');
	var eval_code = Tools.debounce(Tools.eval_editor,250)
	
	function toggleEditor() {
		var btn = document.getElementById("toolID-Editor");
		if(win.toggle){
			container.style.display = "none";
			btn.style.backgroundColor = "";
			btn.style.borderRadius = "";
			win.toggle=0;
		}else{
			Tools.focusWindow(container);
			if(win.max)max_win()
			else unmax_win()
			btn.style.backgroundColor = "#eeeeff";
			btn.style.borderRadius = "8px";
			container.style.display = "block";
			win.toggle=1;
			if(win.opened) return;
			win.opened = true;
			init_texteditor();
			init_window();
		}
	};

	function load_klipse(){
		var e = document.getElementById('wb-editor-result-container');
		klipse.plugin.klipsify(e, window.klipse_settings, mode[modeIndex].klipse);
	};
	
	Tools.init_editor = function() {
		Tools.editor = {};
		init_texteditor();
	};

	function change_editor(i){
		if(modeIndex==i)return;
		codeMirror.off("change",change);
		codeMirror.off("cursorActivity",cursorActivity);
		delete Tools.editor;

		modeIndex = i;
		live = false;
		var _run = document.getElementById('wb-editor-run');
		var _live = document.getElementById('wb-editor-live');

		var live_icon = document.getElementById('wb-editor-live-icon');	
		var textoptions = document.getElementById("wb-textoptions");
		$(live_icon).removeClass('fa-spin');
		var editor = document.getElementsByClassName('wb-editor')[0];
		document.getElementById('wb-editor-curmode').textContent = mode[modeIndex].name;
		if(i!=0){
			var sp = document.getElementById("wb-spell-check");
			sp.style.color='';
			sp.style.display = 'none';
			document.getElementById("wb-code-template").style.display='inline-block';
			codeMirror.removeOverlay(typoOverlay);
			spellCheck=false;
			
			_run.style.display = "inline-block";
			_live.style.display = "inline-block";
			resizer.style.backgroundColor = '#efefef';
			editor.innerHTML =`<div class="col-sm-6" id="wb-editor-input">
			</div>
			<div class="col-sm-6" id="wb-editor-result">
				<div id="wb-editor-result-container"></div>
				<div id="wb-canvas"></div>
			</div>`
			load_klipse();
		}else{
			document.getElementById("wb-spell-check").style.display = 'inline-block';
			document.getElementById("wb-code-template").style.display='none';
			textoptions.style.display = 'inline-block'
			_run.style.display = "none";
			_live.style.display = "none";
			resizer.style.backgroundColor = 'white';
			editor.innerHTML =`<div class="col-sm-12" id="wb-editor-input">
			</div>`
			init_texteditor();
		}
		
	};

	var change = function(cMirror,obj){
		//console.info("change called");
		changeCalled = true;
		if(modeIndex!=0&&(!input_init||live)){
			eval_code();
			input_init=true;
		}
		if(spellCheck)
		setLines((changeLock?-1000000:obj.from.line));		
	};

	//Hack for the spell checker
	var cursor = {line:0,ch:0};
	var cursorActivity = function(cMirror){
		//console.info("cursorActivity called")
		if(spellCheck&&!changeCalled&&!cursorLock&&cursor.ch!=0){
			//console.info("replaceRange called: cursorLock and changelock true");
			cursorLock=true;
			changeLock=true;
			codeMirror.replaceRange(
				codeMirror.getRange({line:cursor.line,ch:cursor.ch-1},cursor),
				{line:cursor.line,ch:cursor.ch-1},
				cursor);
		}
		cursor = codeMirror.getCursor()
	}

	function init_texteditor(){
		//// Initialize Firebase.

		if(!initialized){
			firebase.initializeApp(firepad_config);
		}
		
		var firepadRef = getExampleRef();
		//// Create CodeMirror (with line numbers).

		codeMirror = CodeMirror(document.getElementById('wb-editor-input'), {
			lineNumbers: true,
			mode: mode[modeIndex].codeMirror,
			lineWrapping:(modeIndex==0?true:false)
		});

		// Spelling
		if(!initialized){
			loadLanguage(typo => initSpellCheck(typo),"en_US");
		}else if(overlay_initialized&&spellCheck&&modeIndex==0){
			setLines(-1000000);
			codeMirror.addOverlay(typoOverlay);
		}

		initialized = true;

		input_init=false;
		
		codeMirror.on('change',change);
		codeMirror.on('cursorActivity',cursorActivity);

		//// Create Firepad.
		Firepad.fromCodeMirror(firepadRef, codeMirror, {
		defaultText: mode[modeIndex].defaultText
		});

		if(modeIndex!=0)
		Tools.editor.get = function(){return codeMirror.getValue()};

		// Helper to get hash from end of URL or generate a random one.
		function getExampleRef() {
			var ref = firebase.database().ref();
			if(firepad_config.childref)
				ref = ref.child(firepad_config.childref);

			if (typeof console !== 'undefined') {
				console.log('Firebase data: ', ref.toString());
			}
			return ref;
		}
	}

	function init_window(){
		document.getElementById("wb-options").addEventListener("click", toggleOptionsBar);
		document.getElementById("wb-close-options").addEventListener("click", toggleOptionsBar);
		document.getElementById("wb-textoptions").addEventListener("click", toggleToolbar);
		document.getElementById("wb-close-edit").addEventListener("click", toggleToolbar);
		document.getElementById("wb-editor-run").addEventListener("click", run);
		document.getElementById("wb-editor-live").addEventListener("click", live_eval);
		document.getElementById("close-editor").addEventListener("click", toggleEditor);
		document.getElementById("max-editor").addEventListener("click", toggleMax);
		document.getElementById("wb-spell-check").addEventListener("click", toggleSpelling);
		document.getElementById("wb-code-template").addEventListener("click", openInsertDialog);
		document.getElementById("wb-ed-insert-template").addEventListener("click", insertTemplate);
		document.getElementById("wb-code-template").addEventListener("click", openInsertDialog);
		document.getElementById("wb-ed-insert-template").addEventListener("click", insertTemplate);
		document.getElementById("wb-ed-undo").addEventListener("click", undo);
		document.getElementById("wb-ed-redo").addEventListener("click", redo);
		document.getElementById("wb-text").addEventListener("click", function(){
			change_editor(0);
		}, false);
		document.getElementById("wb-js").addEventListener("click", function(){
			change_editor(1);
		}, false);
		document.getElementById("wb-python").addEventListener("click", function(){
			change_editor(2);
		}, false);
		document.getElementById("wb-cpp").addEventListener("click", function(){
			change_editor(3);
		}, false);
		var element = document.getElementById('wb-editor');
		resizer = document.createElement('div');
		resizer.className = 'resizer';
		resizer.style.display = (win.max?"none":"block");
		resizer.style.width = '20px';
		resizer.style.height = '20px';
		resizer.style.background = 'white';
		resizer.style.position = 'absolute';
		resizer.style.right = 0;
		resizer.style.bottom = 0;
		resizer.style.cursor = 'se-resize';
		element.appendChild(resizer);
		resizer.innerHTML = resize[0];
		resizer.addEventListener('mousedown', initResize, false);
		resizer.addEventListener("touchstart",initResize,{ 'passive': false });

		function initResize() {
			$(container).css({'-webkit-user-select':'none',/* and add the CSS class here instead */
           'user-select':'none'
    		 });
			window.addEventListener('mousemove', Resize, false);
			window.addEventListener('mouseup', stopResize, false);
			window.addEventListener("touchmove",Resize,{ 'passive': false });
			window.addEventListener("touchend",stopResize,{ 'passive': false });
		}

		function Resize(e) {
			e = e || window.event;
			e.preventDefault();
			if (document.selection) {
				document.selection.empty()
			} else {
				window.getSelection().removeAllRanges()
			}
			win.w =  Math.max(280,(e.pageX - container.offsetLeft));
			win.h = Math.max(250,(e.pageY - container.offsetTop-(40 +(options_open?45:0) + (toolbar_open?30:0))));
			element.style.width = win.w + 'px';
			element.style.height = win.h + 'px';
		}

		function stopResize(e) {
			$(container).css({'-webkit-user-select':'',/* and add the CSS class here instead */
           'user-select':''
    		 })
			window.removeEventListener('mousemove', Resize, false);
			window.removeEventListener('mouseup', stopResize, false);
			window.removeEventListener("touchmove",Resize,false);
			window.removeEventListener("touchend",stopResize,false);
		}

		dragElement(document.getElementById("wb-editor-container"));
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

	}

	// max-min window
	function toggleMax() {
		if(win.max){
			unmax_win();
			win.max=false;
		}else{
			max_win()
			win.max=true;
		}
	};

	// max-min window
	function unmax_win(){
		container.style.position = "";
		container.style.zIndex= "";
		container.style.left =  (win.l? win.l - document.documentElement.scrollLeft: (65+document.documentElement.scrollLeft)) + "px";
		container.style.top =   (win.t? win.t - document.documentElement.scrollTop: (19+document.documentElement.scrollTop)) + "px"; 
		container.style.width = ''; 
		container.style.height = '';
		container.style.paddingBottom ='';
		var elem = document.getElementById('wb-editor');
		elem.style.width = (win.w ? win.w + 'px':''); 
		elem.style.height =(win.h ? win.h + 'px':'');
		if(resizer)resizer.style.display = "block";
	};

	function max_win(){
		container.style.position = "fixed";
		container.style.zIndex=100;
		win.l = $(container).offset().left;
		win.t = $(container).offset().top;
		container.style.left =  '0px'; 
		container.style.top =  '0px'; 
		container.style.width = '100%'; 
		container.style.height = '100%';
		container.style.paddingBottom =(45 +(options_open?45:0) + (toolbar_open?30:0)) + 'px';
		var elem = document.getElementById('wb-editor');
		win.w = $(elem).width();
		win.h =$(elem).height();
		elem.style.width = '100%'; 
		elem.style.height = '100%';
		if(resizer)resizer.style.display = "none";
	};

	//Options Bar (modes)
	var options_open = false;
	function toggleOptionsBar() {
		var elem = document.getElementById("wb-editor-container-modes");
		var main = document.getElementById('wb-editor');
		if(options_open){
			elem.style.display = 'none';
			main.style.height = ($(main).height()+45)+'px';
			options_open=false;
		}else{
			elem.style.display = 'block';
			main.style.height = ($(main).height()-45)+'px'
			options_open=true;
		}
		
	};

	// run code
	function run() {
		eval_code();
	};

	// real-time evaluation
	function live_eval() {
		var el = document.getElementById('wb-editor-live-icon');
		if(live){
			$(el).removeClass('fa-spin');
			live = false;
		}else{
			live = true;
			$(el).addClass('fa-spin');
			eval_code();
		}
	};

	//Text toolbar
	var toolbar_open = true;
	function toggleToolbar() {
		var elem = document.getElementById("wb-editor-container-toolbar");
		var main = document.getElementById('wb-editor');
		if(toolbar_open){
			elem.style.display = 'none';
			main.style.height = ($(main).height()+30)+'px';
			toolbar_open=false;
		}else{
			elem.style.display = 'block';
			main.style.height = ($(main).height()-30)+'px'
			toolbar_open=true;
		}
		
	};

	//Spelling
	function loadLanguage(done,lang) {
		//console.log('loading aff');
		  var xhr_aff = new XMLHttpRequest();
		  xhr_aff.open("GET", "https://rawgit.com/ropensci/hunspell/master/inst/dict/"+lang+".aff", true);
		  xhr_aff.onload = function() {
			  if (xhr_aff.readyState === 4 && xhr_aff.status === 200) {
				  //console.log('aff loaded');
				var xhr_dic = new XMLHttpRequest();
				xhr_dic.open("GET", "https://rawgit.com/ropensci/hunspell/master/inst/dict/"+lang+".dic", true);
				xhr_dic.onload = function() {
					if (xhr_dic.readyState === 4 && xhr_dic.status === 200) {
					  //console.log('dic loaded');
					  done(new Typo(lang, xhr_aff.responseText, xhr_dic.responseText, { platform: "any" }));
					} else {
					  console.log('failed loading aff');
					  done(false);
					}
				};
				xhr_dic.send(null);
			  } else {
				console.log('failed loading aff');
				done(false);
			  }
		  };
		  xhr_aff.send(null);
	}
	
	//Spelling
	function initSpellCheck(typo) {
		if (!typo) return;
		
		// Define what separates a word
		var rx_word = "!\"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ ";
	
		// Ignore words that are just numbers
		var rx_ignore = /^[0-9]+$/;

		typoOverlay = {
			token: function(stream) {
				if(stream.sol()){
					linenum++;
					if(changeCalled){
						if(!changeLock){
							//console.info("cursorlock false");
							cursorLock=false;
						}
						//console.info("changeLock false");
						changeLock=false;
					}
					//console.info("changeCalled false");
					changeCalled=false;
				}
				
				var ch = stream.peek();
				var word = "";
	
				if (rx_word.includes(ch)) {
					stream.next();
					return null;
				}
	
				while ((ch = stream.peek()) && !rx_word.includes(ch)) {
					word += ch;
					stream.next();
				}
				var c = codeMirror.getCursor();
				if(!(linenum==c.line&&stream.column()<c.ch&&c.ch-(stream.column()+word.length)<1))
					if (!typo.check(word)&&!word.match(rx_ignore)) return "spell-error"; // CSS class: cm-spell-error
			}
		};
		overlay_initialized=true;
		if(spellCheck&&modeIndex==0){
			setLines(-1000000);
			codeMirror.addOverlay(typoOverlay);
		}
	}

	//Spelling
	function setLines(start){
		startline = start;
		linenum = startline - 1;
	}
	
	//Spelling
	function toggleSpelling() {
		if(!overlay_initialized)return;
		if(spellCheck){
			document.getElementById("wb-spell-check").style.color='';
			codeMirror.removeOverlay(typoOverlay);
			spellCheck=false;
		}else{
			document.getElementById("wb-spell-check").style.color='green';
			setLines(-1000000);
			codeMirror.addOverlay(typoOverlay);
			spellCheck=true;
		}
	};

	//Code Template
	function openInsertDialog() {
		$("#myModal").modal();
	};

	//Code Template
	function insertTemplate() {
		codeMirror.setValue(mode[modeIndex].template1);
		run();
	};
	
	//Undo
	function undo() {
		codeMirror.undo();
	};

	//Redo
	function redo() {
		codeMirror.redo();
	};

	function draw() {
	}


	Tools.add({ //The new tool
		"name": "Editor",
		"icon": "E",
		// "iconHTML":"<i id='edit-icon' style='color: #FF8C00;margin-top:7px' class='fa fa-pencil-square'></i>",
		"iconHTML": notesSVG,
		//"shortcut": "e",
		"listeners": {},
		"draw": draw,
		"oneTouch":true,
		"onstart":toggleEditor,
		"mouseCursor": "crosshair",
		"stylesheet": "tools/editor/editor.css"
	});

})(); //End of code isolation