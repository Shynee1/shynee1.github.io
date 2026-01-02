let activeSection = null;

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (activeSection) {
            activeSection.classList.remove('expanded');
        }

        targetSection.classList.add('expanded');
        activeSection = targetSection;
        
        targetSection.scrollIntoView();
    });
});

window.addEventListener('scroll', () => {
    if (activeSection && !checkVisible(activeSection)) {
        activeSection.classList.remove('expanded');
        activeSection = null;
    }
});


function checkVisible(elm) {
  const rect = elm.getBoundingClientRect();
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}
