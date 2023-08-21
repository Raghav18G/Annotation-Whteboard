/**
 *                        WHITEBOPHIR
 *********************************************************
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2020  Ophir LOJKINE
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

(function download() {
  //Code isolation
  var downloadSvg =
    '<svg class="tool-icon-svg" width="25" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8261_29276)"><path d="M28.0079 19.6133H20.3613C19.8589 19.6133 19.4112 19.9587 19.3138 20.4516C18.9238 22.4285 17.1806 23.9195 15.0891 23.9195C12.9977 23.9195 11.2545 22.4285 10.8644 20.4516C10.7671 19.9586 10.3195 19.6133 9.81697 19.6133H2.17032C1.57571 19.6133 1.09375 20.0952 1.09375 20.6899V27.1493C1.09375 27.7439 1.57571 28.2258 2.17032 28.2258H28.0079C28.6025 28.2258 29.0845 27.7439 29.0845 27.1493V20.6899C29.0845 20.0952 28.6025 19.6133 28.0079 19.6133Z" fill="#AFB9D2"/><path d="M18.307 12.6156V1.31169C18.307 1.01444 18.066 0.773438 17.7687 0.773438H12.3859C12.0886 0.773438 11.8476 1.01444 11.8476 1.31169V12.6156H9.15625L15.0773 20.1516L20.9984 12.6156H18.307Z" fill="#B4E66E"/><path d="M12.3976 0.775391C12.1004 0.775391 11.8594 1.0164 11.8594 1.31365V12.6176H12.3976C12.9922 12.6176 13.4742 12.1356 13.4742 11.541V0.775391H12.3976Z" fill="#A0D755"/><path d="M11.3471 12.6182H9.16406L15.0852 20.1541L16.1767 18.7649L11.3471 12.6182Z" fill="#A0D755"/><path d="M28.0079 28.2265H2.17032C1.57571 28.2265 1.09375 27.7446 1.09375 27.15V25.5352H29.0845V27.15C29.0845 27.7446 28.6025 28.2265 28.0079 28.2265Z" fill="#959CB5"/><path d="M28.0047 19.1094H20.358C19.6065 19.1094 18.9578 19.6331 18.8155 20.3546C18.4656 22.1283 16.8971 23.4156 15.0859 23.4156C13.2748 23.4156 11.7062 22.1283 11.3563 20.3546C11.214 19.6331 10.5652 19.1094 9.81389 19.1094H2.16712C1.29525 19.1094 0.585938 19.8187 0.585938 20.6906V27.15C0.585938 28.0218 1.29525 28.7311 2.16712 28.7311H28.0047C28.8766 28.7311 29.5859 28.0218 29.5859 27.15V20.6906C29.5859 19.8187 28.8766 19.1094 28.0047 19.1094ZM28.5767 27.15C28.5767 27.4653 28.3201 27.7219 28.0048 27.7219H2.16712C1.85174 27.7219 1.59522 27.4653 1.59522 27.15V20.6906C1.59522 20.3752 1.8518 20.1187 2.16712 20.1187H9.81383C10.0845 20.1187 10.3169 20.3001 10.3661 20.55C10.8091 22.7953 12.794 24.4249 15.0859 24.4249C17.3778 24.4249 19.3628 22.7953 19.8057 20.55C19.855 20.3001 20.0873 20.1187 20.358 20.1187H28.0048C28.3201 20.1187 28.5767 20.3752 28.5767 20.6906V27.15Z" fill="#424242"/><path d="M14.6931 20.4641C14.7888 20.5859 14.9351 20.657 15.0899 20.657C15.2447 20.657 15.3911 20.5858 15.4867 20.4641L21.4078 12.9281C21.5271 12.7762 21.5493 12.5695 21.4648 12.3958C21.3804 12.222 21.2041 12.1117 21.0109 12.1117H18.8242V1.31246C18.8242 0.737383 18.3564 0.269531 17.7813 0.269531H12.3985C11.8234 0.269531 11.3555 0.737383 11.3555 1.31246V12.1118H9.16876C8.97556 12.1118 8.79935 12.2221 8.71484 12.3958C8.63039 12.5696 8.65254 12.7763 8.77188 12.9282L14.6931 20.4641ZM11.8602 13.121C12.1389 13.121 12.3649 12.8951 12.3649 12.6163V1.31246C12.3649 1.29388 12.3799 1.27881 12.3985 1.27881H17.7814C17.7999 1.27881 17.815 1.29388 17.815 1.31246V12.6164C17.815 12.8951 18.0409 13.1211 18.3197 13.1211H19.9728L15.0899 19.3355L10.2071 13.121H11.8602Z" fill="#424242"/><path d="M26.3937 21.2617H25.3172C25.0385 21.2617 24.8125 21.4877 24.8125 21.7664C24.8125 22.0451 25.0384 22.2711 25.3172 22.2711H26.3937C26.6724 22.2711 26.8984 22.0451 26.8984 21.7664C26.8984 21.4877 26.6724 21.2617 26.3937 21.2617Z" fill="#424242"/><path d="M8.09686 21.2617H7.02029C6.74162 21.2617 6.51562 21.4877 6.51562 21.7664C6.51562 22.0451 6.74156 22.2711 7.02029 22.2711H8.09686C8.37553 22.2711 8.60153 22.0451 8.60153 21.7664C8.60147 21.4877 8.37553 21.2617 8.09686 21.2617Z" fill="#424242"/><path d="M23.1672 21.2617H22.0906C21.8119 21.2617 21.5859 21.4877 21.5859 21.7664C21.5859 22.0451 21.8119 22.2711 22.0906 22.2711H23.1672C23.4458 22.2711 23.6718 22.0451 23.6718 21.7664C23.6718 21.4877 23.4459 21.2617 23.1672 21.2617Z" fill="#424242"/><path d="M4.86249 21.2617H3.78592C3.50725 21.2617 3.28125 21.4877 3.28125 21.7664C3.28125 22.0451 3.50719 22.2711 3.78592 22.2711H4.86249C5.14116 22.2711 5.36715 22.0451 5.36715 21.7664C5.3671 21.4877 5.14116 21.2617 4.86249 21.2617Z" fill="#424242"/></g><defs><clipPath id="clip0_8261_29276"><rect width="29" height="29" fill="white" transform="translate(0.585938)"/></clipPath></defs></svg><label id="tool-download-localization" class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;"><p>Download</p></label>';

  document.getElementById("downloadAsSVG").addEventListener("click", (e) => {
    downloadSVGFile(e);
    closeModal();
  });
  document.getElementById("downloadAsPDF").addEventListener("click", (e) => {
    downloadAsPDF(e);
    closeModal();
  });
  document.getElementById("downloadAsPNG").addEventListener("click", (e) => {
    downloadAsPNG(e);
    closeModal();
  });
  document.getElementById("downloadAsJPG").addEventListener("click", (e) => {
    downloadAsJPG(e);
    closeModal();
  });

  document.getElementById("downlaodAllPages").addEventListener("click", (e) => {
    downlaodAllPages(e);
    closeModal();
  });

  function downlaodAllPages(e) {
    console.log("DOWNLOADING ALL PAGES");
    const { jsPDF } = window.jspdf;
    const generatedImages = JSON.parse(
      window.localStorage.getItem("generatedImages")
    );
    if (generatedImages.length > 0) {
      const pdf = new jsPDF();
      //looping through the array
      generatedImages.forEach(function (obj, index) {
        if (index !== 0) {
          pdf.addPage(); // Add a new page for each image except the first one
        }

        const imgWidth = 190; // Adjust as needed
        const imgHeight = 0; // Height will be auto-calculated based on the aspect ratio

        pdf.addImage(...Object.values(obj), "PNG", 10, 10, imgWidth, imgHeight);
      });

      // Save the PDF and provide it for download
      pdf.save(`${Tools.boardName}-ALLPAGES.pdf`);
    } else {
      downloadAsPDF();
    }
  }

  function hideDownloadModal() {
    document.getElementById("downloadModal").style.display = "none";
  }

  // close the modal when click outside of it
  const modal = document.getElementById("downloadModal");
  function closeModal() {
    modal.style.display = "none";
  }
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  function downloadOption() {
    const generatedImages = JSON.parse(
      window.localStorage.getItem("generatedImages")
    );
    const pageNumber = window.location.search.split("&file=")[1];

    let pageKey = "1";

    if (generatedImages.length > 0) {
      pageKey = String(
        ...Object.keys(generatedImages[generatedImages.length - 1])
      );
    }

    if (pageKey === pageNumber) {
      console.log("KEY ALREADY EXUSTS");
    } else {
      console.log("Key Doesen't Exists");
      domtoimage
        .toPng(canvas, { bgcolor: "transparent" })
        .then(function (dataURL) {
          const pageNumber = window.location.search.split("&file=")[1];
          let obj = {};
          obj[pageNumber] = dataURL;
          generatedImages.push(obj);
          console.log("GENERATED IMAGES", generatedImages);
          localStorage.setItem(
            "generatedImages",
            JSON.stringify(generatedImages)
          );
        });
    }

    if (generatedImages.length > 0) {
      document.getElementById("downloadingMulyipageOption").style.display =
        "block";
    }
    document.getElementById("downloadModal").style.display = "block";
    document
      .getElementById("downloadModalClose")
      .addEventListener("click", () => {
        document.getElementById("downloadModal").style.display = "none";
      });

    // Add a mousedown event listener to the document
    document.addEventListener("mousedown", function (event) {
      var downloadModal = document.getElementById("downloadModal");
      if (
        event.target !== downloadModal &&
        !downloadModal.contains(event.target)
      ) {
        // Clicked outside the download modal, hide it
        hideDownloadModal();
      }
    });

    // Get all the <h4> elements inside the download modal
    const downloadItems = document.querySelectorAll(
      ".downloadModal-content h4"
    );

    // Add a click event listener to each <h4> element
    downloadItems.forEach((h4Element) => {
      h4Element.addEventListener("click", function () {
        // Remove the 'selected' class from all <h4> elements
        downloadItems.forEach((item) => item.classList.remove("selected"));

        // Add the 'selected' class to the clicked <h4> element
        h4Element.classList.add("selected");
      });
    });
  }

  //   Downloading As PDF
  function downloadAsPDF(e) {
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    document.getElementById("downloadModal").style.display = "none";
    document
      .getElementById("downloadAsPDF")
      .removeEventListener("click", () => {
        console.log("Removed Event Listener");
      });

    let canvas = document.getElementById("board");

    domtoimage
      .toPng(canvas, { bgcolor: "transparent" })
      .then(function (dataURL) {
        const img = new Image();

        console.log("DATA URL", dataURL);

        dataURL = dataURL.replace(
          /^data:application\/octet-stream/,
          `data:image/jpeg;headers="Content-Type:image/jpeg"`
        );

        img.src = dataURL;

        img.onload = function () {
          const { jsPDF } = window.jspdf;
          const pdf = new jsPDF();

          const imgWidth = 190; // Adjust as needed
          const imgHeight = img.height * (imgWidth / img.width);

          pdf.addImage(dataURL, "PNG", 10, 10, imgWidth, imgHeight);

          // Save the PDF and provide it for download
          pdf.save(`${Tools.boardName}.pdf`);
        };
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }

  //   Downloading As PNG
  function downloadAsPNG(e) {
    console.log("DOWNLOADING AS PNG");
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    const viewPort = getVisibleViewport();
    let canvas = document.getElementById("board");
    domtoimage
      .toPng(canvas, { bgcolor: "transparent" })
      .then(function (dataURL) {
        dataURL.replace(
          /^data:application\/octet-stream/,
          `data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20`
        );
        let filename = `${Tools.boardName}.png`;
        downloadwithSpecificExtension(dataURL, filename);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }

  //   Downloading As JPEG
  function downloadAsJPG(e) {
    console.log("DOWNLOADING AS JPG");
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    let canvas = document.getElementById("canvas");
    domtoimage
      .toJpeg(canvas, { bgcolor: "transparent" })
      .then(function (dataURL) {
        dataURL = dataURL.replace(/^data:image\/[^;]*/, "data:image/jpeg");
        dataURL = dataURL.replace(
          /^data:application\/octet-stream/,
          `data:image/jpeg;headers="Content-Type:image/jpeg"`
        );
        let filename = `${Tools.boardName}.jpeg`;
        downloadwithSpecificExtension(dataURL, filename);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }

  function downloadSVGFile(e) {
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    var canvasCopy = Tools.svg.cloneNode(true);
    console.log("CANVAS TOOLS SVG ", Tools.svg);
    console.log("CANVAS COPY", canvasCopy);
    canvasCopy.removeAttribute("style", ""); // Remove css transform
    var styleNode = document.createElement("style");
    // Copy the stylesheets from the whiteboard to the exported SVG
    styleNode.innerHTML = Array.from(document.styleSheets)
      .filter(function (stylesheet) {
        if (
          stylesheet.href &&
          (stylesheet.href.match(/boards\/tools\/.*\.css/) ||
            stylesheet.href.match(/board\.css/))
        ) {
          // This is a Stylesheet from a Tool or the Board itself, so we should include it
          return true;
        }
        // Not a stylesheet of the tool, so we can ignore it for export
        return false;
      })
      .map(function (stylesheet) {
        return Array.from(stylesheet.cssRules).map(function (rule) {
          return rule.cssText;
        });
      })
      .join("\n");

    canvasCopy.appendChild(styleNode);
    var outerHTML =
      canvasCopy.outerHTML || new XMLSerializer().serializeToString(canvasCopy);

    var blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
    document
      .getElementById("downloadAsSVG")
      .removeEventListener("click", () => {
        console.log("Removed Event Listener");
      });
    downloadContent(blob, Tools.boardName + ".svg");
  }

  function downloadContent(blob, filename) {
    if (window.navigator.msSaveBlob) {
      // Internet Explorer
      window.navigator.msSaveBlob(blob, filename);
    } else {
      const url = URL.createObjectURL(blob);
      var element = document.createElement("a");
      element.setAttribute("href", url);
      element.setAttribute("download", filename);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      document.getElementById("downloadModal").style.display = "none";
      window.URL.revokeObjectURL(url);
    }
  }

  function downloadwithSpecificExtension(URL, filename) {
    var element = document.createElement("a");
    element.setAttribute("href", URL);
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    document.getElementById("downloadModal").style.display = "none";
  }

  Tools.add({
    //The new tool
    name: "Download",
    // shortcut: { actions: [{ key: "ctrl-D", action: downloadOption }] },
    listeners: {},
    iconHTML: downloadSvg,
    oneTouch: true,
    onstart: downloadOption,
    mouseCursor: "crosshair",
  });
})(); //End of code isolation
