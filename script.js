/* =========================================================
   TOUR PLACE IMAGES — random real photos on every refresh
   ========================================================= */

const placePhotos = {
  mirissa: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80",
    "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&q=80",
    "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=80"
  ],
  ella: [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80"
  ],
  kandy: [
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80"
  ],
  galle: [
    "https://images.unsplash.com/photo-1588258524672-9f57c3ea4d9f?w=600&q=80",
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80",
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80",
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80"
  ]
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function loadTourImages() {
  document.querySelectorAll('.tour-thumb').forEach(thumb => {
    const place = thumb.getAttribute('data-place');
    const photos = placePhotos[place];
    if (photos && photos.length) {
      const url = pickRandom(photos);
      thumb.style.backgroundImage = `url('${url}')`;
    }
  });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', loadTourImages);

// Also run immediately (in case DOMContentLoaded already fired)
loadTourImages();

// Rotate images every 5 seconds
setInterval(loadTourImages, 5000);


/* =========================================================
   NAVBAR — highlight active link while scrolling
   ========================================================= */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(sec => {
    const top = sec.offsetTop - 150;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === '#' + current || (current === '' && href === '#')) {
      link.classList.add('active');
    }
  });
});
/* =========================================================
   MUSIC TOGGLE — ambient background music
   ========================================================= */
const musicBtn   = document.getElementById('musicToggle');
const bgMusic    = document.getElementById('bgMusic');
const MUSIC_KEY  = 'portfolio-music-on';

if (musicBtn && bgMusic) {
  bgMusic.volume = 0.35; // adjust 0.0 – 1.0

  // Restore previous choice on page load
  const savedState = localStorage.getItem(MUSIC_KEY);

  if (savedState === 'on') {
    // Try to autoplay — browsers may block until first click
    bgMusic.play().then(() => {
      musicBtn.classList.add('playing');
    }).catch(() => {
      // Autoplay blocked — wait for user interaction
      const unlock = () => {
        bgMusic.play().then(() => musicBtn.classList.add('playing')).catch(() => {});
        document.removeEventListener('click', unlock);
      };
      document.addEventListener('click', unlock);
    });
  }

  // Toggle on click
  musicBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.volume = 0;
      bgMusic.play();
      // Fade volume up
      let v = 0;
      const fade = setInterval(() => {
        v += 0.02;
        if (v >= 0.35) { v = 0.35; clearInterval(fade); }
        bgMusic.volume = v;
      }, 40);

      musicBtn.classList.add('playing');
      localStorage.setItem(MUSIC_KEY, 'on');
    } else {
      // Fade volume down, then pause
      let v = bgMusic.volume;
      const fade = setInterval(() => {
        v -= 0.02;
        if (v <= 0) {
          v = 0;
          bgMusic.pause();
          clearInterval(fade);
        }
        bgMusic.volume = v;
      }, 40);

      musicBtn.classList.remove('playing');
      localStorage.setItem(MUSIC_KEY, 'off');
    }
  });
}