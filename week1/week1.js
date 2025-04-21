const public = document.querySelector(".content-dataset");
const gallery = document.querySelector(".gallery");
const note = document.querySelector(".notes");
function week1() {
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

    gallery.innerHTML = ""; 
    note.innerHTML='';

    images.forEach((imgSrc,index) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.classList.add("gallery-item"); 
        setTimeout(() => {
            img.classList.add("show"); // Trigger animation
        }, index * 150); // Adjust time gap for smoother effect
        gallery.appendChild(img);
    });
    gallery.style.background="black";
    note.style.background="#88d4f8";
    note.style.color="black";
    note.innerHTML = `
    <h3>week 1 note</h3>
    <hr>
      <h3>Places</h3>
  <ul>
    <li>Presses</li>
    <li>Studio</li>
    <li>HTML</li>
  </ul>

  <h3>Objects</h3>
  <ul>
    <li>Printer</li>
    <li>LED screen</li>
    <li>Autographic Ink</li>
  </ul>

  <h3>Abstract Qualities</h3>
  <ul>
    <li>Accessibility</li>
    <li>Reproduction</li>
    <li>Framing</li>
  </ul>

  <h3>Visual Qualities</h3>
  <ul>
    <li>Scattered</li>
    <li>Collages</li>
    <li>Textured</li>
  </ul>

  <h3>Hardware</h3>
  <ul>
    <li>Paper Clip</li>
    <li>Single Hole Puncher</li>
    <li>Screws</li>
  </ul>
    <h3>Thinking About the Mechanical Revolution</h3>
  <p><strong>The Work of Art in the Age of Mechanical Reproduction</strong> by Walter Benjamin</p>
  <blockquote>
    “Over long periods of history, the mode of human sense perception changes with humanity’s entire mode of existence. The manner in which human sense perception is organized, the medium in which it is accomplished, is determined not only by nature but by historical circumstance as well.”
  </blockquote>

  <p><strong>Signs for Labor Value in Printed Pictures after the Photomechanical Revolution</strong> by Tom Gretton.</p>
  <p>When the mode has more manual reproduction, the more obvious the signs of labor value are. Mechanical Reproduction (the current) is more in a “not worth demystifying signs of labour values” state.</p>

  <h3>Visual References</h3>
  <ul>
    <li>Things to Say (Viktor)</li>
    <li>The Birth Canal of Graphic Design</li>
  </ul>

    `;

}