function week5() {
    const images = [
        "week5/p1.jpg",
        "week5/p2.jpg",
        "week5/p3.jpg",
        "week5/p4.jpg",
        "week5/p5.jpg"
    ]; 

    gallery.innerHTML = ""; 
    note.innerHTML ="";
    note.style.background="#88d4f8";
    gallery.style.background = "black";
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
    <h3> week 5 note </h3>
    <hr>
    <h3>Absurdity — Failure of the Machine, Body, and Mind</h3>

  <h3>Reading</h3>
  <p><strong>Dancing with the System</strong> by Donella Meadows</p>

  <blockquote>
    <p>1. Get the beat.<br>
    2. Listen to the wisdom of the system.<br>
    3. Expose your mental models to the open air.<br>
    4. Stay humble. Stay a learner.<br>
    5. Honor and protect information.<br>
    6. Locate responsibility in the system.<br>
    7. Make feedback policies for feedback systems.<br>
    8. Pay attention to what is important, not just what is quantifiable.<br>
    9. Go for the good of the whole.<br>
    10. Expand time horizons.<br>
    11. Expand thought horizons.<br>
    12. Expand the boundary of caring.<br>
    13. Celebrate complexity.<br>
    14. Hold fast to the goal of goodness.</p>
  </blockquote>

  <p>
    Connecting to Caroline Sinders’ <em>Making Critical, Ethical Software: Feminist Data Set</em>
  </p>

    `
}
