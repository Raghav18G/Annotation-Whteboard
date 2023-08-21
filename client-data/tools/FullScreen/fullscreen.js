$(document).ready(() => {
  const fullScreen = `
    <svg class="fullscreen_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon points="0 0 0 10 2 10 2 2 10 2 10 0 0 0"/><polygon points="2 13 0 13 0 23 10 23 10 21 2 21 2 13"/><polygon points="13 0 13 2 21 2 21 10 23 10 23 0 13 0"/><polygon points="21 21 13 21 13 23 23 23 23 13 21 13 21 21"/></g></g></svg>
    `;
  const exitFullScreen = `
    <svg class="exit__fullscreen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon points="5 5 0 5 0 6 6 6 6 0 5 0 5 5"/><polygon points="12 5 12 0 11 0 11 6 17 6 17 5 12 5"/><polygon points="0 12 5 12 5 17 6 17 6 11 0 11 0 12"/><polygon points="11 17 12 17 12 12 17 12 17 11 11 11 11 17"/></g></g></svg>
    `;
  const element = `
    <div class="fullscreen__container">
    ${fullScreen}
    </div>
    `;
  $("#top_left_tools").append(element);
  $("body").on("click", ".fullscreen_icon", () => {
    $("body").fullscreen();
    $(".fullscreen__container").empty().append(exitFullScreen);
    return false;
  });
  $("body").on("click", ".exit__fullscreen", () => {
    $.fullscreen.exit();
    $(".fullscreen__container").empty().append(fullScreen);
    return false;
  });
  $(document).bind(
    "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
    function (e) {
      var fullscreenElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullscreenElement ||
        document.msFullscreenElement;

      if (!fullscreenElement) {
        $(".fullscreen__container").empty().append(fullScreen);
      } else {
        console.log("Entering full-screen mode...");
      }
    }
  );
});
