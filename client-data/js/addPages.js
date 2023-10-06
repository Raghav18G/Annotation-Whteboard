var flag = 1;

async function addNewPage() {
  //Navigation Logic
  const baseURL = window.location.origin + window.location.pathname;
  document.getElementById("addNewPageModal").style.display = "block";
  document.getElementById("pagesModalClose").addEventListener("click", () => {
    document.getElementById("addNewPageModal").style.display = "none";
  });
  const structure = await window.localStorage.getItem("structure").split(",");
  const boardName = await window.localStorage.getItem("selectedBoard");

  console.log("structure", structure, "Board Name: ", boardName);
  let pageTiles = document.querySelectorAll(".page-tile");
  console.log("Page Tiles", pageTiles);

  
  const modal = document.getElementById("addNewPageModal");
  const modalContent = document.querySelector(".addNewPageModal-content");

  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target === modalContent) {
      modal.style.display = "none";
    }
  });

  const files = [];

  structure.map((path) => {
    if (path.includes(boardName)) {
      const fileNumber = parseInt(path.split("/")[1].replace(".json", ""));
      files.push(fileNumber);
    }
  });

  console.log("FILES", files);

  console.log("LENGTH MISMATCH");
  console.log("ADDING the PAges");
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

    console.log("PAGE KEY", pageKey);
    if (pageKey === pageNumber) {
      console.log("KEY ALREADY EXUSTS");
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
      console.log("KEY ALREADY EXUSTS");
      domtoimage.toPng(canvas, { bgcolor: "#fff" }).then(function (dataURL) {
        let obj = {};
        obj[pageNumber] = dataURL;
        generatedImages.push(obj);
        console.log("GENERATED IMAGES", generatedImages);
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
