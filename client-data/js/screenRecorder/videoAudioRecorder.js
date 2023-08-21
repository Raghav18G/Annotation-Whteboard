// stream capture
function captureStream(callback) {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then(function (stream) {
      callback(stream);
    })
    .catch(function (error) {
      console.error(error);
      alert(
        "Unable to capture your stream. Please check console logs.\n" + error
      );
    });
}

/* =========================================================== */
/* stop recording */
function stopRecordingCallback() {
  getSeekableBlob(recorder.getBlob(), function (seekableBlob) {
    recorder.stream.stop();
    recorder.destroy();
    recorder = null;
    document.getElementById("btn-start-recording").disabled = false;
    invokeSaveAsDialog(seekableBlob, "seekable-recordrtc.webm");
  });
}
/* =========================================================== */

/* ========================================================================= */
/* ======================1*================================ */
var recorder; // globally accessible

document.getElementById("btn-start-recording").onclick = function () {
  console.log("RECORDER CLICKED");
  this.disabled = true;
  captureStream(function (stream) {
    recorder = RecordRTC(stream, {
      type: "video",
    });

    recorder.startRecording();

    // release stream on stopRecording
    recorder.stream = stream;

    document.getElementById("btn-stop-recording").disabled = false;
  });
};

/* ========================================================================= */

/* ========================================================================= */

document.getElementById("btn-stop-recording").onclick = function () {
  this.disabled = true;
  recorder.stopRecording(stopRecordingCallback);
};

/* ========================================================================= */

/* ========================================================================= */
function addStreamStopListener(stream, callback) {
  stream.addEventListener(
    "ended",
    function () {
      callback();
      callback = function () {};
    },
    false
  );
  stream.addEventListener(
    "inactive",
    function () {
      callback();
      callback = function () {};
    },
    false
  );
  stream.getTracks().forEach(function (track) {
    track.addEventListener(
      "ended",
      function () {
        callback();
        callback = function () {};
      },
      false
    );
    track.addEventListener(
      "inactive",
      function () {
        callback();
        callback = function () {};
      },
      false
    );
  });
}

/* ========================================================================= */
