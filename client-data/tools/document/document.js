(function documents() {
  const closeButton = document.querySelector("#closeButton");
  const drawer = document.querySelector("#drawer");

  //google Event
  document.getElementById("SearchGoogle").addEventListener("click", () => {
    document.getElementById("iframeModal").style.display = "block";
    drawer.classList.remove("open");
  });

  document.getElementById("close-browser").addEventListener("click", () => {
    document.getElementById("iframeModal").style.display = "none";
  });

  //For drawer
  const libraryImages = document.querySelectorAll("#libraryImage");

  closeButton.addEventListener("click", () => {
    drawer.classList.remove("open");
  });

  // close the modal when click outside of it

  const modal = document.getElementById("documentModal");
  function closeModal() {
    modal.style.display = "none";
  }
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  //Tabs Logic
  const tabs = document.querySelectorAll(".tab");
  const tabContent = document.querySelectorAll(".tab-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selectedCategory = tab.dataset.category;
      tabContent.forEach((content) => {
        if (content.id === selectedCategory) {
          content.style.display = "block";
        } else {
          content.style.display = "none";
        }
      });
    });
  });

  libraryImages.forEach((lbImage) => {
    lbImage.addEventListener("click", () => {
      console.log("CLICKED LIBRARY IMAGE");

      let uid = Tools.generateUID("doc");

      // Create a new XMLHttpRequest or fetch to load the image
      var xhr = new XMLHttpRequest();
      xhr.open("GET", lbImage.src, true);
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
            draw(msgLibrary);
            Tools.send(msgLibrary, "Document");
            imgCount++;
          };

          // Read the file as a Data URL
          reader.readAsDataURL(xhr.response);
        }
      };
    });
  });

  //Code isolation
  var uploadSVG =
  '<svg class="tool-icon-svg" width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.33594 18.75C4.33594 22.2855 4.33594 24.0533 5.43429 25.1517C6.53264 26.25 8.3004 26.25 11.8359 26.25H19.3359C22.8715 26.25 24.6392 26.25 25.7376 25.1517C26.8359 24.0533 26.8359 22.2855 26.8359 18.75" stroke="#424242" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5859 20V3.75M15.5859 3.75L20.5859 9.21875M15.5859 3.75L10.5859 9.21875" stroke="#8AC926" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/></svg><label id="tool-document-localization" class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;"><p>Document</p></label>';
  var xlinkNS = "http://www.w3.org/1999/xlink";
  var imgCount = 1;
  var fileInput;

  function chooseFromDevice() {
    document.getElementById("documentModal").style.display = "none";
    document
      .getElementById("SelectFromDevice")
      .removeEventListener("click", () => {
        console.log("Event Listener Removed");
      });
    fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();
    fileInput.addEventListener("change", function () {
      var reader = new FileReader();
      reader.readAsDataURL(fileInput.files[0]);
      reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          var uid = Tools.generateUID("doc"); // doc for document
          // console.log(image.src.toString().length);

          var msg = {
            id: uid,
            type: "doc",
            src: image.src,
            w: this.width || 300,
            h: this.height || 300,
            x:
              (100 + document.documentElement.scrollLeft) / Tools.scale +
              10 * imgCount,
            y:
              (100 + document.documentElement.scrollTop) / Tools.scale +
              10 * imgCount,
            fileType: fileInput.files[0].type,
          };

          draw(msg);

          Tools.send(msg, "Document");
          imgCount++;
        };
      };
    });
  }

  function chooseFromLibrary(e) {
    e = e || window.event;

    const container = document.querySelector(".tab-panel");
    console.log("Container", container);
    let startX;
    let startY;

    container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    container.addEventListener("touchmove", (e) => {
      const deltaX = e.touches[0].clientX - startX;
      const deltaY = e.touches[0].clientY - startY;

      container.scrollLeft -= deltaX;
      container.scrollTop -= deltaY;
    });

    drawer.classList.add("open");
    document.getElementById("documentModal").style.display = "none";

    document.getElementById("tab1").click();

    //Removng Event Listener
    document
      .getElementById("SelectFromLibrary")
      .removeEventListener("click", () => {
        console.log("Removed Event Listener");
      });
  }

  function uploadPDF(e) {
    document.getElementById("documentModal").style.display = "none";
    document
      .getElementById("SelectFromPDF")
      .removeEventListener("click", () => {
        console.log("Event Listener Removed");
      });
  
    fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf"; // Accept only PDF files
    fileInput.click();
    fileInput.addEventListener("change", function () {
      var file = fileInput.files;

      console.log("File Uploaded",file)
      drawPDF(e,file);
      
    });
  }  

  function uploadVideo() {
    document.getElementById("documentModal").style.display = "none";
    document
      .getElementById("SelectFromVideo")
      .removeEventListener("click", () => {
        console.log("Event Listener Removed");
      });
  
    fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "video/*"; // Accept all video formats
    fileInput.click();
    fileInput.addEventListener("change", function () {
      let file = fileInput.files[0];
  
      console.log("Video Uploaded", file);
     
      DropVideo(file);
    
    });
    
  }
 
  function onstart() {
    document.getElementById("documentModal").style.display = "block";
    document
      .getElementById("documentModalModalClose")
      .addEventListener("click", () => {
        document.getElementById("documentModal").style.display = "none";
      });
    document
      .getElementById("SelectFromDevice")
      .addEventListener("click", chooseFromDevice);
    document
      .getElementById("SelectFromLibrary")
      .addEventListener("click", chooseFromLibrary);
    document
      .getElementById("SelectFromPDF")
      .addEventListener("click", uploadPDF);
    document
      .getElementById("SelectFromVideo")
      .addEventListener("click", uploadVideo);
  }

  function draw(msg) {
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

  Tools.add({
    name: "Document",
    // "icon": "🖼️",
    iconHTML: uploadSVG,
    // shortcuts: {
    //   changeTool: "7",
    // },
    draw: draw,
    onstart: onstart,
    oneTouch: true,
  });
})(); //End of code isolation
