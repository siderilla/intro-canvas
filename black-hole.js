const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Number of rays
const numRays = 100;
const rays = [];
const starField = [];

// Create rays
function createRays() {
	for (let i = 0; i < numRays; i++) {
		const angle = (i / numRays) * 2 * Math.PI;
		rays.push({
			x: canvas.width / 2,
			y: canvas.height / 2,
			length: Math.random() * canvas.width,
			angle: angle,
			speed: Math.random() * 0.3 + 0.1
		});
	}
}

// Create stars
function createStars() {
	for (let i = 0; i < 200; i++) {
		starField.push({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			size: Math.random() * 2,
			opacity: Math.random()
		});
	}
}

// Draw stars
function drawStars() {
	ctx.fillStyle = 'white';
	starField.forEach(star => {
		ctx.globalAlpha = star.opacity;
		ctx.fillRect(star.x, star.y, star.size, star.size);
	});
}

// Draw rays
function drawRays() {
	ctx.strokeStyle = 'purple'; // Color of the ray
	ctx.lineWidth = 2;

	rays.forEach(ray => {
		ctx.beginPath();
		ctx.moveTo(ray.x, ray.y);
		ctx.lineTo(ray.x + Math.cos(ray.angle) * ray.length, ray.y + Math.sin(ray.angle) * ray.length);
		ctx.stroke();
	});
}

// Animate rays and stars
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

	// Animate stars with random opacity change
	starField.forEach(star => {
		star.opacity = Math.random() * 0.5 + 0.5; // random opacity for twinkling effect
	});

	// Draw stars and rays
	drawStars();
	drawRays();

	// Move rays towards the edges
	rays.forEach(ray => {
		ray.length += ray.speed;
		if (ray.length > canvas.width) ray.length = 0; // Reset the ray length after it reaches the edge
	});

	requestAnimationFrame(animate); // Repeat the animation
}

// Initialize everything
createRays();
createStars();
animate();
