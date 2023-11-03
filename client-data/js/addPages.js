var flag = 1;

// (() => {
//   const displayNumber = window.location.search.split("&file=")[1];

//   document.getElementById("pageNumber").textContent = `Page ${displayNumber}`;
// })();

async function addNewPage() {
  //Navigation Logic
  const baseURL = window.location.origin + window.location.pathname;
  document.getElementById("addNewPageModal").style.display = "block";
  document.getElementById("pagesModalClose").addEventListener("click", () => {
    document.getElementById("addNewPageModal").style.display = "none";
  });
  const structure = await window.localStorage.getItem("structure").split(",");
  const boardName = await window.localStorage.getItem("selectedBoard");

  let pageTiles = document.querySelectorAll(".page-tile");

  const files = [];

  structure.map((path) => {
    if (path.includes(boardName)) {
      const fileNumber = parseInt(path.split("/")[1].replace(".json", ""));
      files.push(fileNumber);
    }
  });

  if (flag == 1) {
    files.map((pageNumber) => {
      //Fetching Page Number
      const multipageNumber = pageNumber;
      const pageContainer = document.getElementById("pageContainer");
      const newPage = document.createElement("a");
      // const pageNumber = pageContainer.children.length + 1;
      newPage.classList.add("page-tile");

      const newParams = `?board=${boardName}&file=${multipageNumber}`;
      const newURL = baseURL + newParams;
      newPage.textContent = "Page " + multipageNumber;
      newPage.href = `${newURL}`;
      pageContainer.appendChild(newPage);
      flag++;
    });
  }

  const modal = document.getElementById("addNewPageModal");
  const pageTile = document.querySelector(".page-tile");

  pageTile.addEventListener("click", (event) => {
    if (event.target === pageTile) {
      modal.style.display = "none";
    }
  });

  document.getElementById("addPageBtn").addEventListener("click", function () {
    //Main Logic of Page Addition
    const structure = window.localStorage.getItem("structure").split(",");
    const currentFile = window.localStorage.getItem("currentFile");

    const generatedImages = JSON.parse(
      window.localStorage.getItem("generatedImages")
    );

    let canvas = document.getElementById("board");
    const pageNumber = window.location.search.split("&file=")[1];

    let pageKey = 0;

    if (generatedImages.length > 0) {
      pageKey = String(
        ...Object.keys(generatedImages[generatedImages.length - 1])
      );
    }

    if (pageKey === pageNumber) {
      let selectedBoard = window.localStorage.getItem("selectedBoard");
      if (!selectedBoard) {
        selectedBoard = window.location.search
          .split("?board=")[1]
          .split("&")[0];
      }
      const files = [];
      structure.map((path) => {
        if (path.includes(selectedBoard)) {
          const fileNumber = parseInt(path.split("/")[1].replace(".json", ""));
          files.push(fileNumber);
        }
      });
      let nextFile = 1;
      files.map((file) => {
        if (file > nextFile) {
          nextFile = file;
        }
      });
      window.location.assign(
        `${baseURL}?board=${selectedBoard}&file=${nextFile + 1}`
      );
    } else {
      domtoimage.toPng(canvas, { bgcolor: "#fff" }).then(function (dataURL) {
        let obj = {};
        obj[pageNumber] = dataURL;
        generatedImages.push(obj);

        localStorage.setItem(
          "generatedImages",
          JSON.stringify(generatedImages)
        );
        //PAGE LOGIC AFTER THE IMAGE URL GENERATED
        let selectedBoard = window.localStorage.getItem("selectedBoard");
        if (!selectedBoard) {
          selectedBoard = window.location.search
            .split("?board=")[1]
            .split("&")[0];
        }
        const files = [];
        structure.map((path) => {
          if (path.includes(selectedBoard)) {
            const fileNumber = parseInt(
              path.split("/")[1].replace(".json", "")
            );
            files.push(fileNumber);
          }
        });
        let nextFile = 1;
        files.map((file) => {
          if (file > nextFile) {
            nextFile = file;
          }
        });
        window.location.assign(
          `${baseURL}?board=${selectedBoard}&file=${nextFile + 1}`
        );
      });
    }
  });
}
