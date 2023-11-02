function launchScannerApp() {
  console.log("U3RhcnRSZWNvcmRpbmc=");
}

function launchScreenshotScript() {
  var screenshotEvent = new Event("ScreenshotToolTriggered");
  document.dispatchEvent(screenshotEvent);
  console.log("ScreenshotToolTriggered");
}

function arrayBufferToBlob(arrayBuffer, mimeType) {
  // Create a Blob from the ArrayBuffer
  return new Blob([arrayBuffer], { type: mimeType });
}

function downloadScreenshot(blob) {
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "Screenshot.png";
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}
