class Draggable {
    constructor() {
        this.position = null,
            this.changePosition = null

    }

    addDrag(dragDiv,parentRef) {
        let isDragging = false;
        let initialMouseX = 0;
        let initialMouseY = 0;
        let initialImageX = 0;
        let initialImageY = 0;
        // for mouse events

        this.position = (e) => {
            e = e.touches?.[0] ?? e
            isDragging = true;
            initialMouseX = e.clientX;
            initialMouseY = e.clientY;
            initialImageX = parseInt(parentRef.style.x);
            initialImageY = parseInt(parentRef.style.y);
        }

        dragDiv.addEventListener("mousedown", this.position);


        this.changePosition = (e) => {
            e = e.touches?.[0] ?? e
            if (isDragging) {
                const deltaX = e.clientX - initialMouseX;
                const deltaY = e.clientY - initialMouseY;
                const newX = initialImageX + deltaX;
                const newY = initialImageY + deltaY;
                parentRef.style.x = newX + "px";
                parentRef.style.y = newY + "px";
            }
        }
       
        document.addEventListener("mousemove", this.changePosition);

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });

        // for touch events

        dragDiv.addEventListener("touchstart", this.position);

        document.addEventListener("touchmove", this.changePosition);

        document.addEventListener("touchend", () => {
            isDragging = false;
        });
    }

    removeDrag(parentRef) {

        console.log(parentRef, "remove listner");
        
        parentRef.removeEventListener("mousedown", this.position);

        document.removeEventListener("mousemove", this.changePosition);

       
        // Remove for touch as well 

        parentRef.removeEventListener("touchstart", this.position);

        document.removeEventListener("touchmove", this.changePosition);
    }
}