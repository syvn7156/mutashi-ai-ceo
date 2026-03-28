// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => { navLinks.classList.remove('open'); hamburger.textContent = '☰'; });
});

// Scroll reveal
const reveals = document.querySelectorAll('.section > .container');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); } });
}, { threshold: 0.1 });
reveals.forEach(el => { el.classList.add('reveal'); observer.observe(el); });

// Particle effect in hero
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const particles_el = document.getElementById('particles');
if (particles_el) {
  particles_el.appendChild(canvas);
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
  function resize() { canvas.width = particles_el.offsetWidth; canvas.height = particles_el.offsetHeight; }
  resize(); window.addEventListener('resize', resize);

  const pts = Array.from({length: 60}, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5,
    r: Math.random() * 2 + 1, o: Math.random() * .5 + .1
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = i % 3 === 0 ? `rgba(212,168,83,${p.o})` : `rgba(0,212,255,${p.o})`;
      ctx.fill();
      // Lines
      pts.slice(i + 1).forEach(q => {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 150) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,212,255,${.08 * (1 - d / 150)})`;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// Counter animation
const counters = document.querySelectorAll('.stat-num');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const text = el.textContent;
      const num = parseInt(text);
      if (!isNaN(num) && !el.dataset.done) {
        el.dataset.done = '1';
        let cur = 0;
        const step = Math.ceil(num / 40);
        const iv = setInterval(() => {
          cur += step;
          if (cur >= num) { cur = num; clearInterval(iv); el.textContent = text; }
          else el.textContent = cur;
        }, 30);
      }
    }
  });
}, { threshold: .5 });
counters.forEach(c => counterObs.observe(c));

// Pain cards hover sound-like effect
document.querySelectorAll('.pain-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = 'rgba(212,168,83,.4)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'rgba(255,255,255,.05)';
  });
});
