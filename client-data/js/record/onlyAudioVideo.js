const audioVideo = async () => {
  try {
    // Request permission for camera and microphone
    let audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    changeMiceIfAudioOn();
    changeVideoIfVideoOn();
    /* get video element */
    var video = document.querySelector(".video__recorder__screen");
    $(".video__recorder__screen_container").draggable().resizable();
    $(".video__recorder__screen").draggable();
    if ("srcObject" in video) {
      video.srcObject = audioStream;
    } else {
      video.src = window.URL.createObjectURL(audioStream);
    }
    video.onloadedmetadata = function (e) {
      video.play();
    };

    // start video
    $("body").on("click", ".hide__video", () => {
      if ("srcObject" in video) {
        video.srcObject = audioStream;
      } else {
        video.src = window.URL.createObjectURL(audioStream);
      }
      video.onloadedmetadata = function (e) {
        video.play();
      };
    });

    // stop video
    $("body").on("click", ".video__recorder", () => {
      const stream = video.srcObject;
      video.onloadedmetadata = function (e) {
        video.pause();
      };
      video.srcObject = null;
      const tracks = audioStream.getTracks();
      console.log("MIC CLICKED MUTE", tracks);
      tracks.forEach((track) => track.stop());
    });

    // unmute
    $("body").on("click", ".mice__mute", () => {
      audioStream.getAudioTracks()[0].enabled = true;
    });

    //mute
    $("body").on("click", ".mice__record", () => {
      audioStream.getAudioTracks()[0].enabled = false;
    });
  } catch (error) {
    // Handle errors, e.g., the user denied access or the media devices are not available
    console.error("Error accessing camera or microphone:", error);
  }
};

/* start when no token */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get("token");
const meetingId = urlParams.get("meetingId");

const changeMiceIfAudioOn = () => {
  const mice = `<svg class="mice__record" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 23"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M12,13V6A6,6,0,0,0,0,6v7a6,6,0,0,0,5.05,5.92V21H0v2H12V21H7V18.91A6,6,0,0,0,12,13ZM2,13V6a4,4,0,0,1,8,0v7a4,4,0,0,1-8,0Z"/></g></g></svg>`;
  $(".mice__container").empty().append(mice);
};

const changeVideoIfVideoOn = () => {
  const video = `<svg class="video__recorder" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 19"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M19,2V9.42l7-5.37V15L19,9.58V17H2V2H19m9-2L21,5.36V0H0V19H21V13.64L28,19V0Z"/></g></g></svg>`;
  $(".video__container").empty().append(video);
};
