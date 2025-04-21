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
  
    function flushEntry() {
      if (!audio || answers.length === 0) return;
  
      const div = document.createElement('div');
      div.id = `respond-${respondId}`;
  
      const timestamp = document.createElement('div');
      timestamp.className = 'timestamp';
      div.appendChild(timestamp);
  
      const audioEl = document.createElement('audio');
      audioEl.src = audio;
      audioEl.setAttribute('preload', 'auto');
      div.appendChild(audioEl);
  
      if (question && question !== lastQuestion) {
        const q = document.createElement('p');
        q.className = 'question';
        q.innerText = question;
        currentSubsection.appendChild(q);
        lastQuestion = question;
      }
  
      answers.forEach(ans => {
        const p = document.createElement('p');
        p.className = 'answer';
        p.innerHTML = `<span>${ans}</span>`;
        div.appendChild(p);
      });
  
      currentSubsection.appendChild(div);
  
      if (image) {
        respondImageMap[div.id] = image;
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
      } else if (line === '---') {
        flushEntry();
      } else if (line.length > 0 && line !== '___') {
        answers.push(line);
      }
    }
    flushEntry();
  
    window.respondImageMap = respondImageMap;
    initializeInteractions();
  }
  
  function initializeInteractions() {
    generateNavigation();
    setupCursor();
    setupAudioSync();
    updateGalleryOnScroll();
    window.addEventListener('scroll', updateGalleryOnScroll);
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
  
  function updateGalleryOnScroll() {
    const gallery = document.querySelector('.interview-gallery');
    const headings = document.querySelectorAll('section h3');
    let loaded = false;
  
    headings.forEach((h3, index) => {
      const rect = h3.getBoundingClientRect();
      if (index === 0 && rect.top > window.innerHeight * 0.2) {
        gallery.classList.remove('show');
        lastLoaded = null;
        loaded = true;
        return;
      }
  
      if (!loaded && Math.abs(rect.top) < 100 && h3 !== lastLoaded) {
        const rawTitle = h3.textContent.trim();
        const safeTitle = rawTitle.replace(/\s+/g, '-');
        const imageName = `bob_src/${safeTitle}.jpg`;
  
        const img = document.createElement('img');
        img.src = imageName;
        img.alt = rawTitle;
  
        gallery.classList.remove('show');
        setTimeout(() => {
          gallery.innerHTML = '';
          gallery.appendChild(img);
          gallery.classList.add('show');
        }, 200);
  
        lastLoaded = h3;
        loaded = true;
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
        //   span.style.color = "#999";
          span.style.opacity=0.5;
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
  });
}

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

  