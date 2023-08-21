let recorder, stream, recorderRTC;
const baseurl = "https://glu-stage.antino.io/api/v1/";
const signedUrl = `${baseurl}file-upload/signed-url/`;

async function startRecording() {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "window", cursor: "always" },
    audio: true,
  });

  let audioStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });

  changeMiceIfAudioOn();
  changeVideoIfVideoOn();

  var video = document.querySelector(".video__recorder__screen");
  video.muted = true;
  video.volume = 0;
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
    console.log("CLICKEd VIDEO ELEMENET");
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
    const tracks = stream.getTracks();
    video.onloadedmetadata = function (e) {
      video.pause();
    };
    video.srcObject = null;
  });

  // unmute
  $("body").on("click", ".mice__mute", () => {
    audioStream.getAudioTracks()[0].enabled = true;
  });

  //mute
  $("body").on("click", ".mice__record", () => {
    audioStream.getAudioTracks()[0].enabled = false;
  });

  let combined = new MediaStream([
    ...stream.getTracks(),
    ...audioStream.getTracks(),
  ]);

  /* ====================================== */
  recorderRTC = RecordRTC(combined, {
    type: "video",
    mimeType: "video/x-matroska;codecs=avc1",
  });

  recorderRTC.startRecording();

  // release stream on stopRecording
  recorderRTC.stream = combined;
  /* ====================================== */

  recorder = new MediaRecorder(combined);
  const chunks = [];

  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = (e) => {
    recorderRTC.stopRecording(stopRecordingCallback);
  };

  recorder.start();
}

const checkForRecordStart = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");
  const meetingId = urlParams.get("meetingId");

  console.log(token);
  if (token) {
    setTimeout(() => {
      startRecording();
    }, 1000);
  } else {
    $("body").on("click", ".close__meeting", () => {
      if (!token && !meetingId) {
        window.location.href = "/";

        window.localStorage.setItem("generatedImages", JSON.stringify([]));
      }
    });
  }
};

checkForRecordStart();

const stopRecordingNow = () => {
  recorder.stop();
  stream.getVideoTracks()[0].stop();
};

$("body").on("click", ".close__meeting", () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");
  const meetingId = urlParams.get("meetingId");

  if (token && !meetingId) {
    stopRecordingNow();
  }
});

const callforFile = (file) => {
  const loader = `<div style="width:100%; height: 100vh; display:flex; flex-direction:column; justify-content: center; align-items:center;"> 
       <img width="60px" src="https://res.cloudinary.com/ddwbbzuxw/image/upload/v1602835118/loader_npaijz.gif" />
  <h3>Uploading...</h3>
        <p>please don't close this window.</p>
    </div>`;
  $("body").empty().append(loader);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const token = urlParams.get("token");
  const id = urlParams.get("sessionId");
  const type = urlParams.get("type");

  console.log(urlParams);
  if (token) {
    axios
      .get(`${signedUrl}${file.name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        uploadVideo(res.data.data.url, file, id, token, type);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const uploadVideo = (url, file, id, token, type) => {
  const data = file;
  axios
    .put(`https://cors-anywhere.herokuapp.com/${url}`, data, {
      headers: {
        "x-amz-acl": "public-read",
        "Content-Type": "video/x-matroska",
      },
    })
    .then((res) => {
      linkSessionVideo(url, id, token, type);
      const loader = `<div style="width:100%; height: 100vh; display:flex; flex-direction:column; justify-content: center; align-items:center;"> 
        <h3>Congratulation your lecture has been uploaded successfully.</h3>
        <h3 class="goback_button">Go Back</h3>
    </div>`;
      $("body").empty().append(loader);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const linkSessionVideo = (url, id, token, type) => {
  const data = {
    videoLink: url.split("?")[0],
  };
  axios
    .put(
      `${baseurl}freelancer/teacher/record/session/${id}?type=${type}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res);
      window.onbeforeunload = null;
    })
    .catch((err) => {
      console.log(err);
    });
};

$("body").on("click", ".goback_button", () => {
  window.location.href = "https://glu-stage.antino.io/tutor/my-classes";
});

const changeMiceIfAudioOn = () => {
  const mice = `<svg class="mice__record" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 23"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M12,13V6A6,6,0,0,0,0,6v7a6,6,0,0,0,5.05,5.92V21H0v2H12V21H7V18.91A6,6,0,0,0,12,13ZM2,13V6a4,4,0,0,1,8,0v7a4,4,0,0,1-8,0Z"/></g></g></svg>`;
  $(".mice__container").empty().append(mice);
};

const changeVideoIfVideoOn = () => {
  const video = `<svg class="video__recorder" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 19"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M19,2V9.42l7-5.37V15L19,9.58V17H2V2H19m9-2L21,5.36V0H0V19H21V13.64L28,19V0Z"/></g></g></svg>`;
  $(".video__container").empty().append(video);
};

function stopRecordingCallback() {
  getSeekableBlob(recorderRTC.getBlob(), function (seekableBlob) {
    recorderRTC.stream.stop();
    recorderRTC.destroy();
    recorderRTC = null;

    const data = new File([seekableBlob], "video.mkv", {
      type: "video/x-matroska;codecs=avc1",
    });
    callforFile(data);
    // invokeSaveAsDialog(seekableBlob, "seekable-recordrtc.mkv");
  });
}
