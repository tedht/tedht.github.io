const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const layers = [
    { image: new Image(), speed: 0, y: 0 },
    { image: new Image(), speed: 0.4, y: 0 }, 
    { image: new Image(), speed: 1, y: 0 }  
];

// Load images for each layer
layers[0].image.src = 'images/backgrounds/base_black.PNG';
layers[1].image.src = 'images/backgrounds/stars_2.PNG';
layers[2].image.src = 'images/backgrounds/stars_1.PNG';

let scrollY = 0;

let imagesLoaded = 0;
layers.forEach(layer => {
    layer.image.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === layers.length) {
            draw();
        }
    };
});

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	layers.forEach(layer => {
		// Calculate the y position based on scroll and layer speed
		layer.y = scrollY * layer.speed;

		const scale = Math.max(
            canvas.width / layer.image.width,
            canvas.height / layer.image.height
        );
        const scaledWidth = layer.image.width * scale;
        const scaledHeight = layer.image.height * scale;

        ctx.drawImage(
            layer.image,
            0, 0, layer.image.width, layer.image.height, // Source rectangle
            (canvas.width - scaledWidth) / 2, layer.y, scaledWidth, scaledHeight // Destination rectangle
        );
		
        ctx.drawImage(
            layer.image,
            0, 0, layer.image.width, layer.image.height, // Source rectangle
            (canvas.width - scaledWidth) / 2, layer.y - scaledHeight, scaledWidth, scaledHeight // Destination rectangle
        );
	});

	requestAnimationFrame(draw);
}

window.addEventListener('scroll', () => {
	scrollY = window.scrollY;
});

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});