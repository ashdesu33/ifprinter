
function week2() {
    const gr = document.getElementById("process-graph").style.display="none";
    const images = [
        "week2/src/Desktop - 1.png",
        "week2/src/Desktop - 2.png",
        "week2/src/Desktop - 3.png",
        "week2/src/Desktop - 4.png",
        "week2/src/Desktop - 5.png",
        "week2/src/Desktop - 6.png",
        "week2/src/Desktop - 7.png",
        "week2/src/Desktop - 8.png",
        "week2/src/Desktop - 9.png",
        "week2/src/Desktop - 10.png",
        "week2/src/Desktop - 11.png",
        "week2/src/Desktop - 12.png",
        "week2/src/Desktop - 13.png",
        "week2/src/Desktop - 14.png",
        "week2/src/Desktop - 15.png",
        "week2/src/Desktop - 16.png"
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
let currentIndex = 0;

function startGallery() {
    const galleryImage = document.getElementById("gallery-image");
    galleryImage.src = images[currentIndex]; // Load the first image
}

function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = images.length - 1; 
    }

    const galleryImage = document.getElementById("gallery-image");
    galleryImage.style.opacity = 0; 

    setTimeout(() => {
        galleryImage.src = images[currentIndex]; 
        galleryImage.style.opacity = 1; 
    }, 300); 
}