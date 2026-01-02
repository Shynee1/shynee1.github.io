let activeSection = null;

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (activeSection) {
            activeSection.removeAttribute('style');
        }

        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        const contentRect = targetSection.querySelector('.section-content').getBoundingClientRect();
        const padding = viewHeight / 2 - contentRect.height / 2;

        targetSection.style.paddingTop = `${Math.max(padding, 0)}px`;
        targetSection.style.paddingBottom = `${Math.max(padding, 0)}px`;

        activeSection = targetSection;
        
        targetSection.scrollIntoView();
    });
});

window.addEventListener('scroll', () => {
    if (activeSection){
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        const contentRect = activeSection.querySelector('.section-content').getBoundingClientRect();
        const padding = viewHeight / 2 - contentRect.height / 2;
        const isVisible = checkVisible(activeSection);

        if (contentRect.top < 0 && activeSection.style.paddingTop){
            activeSection.style.paddingTop = '';
            window.scrollBy(0, -padding);
        }
        if (contentRect.bottom - viewHeight >= 0 && activeSection.style.paddingBottom) {
            activeSection.style.paddingBottom = '';
        }
       
        if (!isVisible || activeSection.style.length === 0){
            activeSection.removeAttribute('style');
            activeSection = null;
        }
    }
});

function checkVisible(elm) {
  const rect = elm.getBoundingClientRect();
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}
