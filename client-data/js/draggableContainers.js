
console.log("MAIN", $("image"));
$("image").draggable({
  containment: "parent",
  stop: function (event, ui) {
    var x = ui.position.left;
    var y = ui.position.top;
    console.log("NEW TOOL X COORDINATE", x);
    console.log("NEW TOOL Y COORDINATE", y);
  },
});

$("image").on("click", function (event) {
  var x = event.pageX;
  var y = event.pageY;
  console.log("IMAGE X", x, " Y ", y);

  $("#d1").html("X Coordinate: " + x + ", Y Coordinate: " + y);
});
