$(document).ready(() => {
  $("body").on("click", ".size_selector_container", () => {
    $(".size_selector_container .verticalAlign").toggleClass("sizeSelector");
  });
  $("body").on("click", ".opacityPicker", () => {
    $(".opacityPicker .opacitySelector").toggleClass("hideOpacity");
  });
  $("body .popover").removeClass("fade show");
  // $("body").on("click", "#toolID-Rectangle", () => {
  //   $("#popover-Rectangle").toggleClass('toggleRectagleTool');
  //   $("#popover-Line").removeClass('toggleLineTool');

  // });
  // $("body").on("click", "#toolID-Line", () => {
  //   $("#popover-Line").toggleClass('toggleLineTool');
  //   $("#popover-Rectangle").removeClass('toggleRectagleTool');
  // });
});

// opacity Picker is hiding when clicking anywhere in the screen
document.addEventListener("click", function (event) {
  var opacityPicker = document.querySelector(".opacityPicker");
  var opacitySelector = document.querySelector(".opacitySelector");

  if (!opacityPicker.contains(event.target)) {
    opacitySelector.classList.add("hideOpacity");
  } else {
    opacitySelector.classList.remove("hideOpacity");
  }
});

// Tool size selector is hiding when clicking anywhere in the screen
document.addEventListener("click", function (event) {
  var size_selector_container = document.querySelector(
    ".size_selector_container"
  );
  var toolselector = document.querySelector(".verticalAlign");

  if (!size_selector_container.contains(event.target)) {
    toolselector.classList.add("sizeSelector");
  } else {
    toolselector.classList.remove("sizeSelector");
  }
});
