$(document).ready(() => {
  const video = `<svg class="video__recorder" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 19"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M19,2V9.42l7-5.37V15L19,9.58V17H2V2H19m9-2L21,5.36V0H0V19H21V13.64L28,19V0Z"/></g></g></svg>`;
  const hideVideo = `
  <svg class="hide__video" xmlns="http://www.w3.org/2000/svg" width="27.998" height="19.799" viewBox="0 0 27.998 19.799">
  <g id="Group_17290" data-name="Group 17290" transform="translate(-92 -132.686)">
    <path id="Subtraction_2" data-name="Subtraction 2" d="M17104.023,19632.975h0l-15.764,0,2-2h11.764v-7.418l7,5.367v-10.9l-7,5.361v-4.176l2-2v2.125l7-5.361v19l-7-5.359v5.363Zm-21-3.25v-15.75h15.752l-2,2h-11.75v11.75l-2,2Z" transform="translate(-16991.023 -19480.973)"/>
    <rect id="Rectangle_5802" data-name="Rectangle 5802" width="26" height="2" transform="translate(92.516 151.07) rotate(-45)"/>
  </g>
</svg>
  `;
  const container = `
    <div class="video__container">
   ${hideVideo}
    </div>
    `;
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const token = urlParams.get("token");
  // if (token) {
  $("#top_left_tools").append(container);
  // }
  $("body").on("click", ".hide__video", () => {
    console.log("CLICKED VIDEO ELEMENT");
    $(".video__container").empty().append(video);
    audioVideo();
  });
  $("body").on("click", ".video__recorder", () => {
    console.log("CLICKED VIDEO ELEMENT AGAIN");
    $(".video__container").empty().append(hideVideo);
   
  });
});
