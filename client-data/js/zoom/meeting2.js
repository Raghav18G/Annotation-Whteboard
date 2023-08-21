ZoomMtg.setZoomJSLib("https://dmogdx0jrul3u.cloudfront.net/1.8.0/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
const zoomMeeting = document.getElementById("zmmtg-root");
const APIKey = "CDZkCZ8uTVShQWYG6ZN_lA";

const meetConfig = {
  apiKey: APIKey,
  meetingNumber: "",
  leaveUrl: "http://glu-stage.antino.io/",
  userName: "Firstname Lastname",
  passWord: "",
  email: "",
  role: 0, // 1 for host
};

const getSignatureAPIcall = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const meetingId = urlParams.get("meetingId");
  const password = urlParams.get("password");
  const role = urlParams.get("role");
  meetConfig.meetingNumber = meetingId;
  meetConfig.passWord = password;
  meetConfig.role = role;

  const data = {
    meetingId,
    role,
  };
  axios
    .post("https://glu-stage.antino.io/api/v1/zoom/signature", data)
    .then((response) => {
      startMeeting(response.data.data);
    })
    .catch((error) => console.error(error));
};

const checkStartOrNotMeeting = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const meetingId = urlParams.get("meetingId");
  const password = urlParams.get("password");
  if (meetingId && password) {
    getSignatureAPIcall();
  }else {
    $('body #zmmtg-root').remove();
  }
};

checkStartOrNotMeeting();

const startMeeting = (signature) => {
  ZoomMtg.init({
    leaveUrl: meetConfig.leaveUrl,
    isSupportAV: true,
    success: function () {
      ZoomMtg.join({
        signature: signature,
        meetingNumber: meetConfig.meetingNumber,
        userName: meetConfig.userName,
        apiKey: meetConfig.apiKey,
        userEmail: meetConfig.email,
        passWord: meetConfig.passWord,
        success: (success) => {
          console.log(success);
        },
        error: (error) => {
          console.log(error);
        },
      });
    },
  });
};
