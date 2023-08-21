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

(function AddPages() {
  var bgChangeSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 482.14 482.14" xml:space="preserve"><g><path d="M302.599,0H108.966C80.66,0,57.652,23.025,57.652,51.315v379.509c0,28.289,23.008,51.315,51.314,51.315h264.205   c28.275,0,51.316-23.026,51.316-51.315V121.449L302.599,0z M373.171,450.698H108.966c-10.969,0-19.89-8.905-19.89-19.874V51.315   c0-10.953,8.921-19.858,19.89-19.858l181.875-0.189v67.218c0,19.653,15.949,35.603,35.588,35.603l65.877-0.189l0.725,296.925   C393.03,441.793,384.142,450.698,373.171,450.698z"/><path d="M241.054,150.96c-49.756,0-90.102,40.347-90.102,90.109c0,49.764,40.346,90.11,90.102,90.11   c49.771,0,90.117-40.347,90.117-90.11C331.171,191.307,290.825,150.96,241.054,150.96z M273.915,253.087h-20.838v20.835   c0,6.636-5.373,12.017-12.023,12.017c-6.619,0-12.01-5.382-12.01-12.017v-20.835H208.21c-6.637,0-12.012-5.383-12.012-12.018   c0-6.634,5.375-12.017,12.012-12.017h20.834v-20.835c0-6.636,5.391-12.018,12.01-12.018c6.65,0,12.023,5.382,12.023,12.018v20.835   h20.838c6.635,0,12.008,5.383,12.008,12.017C285.923,247.704,280.55,253.087,273.915,253.087z"/></g></svg>';

  var svg = Tools.svg;
  var addNewModal = document.getElementById("add-new");

  function startAdding() {
    addNewModal.style.display = "block";
  }

  Tools.add({
    //The new tool
    name: "Add New File",
    // "icon": "🗑",
    // "iconHTML":"<i style='color:gray;margin-top:7px'  class='fas fa-th'></i>",
    iconHTML: bgChangeSVG,
    shortcuts: {
      actions: [{ key: "a", action: () => {} }],
    },
    listeners: {},
    oneTouch: true,
    onstart: startAdding, // start the fn while tool is selected
    mouseCursor: "crosshair",
  });
})(); //End of code isolation

//Close the modal of Color Picker
var addNEW = document.getElementById("close-pages");
var addNewModal = document.getElementById("add-new");

addNEW.addEventListener("click", function () {
  addNewModal.style.display = "none";
});
