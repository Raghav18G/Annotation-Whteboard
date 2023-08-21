console.log("gyanendra");
ZoomMtg.setZoomJSLib("https://dmogdx0jrul3u.cloudfront.net/1.8.0/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
console.log("hello");
const zoomMeeting = document.getElementById("zmmtg-root");

// const meetConfig = {
// 	apiKey: '3239845720934223459',
// 	meetingNumber: '123456789',
// 	leaveUrl: 'https://yoursite.com/meetingEnd',
// 	userName: 'Firstname Lastname',
// 	passWord: 'password',
// 	role: 1 // 1 for host
// };

// const getSignature = (meetConfig) => {
// fetch
// }

const getSignatureAPIcall = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  const meetingId = urlParams.get("meetingId");
  const password = urlParams.get("password");
  const role = urlParams.get("role");
  const data = {
    meetingId,
    role
  }
  console.log(queryString)
  console.log(data)

  fetch("http://glu-stage.antino.io:3000/api/v1/zoom/signature", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res.json());
    })
    .catch((err) => {
      console.log(err);
    });
};

getSignatureAPIcall();

ZoomMtg.init({
  leaveUrl: "http://glu-stage.antino.io/",
  isSupportAV: true,
  success: function () {
    ZoomMtg.join({
      signature:
        "Q0Raa0NaOHVUVlNoUVdZRzZaTl9sQS44ODQ1Njk0NDA4NC4xNjAxNDk0MDM2MDc2LjEuVlpscEZpYmlVaUdURFhFS1MyeUJ3Y0NselRpQ2YyZVBJdHZEWU8wRGUvdz0=",
      meetingNumber: "88456944084",
      userName: "gyanendra",
      apiKey: "CDZkCZ8uTVShQWYG6ZN_lA",
      userEmail: "gyanendrav2@gmail.com",
      passWord: "0000",
      success: (success) => {
        console.log(success);
      },
      error: (error) => {
        console.log("Helloooo gyanendra");
        console.log(error);
      },
    });
  },
});
