/* Aplica tema de acordo com a hora */
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const footer = document.querySelector('.footer');
  const socialIcons = document.querySelectorAll('.social-icons img');

  const themes = {
    morning: { body: 'linear-gradient(to bottom, #1E3C72, #0078bdff, #ffdd1aff)' },
    afternoon: { body: 'linear-gradient(to bottom, #ffbb00ff, #4d024dff, #1e0842ff)' },
    night: { body: 'linear-gradient(to bottom, #1e0842ff, #020d4dff, #0b0018ff)' },
    madrugada: { body: 'linear-gradient(to bottom, #0b0018ff, #020d4dff, #1E3C72)' }
  };

  const getPeriod = hour => {
    if (hour >= 5 && hour < 12) return 'morning';    
    if (hour >= 12 && hour < 18) return 'afternoon'; 
    if (hour >= 18 && hour < 23) return 'night';     
    return 'madrugada';                          
  };

  const currentPeriod = getPeriod(new Date().getHours());
  const theme = themes[currentPeriod];

  body.style.background = theme.body;
  body.style.transition = 'background 1s ease';

  footer.style.color = (currentPeriod === 'morning') ? '#222' : '#fff';
  footer.style.transition = 'color 1s ease';

  socialIcons.forEach(icon => {
    const baseFilter = (currentPeriod === 'morning' || currentPeriod === 'afternoon')
      ? 'invert(0%)'
      : 'invert(100%)';

    const hoverFilter = 'brightness(0) saturate(100%) invert(32%) sepia(98%) saturate(3126%) hue-rotate(203deg) brightness(99%) contrast(101%)';

    icon.style.filter = baseFilter;

    icon.addEventListener('mouseenter', () => {
      icon.style.filter = hoverFilter;
    });

    icon.addEventListener('mouseleave', () => {
      icon.style.filter = baseFilter;
    });

    icon.style.transition = 'filter 0.3s ease';
  });
});
