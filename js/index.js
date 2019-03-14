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

const maxRadius = 40
const minRadius = 10
const maxDistance = 50
const growSpeed = 1
let sTenths = 0
const targetTimer = 8 // Tenths of a second
const radius = 20
const collisionBorder = radius * 5

// Get Random Starting Positions //
function xRandPos() {
  return Math.random() * (canvas.width - radius * 2) + radius
}

function yRandPos() {
  return Math.random() * (canvas.height - collisionBorder * 2) + collisionBorder
}

// Adding Mouse Event Listener //
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Get Time in Seconds //
function incrementTime() {
  sTenths += 1
}

let cancel = setInterval(incrementTime, 100)

// Circle Object //
function Circle(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  const directionChance = 0.4;
  let toggle = true;
  let maxDistance = radius + 20;
  let moveToX = xRandPos()
  let moveToY = yRandPos()
  const range = 5
  const movementSpeed = 4

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  };

  // Update Function //
  this.update = function () {

    // Movement Update //
    if (moveToX + range > this.x && this.x < moveToX - range) {
      this.x += movementSpeed
    } else if (moveToX + range < this.x && this.x > moveToX - range) {
      this.x -= movementSpeed
    } else {
      moveToX = xRandPos()
    }

    if (moveToY + range > this.y && this.y < moveToY - range) {
      this.y += movementSpeed
    } else if (moveToY + range < this.y && this.y > moveToY - range) {
      this.y -= movementSpeed
    } else {
      moveToY = yRandPos()
    }

    // Random Chance to Change Direction //
    if (sTenths >= targetTimer) {
      sTenths = 0
      if (Math.random() < directionChance) {
        toggle = !toggle;
        moveToX = xRandPos()
        moveToY = yRandPos()
      }
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
const circle = new Circle(200, 200, 20);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  circle.update();
}

animate();