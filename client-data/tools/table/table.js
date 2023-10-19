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

let TableObjectsId = [];
let TableObjects = [];

(function Table() {
  var curText = {
    x: 0,
    y: 0,
    size: 36,
    rawSize: 16,
    oldSize: 0,
    opacity: 1,
    color: "#000",
    id: 0,
    sentText: "",
    lastSending: 0,
  }
  var tableSvg =
    '<div class="tool-selected"><svg class="tool-icon-svg table-svg" style="margin-left: -1px;margin-top: 3px;" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8267_29332)"><path d="M25.3978 1.25977V23.8848C25.3978 24.2298 25.1178 24.5098 24.7728 24.5098H1.44531C1.10031 24.5098 0.820312 24.2298 0.820312 23.8848V1.25977C0.820312 0.914766 1.10031 0.634766 1.44531 0.634766H24.7728C25.1178 0.634766 25.3978 0.914766 25.3978 1.25977Z" fill="#D8D6D7"/><path d="M25.39 1.25977V23.8848C25.39 24.2298 25.11 24.5098 24.765 24.5098H3.3125C2.9675 24.5098 2.6875 24.2298 2.6875 23.8848V1.25977C2.6875 0.914766 2.9675 0.634766 3.3125 0.634766H24.765C25.11 0.634766 25.39 0.914766 25.39 1.25977Z" fill="white"/><path d="M25.3978 5.30375V23.885C25.3978 24.23 25.1178 24.51 24.7728 24.51H1.44531C1.10031 24.51 0.820312 24.23 0.820312 23.885V5.28125L0.934062 5.31125H25.2841L25.3978 5.30375Z" fill="#1C868E"/><path d="M25.2763 5.31121H2.6875V23.885C2.6875 24.23 2.9675 24.51 3.3125 24.51H24.765C25.11 24.51 25.39 24.23 25.39 23.885V5.30371L25.2763 5.31121Z" fill="#40C4DF"/><path d="M31.8075 26.2426C31.8075 28.7651 29.9838 30.8626 27.5825 31.2864C27.2913 31.3376 26.9913 31.3651 26.685 31.3651C23.855 31.3651 21.5625 29.0714 21.5625 26.2426C21.5625 23.4139 23.855 21.1201 26.685 21.1201C26.9913 21.1201 27.2913 21.1476 27.5825 21.1989C29.9838 21.6226 31.8075 23.7201 31.8075 26.2426Z" fill="#D8D6D7"/><path d="M27.5844 31.2867C29.9178 31.2867 31.8094 29.0286 31.8094 26.243C31.8094 23.4574 29.9178 21.1992 27.5844 21.1992C25.251 21.1992 23.3594 23.4574 23.3594 26.243C23.3594 29.0286 25.251 31.2867 27.5844 31.2867Z" fill="white"/><path d="M29.8281 25.3516H27.5781V23.1016C27.5781 22.7564 27.2983 22.4766 26.9531 22.4766H26.4219C26.0768 22.4766 25.7969 22.7564 25.7969 23.1016V25.3516H23.5469C23.2018 25.3516 22.9219 25.6314 22.9219 25.9766V26.5078C22.9219 26.8529 23.2018 27.1328 23.5469 27.1328H25.7969V29.3828C25.7969 29.7279 26.0768 30.0078 26.4219 30.0078H26.9531C27.2983 30.0078 27.5781 29.7279 27.5781 29.3828V27.1328H29.8281C30.1733 27.1328 30.4531 26.8529 30.4531 26.5078V25.9766C30.4531 25.6314 30.1733 25.3516 29.8281 25.3516Z" fill="#40C4DF"/><path d="M25.6478 20.9719V1.25977C25.6478 0.777266 25.2552 0.384766 24.7728 0.384766H1.44531C0.962937 0.384766 0.570312 0.777266 0.570312 1.25977V23.8848C0.570312 24.3673 0.962937 24.7598 1.44531 24.7598H21.5271C21.3916 25.2309 21.3174 25.7278 21.3174 26.2419C21.3174 29.2043 23.7274 31.6143 26.6898 31.6143C29.6521 31.6143 32.0622 29.2043 32.0622 26.2419C32.0623 22.8776 28.9816 20.314 25.6478 20.9719ZM1.07031 1.25977C1.07031 1.05302 1.23856 0.884766 1.44531 0.884766H24.7728C24.9796 0.884766 25.1478 1.05302 25.1478 1.25977V5.06102H1.07031V1.25977ZM20.6209 14.7431V10.402H25.1479V14.7431H20.6209ZM25.1478 15.2431V19.5843H20.6208V15.2431H25.1478ZM20.6209 9.90202V5.56089H25.1479V9.90202H20.6209ZM5.59756 24.2598H1.44531C1.23856 24.2598 1.07031 24.0915 1.07031 23.8848V20.0844H5.59756V24.2598ZM5.59756 19.5843H1.07031V15.2431H5.59756V19.5843ZM5.59756 14.7431H1.07031V10.402H5.59756V14.7431ZM5.59756 9.90202H1.07031V5.56089H5.59756V9.90202ZM10.4387 24.2598H6.09756V20.0844H10.4387V24.2598ZM10.4387 19.5843H6.09756V15.2431H10.4387V19.5843ZM10.4387 14.7431H6.09756V10.402H10.4387V14.7431ZM10.4387 9.90202H6.09756V5.56089H10.4387V9.90202ZM15.2798 24.2598H10.9387V20.0844H15.2798V24.2598ZM15.2798 19.5843H10.9387V15.2431H15.2798V19.5843ZM15.2798 14.7431H10.9387V10.402H15.2798V14.7431ZM15.2798 9.90202H10.9387V5.56089H15.2798V9.90202ZM20.1209 24.2598H15.7798V20.0844H20.1209V24.2598ZM20.1209 19.5843H15.7798V15.2431H20.1209V19.5843ZM20.1209 14.7431H15.7798V10.402H20.1209V14.7431ZM20.1209 9.90202H15.7798V5.56089H20.1209V9.90202ZM20.6209 24.2598V20.0844H25.1479V21.0963C23.5733 21.569 22.3016 22.746 21.6982 24.2599L20.6209 24.2598ZM26.6899 31.1143C24.0033 31.1143 21.8176 28.9285 21.8176 26.2419C21.8176 23.5553 24.0033 21.3695 26.6899 21.3695C29.3766 21.3695 31.5623 23.5553 31.5623 26.2419C31.5623 28.9285 29.3766 31.1143 26.6899 31.1143Z" fill="#491352"/><path d="M29.8281 25.1016H27.8281V23.1016C27.8281 22.6191 27.4355 22.2266 26.9531 22.2266H26.4219C25.9395 22.2266 25.5469 22.6191 25.5469 23.1016V25.1016H23.5469C23.0645 25.1016 22.6719 25.4941 22.6719 25.9766V26.5078C22.6719 26.9903 23.0645 27.3828 23.5469 27.3828H25.5469V29.3828C25.5469 29.8653 25.9395 30.2578 26.4219 30.2578H26.9531C27.4355 30.2578 27.8281 29.8653 27.8281 29.3828V27.3828H29.8281C30.3105 27.3828 30.7031 26.9903 30.7031 26.5078V25.9766C30.7031 25.4941 30.3106 25.1016 29.8281 25.1016ZM30.2031 26.5078C30.2031 26.7146 30.0349 26.8828 29.8281 26.8828H27.5781C27.4401 26.8828 27.3281 26.9948 27.3281 27.1328V29.3828C27.3281 29.5896 27.1599 29.7578 26.9531 29.7578H26.4219C26.2151 29.7578 26.0469 29.5896 26.0469 29.3828V27.1328C26.0469 26.9948 25.9349 26.8828 25.7969 26.8828H23.5469C23.3401 26.8828 23.1719 26.7146 23.1719 26.5078V25.9766C23.1719 25.7698 23.3401 25.6016 23.5469 25.6016H25.7969C25.9349 25.6016 26.0469 25.4896 26.0469 25.3516V23.1016C26.0469 22.8948 26.2151 22.7266 26.4219 22.7266H26.9531C27.1599 22.7266 27.3281 22.8948 27.3281 23.1016V25.3516C27.3281 25.4896 27.4401 25.6016 27.5781 25.6016H29.8281C30.0349 25.6016 30.2031 25.7698 30.2031 25.9766V26.5078Z" fill="#491352"/></g><defs><clipPath id="clip0_8267_29332"><rect width="32" height="32" fill="white" transform="translate(0.304688)"/></clipPath></defs></svg></div><label id="tool-table-localization" class="label-tool" style="font-size:10px;line-height: 2px; font-weight:400;margin-top: 14px;"><p>Table</p></label>'

  let widgetRemove = (id) => {
    const remove = document.getElementById(id);
    remove.remove();
  };

  function draw() {
    Tools.drawingEvent = true
    switch (data.type) {
      case "new":
        draw
        createTable(data)
        break
      case "update":
        var table = document.getElementById(data.id)
        if (table === null) {
          console.error(
            "Text: Hmmm... I received text that belongs to an unknown text field"
          )
          return false
        } else {
          if (Tools.useLayers) {
            if (table.getAttribute("class") != "layer" + Tools.layer) {
              table.setAttribute("class", "layer-" + Tools.layer)
              Tools.group.appendChild(textField)
            }
          }
        }
        // updateText(table, data.txt);
        break
      default:
        console.error("Text: Draw instruction with unknown type. ", data)
        break
    }
  }
  let createDrag

  // var getAllELements;

  const createTable = (e, fieldData) => {
    console.log(e)
    Tools.curTool = null
    seclectedTable = null
    const foreignObject = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "foreignObject"
    )
    TableObjectsId.push(foreignObject)

    foreignObject.style.position = "relative"
    foreignObject.setAttribute("overflow", "visible")
    const foreignObjectUid = Tools.generateUID("doc")
    foreignObject.setAttribute("id", foreignObjectUid)
    const table = document.createElement("table")
    table.style.position = "absolute"
    foreignObject.style.x = 250 + Math.random() * 100
    foreignObject.style.y = 300 + Math.random() * 100
    foreignObject.style.width = "1px"
    foreignObject.style.height = "1px"

    // Tools.positionElement(table, 100, 100);

    for (let i = 0; i < 2; i++) {
      const tr = document.createElement("tr")
      for (let j = 0; j < 3; j++) {
        addInputElement(tr)
      }
      //append tr in table
      table.appendChild(tr)
    }
    const editTableButton = document.createElement("button")
    editTableButton.innerHTML = '<i class="fa fa-pencil">&#xf040;</i>'
    //editTableButton.innerHTML =  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>
    editTableButton.classList.add("btn-edit-table")
    editTableButton.style.border = "none"

    const dragDiv = document.createElement("div")
    dragDiv.innerHTML =
      '<img src="../assets/DRAG.svg" class="dragLogo" height="30" draggable="false" />';
    dragDiv.classList.add("drag-div");
    dragDiv.addEventListener("mouseenter", () => {
      console.log("HOVER KRDIYA hai");
    });
    const crossDiv = document.createElement("div");
    crossDiv.innerHTML =
      '<img src="./assets/x-circle.svg" class="dragLogo" height="30" draggable="false" ></img>';

    crossDiv.classList.add("cross-div");

    foreignObject.appendChild(crossDiv);
    crossDiv.addEventListener("click", () => widgetRemove(foreignObjectUid));
    foreignObject.appendChild(dragDiv);
    foreignObject.appendChild(editTableButton);

    const Options = document.createElement("div");
    Options.style.top = 0;
    Options.style.left = 0;
    Options.style.backgroundColor = "white";
    Options.style.border = "1px solid black";
    Options.style.width = "12rem";
    Options.classList.add("table-modal");
    Options.style.position = "absolute";
    Options.style.top = "0px";
    Options.style.left = "0px";
    Options.style.zIndex = "99";
    foreignObject.appendChild(Options);
    Options.style.backgroundColor = "white";
    Options.style.border = "1px solid black";
    Options.style.width = "12rem";
    Options.classList.add("table-modal");
    Options.style.position = "absolute";
    Options.style.top = "0px";
    Options.style.left = "0px";
    Options.style.paddingTop = "7px";
    Options.style.zIndex = "99";
    foreignObject.appendChild(Options);

    // Add an event listener to the edit button
    let toggleOption = true
    editTableButton.addEventListener("click", function (e) {
      toggleOption = !toggleOption
      Options.style.display = toggleOption ? "none" : "block"
    })

    // add actions
    const action = [
      { id: "add-row", label: "Add Row" },
      { id: "add-column", label: "Add Column" },
      { id: "delete-row", label: "Delete Row" },
      { id: "delete-column", label: "Delete Column" },
    ];
    action.forEach((ele) => {
      createTableActions(ele.label, Options, table, foreignObject);
    });

    table.style.border = "1px solid #000"
    table.style.borderCollapse = "collapse"

    foreignObject.append(table)

    if (Tools.useLayers) table.setAttribute("class", "layer-" + Tools.layer)
    table.setAttribute(
      "opacity",
      Math.max(0.1, Math.min(1, fieldData?.opacity)) || 1
    )
    if (fieldData?.txt) elem.textContent = fieldData?.txt
    if (fieldData?.data) {
      elem.setAttribute("data-lock", fieldData?.data)
    }
    if (fieldData?.transform)
      elem.setAttribute("transform", fieldData?.transform)
    Tools.group.appendChild(foreignObject)
    createDrag = new Draggable()
    createDrag.addDrag(dragDiv, foreignObject)

    return Table
  }

  function onQuit() {
    // console.log("onquit called");
    //  Array.from(getAllELements).map((item)=>{
    //   console.log("called");
    //   createDrag.removeDrag(item)
    // })
  }

  Tools.add({
    name: "Table",
    isExtra: true,
    iconHTML: tableSvg,
    listeners: {},
    // draw: backgroundChange,
    //"oneTouch":true,
    onstart: createTable, // start the fn while tool is selected
    mouseCursor: "auto",
    onquit: onQuit,
    draw: draw,
  })
})() //End of code isolation

const addInputElement = row => {
  const td = document.createElement("td")
  td.style.border = "1px solid #000"
  let input = document.createElement("input")
  input.style.outline = "none"
  input.style.padding = "4px 10px"
  td.appendChild(input)
  if (row) row.appendChild(td)
  input.type = "text"

  const colIndex = Array.from(td?.parentElement?.children || []).indexOf(td)

  input.addEventListener("change", e => {
    e.preventDefault()

    e.stopPropagation()
    const td = input.parentElement
    const table = td.parentElement.parentElement

    // Calculate the width of the input's content
    const inputWidth = input.scrollWidth

    // Set the td's width to the input's content width, but not exceeding 100%
    input.style.width = Math.min(Math.min(inputWidth, table.offsetWidth),600) + "px"
    table
      .querySelectorAll(`td:nth-child(${colIndex + 1}) input`)
      .forEach(inputInColumn => {
        inputInColumn.style.width = input.style.width
      })
  })
  input.addEventListener("keydown", function (event) {
    input.setAttribute("value",event.target.value)
    console.log(input.value);
    if (event.key === "Enter") {
      // Prevent the default behavior (adding a new line)
      event.preventDefault()
      // Add your custom content, e.g., a line break
      const currentText = input.value
      input.value = currentText + "\n"
      input.setAttribute("value",input.value+"/n")
    }
  })

  return td
}


// const addInputElement = (row) => {
//   const td = document.createElement("td");
//   td.style.border = "1px solid #000";
//   let input = document.createElement("input");
//   input.style.outline = "none";
//   input.style.padding = "4px 10px";
//   td.appendChild(input);
//   if (row) row.appendChild(td);
//   input.type = "text";

//   const colIndex = Array.from(td?.parentElement?.children || []).indexOf(td);

//   input.addEventListener("change", (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const td = input.parentElement;
//     const table = td.parentElement.parentElement;

//     // Calculate the width of the input's content
//     const inputWidth = input.scrollWidth;

//     // Set the td's width to the input's content width, but not exceeding 100%
//     const newWidth = Math.min(Math.min(inputWidth, table.offsetWidth), 600);
//     input.style.width = `${newWidth}px`;

//     // Update the width of all inputs in the same column
//     table.querySelectorAll(`td:nth-child(${colIndex + 1}) input`).forEach((inputInColumn) => {
//       inputInColumn.style.width = `${newWidth}px`;
//     });
//   });

//   input.addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//       // Prevent the default behavior (adding a new line)
//       event.preventDefault();

//       // Add a line break to the input's value
//       input.value += "\n";

//       // Manually trigger the "change" event to update the width
//       const changeEvent = new Event("change", { bubbles: true });
//       input.dispatchEvent(changeEvent);
//     }
//   });

//   return td;
// };





const createTableActions = (action, parentRef, tableRef, superElement) => {
  const currentRef = document.createElement("p");
  currentRef.innerHTML = action;
  currentRef.classList.add("action");
  currentRef.id = action.replace(/\s+/g, "-").toLowerCase();
  //currentRef.id = action.id;
  parentRef.appendChild(currentRef)
  switch (action) {
    case "Add Row":
      currentRef.addEventListener("click", () => addRow(tableRef))
      break
    case "Delete Row":
      currentRef.addEventListener("click", () =>
        deleteRow(tableRef, superElement)
      )
      break
    case "Delete Column":
      currentRef.addEventListener("click", () =>
        deleteColumn(tableRef, superElement)
      )
      break
    case "Add Column":
      currentRef.addEventListener("click", () => addColumn(tableRef))
      break
  }
}
const addRow = ref => {
  if (ref.tagName === "TABLE") {
    const tableColumns = ref.rows[0].getElementsByTagName("td")
    const tr = document.createElement("tr")
    for (let i = 0; i < tableColumns.length; i++) {
      addInputElement(tr)
    }
    ref.appendChild(tr)
  }
};

const deleteRow = (ref, superElement) => {
  ref.removeChild(ref.lastElementChild)
  if (Array.from(ref.children).length == 0) {
    superElement.remove()
    TableObjectsId = TableObjectsId.filter(obj => obj != superElement)
  }
}
const deleteColumn = (ref, superElement, tableRef) => {
  let removeSuperElement = false
  Array.from(ref.children).forEach(obj => {
    obj.removeChild(obj.lastElementChild)
    if (Array.from(obj.children).length == 0) {
      removeSuperElement = true
    }
  })
  if (removeSuperElement) {
    superElement.remove()
    TableObjectsId = TableObjectsId.filter(obj => obj != superElement)
  }
  console.log(TableObjectsId.length)
}
const addColumn = ref => {
  Array.from(ref.children).forEach(obj => {
    let lastColumn = addInputElement(null)
    obj.appendChild(lastColumn)
  })
}
