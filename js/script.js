// The Intelligent Portfolio - Neural Network Background
console.log("Initializing Neural Network Nodes...");

const canvas = document.getElementById('network-bg');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const particleCount = 100; // Adjust for density
const connectionDistance = 150;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(43, 108, 176, 0.3)'; // Faint blue
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Mouse interaction (optional, but adds "alive" feeling)
let mouse = { x: null, y: null };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function animate() {
    requestAnimationFrame(animate);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Check connections
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                // Opacity based on distance
                const opacity = 1 - (distance / connectionDistance);
                ctx.strokeStyle = `rgba(43, 108, 176, ${opacity * 0.25})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        // Connect to mouse
        if (mouse.x != null && mouse.y != null) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                const opacity = 1 - (distance / connectionDistance);
                ctx.strokeStyle = `rgba(43, 108, 176, ${opacity * 0.4})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

animate();

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`${message}\n\n---\nFrom: ${name}\nEmail: ${email}`);

        // Open the user's default email client
        window.location.href = `mailto:yahiya2004@outlook.com?subject=${subject}&body=${body}`;

        // Reset the form after submission
        contactForm.reset();
    });
}
