function launchScannerApp() {
  console.log("U3RhcnRSZWNvcmRpbmc=");
}

function launchScreenshotScript() {
  var screenshotEvent = new Event("ScreenshotToolTriggered")

  document.dispatchEvent(screenshotEvent)
  
  console.log("ScreenshotToolTriggered")
}
