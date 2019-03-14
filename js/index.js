// Sizing the Canvas //
const canvas = document.getElementById("canvas");

if (canvas.getContext) {
  var ctx = canvas.getContext("2d");
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adding Mouse Object //
let mouse = {
  x: undefined,
  y: undefined
};

const maxRadius = 40;
const minRadius = 10;
const maxDistance = 50;
const growSpeed = 1;

// Adding Mouse Event Listener //
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Circle Object //
function Circle(x, y, xSpeed, ySpeed, radius) {
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.radius = radius;
  let frameCounter = 0;
  let seconds = 1;
  const directionChance = 0.4;
  let toggle = true;
  let maxDistance = radius + 10;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  };

  // Update Function //
  this.update = function () {
    if (this.x + radius > innerWidth || this.x - this.radius < 0) {
      this.xSpeed = -this.xSpeed;
    }

    if (this.y + radius > innerHeight || this.y - this.radius < 0) {
      this.ySpeed = -this.ySpeed;
    }

    if (toggle) {
      this.x += this.xSpeed;
      this.y += this.ySpeed;
    } else {
      this.x -= this.xSpeed;
      this.y -= this.ySpeed;
    }

    // Random Chance to Change Direction //
    frameCounter += 0.01;
    if (Math.trunc(frameCounter) >= seconds) {
      seconds += 1;

      if (Math.random() < directionChance) toggle = !toggle;
    }

    // Mouse Interactivity
    if (
      mouse.x - this.x < maxDistance &&
      mouse.x - this.x > -maxDistance &&
      mouse.y - this.y < maxDistance &&
      mouse.y - this.y > -maxDistance
    ) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "orange";
    }

    this.draw();
  };
}

// Creates a Beautiful Target //
const circle = new Circle(200, 200, 4, 4, 20);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  circle.update();
}

animate();