(function StickyNotes() {
  var stickNotesSVG =
    '<svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" id="sticky-notes-9" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><path id="secondary" d="M17,7V20a1,1,0,0,1-1,1H9V15H3V8A2,2,0,0,1,5,6H16A1,1,0,0,1,17,7Z" style="fill: rgb(44, 169, 188); stroke-width: 2;"></path><path id="primary" d="M17,7V20a1,1,0,0,1-1,1H9L3,15V7A1,1,0,0,1,4,6H16" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path><path id="primary-2" data-name="primary" d="M9,15v6L3,15ZM20,5a2,2,0,0,1-2,2h0a2,2,0,0,1-2-2h0a2,2,0,0,1,2-2h0a2,2,0,0,1,2,2ZM16.59,6.41,14,9" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></svg>';
  function onStart() {
    document.getElementById("stickyNotesModal").style.display = "block";
    document.getElementById("stickyClose").addEventListener("click", () => {
      document.getElementById("stickyNotesModal").style.display = "none";
    });
  }

  Tools.add({
    name: "StickyNotes",
    // "icon": "🖼️",
    iconHTML: stickNotesSVG,
    shortcuts: {
      changeTool: "n",
    },
    //   draw: draw,
    onstart: onStart,
    oneTouch: true,
  });
})();
