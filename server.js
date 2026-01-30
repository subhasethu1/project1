const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frameCount = 240;
const images = [];
let currentFrame = 0;

// Set canvas size
function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

setCanvasSize();
window.addEventListener("resize", setCanvasSize);

// Image path function
function getImagePath(index) {
  return `genai vs code/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
}

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = getImagePath(i);
  images.push(img);
}

// Draw image
function drawImage(index) {
  const img = images[index];
  if (!img) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// Scroll listener
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / scrollHeight;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  if (frameIndex !== currentFrame) {
    currentFrame = frameIndex;
    drawImage(currentFrame);
  }
});

// Draw first frame once loaded
images[0].onload = () => {
  drawImage(0);
};

