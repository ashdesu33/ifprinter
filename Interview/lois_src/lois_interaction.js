
let wasDragging = false;
let odd = false;
let card_x = 0;
let card_y = 0;
function organizeInterview() {
  const interviewContainer = document.querySelector('.interview');
  const questions = document.querySelectorAll('.question');
  const cards = [];
  console.log(questions);

  questions.forEach((questionDiv, index) => {
      const responseDiv = document.getElementById(`respond-${index + 1}`);
      if (!responseDiv) return;

      const card = document.createElement('div');
      card.className = 'qa-card draggable'; 

      const question = questionDiv.querySelector('p').innerText;
      const answers = Array.from(responseDiv.querySelectorAll('.answer')).map(ans => ans.innerText);

      const header = document.createElement('div');
      header.className = 'qa-header, question'; 
      header.innerText = question;

      const body = document.createElement('div');
      body.className = 'qa-body';
      answers.forEach(ansText => {
          const p = document.createElement('p');
          p.className = 'qa-answer, answer';
          p.innerText = ansText;
          body.appendChild(p);
      });

      card.appendChild(header);
      card.appendChild(body);

      header.addEventListener('click', (e) => {
        if (wasDragging) {
          e.stopImmediatePropagation();
          return; 
        }
        card.classList.toggle('expanded');
      });

      cards.push(card);
  });

  interviewContainer.innerHTML = '';

  const dropzone = document.createElement('div');
  dropzone.className = 'dropzone';
  cards.forEach(card => dropzone.appendChild(card));
  cards.forEach((card, i) => {
    const randomX = Math.random() * (window.innerWidth * 0.5);
    const randomY = i * 30;
  
    card.style.position = 'relative';
    card.style.left = `${randomX}px`;
    card.style.top = `${randomY}px`;
  
    dropzone.appendChild(card);
  });
  interviewContainer.appendChild(dropzone);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.position = 'relative';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.pointerEvents = 'none';
  dropzone.appendChild(svg);

  cards.forEach((card, i) => {
    if (i < cards.length - 1) {
      const nextCard = cards[i + 1];
  
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('stroke', '#999');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('z-index','-2');
  
      const updateLine = () => {
        const rect1 = card.getBoundingClientRect();
        const rect2 = nextCard.getBoundingClientRect();
  
        const x1 = rect1.left + rect1.width / 2;
        const y1 = rect1.top + rect1.height / 2;
        const x2 = rect2.left + rect2.width / 2;
        const y2 = rect2.top + rect2.height / 2;
  
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('z-index','-2');
      };
  
      updateLine();
      svg.appendChild(line);
  
      const observer = new MutationObserver(updateLine);
      observer.observe(card, { attributes: true, attributeFilter: ['style', 'transform'] });
      observer.observe(nextCard, { attributes: true, attributeFilter: ['style', 'transform'] });
    }
  });
  

  interact('.qa-card').draggable({
      inertia: true, 
      modifiers: [
          interact.modifiers.restrictRect({
              restriction: 'parent', 
              endOnly: true
          })
      ],
      listeners: {
        start(event) {
          wasDragging = false; 
        },
        move: dragMoveListener,
        end(event) {
          setTimeout(() => { wasDragging = false; }, 0); 
        }
      }
  });

  function dragMoveListener (event) {
    wasDragging = true; 
    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
  
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }
}