// Genie Wish System with Working Typewriter and Sound

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("wish-form");
  const input = document.getElementById("wish-input");
  const responseBox = document.getElementById("wish-response");
  const whoosh = document.getElementById("whoosh-sound");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const wish = input.value;
    if (!wish.trim()) return;

    whoosh.pause();
    whoosh.currentTime = 0;
    whoosh.play().catch(() => {
      console.warn("Autoplay policy blocked the sound.");
    });

    const res = await fetch("/api/wish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wish }),
    });

    const data = await res.json();
    if (res.ok) {
      typeWriterEffect(data.message, responseBox);
      input.value = "";
    } else {
      responseBox.innerText = `Error: ${data.message}`;
    }
  });
});

// Stable typewriter effect using innerText
function typeWriterEffect(text, element) {
  element.innerText = "";
  let i = 0;
  const speed = 40;
  const interval = setInterval(() => {
    element.innerText += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

// Toggle music
function toggleMusic() {
  const bg = document.getElementById("bg-music");
  bg.muted = !bg.muted;
}

// Sparkling Cursor
document.addEventListener("mousemove", (e) => {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.left = `${e.pageX}px`;
  sparkle.style.top = `${e.pageY}px`;
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
});

// Floating particles
tsParticles.load("particles-xmc", {
  fullScreen: { enable: false },
  particles: {
    number: { value: 50 },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    size: { value: 3 },
    move: {
      enable: true,
      speed: 0.7,
      direction: "top",
      outModes: { default: "out" }
    }
  },
  background: { color: "transparent" }
});

// Floating Lanterns
const canvas = document.getElementById("lantern-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lanterns = Array.from({ length: 15 }, () => ({
  x: Math.random() * canvas.width,
  y: canvas.height + Math.random() * 300,
  size: Math.random() * 3 + 2,
  speed: Math.random() * 0.8 + 0.2
}));

function drawLanterns() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let l of lanterns) {
    ctx.beginPath();
    ctx.arc(l.x, l.y, l.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 200, 100, 0.6)";
    ctx.fill();
    l.y -= l.speed;
    if (l.y < -10) {
      l.y = canvas.height + Math.random() * 100;
      l.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(drawLanterns);
}
drawLanterns();
