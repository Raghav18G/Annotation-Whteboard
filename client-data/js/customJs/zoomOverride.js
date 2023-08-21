$(document).ready(() => {
  $("body").on("click", ".share__screen", () => {
    $("[aria-label='Share Screen']").trigger("click");
  });
  $("body").on("click", ".mice__record", () => {
    $(".join-audio-container__btn").trigger("click");
  });
  $("body").on("click", ".mice__mute", () => {
    $(".join-audio-container__btn").trigger("click");
  });
  $("body").on("click", ".close__meeting", () => {
    $(".footer__leave-btn-text").trigger("click");
  });
  $("body").on("click", ".video__recorder", () => {
    $(".send-video-container__btn").trigger("click");
  });
  $("body").on("click", ".hide__video", () => {
    $(".send-video-container__btn").trigger("click");
  });

  $("body").on("click", ".join-audio-by-voip__join-btn", () => {
    setTimeout(() => {
      $(".join-audio-container__btn").trigger("click");
    }, 1000);
    const mice = `<svg class="mice__record" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 23"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M12,13V6A6,6,0,0,0,0,6v7a6,6,0,0,0,5.05,5.92V21H0v2H12V21H7V18.91A6,6,0,0,0,12,13ZM2,13V6a4,4,0,0,1,8,0v7a4,4,0,0,1-8,0Z"/></g></g></svg>`;
    $(".mice__container").empty().append(mice);
    $("#zmmtg-root").addClass("hideAll").css({
      left: "40px",
      "box-shadow": "10px 10px 12px 0px rgba(0,0,0,0.2)",
    });
    $(".meeting-app").addClass("hideAll");
    $(".meeting-client").addClass("hideAll").css("left", "40px");
    $(".meeting-client-inner").addClass("hideAll").css("left", "40px");
    $("#wc-content").addClass("hideAll");
    $(".main-layout").addClass("setHight");
    $(".active-video-container__avatar").addClass("setHight");
    $(".active-video-container__avatar-title").addClass("resetMargin");
    $(".active-video-container__avatar-name").addClass("resetFontSize");
    $(".active-video-container__wrap").addClass("setHight");
    $(".right.asntip").css({ width: "150px", display: "block" });
  });
  $("body").on("click", ".meeting-info-icon__icon-wrap", () => {
    $(".meeting-info-icon__recreate-paper").addClass("resetInfoPosition");
  });
  $("body").on("click", ".join-dialog__close", () => {
    $("#zmmtg-root").addClass("hideAll");
    $(".meeting-app").addClass("hideAll");
    $(".meeting-client").addClass("hideAll");
    $(".meeting-client-inner").addClass("hideAll");
    $("#wc-content").addClass("hideAll");
  });
});
