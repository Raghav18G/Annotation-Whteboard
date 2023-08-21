$(document).ready(() => {
  const element = `
    <svg class="close__meeting" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon points="23 1.36 21.64 0 11.5 10.14 1.36 0 0 1.36 10.14 11.5 0 21.64 1.36 23 11.5 12.86 21.64 23 23 21.64 12.86 11.5 23 1.36"/></g></g></svg>`;
  $("#top_left_tools").append(element);
  const toolExtender = `
<?xml version="1.0" encoding="iso-8859-1"?>
<svg version="1.1" id="Capa_1" class="extend_tools" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 256 256" style="enable-background:new 0 0 256 256;" xml:space="preserve">
<g>
	<g>
		<polygon points="128,48.907 0,176.907 30.187,207.093 128,109.28 225.813,207.093 256,176.907 		"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
    `;
  if (window.screen.width <= 845) {
    $("body").append(toolExtender);
    $(
      "#toolID-Undo, #toolID-Redo, #toolID-Clear + .tool, #toolID-Clear"
    ).addClass("hideExtenders");
  }
  $("body").on("click", ".extend_tools", () => {
    $(
      "#toolID-Undo, #toolID-Redo, #toolID-Clear + .tool, #toolID-Clear"
    ).toggleClass("hideExtenders");
  });
});
