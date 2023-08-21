(function mathematicalTools() {
  //Code isolation

  // This isn't an HTML5 canvas, it's an old svg hack, (the code is _that_ old!)
  var uploadSVG ='<svg width="34" height="28"  style="margin-top: -2px;" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8294_29534)"><path d="M37.9844 36.0348L39.6049 39.5325L39.3851 35.7197L37.9844 36.0348Z" fill="#CFCFCF"/><path d="M29.9487 36.0348L28.3281 39.5325L28.5479 35.7197L29.9487 36.0348Z" fill="#CFCFCF"/><path fill-rule="evenodd" clip-rule="evenodd" d="M35.8521 15.4558L40.2821 36.1699L37.2687 36.8144L33.9731 21.4045L30.6774 36.8144L27.6641 36.1699L32.0952 15.4512L35.8521 15.4558Z" fill="#3399FF"/><path d="M34.6932 6.46771C34.6932 6.07134 34.3719 5.75 33.9755 5.75C33.5792 5.75 33.2578 6.07134 33.2578 6.46771V9.81435C33.2578 10.2107 33.5792 10.5321 33.9755 10.5321C34.3719 10.5321 34.6932 10.2107 34.6932 9.81435V6.46771Z" fill="#3399FF"/><path fill-rule="evenodd" clip-rule="evenodd" d="M33.975 9.39844C35.9415 9.39844 37.5359 10.9928 37.5359 12.9594C37.5359 14.9259 35.9415 16.5203 33.975 16.5203C32.0085 16.5203 30.4141 14.9259 30.4141 12.9594C30.4141 10.9928 32.0085 9.39844 33.975 9.39844ZM33.975 11.3426C33.082 11.3426 32.3582 12.0663 32.3582 12.9594C32.3582 13.8524 33.082 14.5761 33.975 14.5761C34.868 14.5761 35.5917 13.8524 35.5917 12.9594C35.5917 12.0663 34.868 11.3426 33.975 11.3426Z" fill="#3399FF"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24.1303 23.0258V40.2498C14.6177 40.2498 6.90625 32.5383 6.90625 23.0258C6.90625 13.5132 14.6177 5.80176 24.1303 5.80176V23.0258ZM21.4271 38.4095H23.2857V38.8145H21.4271V38.4095ZM20.2756 36.2206H23.2857V36.6255H20.2756V36.2206ZM21.4271 34.0317H23.2857V34.4366H21.4271V34.0317ZM20.2756 31.8427H23.2857V32.2476H20.2756V31.8427ZM21.4271 29.6538H23.2857V30.0587H21.4271V29.6538ZM20.2756 27.4649H23.2857V27.8698H20.2756V27.4649ZM21.4271 25.2759H23.2857V25.6808H21.4271V25.2759ZM20.2756 23.087H23.2857V23.4919H20.2756V23.087ZM21.4271 20.898H23.2857V21.3029H21.4271V20.898ZM20.2756 18.7091H23.2857V19.114H20.2756V18.7091ZM21.4271 16.5201H23.2857V16.925H21.4271V16.5201ZM20.2756 14.3312H23.2857V14.7361H20.2756V14.3312ZM21.4271 12.1422H23.2857V12.5472H21.4271V12.1422ZM20.2756 9.95331H23.2857V10.3582H20.2756V9.95331ZM21.4271 7.76435H23.2857V8.16929H21.4271V7.76435ZM19.431 11.9609C14.8718 13.5694 11.6057 17.9153 11.6057 23.0258C11.6057 28.1363 14.8718 32.4822 19.431 34.0907V11.9609Z" fill="#424242"/></g><defs><clipPath id="clip0_8294_29534"><rect width="46" height="46" fill="white" transform="translate(0.585938)"/></clipPath></defs></svg><label class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 12px;"><p id="tool-mathstool-localization">Math</p> <p id="tool-mathstools-localization">Tools</p></label>';
    // var xlinkNS = "http://www.w3.org/1999/xlink";

  var toggle = 0;
  let getWidgets;
  let widgetDrag;
  const widgetsImage = [
    { id: "ruler", image: "scale.png", title: "Ruler" },
    { id: "setSquare", image: "scale2.png", title: "Set-Square" },
    { id: "protractor", image: "scale3.png", title: "Protactor" },
    { id: "stopwatch", image: "scale4.png", title: "Stop-watch" },
    { id: "clock", image: "clock.png", title: "Clock" },
    { id: "roundCompass", image: "scale5.png", title: "Round-Compass" },
    { id: "compass", image: "scale6.png", title: "Compass" },
    { id: "calculate", image: "scale7.png", title: "Calculator" },
    { id: "magnifier", image: "scale8.png", title: "Magnifier" },
    { id: "dice-tool", image: "scale9.png", title: "Dice" },
  ];

  let modalContent = document.getElementById("tab1--mathematiclTool");

  widgetsImage.map((widget) => {
    let widgetPattern = document.createElement("img");
    widgetPattern.setAttribute("src", `./assets/${widget.image}`);
    widgetPattern.className = "widgetContainer";
    widgetPattern.setAttribute("title", widget.title);
    widgetPattern.setAttribute("id", widget.id);
    if (widget.id === "clock") {
      widgetPattern.addEventListener("click", (e) => {
        ClockWidget(e);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        ClockWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    } else if (widget.id === "compass") {
      widgetPattern.addEventListener("click", (e) => {
        CompassWidget(e);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        CompassWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    } else if (widget.id === "magnifier") {
      widgetPattern.addEventListener("click", (e) => {
        e.preventDefault();
        MagnifyingGlass(e);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        MagnifyingGlass(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    } else if (widget.id === "stopwatch") {
      widgetPattern.addEventListener("click", (e) => {
        e.preventDefault();
        stopWatchWidget(e);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        stopWatchWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    } else if (widget.id === "dice-tool") {
      widgetPattern.addEventListener("click", (e) => {
        e.preventDefault();
        diceWidget(e);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        diceWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    } else if (widget.id === "calculate") {
      widgetPattern.addEventListener("click", (e) => {
        e = e || window.event;
        e.preventDefault();
        calculatorWidget(e);

        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        calculatorWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    } else if (widget.id === "protractor") {
      widgetPattern.addEventListener("click", (e) => {
        e.preventDefault();
        protractorWidget(e);

        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        protractorWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    } else if (widget.id === "ruler") {
      widgetPattern.addEventListener("click", (e) => {
        e.preventDefault();
        rulerWidget(e);

        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        rulerWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    } else if (widget.id === "setSquare") {
      widgetPattern.addEventListener("click", (e) => {
        e.preventDefault();
        setSquareWidget(e);

        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        setSquareWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    } else if (widget.id === "roundCompass") {
      widgetPattern.addEventListener("click", (e) => {
        e.preventDefault();
        roundCompassWidget(e);

        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        roundCompassWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    }
    modalContent?.appendChild(widgetPattern);
  });

  function onstart() {
    console.log(" tool clicked");
    mathematicalToolsModal.style.display = "block";
    
  }

  function onQuit(){
    // console.log("onquit called");
    // widgetDrag = new Draggable();
		// getWidgets = document.querySelectorAll('foreignObject')
    // console.log(getWidgets,"getWidgets");
    //  Array.from(getWidgets).map((parentRef)=>{
    //   widgetDrag.removeDrag(parentRef)
    // })
	};

  Tools.add({
    name: "Mathematical Tools",
    // "icon": "🖼️",
    iconHTML: uploadSVG,
    // shortcuts: {
    //   actions: [{ key: "12", action: onstart }],
    // },
    listeners: {},
    //draw: draw,
    onstart: onstart,
    //oneTouch: true,
    "onquit":onQuit,
    mouseCursor: "auto",
  });
})(); //End of code isolation

//Close the modal of Color Picker
var closeModalBtn = document.getElementById("closeToolModalBtn");

closeModalBtn.addEventListener("click", function () {
  mathematicalToolsModal.style.display = "none";
});
