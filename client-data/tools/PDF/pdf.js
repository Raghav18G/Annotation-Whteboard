// const { func } = require("calculator")

// const { flags } = require("socket.io/lib/namespace")

var closePDFBtn = document.getElementById("closePDFBtn");
var pdfModal = document.getElementById("pdfModal");
var imageURL = {};
var PDFCount = 1;
var finalImages = {};

closePDFBtn.addEventListener("click", function () {
  const ele = document.getElementById("addPDFPages");
  ele.innerHTML = "";
  pdfModal.style.display = "none";
});

//after dropping the pdf this fn run
// function drawPDF(event, file) {
//     pdfjsLib.GlobalWorkerOptions.workerSrc =
//         "//mozilla.github.io/pdf.js/build/pdf.worker.js"
//     const files = file
//     pdfModal.style.display = "block"
//     const setPdfName= document.getElementById("pdf-name")
//     setPdfName.innerHTML=file[0].name
//     // console.log(file)
//     // Process dropped files
//     for (let i = 0; i < files.length; i++) {
//         const file = files[i]
//         if (file.type === "application/pdf") {
//             // Read the PDF file
//             const reader = new FileReader()
//             reader.onload = function (e) {
//                 const pdfData = new Uint8Array(e.target.result)
//                 console.log(pdfData, "pdfData")
//                 displayPdfPages(pdfData, event.clientX, event.clientY)
//             }
//             reader.readAsArrayBuffer(file)
//         } else {

//             console.log("Invalid file format. Please drop a PDF file.")
//         }
//     }

// }

function drawPDF(event, file) {
    console.log(file)
  if (file[0].type === "application/pdf") {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "//mozilla.github.io/pdf.js/build/pdf.worker.js";
    const files = file;
    pdfModal.style.display = "block";
    const setPdfName = document.getElementById("pdf-name");
    setPdfName.innerHTML = file[0].name;

    // console.log(file)
    // Process dropped files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
        // Read the PDF file
        const reader = new FileReader();
        reader.onload = function (e) {
          const pdfData = new Uint8Array(e.target.result);
          console.log(pdfData, "pdfData");
          displayPdfPages(pdfData, event.clientX, event.clientY);
        };
        reader.readAsArrayBuffer(file);
    }
  } else {
   
    snackbar();
  }
}

function snackbar() {
  let clear;
  clearTimeout(clear)
  var x = document.getElementById("snackbar");
  x.className = "show";
  clear = setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

function displayPdfPages(pdfData, x, y) {
  pdfjsLib
    .getDocument({ data: pdfData })
    .promise.then((pdf) => {
      console.log(pdf, "pdf");
      let numPages = pdf.numPages;

      // Loop through each page
      for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
        pdf.getPage(pageNumber).then((page) => {
          const scale = 2.5;
          const viewport = page.getViewport({ scale });

          // Create <canvas> element for each page
          const canvasPage = document.createElement("canvas");

          canvasPage.style.left =
            x + (pageNumber - 1) * (viewport.width + 10) + "px";
          canvasPage.style.top = y + "px";
          canvasPage.style.position = "abosulte";
          canvasPage.width = viewport.width;
          canvasPage.height = viewport.height;
          const divElement = document.createElement("span");
          divElement.style.position = "relative";
          divElement.style.width = "10%";

          const inputElement = document.createElement("input");
          inputElement.setAttribute("value", page._pageIndex);
          inputElement.setAttribute("type", "checkbox");

          inputElement.style.position = "absolute";
          inputElement.style.left = "4px";
          inputElement.addEventListener("change", getSelectedPDFPage);
          divElement.appendChild(canvasPage);
          divElement.appendChild(inputElement);

          document.getElementById("addPDFPages").appendChild(divElement);
          //  imageURL[page._pageIndex] = canvasPage.toDataURL(
          //             "image/jpeg",
          //             0.5
          //         )
          page
            .render({ canvasContext: canvasPage.getContext("2d"), viewport })
            .promise.then(() => {
              // Render PDF page onto the <canvas> element

              imageURL[page._pageIndex.toString()] = canvasPage.toDataURL(
                "image/jpeg",
                0.5
              );
              //finalImages[page._pageIndex.toString()] = canvasPage.toDataURL("image/jpeg",0.5)
              console.log(
                canvasPage.toDataURL("image/jpeg", 0.5),
                "url",
                page._pageIndex,
                imageURL
              );
            })
            .catch((error) => {
              console.log("Error rendering page:", error);
            });
        });
      }
    })
    .catch((error) => {
      console.log("Error loading PDF:", error);
    });
}

// get Image after click
function getSelectedPDFPage(e) {
  console.log(e.target.checked, "harsh", finalImages);
  const getClickedBOX = e.target;
  if (e.target.checked) {
    finalImages[e.target.value] = imageURL[e.target.value];
    getClickedBOX.setAttribute("checked", true);
  } else {
    delete finalImages[e.target.value];
    getClickedBOX.setAttribute("checked", false);
  }
  //getClickedBOX.checked=!getClickedBOX.checked
  console.log(finalImages, "final images");
}

function handleAddAllPDF() {
  const div = document.getElementById("addPDFPages");
  const inputs = div.getElementsByTagName("input");

  // Loop through the input elements and access their values
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].checked = true;
    inputs[i].setAttribute("checked", true);
  }
  console.log(imageURL);
  finalImages = { ...imageURL };
  console.log(finalImages);
}

function deselectAllPDF() {
  const div = document.getElementById("addPDFPages");
  const inputs = div.querySelectorAll("input");
  console.log(inputs, "inputs");
  // Loop through the input elements and access their values
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].checked = false;
    inputs[i].setAttribute("checked", false);
  }
  finalImages = {};
}

// get Image after click

// add images of pdf to the SVG board
function handleDrawPDF() {
    snackbarSuccess();
  for (i in finalImages) {
    let image = new Image();
    image.src = imageURL[i];
    image.onload = function () {
      var uid = Tools.generateUID("doc");
      var msg = {
        id: uid,
        type: "doc",
        src: image.src,
        w: this.width || 1000,
        h: this.height || 1000,
        x:
          (200 + document.documentElement.scrollLeft) / Tools.scale +
          10 * PDFCount,
        y:
          (200 + document.documentElement.scrollTop) / Tools.scale +
          10 * PDFCount,
      };
      drawImage(msg);
    };
    PDFCount++;
  }
  imageURL = {};
  finalImages = imageURL;
  pdfModal.style.display = "none";
  const ele = document.getElementById("addPDFPages");
  ele.innerHTML = "";
}


function snackbarSuccess() {
  let clearSuccess;
    clearTimeout(clearSuccess)
    var x = document.getElementById("snackbar-success");
    x.className = "show";
    clearSuccess= setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
}