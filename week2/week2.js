
function week2() {
    const images = [
        "week2/src/Desktop1.png",
        "week2/src/Desktop2.png",
        "week2/src/Desktop3.png",
        "week2/src/Desktop4.png",
        "week2/src/Desktop5.png",
        "week2/src/Desktop6.png",
        "week2/src/Desktop7.png",
        "week2/src/Desktop8.png",
        "week2/src/Desktop9.png",
        "week2/src/Desktop10.png",
        "week2/src/Desktop11.png",
        "week2/src/Desktop12.png",
        "week2/src/Desktop13.png",
        "week2/src/Desktop14.png",
        "week2/src/Desktop15.png",
        "week2/src/Desktop16.png"
    ]; 

    gallery.innerHTML = ""; 
    note.innerHTML ="";
    note.style.background="#f884e8";
    note.style.color="black";

    images.forEach((imgSrc,index) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.classList.add("gallery-item"); 
        setTimeout(() => {
            img.classList.add("show"); // Trigger animation
        }, index * 150); // Adjust time gap for smoother effect
        gallery.appendChild(img);
    });

    note.innerHTML=`
    <h3>week 2 note</h3>
    <hr>

  <h3>Reading</h3>
  <ul>
    <li><strong>Are We Human?</strong> by Beatriz Colomina and Mark Wigley</li>
  </ul>

  <p>
    Brings in an interesting interpretation of design in the context of tool making.
  </p>
  <blockquote>
    “The human is the only species that has tools that don't work, which is paradoxically the origin of its intelligence.”
  </blockquote>

  <p>
    However, I don’t know if I would call the multiplicity as design capacity design, as a way of planning, and as something always coming with an intention. I feel the action of impulse–instinct–desire is at odds with the word design.
  </p>

  <blockquote>
    “Design was framed as a way to deal with the increasingly dominant logic of the industrialized and globalized world while resisting the perceived dehumanizing impact of that world.”
  </blockquote>

  <p>
    The central motivation of my degree project: designer as failed promises.
  </p>
  <ul>
  <li><strong>Capital Volume One: Chapter Fifteen – Machinery and Modern Industry</strong> by Karl Marx</li>
  </ul>
  <p>
    The Marx reading critiques capital machinery, where the advancement of technology does not liberate labor, but furthers alienation.
  </p>

  <h3>Interview</h3>
  <ul>
    <li>With Lois Harada at DWRI</li>
    <li>Providence Journal Printing Plant visit</li>
  </ul>
    `
    
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
        currentIndex = images.length1; 
    }

    const galleryImage = document.getElementById("gallery-image");
    galleryImage.style.opacity = 0; 

    setTimeout(() => {
        galleryImage.src = images[currentIndex]; 
        galleryImage.style.opacity = 1; 
    }, 300); 
}