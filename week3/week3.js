function week3(){
    const images = [
        "week3/p1.jpg",
        "week3/p2.jpg"
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
    note.style.background="#ffff8f";
    note.style.color="black";
    note.innerHTML=`
    <h3> week 3 note </h3>
    <hr>
    <p>
    I have always dreamed of myself being part of the machinery, a machinery owned by everyone, thus no one truly owns it. Being part of the whole should never be considered boring or pathetic, but quite releasing and fun. As the rotation of the body runs by the natural habit, this labor uses its own way to directly contribute to the bigger community, to the utopia world all watched by the machine of loving grace.
  </p>

  <p>
    Designer has been expected to make the machine humane, to envision the world of elysium. The potential power and possibility brought by being a designer has led me to step into the realm of graphic design, thinking if there is something so great that I can contribute to with my interest in visual and figurative expression.
  </p>

  <p>
    —yet the dream falls into a false promise. The machinery driven by the capital has no grace, but only exploits the body to an extreme by design, not excluding the designers; our body has been torn into the parts of the mass machinery–lands have been stripped away from the hands of labor, words have been scattered, connections have been destroyed. There is no point to be a graphic designer, when the visual has only become a lobbyist of the system. Nothing left for the designer to be critical.
  </p>

  <p>
    I have no intention to resist the machinery in a “designer is powerless and machines are inevitably evil so we should all go back to agricultural society (though this is not a bad option)” way, but it's important to figure out our position at the moment, as a visual maker that is heavily dependent on technology. After all, designers often forget that design is merely a segment of the production, not to mention most of our design process is still an act of printing. Everyone has been so trivial in front of the system, yet to be part of everyone is the only way to act with resistance.
  </p>

  <p>
    I do not believe in the power of design, but the visual language could be meaningful when it’s bound with community. So forget about the utopia dream, what about now?
  </p>

    `
}