
// hover effect
const nav = document.getElementById("nav-section");
const sections = document.querySelectorAll("section[id]");

document.addEventListener('DOMContentLoaded', () => {
  const listenCursor = document.createElement('div');
  listenCursor.id = 'listen-cursor';
  listenCursor.textContent = 'listen...';
  document.body.appendChild(listenCursor);

  const targets = document.querySelectorAll('[id^="respond-"]');
  console.log(targets);
  targets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      listenCursor.style.display = 'block';
    });
    el.addEventListener('mouseleave', () => {
      listenCursor.style.display = 'none';
    });
    el.addEventListener('mousemove', (e) => {
      listenCursor.style.left = e.clientX + 'px';
      listenCursor.style.top = (e.clientY) + 'px';
    });
  });
});


// pic gallery

const gallery = document.querySelector('.interview-gallery');
const headings = document.querySelectorAll('section h3');
let lastLoaded = null;

function updateGalleryOnScroll() {
  let loaded = false;

  headings.forEach((h3, index) => {
    const rect = h3.getBoundingClientRect();

    // First heading: fade out if it's far from top
    if (index === 0 && rect.top > window.innerHeight * 0.2) {
      gallery.classList.remove('show');
      lastLoaded = null;
      loaded = true;
      return;
    }

    // Only load if h3 is near top and different from last loaded
    if (!loaded && Math.abs(rect.top) < 100 && h3 !== lastLoaded) {
      const rawTitle = h3.textContent.trim();
      const safeTitle = rawTitle.replace(/\s+/g, '-');
      const imageName = `bob_src/${safeTitle}.jpg`;

      const img = document.createElement('img');
      img.src = imageName;
      img.alt = rawTitle;

      // Fade out old image first
      gallery.classList.remove('show');
      setTimeout(() => {
        gallery.innerHTML = '';
        gallery.appendChild(img);
        gallery.classList.add('show');
      }, 200); // wait for fade-out before replacing

      lastLoaded = h3;
      loaded = true;
    }
  });
}

window.addEventListener('scroll', updateGalleryOnScroll);
window.addEventListener('DOMContentLoaded', updateGalleryOnScroll);



// section for nav

sections.forEach(section => {
  const sectionId = section.id;
  const mainLabel = section.querySelector("h2")?.innerText || sectionId;

  // ⬇️ Create main section label as <div>
  const mainDiv = document.createElement("div");
  mainDiv.innerText = mainLabel;
  mainDiv.classList.add("nav-main");
  nav.appendChild(mainDiv);

  // Handle subsections (assume h3 elements with IDs)
  const subsections = section.querySelectorAll("h3[id]");
  subsections.forEach((sub, index) => {
    const subId = sub.id;

    const subBtn = document.createElement("button");
    subBtn.innerText = "↳ " + subId;
    subBtn.classList.add("nav-sub");
    subBtn.onclick = () => {
      document.getElementById(subId).scrollIntoView({ behavior: "smooth" });
    };
    nav.appendChild(subBtn);

    // If last subsection, add a spacer
    if (index === subsections.length - 1) {
      const spacer = document.createElement("div");
      spacer.classList.add("nav-spacer");
      nav.appendChild(spacer);
    }
  });

  // If no subsections, still add spacer after main label
  if (subsections.length === 0) {
    const spacer = document.createElement("div");
    spacer.classList.add("nav-spacer");
    nav.appendChild(spacer);
  }
});

const respondElements = document.querySelectorAll('[id^="respond-"]');
let currentPlaying = null;

respondElements.forEach(container => {
  const audio = container.querySelector("audio");
  const progressBar = container.querySelector(".progressBar");
  const timestamp = container.querySelector(".timestamp");
  const paragraphs = container.querySelectorAll("p.answer");
  let allWords = [];

  let hasEnded = false;

  // Step 1: Wrap all words in span.word
  paragraphs.forEach(paragraph => {
    const words = paragraph.innerText.trim().split(/\s+/);
    paragraph.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
    allWords = allWords.concat(Array.from(paragraph.querySelectorAll(".word")));
  });

  container.addEventListener("click", () => {
    const isSameAudio = currentPlaying === audio;

    // Case: different audio clicked
    if (!isSameAudio) {
      if (currentPlaying) {
        currentPlaying.pause();
        currentPlaying.container.classList.remove("active");
        currentPlaying = null;
      }

      // Play the new one without resetting time or highlight
      audio.play();
      currentPlaying = audio;
      audio.container = container;
      container.classList.add("active");
      hasEnded = false;
    } else {
      // Case: click same container again
      if (audio.paused && hasEnded) {
        // Restart playback + reset highlight
        resetHighlight(allWords);
        audio.currentTime = 0;
        audio.play();
        hasEnded = false;
      } else if (audio.paused) {
        // Resume
        audio.play();
      } else {
        // Pause
        audio.pause();
      }
    }
  });



  // audio clip 

  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration);
    const totalWords = allWords.length;
    const currentWordIndex = Math.floor(progress * totalWords);

    allWords.forEach((span, i) => {
      if (i < currentWordIndex) {
        span.style.color = "black";
        span.style.background = "#FFFF8F";
      } else {
        span.style.color = "#999";
        span.style.background = "transparent";
      }
    });

    if (progressBar) progressBar.style.width = `${progress * 100}%`;
    if (timestamp) timestamp.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  });

  audio.addEventListener("ended", () => {
    hasEnded = true;
    if (progressBar) progressBar.style.width = "100%";
    container.classList.remove("active");
    currentPlaying = null;
  });

  audio.addEventListener("loadedmetadata", () => {
    if (timestamp) timestamp.textContent = `00:00 / ${formatTime(audio.duration)}`;
  });
});

function resetHighlight(words) {
  words.forEach(span => {
    span.style.color = "black";
    span.style.background = "transparent";
  });
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

