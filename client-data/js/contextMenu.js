// const canvas = document.getElementById("canvas");
// let contextMenuVisible = false;
// let contextMenu;

// canvas.addEventListener("touchstart", handleTouchStart);
// canvas.addEventListener("touchend", handleTouchEnd);

// function handleTouchStart(event) {
//   event.preventDefault();
//   event = event || window.event;
//   // Prevent the default touch events

//   // Remove any previous context menu
//   removeContextMenu();

//   contextMenuVisible = true;

//   // Calculate the position of the context menu based on the touch event
//   console.log("Event", event);
//   const touchX = event.touches[0].clientX;
//   const touchY = event.touches[0].clientY;
//   console.log("TOUCH x", touchX, "Context MENU is VISIBLE");
//   // Show the context menu with "Paste" option
//   contextMenu = createContextMenu(touchX, touchY);
//   document.body.appendChild(contextMenu);
// }

// function handleTouchEnd(event) {
//   event = event || window.event;
//   event.preventDefault(); // Prevent the default touch events

//   // Check if the touchend occurred on the "Paste" option
//   if (contextMenuVisible && event.target.classList.contains("paste-option")) {
//     handlePaste();
//   }

//   // Remove the context menu
//   removeContextMenu();
// }

// function createContextMenu(x, y) {
//   const contextMenu = document.createElement("div");
//   contextMenu.className = "context-menu";
//   contextMenu.style.position = "absolute";
//   contextMenu.style.left = x + "px";
//   contextMenu.style.top = y + "px";

//   // Add context menu options (e.g., "Paste")
//   const pasteOption = document.createElement("div");
//   pasteOption.className = "context-menu-option paste-option";
//   pasteOption.textContent = "Paste";
//   contextMenu.appendChild(pasteOption);

//   // Add any other context menu options you want

//   return contextMenu;
// }

// function handlePaste() {
//   // Handle the "Paste" action here
//   // For example, you can paste content into the SVG element
//   // ...

//   console.log("PASTE PASTE");
//   alert("Paste action performed!");
// }

// function removeContextMenu() {
//   if (contextMenu) {
//     document.body.removeChild(contextMenu);
//   }
//   contextMenuVisible = false;
// }
