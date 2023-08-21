dragElement(document.getElementById("dragVideoModal"));
resizable(document.getElementById("dragVideoModal"));
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

function onstart(event) {
  //Code isolation
  event.preventDefault();
}

function DropVideo(file) {

  console.log("Video Dropped", URL.createObjectURL(file));
  let url = URL.createObjectURL(file);
  let type = file.type;
  let video = document.getElementById("videoPlayer");
  let source = document.createElement("source");
  document.getElementById("dragVideoModal").style.display = "block";
  document
    .getElementById("dragVideoModalClose")
    .addEventListener("click", () => {h
      document.getElementById("dragVideoModal").style.display = "none";
      video.removeChild(source);
      video.load();
    });
  document.getElementById("videoPlayer").style.display = "block";
  source.setAttribute("src", url);
  source.setAttribute("type", type);
  video.appendChild(source);
}

function drop(e) {
  e.preventDefault();
  console.log(e,"data transfer")
  var imgCount = 1;

  if (e.dataTransfer?.files[0]?.type.includes("video")) {
    DropVideo(e.dataTransfer?.files[0]);
  } 
  else if(e.dataTransfer?.files[0]?.type.includes("/pdf")){
    drawPDF(e,e.dataTransfer.files)
  }
  else {
    var image = new Image();
    image.src = URL.createObjectURL(e.dataTransfer.files[0]);
    var uid = Tools.generateUID("doc");
    // image.onload = function () {
    //   var msg = {
    //     id: uid,
    //     type: "doc",
    //     src: image.src,
    //     w: this.width || 300,
    //     h: this.height || 300,
    //     x:
    //       (e.clientX + document.documentElement.scrollLeft) / Tools.scale +
    //       10 * imgCount,
    //     y:
    //       (e.clientY + document.documentElement.scrollTop) / Tools.scale +
    //       10 * imgCount,
    //   };
    //   drawImage(msg);
    // };
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
      };
  }
}
//End of code isolation

document.getElementById("canvas").addEventListener("dragover", onstart);
document.getElementById("canvas").addEventListener("drop", drop);
var pdfModal= document.getElementById('pdfModal')

