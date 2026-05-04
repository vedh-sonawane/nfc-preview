const style = document.createElement('style');
style.textContent = `
.hexagon-bg-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.glass-hexagon {
  position: absolute;
  /* Black initially with a faintly visible white border */
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.08);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  animation: floatHex 20s infinite ease-in-out alternate;
  pointer-events: none;
  transition: all 0.5s ease;
}
.glass-hexagon.active {
  /* Turn to the light green glassmorphism on mouse near */
  background: rgba(180, 255, 180, 0.08); 
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(180, 255, 180, 0.25);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}
@keyframes floatHex {
  0% { transform: translateY(0px) rotate(0deg) scale(1); }
  100% { transform: translateY(-40px) rotate(15deg) scale(1.05); }
}
`;
document.head.appendChild(style);

function initHexagons() {
  const container = document.createElement('div');
  container.className = 'hexagon-bg-container';
  document.body.appendChild(container);

  const numHexagons = 15; 
  const hexagons = [];
  
  for (let i = 0; i < numHexagons; i++) {
    const hex = document.createElement('div');
    hex.className = 'glass-hexagon';
    
    // Randomize position, size and animation timing
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = 60 + Math.random() * 80; 
    const delay = Math.random() * -20;
    const duration = 15 + Math.random() * 20;
    
    hex.style.top = `${top}vh`;
    hex.style.left = `${left}vw`;
    hex.style.width = `${size}px`;
    hex.style.height = `${size * 1.15}px`;
    hex.style.animationDelay = `${delay}s`;
    hex.style.animationDuration = `${duration}s`;
    
    container.appendChild(hex);
    hexagons.push(hex);
  }

  // Since hexagons are z-index: -1, regular CSS :hover won't work consistently 
  // if they are behind other elements. We use JavaScript mouse tracking instead.
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    hexagons.forEach(hex => {
      const rect = hex.getBoundingClientRect();
      const hexX = rect.left + rect.width / 2;
      const hexY = rect.top + rect.height / 2;
      
      const dist = Math.hypot(mouseX - hexX, mouseY - hexY);
      
      // If cursor is within 100px of the center of the hexagon, activate it
      if (dist < 100) {
        hex.classList.add('active');
      } else {
        hex.classList.remove('active');
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHexagons);
} else {
  initHexagons();
}
