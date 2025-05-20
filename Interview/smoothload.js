barba.init({
    transitions: [{
      async leave({ current }) {
        current.container.classList.add('page-transition-leave');
        await new Promise(resolve => {
          current.container.classList.add('page-transition-leave-active');
          setTimeout(resolve, 800);
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
  
  barba.hooks.afterEnter(({ next }) => {
    console.log('Barba afterEnter triggered');
  
    const container = next.container;
    const markdownPath = container.getAttribute('data-markdown');
  
    if (markdownPath) {
      console.log('Loading markdown:', markdownPath);
      loadInterviewFromMarkdown(markdownPath);
      initializeInteractions();
    }
  
  });
  window.addEventListener('load', () => {
    const mask = document.querySelector('.reveal-mask');
    mask.classList.add('is-active');
    setTimeout(() => {
      mask.classList.remove('is-active');
    }, 1000);
  });