$(document).ready(() => {
  const mice = `<svg class="mice__record" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 23"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M12,13V6A6,6,0,0,0,0,6v7a6,6,0,0,0,5.05,5.92V21H0v2H12V21H7V18.91A6,6,0,0,0,12,13ZM2,13V6a4,4,0,0,1,8,0v7a4,4,0,0,1-8,0Z"/></g></g></svg>`;
  const muteMice = `

  <svg class="mice__mute" xmlns="http://www.w3.org/2000/svg" width="18.385" height="23.193" viewBox="0 0 18.385 23.193">
  <g id="Group_17289" data-name="Group 17289" transform="translate(-87.809 -181.807)">
    <path id="Subtraction_1" data-name="Subtraction 1" d="M17097.023,19635.023h-12v-2h5.051v-2.084a5.942,5.942,0,0,1-3.168-1.559l1.414-1.414a4,4,0,0,0,6.707-2.945v-3.76l2-2v5.762a6,6,0,0,1-5,5.912v2.09h5v2Zm-12-12.246v-4.756a6,6,0,0,1,9.578-4.822l-1.439,1.439a4,4,0,0,0-6.139,3.383v2.756l-2,2Z" transform="translate(-16994.023 -19430.023)"/>
    <rect id="Rectangle_5799" data-name="Rectangle 5799" width="24" height="2" transform="translate(87.809 198.777) rotate(-45)"/>
  </g>
</svg>

  `;
  const container = `
    <div class="mice__container">
   ${muteMice}
    </div>
    `;
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const token = urlParams.get("token");
  // if (token) {
  $("#top_left_tools").append(container);
  // }
  $("body").on("click", ".mice__mute", () => {
    $(".mice__container").empty().append(mice);
  });
  $("body").on("click", ".mice__record", () => {
    $(".mice__container").empty().append(muteMice);
  });
});
