dragElement(document.getElementById("dragVideoModal"));
resizable(document.getElementById("dragVideoModal"));
//Function for making div Draggable
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var header = document.getElementById(elmnt.id + "header");
  if (header) {
    // If the header is present, use it for touch events.
    header.addEventListener("touchstart", touchStart);
    header.addEventListener("mousedown", mouseDown);
  } else {
    // Otherwise, use the entire element for touch events.
    elmnt.addEventListener("touchstart", touchStart);
    elmnt.addEventListener("mousedown", mouseDown);
  }

  function touchStart(e) {
    e = e || window.event;
    e.preventDefault();
    var touch = e.touches[0];
    pos3 = touch.clientX;
    pos4 = touch.clientY;
    elmnt.addEventListener("touchmove", touchMove);
    elmnt.addEventListener("touchend", closeDragElement);
  }

  function touchMove(e) {
    e = e || window.event;
    e.preventDefault();
    var touch = e.touches[0];
    pos1 = pos3 - touch.clientX;
    pos2 = pos4 - touch.clientY;
    pos3 = touch.clientX;
    pos4 = touch.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function mouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.removeEventListener("touchmove", touchMove);
    elmnt.removeEventListener("touchend", closeDragElement);
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
  resizer.addEventListener("touchstart", touchStartResize, false);

  function initResize(e) {
    window.addEventListener("mousemove", resizeElement, false);
    window.addEventListener("mouseup", stopResize, false);
  }

  function resizeElement(e) {
    element.style.width = e.clientX - element.offsetLeft + "px";
    element.style.height = e.clientY - element.offsetTop + "px";
  }

  function stopResize(e) {
    window.removeEventListener("mousemove", resizeElement, false);
    window.removeEventListener("mouseup", stopResize, false);
  }

  function touchStartResize(e) {
    e = e || window.event;
    e.preventDefault();
    var touch = e.touches[0];
    element.addEventListener("touchmove", touchResize, false);
    element.addEventListener("touchend", stopTouchResize, false);
  }

  function touchResize(e) {
    element.style.width = e.touches[0].clientX - element.offsetLeft + "px";
    element.style.height = e.touches[0].clientY - element.offsetTop + "px";
  }

  function stopTouchResize(e) {
    element.removeEventListener("touchmove", touchResize, false);
    element.removeEventListener("touchend", stopTouchResize, false);
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

// function DropVideo(file) {
//   let url = URL.createObjectURL(file);

//   let type = file.type;
//   let video = document.getElementById("videoPlayer");
//   let source = document.createElement("source");
//   source.setAttribute("src", "");
//   console.log("VIDEO TAG", video);
//   document.getElementById("dragVideoModal").style.display = "block";
//   console.log("SOURCE", source);
//   document
//     .getElementById("dragVideoModalClose")
//     .addEventListener("click", () => {
//       document.getElementById("dragVideoModal").style.display = "none";
//       video.removeChild(source);
//       video.load();
//     });
//   document.getElementById("videoPlayer").style.display = "block";
//   source.setAttribute("src", url);
//   source.setAttribute("type", type);
//   video.appendChild(source);
// }
function DropVideo(file) {
  let url = URL.createObjectURL(file);
  let type = file.type;
  let video = document.getElementById("videoPlayer");

  // Removing existing sources from the video element
  while (video.firstChild) {
    video.removeChild(video.firstChild);
  }

  // Creating a new source element
  let source = document.createElement("source");
  source.setAttribute("src", url);
  source.setAttribute("type", type);

  // Appending the new source to the video element
  video.appendChild(source);

  // Display the video modal
  document.getElementById("dragVideoModal").style.display = "block";

  document
    .getElementById("dragVideoModalClose")
    .addEventListener("click", () => {
      document.getElementById("dragVideoModal").style.display = "none";
      video.pause();
      video.currentTime = 0;
    });

  document.getElementById("videoPlayer").style.display = "block";

  // Play the video
  video.load();
  video.play();
}

function drop(e) {
  e.preventDefault();
  console.log(e, "data transfer");
  var imgCount = 1;

  if (e.dataTransfer?.files[0]?.type.includes("video")) {
    DropVideo(e.dataTransfer?.files[0]);
  } else if (e.dataTransfer?.files[0]?.type.includes("/pdf")) {
    drawPDF(e, e.dataTransfer.files);
  } else {
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
var pdfModal = document.getElementById("pdfModal");
