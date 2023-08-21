

const btn = document.getElementById('toogle-tranparency')

btn.addEventListener("click",changeSVG)

function changeSVG(e){
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    const svg = document.getElementById('rect_1')
    svg.classList.toggle("toggle-white")
}