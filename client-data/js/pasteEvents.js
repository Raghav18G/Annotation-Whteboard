dragElement(document.getElementById("videoModal"));
resizable(document.getElementById("videoModal"));

//Function for making div Draggable
function dragElement(elmnt) {
  var pos1 = 500,
    pos2 = 500,
    pos3 = 500,
    pos4 = 500;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Function to make div resizable
function resizable(element) {
  var resizer = document.createElement("div");
  resizer.className = "resizer";
  resizer.style.width = "50px";
  resizer.style.height = "50px";
  resizer.style.background = "none";
  resizer.style.backgroundImage = "url('./assets/resizeIcon.svg')";
  resizer.style.position = "absolute";
  resizer.style.right = 0;
  resizer.style.bottom = "4px";
  resizer.style.cursor = "se-resize";
  element.appendChild(resizer);
  resizer.addEventListener("mousedown", initResize, false);

  function initResize(e) {
    window.addEventListener("mousemove", Resize, false);
    window.addEventListener("mouseup", stopResize, false);
  }
  function Resize(e) {
    element.style.width = e.clientX - element.offsetLeft + "px";
    element.style.height = e.clientY - element.offsetTop + "px";
  }
  function stopResize(e) {
    window.removeEventListener("mousemove", Resize, false);
    window.removeEventListener("mouseup", stopResize, false);
  }
}

var imgCount = 1;
var xlinkNS = "http://www.w3.org/1999/xlink";

var curText = {
  x: 400,
  y: 400,
  size: 36,
  rawSize: 16,
  oldSize: 0,
  opacity: 1,
  color: "#000",
  id: 0,
  sentText: "",
  lastSending: 0,
};

function drawImage(msg) {
  var aspect = msg.w / msg.h;
  var img = Tools.createSVGElement("image");
  img.id = msg.id;
  img.setAttribute("class", "layer-" + Tools.layer);
  img.setAttributeNS(xlinkNS, "href", msg.src);
  img.x.baseVal.value = msg["x"];
  img.y.baseVal.value = msg["y"];
  img.setAttribute("width", 400 * aspect);
  img.setAttribute("height", 400);
  if (msg.transform) img.setAttribute("transform", msg.transform);
  Tools.group.appendChild(img);
}

function drawText(text) {
  var elem = Tools.createSVGElement("text");
  elem.setAttribute("x", curText.x);
  elem.setAttribute("y", curText.y);
  if (Tools.useLayers) elem.setAttribute("class", "layer-" + Tools.layer);
  elem.setAttribute("font-size", curText.size);
  elem.setAttribute("fill", curText.color);
  elem.setAttribute(
    "opacity",
    Math.max(0.1, Math.min(1, curText.opacity)) || 1
  );
  elem.textContent = text;

  Tools.group.appendChild(elem);
}
//Function For drawing Image
async function pasteImage() {
  console.log("CALLED");
  try {
    const permission = await navigator.permissions.query({
      name: "clipboard-read",
    });
    if (permission.state === "denied") {
      throw new Error("Not allowed to read clipboard.");
    }
    const clipboardContents = await navigator.clipboard.read();
    console.log("Clipboard Contents", clipboardContents);
    for (const item of clipboardContents) {
      if (item.types.includes("text/plain")) {
        document.getElementById("toolID-Text").click();
        const text = await navigator.clipboard.readText();
        console.log("TEXT");
        if (text.includes("www.youtube.com/watch") || text.includes("video")) {
          let videoIframe = document.getElementById("videoIframe");
          var url = "";
          if (text.includes("www.youtube.com/watch")) {
            url = text.replace("watch?v=", "embed/");
          } else {
            url = text;
          }

          videoIframe.src = url;
          document.getElementById("videoModal").style.display = "block";

          document
            .getElementById("videoModalClose")
            .addEventListener("click", () => {
              document.getElementById("videoModal").style.display = "none";
              videoIframe.style.display = "none";
              document
                .getElementById("videoModalClose")
                .removeEventListener("click", () => {
                  console.log("Removed Event Listener");
                });
            });
          videoIframe.style.display = "block";
        } else {
          drawText(text);
        }
      }
      if (!item.types.includes("image/png")) {
        throw new Error("Clipboard contains non-image data.");
      }
      const blob = await item.getType("image/png");
    
      var image = new Image();
      var uid = Tools.generateUID("doc");
      image.src = URL.createObjectURL(blob);
      var xhr = new XMLHttpRequest();
      xhr.open("GET", image.src, true);
      xhr.responseType = "blob";
      xhr.send();

      xhr.onload = function () {
        if (xhr.status === 200) {
          // Create a new FileReader instance
          var reader = new FileReader();
          reader.onloadend = function () {
            // The result attribute contains the data URL
            var dataURL = reader.result;

            var msgLibrary = {
              id: uid,
              type: "doc",
              src: dataURL,
              w: this.width || 300,
              h: this.height || 300,
              x:
                (100 + document.documentElement.scrollLeft) / Tools.scale +
                10 * imgCount,
              y:
                (100 + document.documentElement.scrollTop) / Tools.scale +
                10 * imgCount,
            };
            drawImage(msgLibrary);
            Tools.send(msgLibrary, "Document");
            imgCount++;
          };

          // Read the file as a Data URL
          reader.readAsDataURL(xhr.response);
        }
      
        drawImage(msg);
      };
    }
  } catch (error) {
    console.error(error.message);
  }
}

window.addEventListener("paste", pasteImage);
