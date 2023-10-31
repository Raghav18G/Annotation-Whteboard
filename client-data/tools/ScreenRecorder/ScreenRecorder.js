var screenshotSVG = `<div class="tool-selected"><svg width="20" height="20" style="margin-bottom: 2px;margin-left: 1px;"viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.30402 0H3.30411C2.50856 0 1.74527 0.316069 1.18301 0.878325C0.620757 1.44058 0.304688 2.20387 0.304688 2.99942C0.304688 4.74317 0.304688 7.25666 0.304688 8.99933C0.304688 9.55191 0.752988 10.0002 1.30449 10.0002C1.856 10.0002 2.3043 9.55191 2.3043 8.99933V2.99942C2.3043 2.73495 2.40965 2.48017 2.59779 2.29311C2.78485 2.10497 3.03964 1.99961 3.30411 1.99961H9.30402C9.8566 1.99961 10.3049 1.55131 10.3049 0.999806C10.3049 0.4483 9.8566 0 9.30402 0Z" fill="#424242" /> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3054 1.99961H25.3053C25.5697 1.99961 25.8245 2.10497 26.0116 2.29311C26.1997 2.48017 26.3051 2.73495 26.3051 2.99942V8.99933C26.3051 9.55191 26.7534 10.0002 27.3049 10.0002C27.8564 10.0002 28.3047 9.55191 28.3047 8.99933V2.99942C28.3047 2.20387 27.9886 1.44058 27.4264 0.878325C26.8641 0.316069 26.1008 0 25.3053 0C23.5615 0 21.048 0 19.3054 0C18.7528 0 18.3045 0.4483 18.3045 0.999806C18.3045 1.55131 18.7528 1.99961 19.3054 1.99961Z" fill="#424242" /> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.30402 25.9984H3.30411C3.03964 25.9984 2.78485 25.8931 2.59779 25.7049C2.40965 25.5179 2.3043 25.2631 2.3043 24.9986V18.9987C2.3043 18.4461 1.856 17.9978 1.30449 17.9978C0.752988 17.9978 0.304688 18.4461 0.304688 18.9987V24.9986C0.304688 25.7942 0.620757 26.5575 1.18301 27.1197C1.74527 27.682 2.50856 27.998 3.30411 27.998C5.04785 27.998 7.56135 27.998 9.30402 27.998C9.8566 27.998 10.3049 27.5497 10.3049 26.9982C10.3049 26.4467 9.8566 25.9984 9.30402 25.9984Z" fill="#424242" /> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3054 27.998H25.3053C26.1008 27.998 26.8641 27.682 27.4264 27.1197C27.9886 26.5575 28.3047 25.7942 28.3047 24.9986C28.3047 23.2549 28.3047 20.7414 28.3047 18.9987C28.3047 18.4461 27.8564 17.9978 27.3049 17.9978C26.7534 17.9978 26.3051 18.4461 26.3051 18.9987V24.9986C26.3051 25.2631 26.1997 25.5179 26.0116 25.7049C25.8245 25.8931 25.5697 25.9984 25.3053 25.9984H19.3054C18.7528 25.9984 18.3045 26.4467 18.3045 26.9982C18.3045 27.5497 18.7528 27.998 19.3054 27.998Z" fill="#424242" /> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3403 6.03418C9.94402 6.03418 6.375 9.6032 6.375 13.9995C6.375 18.3958 9.94402 21.9648 14.3403 21.9648C18.7366 21.9648 22.3056 18.3958 22.3056 13.9995C22.3056 9.6032 18.7366 6.03418 14.3403 6.03418ZM14.3403 8.03381C17.6329 8.03381 20.306 10.707 20.306 13.9995C20.306 17.292 17.6329 19.9652 14.3403 19.9652C11.0478 19.9652 8.37464 17.292 8.37464 13.9995C8.37464 10.707 11.0478 8.03381 14.3403 8.03381Z" fill="#424242" /> </svg></div><label id="tool-recorder-localization" class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;"><p>Recorder</p></label>`;

(function ScreenRecorder() {
  var recorder; // globally accessible
  function invokeGetDisplayMedia(success, error) {
    var displaymediastreamconstraints = {
      video: {
        mediaSource: "screen",
        cursor: "always", // or 'motion' for cursor sharing
      },
      audio: true,
    };

    // above constraints are NOT supported YET
    // that's why overriding them
    // displaymediastreamconstraints = { audio: true, video: true };

    if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices
        .getDisplayMedia(displaymediastreamconstraints)
        .then(success)
        .catch(error);
    } else {
      navigator
        .getDisplayMedia(displaymediastreamconstraints)
        .then(success)
        .catch(error);
    }
  }

  function captureScreen(callback) {
    invokeGetDisplayMedia(
      function (screen) {
        addStreamStopListener(screen, function () {
          recorder.stopRecording(stopRecordingCallback);
        });
        callback(screen);
      },
      function (error) {
        console.error(error);
        alert(
          "Unable to capture your screen. Please check console logs.\n" + error
        );
      }
    );
  }

  function stopRecordingCallback() {
    console.group("Stopped Recording");
    getSeekableBlob(recorder.getBlob(), function (seekableBlob) {
      recorder.screen.stop();
      recorder.destroy();
      recorder = null;

      invokeSaveAsDialog(seekableBlob, "seekable-recordrtc.webm");
    });
  }

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

  function download(blob) {
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "test.webm";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  function MobileRecorder() {
    //Mobile Console Trigger
    launchScannerApp();
  }

  function DesktopRecorder() {
    console.log("DESKTOP SCREEN RECORDING");
    captureScreen(function (screen) {
      const audioTracks = screen.getAudioTracks();
      const audioConstraints = {};

      if (audioTracks.length > 0) {
        audioConstraints.mandatory = {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: audioTracks[0].getSettings().deviceId,
        };
      }

      recorder = RecordRTC(screen, {
        type: "video",
        recorderType: MediaStreamRecorder,
        mimeType: "video/webm",
        audio: audioConstraints,
      });

      recorder.startRecording();

      // release screen on stopRecording
      recorder.screen = screen;
    });
  }

  function startScreenRecording() {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      MobileRecorder();
    } else {
      DesktopRecorder();
    }
  }

  Tools.add({
    name: "Screen Recorder",
    isExtra: true,
    // "icon": "🖼️",
    iconHTML: screenshotSVG,
    // shortcuts: {
    //   changeTool: "s",
    // },
    //   draw: draw,
    onstart: startScreenRecording,
    oneTouch: true,
  });
})();
