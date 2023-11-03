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

(function Background() {
  let selectedColor = "#fff";
  var toggle = 0;
  //Code isolation
  let colorsArray = [
    {
      label: "White",
      color: "#FFFFFF",
    },
    {
      label: "Ivory",
      color: "#FFFFF0",
    },
    {
      label: "Black",
      color: "#000000 ",
    },
    {
      label: "Gray",
      color: "#808080",
    },
    {
      label: "Silver",
      color: "#C0C0C0",
    },
    {
      label: "Red",
      color: "#FF0000",
    },
    {
      label: "Green",
      color: "#008000",
    },
    {
      label: "Blue",
      color: "#0000FF",
    },
    {
      label: "Yellow",
      color: "#FFFF00",
    },
    {
      label: "Purple",
      color: "#800080",
    },
    {
      label: "Orange",
      color: "#FFA500",
    },
    {
      label: "Maroon",
      color: "#800000",
    },
    {
      label: "Fuchsia",
      color: "#FF00FF",
    },
    {
      label: "Lime",
      color: "#00FF00",
    },
    {
      label: "Aqua",
      color: "#00FFFF",
    },
    {
      label: "Teal",
      color: "#008080",
    },
    {
      label: "Olive",
      color: "#808000",
    },
    {
      label: "Navy",
      color: "#000080",
    },
    {
      label: "Crimson",
      color: "#B80F0A",
    },
    {
      label: "Rose",
      color: "#FC94AD",
    },
    {
      label: "Watermelon",
      color: "#FE7F9C",
    },
    {
      label: "Magneta",
      color: "#E11584",
    },
    {
      label: "Salmon",
      color: "#FCAB9E",
    },
    {
      label: "Peach",
      color: "#FB9483",
    },
    {
      label: "oral",
      color: "#FE7D68",
    },
    {
      label: "Strawberry",
      color: "#FC4C4E",
    },
    {
      label: "Rosewood",
      color: "#A04242",
    },
    {
      label: "Tiger",
      color: "#FC6B02",
    },
    {
      label: "Pineapple",
      color: "#FEE227",
    },
    {
      label: "Dandelion",
      color: "#FDCE2A",
    },
    {
      label: "Tuscan sun",
      color: "#FCD12A",
    },
    {
      label: "Butterscotch",
      color: "#FABD02",
    },
    {
      label: "Canary",
      color: "#F9C802",
    },
    {
      label: "Honey",
      color: "#FFC30B",
    },
    {
      label: "Mustard",
      color: "#E8B828",
    },
    {
      label: "Lemon",
      color: "#EFFD5F",
    },
    {
      label: "Orchid",
      color: "#AF69EE",
    },
    {
      label: "Lilac",
      color: "#B660CD",
    },
    {
      label: "Lavender",
      color: "#E29FF6",
    },
    {
      label: "Periwinkle",
      color: "#BD93D3",
    },
    {
      label: "Magenta",
      color: "#A10559",
    },
    {
      label: "Grape",
      color: "#663047",
    },
  ];
  const bgImage = [
    { label: "Pattern 1", image: "BG1.png" },
    { label: "Pattern 2", image: "BG2.png" },
  ];

  let modalContent = document.getElementById("colorPickerModalContent");
  let bgContent = document.getElementById("backgorundPattern");

  let data = {
    type: "color",
    toggle: 0,
  };
  //to set the color in backgroud
  function setSelectedColor(color) {
    selectedColor = color;
    data.type = "color";
    backgroundChange(data);
  }
  function setBg(bg) {
    selectedColor = `./assets/Background/${bg}`;
    data.type = "background";
    backgroundChange(data);
  }
  // creating modal small color boxes to add in backgound tool
  colorsArray.map((obj) => {
    var div = document.createElement("div");
    div.className = "colorContainer";

    div.style.backgroundColor = obj.color;

    // Create a tooltip element
    var tooltip = document.createElement("div");
    tooltip.className = `tooltip`;
    tooltip.id = `tooltip${obj.label}`;
    tooltip.textContent = obj.label;

    div.onclick = function () {
      setSelectedColor(obj.color);
    };

    div.appendChild(tooltip);
    modalContent?.appendChild(div);
  });
  bgImage.map((bg) => {
    var bgPattern = document.createElement("img");
    bgPattern.setAttribute("src", `./assets/Background/${bg.image}`);
    bgPattern.className = "patternContainer";

    // Create a tooltip element
    var tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = bg.label;

    bgPattern.onclick = function () {
      setBg(bg.image);
    };

    bgPattern.appendChild(tooltip);
    bgContent?.appendChild(bgPattern);
  });

  var bgChangeSVG =
    '<div class="tool-selected"><svg class="tool-icon-svg background-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="currentColor" class="bi bi-image-fill" viewBox="0 0 16 16"><path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/></svg></div><label id="tool-background-localization" class="label-tool" style="font-size:10px;font-weight:400;line-height: 2px; margin-top: 14px;"><p>Background</p></label>';

  function toggleColorPicker(evt) {
    // if($("#menu").width()>Tools.menu_width+3)return;
    console.log("Toggle Color Picker");

    colorPickerModal.style.display = "block";

    // if (evt) evt.preventDefault()
    if (toggle) {
      toggle = 0;
      // colorPickerModal.style.display = "none";
    } else {
      toggle = 1;
    }
    data.toggle = toggle;
    // msg.id = Tools.generateUID("g") //g for grid
    // msg.toggle = toggle
    backgroundChange(data);
  }

  function backgroundChange(data) {
    var pattern = Tools.svg.getElementById("rect_1");
    switch (data.type) {
      case "color":
        var elem = Tools.svg.getElementById("rect_1");
        pattern.setAttribute("width", "100%"); // reset the rect size to 100% as previous
        pattern.setAttribute("height", "100%");
        elem.setAttribute("fill", selectedColor);
        break;
      case "background":
        var getImage = document.getElementById("setImagePattern");

        const getVisibleArea = getVisibleViewport();
        getImage.setAttribute("href", selectedColor);
        pattern.setAttribute("width", getVisibleArea.width); // fit the image on the available view port
        pattern.setAttribute("height", getVisibleArea.height);
        pattern.setAttribute("fill", "url(#imagePattern)");
        break;

      default:
        console.error("Clear: 'clear' instruction with unknown type. ", data);
        break;
    }
  }

  var svg = Tools.svg;

  Tools.add({
    //The new tool
    name: "Background",
    // "icon": "🗑",
    // "iconHTML":"<i style='color:gray;margin-top:7px'  class='fas fa-th'></i>",
    iconHTML: bgChangeSVG,
    shortcuts: {
      actions: [{ key: "12", action: toggleColorPicker }],
    },
    listeners: {},
    draw: backgroundChange,
    isExtra: true,
    oneTouch: true,
    onstart: toggleColorPicker, // start the fn while tool is selected
    mouseCursor: "crosshair",
  });
})(); //End of code isolation

//Close the modal of Color Picker
var closeModalBtn = document.getElementById("closeModalBtn");

closeModalBtn.addEventListener("click", function () {
  colorPickerModal.style.display = "none";
});

// This function sets the default active tab and shows its content
function setDefaultTab() {
  // Get the first tab button
  var firstTabButton = document.querySelector(".color-tab");

  // If a tab button exists, set it as the default active tab
  if (firstTabButton) {
    firstTabButton.classList.add("active");
    // Get the ID of the first tab button and show its content
    var defaultTabId = firstTabButton
      .getAttribute("onclick")
      .match(/'[^']+'/)[0]
      .replace(/'/g, "");
    document.getElementById(defaultTabId).classList.add("show");
  }
}

// Call the setDefaultTab function when the page loads
window.onload = setDefaultTab;

//to manage change in tabs components click
function openTab(event, tabId) {
  // Get all tab content elements
  var tabContents = document.getElementsByClassName("color-tab-content");
  // Hide all tab content elements
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("show");
  }

  // Show the selected tab content
  document.getElementById(tabId).classList.add("show");

  // Get all tab elements
  var tabs = document.getElementsByClassName("color-tab");

  // Remove the "active" class from all tabs
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  // Add the "active" class to the clicked tab
  event.currentTarget.classList.add("active");
}
