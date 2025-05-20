async function loadInterviewFromMarkdown(mdPath) {
  const response = await fetch(mdPath);
  const text = await response.text();
  const lines = text.split('\n');

  const container = document.querySelector('.interview');
  let currentSection = null;
  let currentSubsection = null;
  let question = '', audio = '', image = '', answers = [];
  let lastQuestion = '', respondId = 1;
  const respondImageMap = {};
  let imageCaption = '';

  function flushEntry() {
    if (answers.length === 0) {
      audio = '';
      image = '';
      imageCaption = '';
      return;
    }

    const div = document.createElement('div');
    div.id = `respond-${respondId}`;

    const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    div.appendChild(timestamp);

    if (audio) {
      const audioEl = document.createElement('audio');
      audioEl.src = audio;
      audioEl.setAttribute('preload', 'auto');
      div.appendChild(audioEl);
    }

    if (question && question !== lastQuestion) {
      const q_container = document.createElement('div');
      const q = document.createElement('p');
      q_container.className = 'question';
      q.innerText = question;
      q_container.appendChild(q);
      if (currentSubsection) currentSubsection.appendChild(q_container);
      lastQuestion = question;
    }

    answers.forEach(ans => {
      const p = document.createElement('p');
      p.className = 'answer';
      p.innerHTML = `<span>${ans}</span>`;
      div.appendChild(p);
    });

    if (currentSubsection) currentSubsection.appendChild(div);

    if (image) {
      const webpPath = image.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      respondImageMap[div.id] = {
        webp: webpPath,
        fallback: image,
        caption: imageCaption
      };
    }
    

    audio = '';
    image = '';
    answers = [];
    respondId++;
  }

  for (let line of lines) {
    line = line.trim();
    if (line.startsWith('## ')) {
      flushEntry();
      currentSection = document.createElement('section');
      const title = line.substring(3);
      currentSection.id = title;
      const h2 = document.createElement('h2');
      h2.innerText = title;
      currentSection.appendChild(h2);
      container.appendChild(currentSection);
    } else if (line.startsWith('### ')) {
      flushEntry();
      const subtitle = line.substring(4);
      currentSubsection = document.createElement('div');
      const h3 = document.createElement('h3');
      h3.id = subtitle.replace(/\s+/g, '-');
      h3.innerText = subtitle;
      currentSubsection.appendChild(h3);
      if (currentSection) currentSection.appendChild(currentSubsection);
      lastQuestion = '';
    } else if (line.startsWith('**Audio:**')) {
      audio = line.split('**Audio:**')[1].trim();
    } else if (line.startsWith('**Image:**')) {
      image = line.split('**Image:**')[1].trim();
    } else if (line.startsWith('#### ')) {
      flushEntry();
      question = line.substring(5);
    } else if (line.startsWith('**Image_caption:**')) {
      imageCaption = line.split('**Image_caption:**')[1].trim();
    }
    else if (line === '---') {
      flushEntry();
    } else if (line.length > 0 && line !== '___') {
      answers.push(line);
    }
  }

  flushEntry();
  window.respondImageMap = respondImageMap;
  initializeInteractions();
}

let lastRenderedId = null;

function updateGalleryOnScroll() {
  const gallery = document.querySelector('.interview-gallery');
  const responds = document.querySelectorAll('[id^="respond-"]');
  const imageMap = window.respondImageMap || {};
  let currentIndex = -1;

  for (let i = 0; i < responds.length; i++) {
    const rect = responds[i].getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.5) {
      currentIndex = i;
    }
  }

  if (currentIndex === -1) {
    gallery.classList.remove('show');
    return;
  }

  const currentEl = responds[currentIndex];
  const nextEl = responds[currentIndex + 1];

  const currentId = currentEl.id;
  if (lastRenderedId === currentId) return;

  lastRenderedId = currentId;

  const currentData = imageMap[currentId];
  if (!currentData) {
    gallery.classList.remove('show');
    return;
  }

  const { webp: currentImgPath, fallback: currentFallback, caption: currentCaption } = currentData;


  gallery.classList.add('show');
  // Create or reuse current image

  
  let currentPic = gallery.querySelector('.current-image');
let currentCaptionEl = gallery.querySelector('.image-caption');

if (!currentPic) {
  currentPic = createImgWithFallback(currentImgPath, currentFallback, 'current-image', currentId);
  gallery.appendChild(currentPic);
} else {
  currentPic.querySelector('source').srcset = currentImgPath;
  currentPic.querySelector('img').src = currentFallback;
}

if (!currentCaptionEl) {
  currentCaptionEl = document.createElement('div');
  currentCaptionEl.className = 'image-caption';
  gallery.appendChild(currentCaptionEl);
}

currentCaptionEl.innerText = currentCaption || '';
  if (!currentPic) {
    currentPic = createImgWithFallback(currentImgPath, currentFallback, 'current-image', currentId);
    gallery.appendChild(currentPic);
  } else {
    currentPic.querySelector('source').srcset = currentImgPath;
    currentPic.querySelector('img').src = currentFallback;
  }

}

function createImgWithFallback(webpSrc, fallbackSrc, className, alt) {
  const picture = document.createElement('picture');
  picture.className = className;

  const source = document.createElement('source');
  source.srcset = webpSrc;
  source.type = 'image/webp';
  picture.appendChild(source);

  const img = document.createElement('img');
  img.src = fallbackSrc; 
  img.alt = alt;
  img.loading = 'lazy';
  picture.appendChild(img);

  return picture;
}

  function initializeInteractions() {
    generateNavigation();
    setupCursor();
    setupAudioSync();
    updateGalleryOnScroll();
    window.addEventListener('scroll', updateGalleryOnScroll);
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 100);
  }
  
  function setupCursor() {
    const listenCursor = document.createElement('div');
    listenCursor.id = 'listen-cursor';
    listenCursor.textContent = 'listen...';
    document.body.appendChild(listenCursor);
  
    const targets = document.querySelectorAll('[id^="respond-"]');
    targets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        listenCursor.style.display = 'block';
      });
      el.addEventListener('mouseleave', () => {
        listenCursor.style.display = 'none';
      });
      el.addEventListener('mousemove', (e) => {
        listenCursor.style.left = e.clientX + 'px';
        listenCursor.style.top = e.clientY + 'px';
      });
    });
  }
  
  function generateNavigation() {
    const nav = document.getElementById("nav-section");
    const sections = document.querySelectorAll("section[id]");
    sections.forEach(section => {
      const sectionId = section.id;
      const mainLabel = section.querySelector("h2")?.innerText || sectionId;
  
      const mainDiv = document.createElement("div");
      mainDiv.innerText = mainLabel;
      mainDiv.classList.add("nav-main");
      nav.appendChild(mainDiv);
  
      const subsections = section.querySelectorAll("h3[id]");
      subsections.forEach((sub, index) => {
        const subId = sub.id;
        const subBtn = document.createElement("button");
        subBtn.innerText = "↳ " + sub.innerText;
        subBtn.classList.add("nav-sub");
        subBtn.onclick = () => {
          document.getElementById(subId).scrollIntoView({ behavior: "smooth" });
        };
        nav.appendChild(subBtn);
  
        if (index === subsections.length - 1) {
          const spacer = document.createElement("div");
          spacer.classList.add("nav-spacer");
          nav.appendChild(spacer);
        }
      });
  
      if (subsections.length === 0) {
        const spacer = document.createElement("div");
        spacer.classList.add("nav-spacer");
        nav.appendChild(spacer);
      }
    });
  }
  
  
  function setupAudioSync() {
    const respondElements = document.querySelectorAll('[id^="respond-"]');
    let currentPlaying = null;
  
    respondElements.forEach(container => {
      const audio = container.querySelector("audio");
      const timestamp = container.querySelector(".timestamp");
      const paragraphs = container.querySelectorAll("p.answer");
      let allWords = [];
      let hasEnded = false;
  
      paragraphs.forEach(paragraph => {
        const words = paragraph.innerText.trim().split(/\s+/);
        paragraph.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
        allWords = allWords.concat(Array.from(paragraph.querySelectorAll(".word")));
      });
  
      container.addEventListener("click", () => {
        if (!audio) {
          console.log('No audio attached to this response.');
          return;  // ✅ Safe: if no audio, do nothing on click
        }
  
        const isSameAudio = currentPlaying === audio;
  
        if (!isSameAudio) {
          if (currentPlaying) {
            currentPlaying.pause();
            currentPlaying.container.classList.remove("active");
            currentPlaying = null;
          }
  
          audio.play();
          currentPlaying = audio;
          audio.container = container;
          container.classList.add("active");
          hasEnded = false;
        } else {
          if (audio.paused && hasEnded) {
            resetHighlight(allWords);
            audio.currentTime = 0;
            audio.play();
            hasEnded = false;
          } else if (audio.paused) {
            audio.play();
          } else {
            audio.pause();
          }
        }
      });
  
      if (audio) {
        audio.addEventListener("timeupdate", () => {
          const progress = (audio.currentTime / audio.duration);
          const totalWords = allWords.length;
          const currentWordIndex = Math.floor(progress * totalWords);
  
          allWords.forEach((span, i) => {
            if (i < currentWordIndex) {
              span.style.color = "black";
              span.style.background = "#33d4d8";
              span.style.opacity=1;
            } else {
              span.style.background = "none";
            }
          });
  
          if (timestamp) timestamp.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
        });
  
        audio.addEventListener("ended", () => {
          hasEnded = true;
          container.classList.remove("active");
          currentPlaying = null;
        });
  
        audio.addEventListener("loadedmetadata", () => {
          if (timestamp) timestamp.textContent = `00:00 / ${formatTime(audio.duration)}`;
        });
      }
    });
  }

function resetHighlight(words) {
  words.forEach(span => {
    span.style.color = "black";
    span.style.opacity=1;
  });
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

  