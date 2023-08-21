const supportsGetDisplayMedia = !!(
  navigator.getDisplayMedia || navigator.mediaDevices
);

// Display a message based on support
if (supportsGetDisplayMedia) {
  console.log(
    "This browser supports navigator.getDisplayMedia or navigator.mediaDevices.getDisplayMedia."
  );
} else {
  console.log(
    "This browser does not support navigator.getDisplayMedia or navigator.mediaDevices.getDisplayMedia."
  );
}
