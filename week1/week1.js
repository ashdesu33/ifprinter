const public = document.querySelector(".content-dataset");
function week1() {
    const gr = document.getElementById("process-graph").style.display="none";
    const images = [
        "week1/src/Frame 1.png",
        "week1/src/Frame 2.png",
        "week1/src/Frame 3.png",
        "week1/src/Frame 4.png",
        "week1/src/Frame 5.png",
        "week1/src/Frame 6.png",
        "week1/src/Frame 7.png",
        "week1/src/Frame 8.png",
        "week1/src/Frame 9.png"
    ]; 

    public.innerHTML = ""; 

    images.forEach((imgSrc,index) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.classList.add("gallery-item"); 
        setTimeout(() => {
            img.classList.add("show"); // Trigger animation
        }, index * 150); // Adjust time gap for smoother effect
        public.appendChild(img);
    });
}