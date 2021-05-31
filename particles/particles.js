var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cvsrect = canvas.getBoundingClientRect();

const interaction_radius = 150;
const num_particles = 1000;
let ParticleArray = [];

let mouse_x = 0;
let mouse_y = 0;

const norm = 2;

document.addEventListener("mousemove", mousehandler, false);

function mousehandler(e) {
  mouse_x = e.x - cvsrect.left;
  mouse_y = e.y - cvsrect.top;
  console.log(mouse_x, mouse_y);
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.rad = Math.random() + 1.5;
    this.mass = this.rad ** 3;
    var b = 155 * Math.random() + 100;
    var g = 155 * Math.random() + 100;
    this.color = `rgb( 50, ${g}, ${b})`;
  }

  SpinMouse(mouse_x, mouse_y) {
    var xrel = this.x - mouse_x;
    var yrel = this.y - mouse_y;
    var distance = Math.sqrt(xrel ** 2 + yrel ** 2);

    if (distance < interaction_radius) {
      var multiplier = (interaction_radius - distance) / interaction_radius;
      var theta = (multiplier * norm) / this.mass;

      this.x = Math.cos(theta) * xrel - Math.sin(theta) * yrel + mouse_x;
      this.y = Math.sin(theta) * xrel + Math.cos(theta) * yrel + mouse_y;
    }
  }

  draw() {
    //console.log("draw");
    ctx.beginPath();
    ctx.fillStyle = this.color;
    console.log(this.x);
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

function init() {
  for (let i = 0; i < num_particles; i++) {
    ParticleArray.push(new Particle());
    console.log("mk particle");
  }
}

init();

function animate() {
  console.log("help please");
  ctx.fillStyle = "rgba(0,0,0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < num_particles; i++) {
    ParticleArray[i].SpinMouse(mouse_x, mouse_y);
    ParticleArray[i].draw();
  }
  requestAnimationFrame(animate);
}
animate();
//setInterval(animate, 30);
