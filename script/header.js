let header = "";
const headerContainer= document.querySelector('.header').innerHTML;
header = `
    <p id="header-home" onclick="home()">If every body is a printer</p>
    <p id="header-directory"> about </p>
`
document.querySelector('.header').innerHTML = header;


function createCheckerboard() {
    const container = document.getElementById("checkerboard");
    container.innerHTML = ""; 

    const unitSize = window.innerWidth / 60; 
    const numUnits = Math.ceil(window.innerWidth / unitSize);

    for (let i = 0; i < numUnits; i++) {
        const unit = document.createElement("div");
        unit.classList.add("checker-unit");
        unit.style.width = `${unitSize}px`;
        unit.style.height = `${unitSize}px`;
        unit.style.border = 'solid 1px'
        unit.style.backgroundColor = i % 2 === 0 ? "black" : " #CBCBD9;";
        container.appendChild(unit);
    }
}

function home(){
    window.location.href = '/';
}


function createIndex(){
    const container = document.querySelector(".index-dataset");
    container.innerHTML = ""; 
    const cmykColors = ["#00FFFF", "#FF00FF", "#FFFF00", "#000000"];

    const unitSize = Math.min(window.innerWidth * 0.12,80); 
    const title = document.createElement("div");
    title.classList.add("index-logtitle");
    title.innerHTML='WEEKLY \n LOG'
    container.appendChild(title);

    const index_container = document.createElement("div");
    index_container.classList.add("index-button-container");


    for (let i = 0; i < 10; i++) {
        const unit = document.createElement("button");
        unit.onclick = () => window[`week${i+1}`]();
        unit.innerHTML = `${i+1}`;
        unit.classList.add("index-button");
        unit.style.width = `${unitSize}px`;
        unit.style.height = `${unitSize}px`;
        unit.style.paddingLeft = `5px`;
        unit.style.border = 'solid 1px rgb(63, 63, 69)'


        const colorBar = document.createElement("div");
        colorBar.style.width = "${unitSize}px";
        colorBar.style.height = "5px";
        colorBar.style.backgroundColor = cmykColors[i%4];
        colorBar.style.marginTop = "5px";


        unit.appendChild(colorBar);
        index_container.appendChild(unit);
        
    }
    container.appendChild(index_container);
}

window.onload = createCheckerboard;
window.onresize = createCheckerboard;
createIndex();

function smoothLoad(){
barba.init({
    transitions: [{
      async leave({ current }) {
        console.log("hello");
        current.container.classList.add('page-transition-leave');
        await new Promise(resolve => {
          current.container.classList.add('page-transition-leave-active');
          setTimeout(resolve, 800); // Match transition duration
        });
      },
      async enter({ next }) {
        next.container.classList.add('page-transition-enter');
        await new Promise(resolve => requestAnimationFrame(() => {
          next.container.classList.add('page-transition-enter-active');
          setTimeout(resolve, 800);
        }));
      },
      async once({ next }) {
        next.container.classList.add('page-transition-enter');
        await new Promise(resolve => requestAnimationFrame(() => {
          next.container.classList.add('page-transition-enter-active');
          setTimeout(resolve, 800);
        }));
      }
    }]
  });
}