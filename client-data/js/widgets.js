// Clock Widget
let clockInterval;
let getAllWidgets;

let createDrag;

let widgetRemove = (id) => {
  const remove = document.getElementById(id);
  remove.remove();
};

const ClockWidget = (e) => {
  createDrag = new Draggable();
  clearInterval(clockInterval);
  const foreignObjectClock = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject"
  );
  const clockWidget = document.createElement("div");
  let uid = Tools.generateUID("doc");

  const clockHTML = `
      <svg
        id="clock"
        xmlns="http://www.w3.org/2000/svg"
        width="350"
        height="250"
        viewBox="0 0 600 600"
      >
        <g id="face">
          <circle class="circle" cx="300" cy="300" r="253.9" />
          <path
            class="hour-marks"
            d="M300.5 94V61M506 300.5h32M300.5 506v33M94 300.5H60M411.3 107.8l7.9-13.8M493 190.2l13-7.4M492.1 411.4l16.5 9.5M411 492.3l8.9 15.3M189 492.3l-9.2 15.9M107.7 411L93 419.5M107.5 189.3l-17.1-9.9M188.1 108.2l-9-15.6"
          />
          <circle class="mid-circle" cx="300" cy="300" r="16.2" />
        </g>
        <g id="hour">
          <path class="hour-arm" d="M300.5 298V142" />
          <circle class="sizing-box" cx="300" cy="300" r="253.9" />
        </g>
        <g id="minute">
          <path class="minute-arm" d="M300.5 298V67" />
          <circle class="sizing-box" cx="300" cy="300" r="253.9" />
        </g>
        <g id="second">
          <path class="second-arm" d="M300.5 350V55" />
          <circle class="sizing-box" cx="300" cy="300" r="253.9" />
        </g>
      </svg>`;

  clockWidget.innerHTML = clockHTML;
  clockWidget.style.maxWidth = "100%";
  clockWidget.style.position = "absolute";
  foreignObjectClock.style.x = `${e.clientX + window.scrollX}px`;
  foreignObjectClock.style.y = `${e.clientY + window.scrollY}px`;
  // foreignObjectClock.style.x = e.clientX;
  // foreignObjectClock.style.y = e.clientY;
  foreignObjectClock.style.width = "1px";
  foreignObjectClock.style.height = "1px";
  foreignObjectClock.setAttribute("id", uid);
  foreignObjectClock.setAttribute("overflow", "visible");

  foreignObjectClock.appendChild(clockWidget);

  // Added Drag Icon

  const dragDiv = document.createElement("div");
  dragDiv.innerHTML =
    '<img src="./assets/DRAG.svg" class="dragLogo" height="30" draggable="false" ></img>';
  dragDiv.classList.add("drag-widget");
  foreignObjectClock.appendChild(dragDiv);

  foreignObjectClock.appendChild(clockWidget);

  // added cross icon
  const crossDiv = document.createElement("div");
  crossDiv.innerHTML =
    '<img src="./assets/x-circle.svg" class="dragLogo" height="30" draggable="false" ></img>';

  crossDiv.classList.add("cross-div");

  foreignObjectClock.appendChild(crossDiv);

  crossDiv.addEventListener("click", () => widgetRemove(uid));

  Tools.group.appendChild(foreignObjectClock);
  createDrag.addDrag(dragDiv, foreignObjectClock);
  const HOURHAND = document.querySelector("#hour");
  const MINUTEHAND = document.querySelector("#minute");
  const SECONDHAND = document.querySelector("#second");

  console.log("HOUR HAND", HOURHAND, "MINU", MINUTEHAND);

  // Declare and Initialize the inbuilt date function
  const date = new Date();

  //
  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  // Log to see the output in the console
  console.log("Hour: " + hr + " Minute: " + min + " Second: " + sec);

  let hrPosition = (hr * 360) / 12 + (min * (360 / 60)) / 12;
  let minPosition = (min * 360) / 60 + (sec * (360 / 60)) / 60;
  let secPosition = (sec * 360) / 60;

  // Create a function that actually run the clock
  const runClock = () => {
    // Set each position when the function is called
    hrPosition = hrPosition + 3 / 360;
    minPosition = minPosition + 6 / 60;
    secPosition = secPosition + 6;

    // Set the transformation for each arm
    HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
    MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
    SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";
  };

  // Use the inbuilt setInterval function to invoke the method we created earlier
  clockInterval = setInterval(runClock, 1000);
  //  if (msg.transform) clockWidget.setAttribute("transform", msg.transform);
  //makeDraggeble(foreignObjectClock);

  // getAllWidgets = document.querySelectorAll("foreignObject")

  // Array.from(getAllWidgets).map(parentRef => {
  //   createDrag.addDrag(parentRef)
  // })
  if (Tools.useLayers)
    clockWidget.setAttribute("class", "layer-" + Tools.layer);
};

const CompassWidget = (e) => {
  e.preventDefault();
  createDrag = new Draggable();

  const foreignObjectCompass = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject"
  );
  let compassWidget = document.createElement("div");
  const uid = Tools.generateUID("doc");

  const compassHTML = `<div class="main">
  <svg id="compassWidget" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
  <line id="arrow" x1="45" y1="150" x2="200" y2="150" stroke="red" stroke-width="2" stroke-height="6" />
  <g id="angle-markings" font-size="14">
     <text x="330" y="200" text-anchor="middle">0°</text>
     <!-- Dynamic generation of angle markings and their differences of 10 degrees -->
  </g>
  </svg>
</div>
`;

  compassWidget.innerHTML = compassHTML;
  compassWidget.style.maxWidth = "100%";
  compassWidget.style.position = "absolute";
  foreignObjectCompass.style.x = `${e.clientX + window.scrollX}px`;
  foreignObjectCompass.style.y = `${e.clientY + window.scrollY}px`;
  foreignObjectCompass.style.width = "1px";
  foreignObjectCompass.style.height = "1px";
  foreignObjectCompass.setAttribute("id", uid);
  foreignObjectCompass.setAttribute("overflow", "visible");

  foreignObjectCompass.appendChild(compassWidget);
  const dragDiv = document.createElement("div");
  dragDiv.innerHTML =
    '<img src="./assets/DRAG.svg" class="dragLogo" height="30" draggable="false" ></img>';
  dragDiv.classList.add("drag-widget");
  foreignObjectCompass.appendChild(compassWidget).appendChild(dragDiv);
  Tools.group.appendChild(foreignObjectCompass);

  createDrag.addDrag(dragDiv, foreignObjectCompass);
  const crossDiv = document.createElement("div");
  crossDiv.innerHTML =
    '<img src="./assets/x-circle.svg" class="dragLogo" height="30" draggable="false" ></img>';

  crossDiv.classList.add("cross-div");

  foreignObjectCompass.appendChild(crossDiv);

  crossDiv.addEventListener("click", () => widgetRemove(uid));

  //makeDraggeble(foreignObjectCompass);

  var svgNS = "http://www.w3.org/2000/svg";
  var svg = document.getElementById("compassWidget");

  var pointer = document.createElementNS(svgNS, "polygon");
  pointer.setAttributeNS(null, "points", "150,0 155,12 145,12");
  pointer.setAttributeNS(null, "fill", "red");
  svg.appendChild(pointer);

  var c = document.createElementNS(svgNS, "circle");
  c.setAttributeNS(null, "cx", 150);
  c.setAttributeNS(null, "cy", 150);
  c.setAttributeNS(null, "r", 20);
  c.setAttributeNS(null, "fill", "black");
  c.setAttributeNS(null, "fill-opacity", 0.1);
  svg.appendChild(c);

  drawCenterLine(150, 100, 150, 200);
  drawCenterLine(100, 150, 200, 150);
  drawCardinalDirection(143, 72, "N");
  drawCardinalDirection(228, 158, "E");
  drawCardinalDirection(143, 242, "S");
  drawCardinalDirection(58, 158, "W");

  for (var i = 0; i < 360; i += 2) {
    // draw degree lines
    var s = "grey";
    if (i == 0 || i % 30 == 0) {
      w = 3;
      s = "white";
      y2 = 50;
    } else {
      w = 1;
      y2 = 45;
    }

    var l1 = document.createElementNS(svgNS, "line");
    l1.setAttributeNS(null, "x1", 150);
    l1.setAttributeNS(null, "y1", 30);
    l1.setAttributeNS(null, "x2", 150);
    l1.setAttributeNS(null, "y2", y2);
    l1.setAttributeNS(null, "stroke", s);
    l1.setAttributeNS(null, "stroke-width", w);
    l1.setAttributeNS(null, "transform", "rotate(" + i + ", 150, 150)");
    svg.appendChild(l1);

    // draw degree value every 30 degrees
    if (i % 30 == 0) {
      var t1 = document.createElementNS(svgNS, "text");
      if (i > 100) {
        t1.setAttributeNS(null, "x", 140);
      } else if (i > 0) {
        t1.setAttributeNS(null, "x", 144);
      } else {
        t1.setAttributeNS(null, "x", 147);
      }
      t1.setAttributeNS(null, "y", 24);
      t1.setAttributeNS(null, "font-size", "11px");
      t1.setAttributeNS(null, "font-family", "Helvetica");
      t1.setAttributeNS(null, "fill", "grey");
      t1.setAttributeNS(null, "style", "letter-spacing:1.0");
      t1.setAttributeNS(null, "transform", "rotate(" + i + ", 150, 150)");
      var textNode = document.createTextNode(i);
      t1.appendChild(textNode);
      svg.appendChild(t1);
    }
  }

  function drawCenterLine(x1, y1, x2, y2) {
    var centreLineHorizontal = document.createElementNS(svgNS, "line");
    centreLineHorizontal.setAttributeNS(null, "x1", x1);
    centreLineHorizontal.setAttributeNS(null, "y1", y1);
    centreLineHorizontal.setAttributeNS(null, "x2", x2);
    centreLineHorizontal.setAttributeNS(null, "y2", y2);
    centreLineHorizontal.setAttributeNS(null, "stroke", "grey");
    centreLineHorizontal.setAttributeNS(null, "stroke-width", 1);
    centreLineHorizontal.setAttributeNS(null, "stroke-opacity", 0.5);
    svg.appendChild(centreLineHorizontal);
  }

  function drawCardinalDirection(x, y, displayText) {
    var direction = document.createElementNS(svgNS, "text");
    direction.setAttributeNS(null, "x", x);
    direction.setAttributeNS(null, "y", y);
    direction.setAttributeNS(null, "font-size", "20px");
    direction.setAttributeNS(null, "font-family", "Helvetica");
    direction.setAttributeNS(null, "fill", "black");
    var textNode = document.createTextNode(displayText);
    direction.appendChild(textNode);
    svg.appendChild(direction);
  }

  // Start the auto-rotation

  const compass = document.getElementById("compassWidget");
  const arrow = document.getElementById("arrow");

  let rotationAngle = 0;
  let rotateSpeed = 1; // Adjust this value to control the rotation speed

  // function rotateArrow() {
  //   rotationAngle += rotateSpeed;
  //   arrow.setAttribute('transform', `rotate(${rotationAngle} 200 200)`);
  //   requestAnimationFrame(rotateArrow);
  // }

  // Start the auto-rotation
  const center = { x: 150, y: 150 };

  //const center = { x: 200, y: 200 };
  arrow.setAttribute("x1", center.x);
  arrow.setAttribute("y1", center.y);
  arrow.setAttribute("x2", center.x);
  arrow.setAttribute("y2", center.y - 100);

  // Start the auto-rotation
  function updateRotation(event) {
    const mouseX = event.clientX - compass.getBoundingClientRect().left;
    const mouseY = event.clientY - compass.getBoundingClientRect().top;
    const deltaX = mouseX - center.x;
    const deltaY = mouseY - center.y;
    rotationAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
    arrow.setAttribute(
      "transform",
      `rotate(${rotationAngle} ${center.x} ${center.y})`
    );
  }
  function updateRotationTouch(event) {
    const touch = event.touches[0];
    const mouseX = touch.clientX - compass.getBoundingClientRect().left;
    const mouseY = touch.clientY - compass.getBoundingClientRect().top;
    const deltaX = mouseX - center.x;
    const deltaY = mouseY - center.y;
    rotationAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
    arrow.setAttribute(
      "transform",
      `rotate(${rotationAngle} ${center.x} ${center.y})`
    );
  }

  compass.addEventListener("mousemove", updateRotation);
  compass.addEventListener("touchstart", updateRotationTouch);

  //rotateArrow();
};

const MagnifyingGlass = () => {
  function magnify(imgID, zoom) {
    var img, glass, w, h, bw, parentGlass;
    img = document.getElementById(imgID);
    /*create magnifier glass:*/
    glass = document.createElement("DIV");
    parentGlass = document.createElement("div");
    parentGlass.classList.add("parent-glass");
    glass.setAttribute("class", "img-magnifier-glass");
    glass.setAttribute("id", "magnifying-glass");
    (glass.style.top = "30vw"),
      (glass.style.left = "60vh"),
      /*insert magnifier glass:*/
      parentGlass.appendChild(glass);
    img.parentElement.insertBefore(parentGlass, img);

    const maginifyingBtn = document.createElement("button");
    maginifyingBtn.setAttribute("id", "btn-magnifying");
    maginifyingBtn.classList.add("maginifying-btn");
    maginifyingBtn.innerHTML = '<img src="./assets/CloseCircle.svg" ></img>';
    glass.appendChild(maginifyingBtn);

    //clear the Magnigfying class

    maginifyingBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const MagnifyingGlass = document.getElementsByClassName(
        "img-magnifier-glass"
      );
      MagnifyingGlass.length >= 1 ? parentGlass.remove() : "";
    });
    maginifyingBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const MagnifyingGlass = document.getElementsByClassName(
        "img-magnifier-glass"
      );
      MagnifyingGlass.length >= 1 ? parentGlass.remove() : "";
    });

    function addMouoseMove(e) {
      e.preventDefault();
      e.stopPropagation();

      const getVisibleArea = getVisibleViewport();
      img = document.getElementById(imgID);

      // html2canvas(img, {
      //   x: window.scrollX,
      //   y: window.scrollY,
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      // }).then(function (res) {
      //   var canvasURL = res.toDataURL("image/jpg");
      //   console.log(canvasURL, "utl");
      //   glass.style.backgroundImage = "url('" + canvasURL + "')";
      // });
      domtoimage
        .toJpeg(img, {
          height: window.innerHeight,
          width: window.innerWidth,
          bgcolor: "#fff",
        })
        .then(function (res) {
          glass.style.backgroundImage = "url('" + res + "')";
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });

      /*set background properties for the magnifier glass:*/
      glass.style.backgroundRepeat = "no-repeat";
      // glass.style.backgroundSize =
      //   img.width * zoom + "px " + img.height * zoom + "px";
      bw = 3;
      w = glass.offsetWidth / 2;
      h = glass.offsetHeight / 2;
      /*execute a function when someone moves the magnifier glass over the image:*/
      glass.addEventListener("mousemove", moveMagnifier);
      img.addEventListener("mousemove", moveMagnifier);
      /*and also for touch screens:*/
      glass.addEventListener("touchmove", moveMagnifier);
      img.addEventListener("touchmove", moveMagnifier);

      function moveMagnifier(e) {
        /*prevent any other actions that may occur when moving over the image*/
        e.preventDefault();
        e.stopPropagation();

        var pos, x, y;
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /*prevent the magnifier glass from being positioned outside the image:*/
        if (x > img.width - w / zoom) {
          x = img.width - w / zoom;
        }
        if (x < w / zoom) {
          x = w / zoom;
        }
        if (y > img.height - h / zoom) {
          y = img.height - h / zoom;
        }
        if (y < h / zoom) {
          y = h / zoom;
        }
        /*set the position of the magnifier glass:*/
        glass.style.left = x - w + "px";
        glass.style.top = y - h + "px";
        /*display what the magnifier glass "sees":*/
        glass.style.backgroundPosition =
          "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
        glass.style.backgroundSize = `${getVisibleArea.width * zoom}px ${
          getVisibleArea.height * zoom
        }px`;
      }
      function getCursorPos(e) {
        e.preventDefault();
        e.stopPropagation();

        window.event.preventDefault();
        var a,
          x = 0,
          y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX || e.touches[0]?.pageX - a.left;
        y = e.pageY || e.touches[0]?.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
      }

      function stopDragging(e) {
        e.preventDefault();
        e.stopPropagation();
        glass.removeEventListener("mousemove", moveMagnifier);
        img.removeEventListener("mousemove", moveMagnifier);
        glass.removeEventListener("touchmove", moveMagnifier);
        img.removeEventListener("touchmove", moveMagnifier);
      }
      glass.addEventListener("mouseup", stopDragging);
      glass.addEventListener("touchend", stopDragging);
      window.addEventListener("mouseup", () => {
        glass.removeEventListener("mousemove", moveMagnifier);
        img.removeEventListener("mousemove", moveMagnifier);
      });
      window.addEventListener("touchend", () => {
        glass.removeEventListener("touchmove", moveMagnifier);
        img.removeEventListener("touchmove", moveMagnifier);
      });
    }

    glass.addEventListener("mousedown", addMouoseMove);
    glass.addEventListener("touchstart", addMouoseMove);
  }
  magnify("board", 1.5);
};

const calculatorWidget = (e) => {
  createDrag = new Draggable();

  const calculatorForeignObject = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject"
  );

  const calculatorWidgetElement = document.createElement("div");
  let uid = Tools.generateUID("doc");

  const calculatorHTML = ` 
  <div id="calculatorWidget">
<input type="text" id="result" disabled="true" ></input>
<div>
<button id="number7" class="calc-btn">7</button>
<button id="number8" class="calc-btn">8</button>
<button id="number9" class="calc-btn">9</button>
<button id="ClearButton" class="calc-btn">C</button>
<button id="number4" class="calc-btn">4</button>
<button id="number5" class="calc-btn">5</button>
<button id="number6" class="calc-btn">6</button>
<button id="multiply" class="calc-btn">*</button>
<button id="number1" class="calc-btn">1</button>
<button id="number2" class="calc-btn">2</button>
<button id="number3" class="calc-btn">3</button>
<button id="divide" class="calc-btn">/</button>
<button id="number0" class="calc-btn">0</button>
<button id="decimal" class="calc-btn">.</button>
<button id="subtract" class="calc-btn">-</button>
<button id="add" class="calc-btn">+</button>
<button id="calculate" class="calc-btn">=</button>
</div>
</div>`;

  calculatorWidgetElement.innerHTML = calculatorHTML;
  calculatorForeignObject.style.x = `${e.clientX + window.scrollX}px`;
  calculatorForeignObject.style.y = `${e.clientY + window.scrollY}px`;
  // calculatorForeignObject.style.x = e.clientX;
  // calculatorForeignObject.style.y = e.clientY;
  calculatorForeignObject.style.width = "1px";
  calculatorForeignObject.style.height = "1px";
  calculatorForeignObject.setAttribute("id", uid);
  calculatorForeignObject.setAttribute("overflow", "visible");

  calculatorForeignObject.appendChild(calculatorWidgetElement);
  const dragDiv = document.createElement("div");
  dragDiv.innerHTML =
    '<img src="./assets/DRAG.svg" class="dragLogo" height="30" draggable="false" ></img>';
  dragDiv.classList.add("drag-widget");
  calculatorForeignObject.appendChild(dragDiv);

  createDrag.addDrag(dragDiv, calculatorForeignObject);

  const crossDiv = document.createElement("div");
  crossDiv.innerHTML =
    '<img src="./assets/x-circle.svg" class="dragLogo" height="30" draggable="false" ></img>';

  crossDiv.classList.add("cross-div");

  calculatorForeignObject.appendChild(crossDiv);

  crossDiv.addEventListener("click", () => widgetRemove(uid));

  Tools.group.appendChild(calculatorForeignObject);

  // Number Event Listeneres
  document.querySelector("#number9").addEventListener("click", () => {
    appendToResult("9");
  });
  document.getElementById("number8").addEventListener("click", () => {
    appendToResult("8");
  });
  document.getElementById("number7").addEventListener("click", () => {
    appendToResult("7");
  });
  document.getElementById("number6").addEventListener("click", () => {
    appendToResult("6");
  });
  document.getElementById("number5").addEventListener("click", () => {
    appendToResult("5");
  });
  document.getElementById("number4").addEventListener("click", () => {
    appendToResult("4");
  });
  document.getElementById("number3").addEventListener("click", () => {
    appendToResult("3");
  });
  document.getElementById("number2").addEventListener("click", () => {
    appendToResult("2");
  });
  document.getElementById("number1").addEventListener("click", () => {
    appendToResult("1");
  });

  // Buttons Event Listeners
  document.getElementById("calculate").addEventListener("click", () => {
    calculate();
  });
  document.getElementById("ClearButton").addEventListener("click", () => {
    clearResult();
  });
  document.getElementById("add").addEventListener("click", () => {
    appendToResult("+");
  });
  document.getElementById("subtract").addEventListener("click", () => {
    appendToResult("-");
  });
  document.getElementById("decimal").addEventListener("click", () => {
    appendToResult(".");
  });
  document.getElementById("divide").addEventListener("click", () => {
    appendToResult("/");
  });
  document.getElementById("multiply").addEventListener("click", () => {
    appendToResult("*");
  });

  var expression = "";
  var resultElement = document.getElementById("result");

  function appendToResult(value) {
    expression += value;
    resultElement.value = expression;
  }

  function calculate() {
    try {
      const result = eval(expression);
      expression = result.toString();
      resultElement.value = result;
    } catch (error) {
      expression = "";
      resultElement.value = "Invalid Input";
    }
  }

  function clearResult() {
    expression = "";
    resultElement.value = "";
  }
};

const diceWidget = (e) => {
  createDrag = new Draggable();
  const diceforeignObject = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject"
  );

  const dicewidgetElement = document.createElement("div");
  dicewidgetElement.id = "diceWidget";
  let uid = Tools.generateUID("doc");

  const dicewidgetHTML = ` 
  <svg id="dice" viewBox="0 0 100 100">
  <rect class="dice" x="10" y="10" width="80" height="80" rx="10" />
  <g id="dots-container">
    <circle class="dot" cx="50" cy="50" r="6" /> <!-- Center dot -->
    <circle class="dot" cx="25" cy="25" r="6" />
    <circle class="dot" cx="50" cy="25" r="6" />
    <circle class="dot" cx="75" cy="25" r="6" />
    <circle class="dot" cx="25" cy="75" r="6" />
    <circle class="dot" cx="75" cy="75" r="6" />
  </g>
</svg>



<button id="rollButton">Roll Dice</button>
 `;

  dicewidgetElement.innerHTML = dicewidgetHTML;

  diceforeignObject.style.x = `${e.clientX + window.scrollX}px`;
  diceforeignObject.style.y = `${e.clientY + window.scrollY}px`;
  // diceforeignObject.style.x = e.clientX;
  // diceforeignObject.style.y = e.clientY;
  diceforeignObject.style.width = "1px";
  diceforeignObject.style.height = "1px";
  diceforeignObject.setAttribute("id", uid);
  diceforeignObject.setAttribute("overflow", "visible");

  diceforeignObject.appendChild(dicewidgetElement);

  const dragDiv = document.createElement("div");
  dragDiv.innerHTML =
    '<img src="./assets/DRAG.svg" class="dragLogo" height="30" draggable="false" ></img>';
  dragDiv.classList.add("drag-widget");

  diceforeignObject.appendChild(dragDiv);

  createDrag.addDrag(dragDiv, diceforeignObject);

  const crossDiv = document.createElement("div");

  crossDiv.innerHTML =
    '<img src="./assets/x-circle.svg" class="dragLogo" height="30" draggable="false" ></img>';

  crossDiv.classList.add("cross-div");

  diceforeignObject.appendChild(crossDiv);

  crossDiv.addEventListener("click", () => widgetRemove(uid));

  Tools.group.appendChild(diceforeignObject);

  const dice = document.getElementById("dice");
  const dotsContainer = document.getElementById("dots-container");
  const rollButton = document.getElementById("rollButton");

  rollButton.addEventListener("click", rollDice);

  function rollDice() {
    const dots = document.getElementsByClassName("dot");
    dotsContainer.style.display = "block";

    // Hide all dots initially
    for (let i = 0; i < dots.length; i++) {
      dots[i].style.display = "none";
    }

    // Show random number of dots (1 to 6)
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    for (let i = 0; i < randomNumber; i++) {
      dots[i].style.display = "block";
    }

    // Special cases for number on dice
    if (randomNumber === 1) {
      dots[0].setAttribute("cx", 50);
      dots[0].setAttribute("cy", 50);
    } else if (randomNumber === 2) {
      dots[0].setAttribute("cx", 25);
      dots[0].setAttribute("cy", 25);

      dots[1].setAttribute("cx", 75);
      dots[1].setAttribute("cy", 75);
    } else if (randomNumber === 3) {
      dots[0].setAttribute("cx", 25);
      dots[0].setAttribute("cy", 25);

      dots[1].setAttribute("cx", 50);
      dots[1].setAttribute("cy", 50);

      dots[2].setAttribute("cx", 75);
      dots[2].setAttribute("cy", 75);
    } else if (randomNumber === 4) {
      dots[0].setAttribute("cx", 25);
      dots[0].setAttribute("cy", 25);

      dots[1].setAttribute("cx", 75);
      dots[1].setAttribute("cy", 25);

      dots[2].setAttribute("cx", 25);
      dots[2].setAttribute("cy", 75);

      dots[3].setAttribute("cx", 75);
      dots[3].setAttribute("cy", 75);
    } else if (randomNumber === 5) {
      dots[0].setAttribute("cx", 25);
      dots[0].setAttribute("cy", 25);

      dots[1].setAttribute("cx", 75);
      dots[1].setAttribute("cy", 25);

      dots[2].setAttribute("cx", 25);
      dots[2].setAttribute("cy", 75);

      dots[3].setAttribute("cx", 75);
      dots[3].setAttribute("cy", 75);

      dots[4].setAttribute("cx", 50);
      dots[4].setAttribute("cy", 50);
    } else if (randomNumber === 6) {
      dots[0].setAttribute("cx", 25);
      dots[0].setAttribute("cy", 25);

      dots[1].setAttribute("cx", 25);
      dots[1].setAttribute("cy", 50);

      dots[2].setAttribute("cx", 25);
      dots[2].setAttribute("cy", 75);

      dots[3].setAttribute("cx", 75);
      dots[3].setAttribute("cy", 25);

      dots[4].setAttribute("cx", 75);
      dots[4].setAttribute("cy", 50);

      dots[5].setAttribute("cx", 75);
      dots[5].setAttribute("cy", 75);
    }
  }
};

const stopWatchWidget = (e) => {
  createDrag = new Draggable();

  const stopWatchforeignObject = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject"
  );

  const stopwatchWidgetElement = document.createElement("div");
  stopwatchWidgetElement.id = "stopwatchWidget";
  let uid = Tools.generateUID("doc");

  const stopwatchWidgetHTML = `
  <div id="display">00:00:00</div>
  <div id="controls">
    <button id="startButton">Start</button>
    <button id="stopButton">Stop</button>
    <button id="resetButton">Reset</button>
  </div>`;

  stopwatchWidgetElement.innerHTML = stopwatchWidgetHTML;
  stopWatchforeignObject.style.x = `${e.clientX + window.scrollX}px`;
  stopWatchforeignObject.style.y = `${e.clientY + window.scrollY}px`;
  // stopWatchforeignObject.style.x = e.clientX;
  // stopWatchforeignObject.style.y = e.clientY;
  stopWatchforeignObject.style.width = "1px";
  stopWatchforeignObject.style.height = "1px";
  stopWatchforeignObject.setAttribute("id", uid);
  stopWatchforeignObject.setAttribute("overflow", "visible");

  stopWatchforeignObject.appendChild(stopwatchWidgetElement);

  Tools.group.appendChild(stopWatchforeignObject);
  const dragDiv = document.createElement("div");
  dragDiv.innerHTML =
    '<img src="./assets/DRAG.svg" class="dragLogo" height="30" draggable="false" ></img>';
  dragDiv.classList.add("drag-widget");

  stopWatchforeignObject.appendChild(dragDiv);

  createDrag.addDrag(dragDiv, stopWatchforeignObject);
  const crossDiv = document.createElement("div");
  crossDiv.innerHTML =
    '<img src="./assets/x-circle.svg" class="dragLogo" height="30" draggable="false" ></img>';

  crossDiv.classList.add("cross-div");

  stopWatchforeignObject.appendChild(crossDiv);

  crossDiv.addEventListener("click", () => widgetRemove(uid));
  //make draggable
  //makeDraggeble(stopWatchforeignObject);

  let startTime = null;
  let elapsedTime = 0;
  let timerId = null;
  let isRunning = false;

  let displayElement = document.getElementById("display");

  let startButton = document.getElementById("startButton");
  let stopButton = document.getElementById("stopButton");
  let resetButton = document.getElementById("resetButton");

  function start() {
    if (!isRunning) {
      startTime = Date.now() - elapsedTime;
      timerId = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
      }, 10);
      isRunning = true;
    }
  }

  function stop() {
    if (isRunning) {
      clearInterval(timerId);
      isRunning = false;
    }
  }

  function reset() {
    elapsedTime = 0;
    updateDisplay();
  }

  function updateDisplay() {
    const minutes = Math.floor(elapsedTime / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((elapsedTime % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const milliseconds = Math.floor((elapsedTime % 1000) / 10)
      .toString()
      .padStart(2, "0");

    const timeString = `${minutes}:${seconds}:${milliseconds}`;
    displayElement.textContent = timeString;
  }

  startButton.addEventListener("click", () => start());
  stopButton.addEventListener("click", () => stop());
  resetButton.addEventListener("click", () => reset());
};

const protractorWidget = (e) => {
  console.log("protractor", e);
  createDrag = new Draggable();

  const protractorforeignObject = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject"
  );
  const protractorWidgetElement = document.createElement("div");
  protractorWidgetElement.id = "protractorWidget";
  let uid = Tools.generateUID("doc");

  const protractorWidgetHTML = `
    <div class="protractor-parent">
      <div class="rotational-container">
        <div class="rotational-division">
          <input type="text" id="rotation-angle" value="0°"></input>
        </div>
      </div>
    </div>`;

  protractorWidgetElement.innerHTML = protractorWidgetHTML;

  protractorforeignObject.style.x = `${e.clientX + window.scrollX}px`;
  protractorforeignObject.style.y = `${e.clientY + window.scrollY}px`;
  // protractorforeignObject.style.x = e.clientX;
  // protractorforeignObject.style.y = e.clientY;
  protractorforeignObject.style.width = "1px";
  protractorforeignObject.style.height = "1px";
  protractorforeignObject.setAttribute("id", uid);
  protractorforeignObject.setAttribute("overflow", "visible");

  protractorforeignObject.appendChild(protractorWidgetElement);

  Tools.group.appendChild(protractorforeignObject);
  const dragDiv = document.createElement("div");
  dragDiv.innerHTML =
    '<img src="./assets/DRAG.svg" class="dragLogo" height="30" draggable="false"></img>';
  dragDiv.classList.add("drag-widget");

  protractorforeignObject.appendChild(dragDiv);
  createDrag.addDrag(dragDiv, protractorforeignObject);

  const crossDiv = document.createElement("div");
  crossDiv.innerHTML =
    '<img src="./assets/x-circle.svg" class="dragLogo" height="30" draggable="false" ></img>';

  crossDiv.classList.add("cross-div");

  foreignObjectCompass.appendChild(crossDiv);

  crossDiv.addEventListener("click", () => widgetRemove(uid));
  //makeDraggeble(protractorforeignObject);

  // Make the widget draggable
  // let isDragging = false;
  // let initialMouseX = 0;
  // let initialMouseY = 0;
  // let initialImageX = 0;
  // let initialImageY = 0;

  // protractorforeignObject.addEventListener("mousedown", (e) => {
  //   isDragging = true;
  //   initialMouseX = e.clientX;
  //   initialMouseY = e.clientY;
  //   initialImageX = parseInt(protractorforeignObject.style.x);
  //   initialImageY = parseInt(protractorforeignObject.style.y);
  // });

  // document.addEventListener("mousemove", (e) => {
  //   if (isDragging) {
  //     const deltaX = e.clientX - initialMouseX;
  //     const deltaY = e.clientY - initialMouseY;
  //     const newX = initialImageX + deltaX;
  //     const newY = initialImageY + deltaY;
  //     protractorforeignObject.style.x = newX + "px";
  //     protractorforeignObject.style.y = newY + "px";
  //   }
  // });

  // document.addEventListener("mouseup", () => {
  //   isDragging = false;
  // });

  // Prevent automatic changing of input field while dragging
  $(document).ready(function () {
    const rotationalContainer = $(".rotational-container");
    const rotationalDiv = $(".rotational-division");
    const rotationAngleInput = $("#rotation-angle");
    let initialAngle = 0;
    let rotationAngle = 0;

    rotationalContainer.on("mousedown", function (e) {
      isDragging = true;
      initialAngle = Math.atan2(
        e.clientY - window.innerHeight / 2,
        e.clientX - window.innerWidth / 2
      );
    });

    // $(document).on("mousemove", function (e) {
    //   if (isDragging) {
    //     const newAngle = Math.atan2(
    //       e.clientY - window.innerHeight / 2,
    //       e.clientX - window.innerWidth / 2
    //     );
    //     let newRotationAngle =
    //       rotationAngle + ((newAngle - initialAngle) * 180) / Math.PI;
    //     newRotationAngle = (newRotationAngle + 360) % 360; // Ensure value in the range of 0 to 360 degrees
    //     rotationalDiv.css("transform", `rotate(${newRotationAngle}deg)`);
    //     rotationAngle = newRotationAngle;
    //     if (!isDragging) {
    //       // Only update input field value when dragging stops
    //       rotationAngleInput.val(`${Math.round(rotationAngle)}°`);
    //     }
    //     initialAngle = newAngle;
    //   }
    // });

    rotationAngleInput.on("input", function () {
      const inputValue = parseInt(rotationAngleInput.val());
      if (!isNaN(inputValue)) {
        let newRotationAngle = inputValue % 360;
        if (newRotationAngle < 0) newRotationAngle += 360;
        rotationalDiv.css("transform", `rotate(${newRotationAngle}deg)`);
        rotationAngle = newRotationAngle;
      }
    });

    // $(document).on("mouseup", function () {
    //   isDragging = false;
    // });
  });
};

// ruler widget

// Event listeners for drawing lines
function startDraw(e) {
  if (e.target === centeredDiv) {
    isDrawing = true;
    startY = e.clientY - centeredDiv.getBoundingClientRect().top;
  }
}

function stopDraw() {
  isDrawing = false;
}

const rulerWidget = (e) => {
  console.log("ruler", e);
  createDrag = new Draggable();

  const rulerforeignObject = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject"
  );
  const rulerWidgetElement = document.createElement("div");

  rulerWidgetElement.id = "rulerWidget";
  let uid = Tools.generateUID("doc");

  const rulerWidgetHTML = `
  <div id="canvas-container">      
    <div id="parent-div">
        <div id="element-one">
            <canvas id="myCanvas" width="868" height="8"></canvas>
        </div>
        <div id="ruler-tool"></div>
    </div>
  </div>`;

  rulerWidgetElement.innerHTML = rulerWidgetHTML;

  rulerforeignObject.style.x = `${e.clientX + window.scrollX}px`;
  rulerforeignObject.style.y = `${e.clientY + window.scrollY}px`;
  // rulerforeignObject.style.x = e.clientX;
  // rulerforeignObject.style.y = e.clientY;
  rulerforeignObject.style.width = "1px";
  rulerforeignObject.style.height = "1px";
  rulerforeignObject.setAttribute("id", uid);
  rulerforeignObject.setAttribute("overflow", "visible");

  rulerforeignObject.appendChild(rulerWidgetElement);

  Tools.group.appendChild(rulerforeignObject);

  //makeDraggeble(rulerforeignObject);
  const dragDiv = document.createElement("div");
  dragDiv.innerHTML =
    '<img src="./assets/DRAG.svg" class="dragLogo" height="30" draggable="false"></img>';
  dragDiv.classList.add("drag-widget");

  rulerforeignObject.appendChild(dragDiv);

  const crossDiv = document.createElement("div");
  crossDiv.innerHTML =
    '<img src="./assets/x-circle.svg" class="dragLogo" height="30" draggable="false" ></img>';

  crossDiv.classList.add("cross-div");

  rulerforeignObject.appendChild(crossDiv);

  crossDiv.addEventListener("click", () => widgetRemove(uid));

  createDrag.addDrag(dragDiv, rulerforeignObject);
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  let isDrawing = false;
  let lineColor = "#f00"; // Default line color (black)
  let lineThickness = 3; // Default line thickness

  document
    .getElementById("element-one")
    .addEventListener("mousedown", startDrawing);
  document.getElementById("element-one").addEventListener("mousemove", draw);
  document
    .getElementById("element-one")
    .addEventListener("mouseup", stopDrawing);

  function startDrawing(e) {
    isDrawing = true;
    const bounds = e.target.getBoundingClientRect();
    const offsetX = e.clientX - bounds.left;
    const offsetY = e.clientY - bounds.top;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineThickness;
  }

  function draw(e) {
    if (!isDrawing) return;
    const bounds = e.target.getBoundingClientRect();
    const offsetX = e.clientX - bounds.left;
    const offsetY = e.clientY - bounds.top;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  }

  function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
  }
};

const roundCompassWidget = (e) => {
  console.log("roundCompass", e);
  createDrag = new Draggable();

  const roundCompassforeignObject = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject"
  );
  const roundCompassWidgetElement = document.createElement("div");

  roundCompassWidgetElement.id = "roundCompassWidget";
  let uid = Tools.generateUID("doc");

  const roundCompassWidgetHTML = `
  <div class="rounded-compass ">
<div class="rounded-compass-input" style="display:"block">
<div style="display:flex;margin-bottom: 11px;">
<label for="radius" style="color: red;">Radius:</label>
<input type="number" id="radius" min="0" max="10" step="0.1px" value="4.5" style="color: red; margin: -4px 0px 0px 8px;">
</div>
<div style="display:flex">
    <label for="degree" style="color: green;">Degree:</label>
    <input
      type="number"
      id="degree"
      min="0"
      max="360"
      value="0"
      style="color: green;margin: -4px 0px 0px 8px;"
    />
    </div>
    </div>

    <canvas id="canvas-roundcompass"> </canvas>
    </div>
    `;

  roundCompassWidgetElement.innerHTML = roundCompassWidgetHTML;

  roundCompassforeignObject.style.x = `${e.clientX + window.scrollX}px`;
  roundCompassforeignObject.style.y = `${e.clientY + window.scrollY}px`;
  // roundCompassforeignObject.style.x = e.clientX;
  // roundCompassforeignObject.style.y = e.clientY;
  roundCompassforeignObject.style.width = "1px";
  roundCompassforeignObject.style.height = "1px";
  roundCompassforeignObject.setAttribute("id", uid);
  roundCompassforeignObject.setAttribute("overflow", "visible");

  roundCompassforeignObject.appendChild(roundCompassWidgetElement);

  const crossDiv = document.createElement("div");
  crossDiv.innerHTML =
    '<img src="./assets/x-circle.svg" class="dragLogo" height="30" draggable="false" ></img>';

  crossDiv.classList.add("cross-div");

  roundCompassforeignObject.appendChild(crossDiv);

  crossDiv.addEventListener("click", () => widgetRemove(uid));

  Tools.group.appendChild(roundCompassforeignObject);

  //makeDraggeble(roundCompassforeignObject);
  const dragDiv = document.createElement("div");
  dragDiv.innerHTML =
    '<img src="./assets/DRAG.svg" class="dragLogo" height="30" draggable="false"></img>';
  dragDiv.classList.add("drag-widget");

  roundCompassWidgetElement.appendChild(dragDiv);

  createDrag.addDrag(dragDiv, roundCompassforeignObject);

  const canvas = document.getElementById("canvas-roundcompass");
  const ctx = canvas.getContext("2d");

  const radiusInput = document.getElementById("radius");
  const degreeInput = document.getElementById("degree");

  let radius = parseFloat(radiusInput.value);
  let degree = parseInt(degreeInput.value);

  let isDragging = false;
  let prevX = 0;

  function drawArc() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the arc/circle

    ctx.beginPath();

    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      radius * 25,
      0,
      (degree * Math.PI) / 180
    );
    ctx.strokeStyle = "green";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
    // Draw the radius line
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    const endX =
      canvas.width / 2 + radius * 25 * Math.cos((degree * Math.PI) / 180);
    const endY =
      canvas.height / 2 + radius * 25 * Math.sin((degree * Math.PI) / 180);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  canvas.addEventListener("mousedown", (e) => {
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;

    const deltaX = x - canvas.width / 2;
    const deltaY = y - canvas.height / 2;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Check if the click is within the radius
    if (distance <= radius * 50) {
      isDragging = true;
      prevX = x;
    }
  });

  canvas.addEventListener("mouseup", () => {
    isDragging = false;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const x = e.clientX - canvas.getBoundingClientRect().left;
      const y = e.clientY - canvas.getBoundingClientRect().top;
      const deltaX = x - canvas.width / 2;
      const deltaY = y - canvas.height / 2;

      // Calculate the angle from the x-axis to the current point
      let newDegree = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
      if (newDegree < 0) {
        newDegree += 360;
      }

      degree = newDegree;
      degreeInput.value = Math.round(degree);
      drawArc();
    }
  });

  radiusInput.addEventListener("input", () => {
    radius = parseFloat(radiusInput.value);
    drawArc();
  });

  degreeInput.addEventListener("input", () => {
    degree = parseInt(degreeInput.value);
    drawArc();
  });

  canvas.addEventListener("mouseover", () => {
    if (!isDragging) {
      canvas.style.cursor = "pointer"; // Set the custom cursor when hovering over the radius
    }
  });

  canvas.addEventListener("mouseout", () => {
    if (!isDragging) {
      canvas.style.cursor = "default"; // Reset to the default pointer when not hovering over the radius
    }
  });

  drawArc();
};

// function makeDraggeble(parentRef) {
//   let isDragging = false;
//   let initialMouseX = 0;
//   let initialMouseY = 0;
//   let initialImageX = 0;
//   let initialImageY = 0;
//   // for mouse events
//   parentRef.addEventListener("mousedown", (e) => {
//     isDragging = true;
//     initialMouseX = e.clientX;
//     initialMouseY = e.clientY;
//     initialImageX = parseInt(parentRef.style.x);
//     initialImageY = parseInt(parentRef.style.y);
//   });

//   document.addEventListener("mousemove", (e) => {
//     if (isDragging) {
//       const deltaX = e.clientX - initialMouseX;
//       const deltaY = e.clientY - initialMouseY;
//       const newX = initialImageX + deltaX;
//       const newY = initialImageY + deltaY;
//       parentRef.style.x = newX + "px";
//       parentRef.style.y = newY + "px";
//     }
//   });

//   document.addEventListener("mouseup", () => {
//     isDragging = false;
//     parentRef.removeEventListener("mousedown", (e) => {
//       isDragging = true;
//       initialMouseX = e.clientX;
//       initialMouseY = e.clientY;
//       initialImageX = parseInt(parentRef.style.x);
//       initialImageY = parseInt(parentRef.style.y);
//     });
//     document.removeEventListener("mousemove", (e) => {
//       if (isDragging) {
//         const deltaX = e.clientX - initialMouseX;
//         const deltaY = e.clientY - initialMouseY;
//         const newX = initialImageX + deltaX;
//         const newY = initialImageY + deltaY;
//         parentRef.style.x = newX + "px";
//         parentRef.style.y = newY + "px";
//       }
//     });
//   });

//   // for touch events
//   let touch;
//   parentRef.addEventListener("touchstart", (e) => {
//     touch = e.touches[0];
//     isDragging = true;
//     initialMouseX = touch.clientX;
//     initialMouseY = touch.clientY;
//     initialImageX = parseInt(parentRef.style.x);
//     initialImageY = parseInt(parentRef.style.y);
//   });

//   document.addEventListener("touchmove", (e) => {
//     touch = e.touches[0];
//     if (isDragging) {
//       const deltaX = touch.clientX - initialMouseX;
//       const deltaY = touch.clientY - initialMouseY;
//       const newX = initialImageX + deltaX;
//       const newY = initialImageY + deltaY;
//       parentRef.style.x = newX + "px";
//       parentRef.style.y = newY + "px";
//     }
//   });

//   document.addEventListener("touchend", () => {
//     isDragging = false;
//   document.removeEventListener("touchmove", (e) => {
//     if (isDragging) {
//       const deltaX = e.clientX - initialMouseX;
//       const deltaY = e.clientY - initialMouseY;
//       const newX = initialImageX + deltaX;
//       const newY = initialImageY + deltaY;
//       parentRef.style.x = newX + "px";
//       parentRef.style.y = newY + "px";
//     }
//   });
//   parentRef.removeEventListener("touchstart", (e) => {
//     touch = e.touches[0];
//     isDragging = true;
//     initialMouseX = touch.clientX;
//     initialMouseY = touch.clientY;
//     initialImageX = parseInt(parentRef.style.x);
//     initialImageY = parseInt(parentRef.style.y);
//   });
//   });
// }

// set the image background to view port width

function getVisibleViewport() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;

  // Calculate the visible area of the viewport
  const visibleWidth = Math.min(
    viewportWidth,
    document.documentElement.clientWidth || document.body.clientWidth
  );
  const visibleHeight = Math.min(
    viewportHeight,
    document.documentElement.clientHeight || document.body.clientHeight
  );

  // Calculate the visible area's position relative to the document
  const visibleTop = Math.max(scrollY, 0);
  const visibleLeft = Math.max(scrollX, 0);
  const visibleBottom = Math.min(
    scrollY + visibleHeight,
    document.documentElement.scrollHeight || document.body.scrollHeight
  );
  const visibleRight = Math.min(
    scrollX + visibleWidth,
    document.documentElement.scrollWidth || document.body.scrollWidth
  );

  // Calculate the dimensions of the visible area
  const visibleAreaWidth = visibleRight - visibleLeft;
  const visibleAreaHeight = visibleBottom - visibleTop;

  return {
    width: visibleAreaWidth,
    height: visibleAreaHeight,
    top: visibleTop,
    left: visibleLeft,
    bottom: visibleBottom,
    right: visibleRight,
  };
}

function toggleDiv(className) {
  const div = document.querySelector(`.${className}`);
  if (div.style.display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}

const setSquareWidget = (e) => {
  console.log("setSquare", e);
  createDrag = new Draggable();

  const setSquareforeignObject = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject"
  );
  const setSquareWidgetElement = document.createElement("div");

  setSquareWidgetElement.id = "setSquareWidget";
  let uid = Tools.generateUID("doc");

  const setSquareWidgetHTML = `
  <div class="setSqaure">
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
    <button
      onclick="toggleDiv('triangle-container-two')"
      style="background-color: yellowgreen; border: none; border-radius: 8px; padding: 12px; font-weight: 600; cursor: pointer;">(30,
      60, 90)</button>
    <button onclick="toggleDiv('triangle-container')"
      style="background-color: beige; border: none; border-radius: 8px; padding: 12px; font-weight: 600; cursor: pointer;">(45,
      45, 90)</button>
  </div>

  <div class="triangle-container-two" id="rotatableContainerTwo">
    <div class="triangle-two" id="rotatableTriangleTwo"></div>
    <div class="input-container-two">
      <input type="number" id="rotationInputTwo" min="0" max="360" value="0" ></input>
    </div>
  </div>

  <div class="triangle-container" id="rotatableContainer">
    <div class="triangle" id="rotatableTriangle"></div>
    <div class="input-container setSquare-input-two">
      <input type="number" id="rotationInput" min="0" max="360" value="0" ></input>
    </div>
  </div>
  </div>`;

  setSquareWidgetElement.innerHTML = setSquareWidgetHTML;
  // set the image background to view port width

  setSquareforeignObject.style.x = `${e.clientX + window.scrollX}px`;
  setSquareforeignObject.style.y = `${e.clientY + window.scrollY}px`;
  // setSquareforeignObject.style.x = e.clientX;
  // setSquareforeignObject.style.y = e.clientY;
  setSquareforeignObject.style.width = "1px";
  setSquareforeignObject.style.height = "1px";
  setSquareforeignObject.setAttribute("id", uid);
  setSquareforeignObject.setAttribute("overflow", "visible");

  setSquareforeignObject.appendChild(setSquareWidgetElement);

  Tools.group.appendChild(setSquareforeignObject);
  //makeDraggeble(setSquareforeignObject);
  const dragDiv = document.createElement("div");
  dragDiv.innerHTML =
    '<img src="./assets/DRAG.svg" class="dragLogo" height="30" draggable="false"></img>';
  dragDiv.classList.add("drag-widget");

  setSquareforeignObject.appendChild(dragDiv);

  const crossDiv = document.createElement("div");
  crossDiv.innerHTML =
    '<img src="./assets/x-circle.svg" class="dragLogo" height="30" draggable="false" ></img>';

  crossDiv.classList.add("cross-div");

  setSquareforeignObject.appendChild(crossDiv);

  crossDiv.addEventListener("click", () => widgetRemove(uid));

  createDrag.addDrag(dragDiv, setSquareforeignObject);
  // for 30-60 set-square

  const containerTwo = document.getElementById("rotatableContainerTwo");
  const triangleTwo = document.getElementById("rotatableTriangleTwo");
  const inputTwo = document.getElementById("rotationInputTwo");

  let isDraggingTwo = false;
  let startAngleTwo = 0;
  let containerRotationTwo = 0;

  function rotateContainerTwo(event) {
    if (!isDraggingTwo) return;

    const x = event.clientX;
    const y = event.clientY;
    const rect = containerTwo.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    let rotationTwo = angle - startAngleTwo + containerRotationTwo;
    rotationTwo %= 360;
    if (rotationTwo < 0) {
      rotationTwo += 360;
    }
    containerTwo.style.transform = `rotate(${rotationTwo}deg)`;
    inputTwo.value = Math.round(rotationTwo);
  }

  triangleTwo.addEventListener("mousedown", (event) => {
    event.preventDefault();
    isDraggingTwo = true;
    const x = event.clientX;
    const y = event.clientY;
    const rect = containerTwo.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    startAngleTwo = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    containerRotationTwo =
      parseFloat(
        containerTwo.style.transform.replace("rotate(", "").replace("deg)", "")
      ) || 0;
  });

  document.addEventListener("mousemove", rotateContainerTwo);

  document.addEventListener("mouseup", () => {
    isDraggingTwo = false;
  });

  inputTwo.addEventListener("input", () => {
    let rotationTwo = parseInt(inputTwo.value) || 0;
    rotationTwo = Math.max(0, Math.min(rotationTwo, 360));
    containerTwo.style.transform = `rotate(${rotationTwo}deg)`;
    containerRotationTwo = rotationTwo;
    inputTwo.value = rotationTwo;
  });

  // for 45-45 set-square
  const container = document.getElementById("rotatableContainer");
  const triangle = document.getElementById("rotatableTriangle");
  const input = document.getElementById("rotationInput");

  let isDragging = false;
  let startAngle = 0;
  let containerRotation = 0;

  function rotateContainer(event) {
    if (!isDragging) return;

    const x = event.clientX;
    const y = event.clientY;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    let rotation = angle - startAngle + containerRotation;
    rotation %= 360;
    if (rotation < 0) {
      rotation += 360;
    }
    container.style.transform = `rotate(${rotation}deg)`;
    input.value = Math.round(rotation);
  }

  triangle.addEventListener("mousedown", (event) => {
    event.preventDefault();
    isDragging = true;
    const x = event.clientX;
    const y = event.clientY;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    startAngle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    containerRotation =
      parseFloat(
        container.style.transform.replace("rotate(", "").replace("deg)", "")
      ) || 0;
  });

  document.addEventListener("mousemove", rotateContainer);

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  input.addEventListener("input", () => {
    let rotation = parseInt(input.value) || 0;
    rotation = Math.max(0, Math.min(rotation, 360));
    container.style.transform = `rotate(${rotation}deg)`;
    containerRotation = rotation;
    input.value = rotation;
  });
};
