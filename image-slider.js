const initSlider = () => {
    const imageList = document.querySelector(".slider.image-list");
    const slideButtons = document.querySelector(".slider.slider-button");
    const slideScrollbar = document.querySelector(".container .slide-scrollbar");
    const scrollbarThumb =  slideScrollbar.querySelector(".scrollbar-thumb");
    const maxscrollLeft = imageList.scrollWidth - imageList.clientWidth;

}

scrollbarThumb.addEventListener("mousedown",(e)=>{
    const startX = e.clientX;
    const  thumbPosition = scrollbarThumb.offsetLeft;

    const handleMouseMove = (e) => {  // update thumb position on mouse move
        const deltaX =e.clientX - startX;
        const newThumbPosition = thumbPosition + deltaX;
        const maxThumbPosition = slideScrollbar.getboundingclientReact().width - scrollbarThumb.offsetLeft;


        const boundedPosition = Math.max(0,Math.min(maxThumbPosition,newThumbPosition));
        const scrollPosition = (boundedPosition/maxThumbPosition) * maxscrollLeft


    

        scrollbarThumb.style.left = `${newThumbPosition}px`;
        imageList.scrollLeft = scrollPosition;
    }


     const handleMouseUp = () => {
        document.removeEventListener("mousemove",handleMouseMove);
    document.removeEventListener("mouseup",handleMouseUp);
     }


    document.addEventListener("mousemove",handleMouseMove);
    document.addEventListener("mouseup",handleMouseUp);
});

// slide images accroding to the slide button clicks
slideButton.forEach(button => {
    button.addEventListener("click",() => {
        const direction = button.id =="prev-slide" ? -1 : -1;
        const scrollAmount = imageList.clientWidth * direction;
        imageList.scrollBy({left:scrollAmount,behavior:"smooth"});
    })
});

const handleSlideButtons = () => {
    slideButtons[0].style.display =imageList.scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display =imageList.scrollLeft >= maxscrollLeft ? "none" : "block";
}

// update Scrollbar thumb positon based on image scroll
const updateScrollThumbPosition = () =>{
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition/maxscrollLeft) *(slideScrollbar.clientWidth -scrollbarThumb.offsetWidth)
    scrollbarThumb.style.left= `${thumbPosition}px`;
}


imageList.addEventListener("scroll",() => {
    handleSlideButtons();
    updateScrollThumbPosition()
})
