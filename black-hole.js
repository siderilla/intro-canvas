// seleziono elemento DOM (document object model) è una rappresentazione strutturata e gerarchica di un doc html e permette a Javascript di interagire dinamicamente con il contenuto e la struttura
const canvas = document.getElementById('my-canvas');
// dichiaro una costante a cui assegno contesto 2d - permette di disegnare forme linee etc..
const ctx = canvas.getContext('2d');

// imposto le dimensioni del canva, in questo caso si adatta alla grandezza della finestra del browser
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// costanti dove definisco il numero dei raggi che voglio generare, un array vuoto che li contiene e un array vuoto che conterrà tutte le stelle nello sfondo
const numRays = 100;
const rays = [];
const starField = [];

// creo i raggi con una funzione dove ciclo finché i non arriva al numero di raggi preimpostato
function createRays() {
	for (let i = 0; i < numRays; i++) {
		// si calcola l'angolo per ogni raggio, distribuzione uniforme 2π radianti
		const angle = (i / numRays) * 2 * Math.PI;
		// si pusha tutto dentro l'array contenitore dei raggi
		rays.push({
			// le coordinate di partenza del raggio (il centro del canva)
			x: canvas.width / 2,
			y: canvas.height / 2,
			// la lunghezza del raggio che è generata casualmente
			length: Math.random() * canvas.width,
			// l'angolo del raggio che è stata calcolata prima
			angle: angle,
			// la velocità con cui si genera (casuale)
			speed: Math.random() * 0.3 + 0.1
		});
	}
}

// funzione crea le stelle di sfondo, che le aggiunge nell'array contenitore starField
function createStars() {
	// cicla per crearne 200
	for (let i = 0; i < 200; i++) {
		// pusha nell'array tutte le proprietà
		starField.push({
			// coordinate casuali nella canva x, y
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			// dimensione casuale
			size: Math.random() * 2,
			// sbraluccichio
			opacity: Math.random()
		});
	}
}

// funzione draw standard
function drawStars() {
	// colore delle stelle
	ctx.fillStyle = 'white';
	// arrow function con forEach
	starField.forEach(star => {
		// si chiama la proprietà globalAlpha per impostare l'opacità che è già definita in createStars
		ctx.globalAlpha = star.opacity;
		// disegna un rettangolo che rappresenta la stella
		ctx.fillRect(star.x, star.y, star.size, star.size);
	});
}

// funzione draw per i raggi standard
function drawRays() {
	// chiamo la proprietà per la stroke, il suo colore e il suo spessore
	ctx.strokeStyle = 'purple'; // Color of the ray
	ctx.lineWidth = 2;

	rays.forEach(ray => {
		// per ogni raggio contenuto nell'array chiama queste funzioni:
		// beginPath - inizia un percorso
		ctx.beginPath();
		// moveTo - sposta il punto di inizio del percorso al centro del canva
		ctx.moveTo(ray.x, ray.y);
		// lineTo - traccia una linea dal centro del canva con una formula che utilizza l'angolo e la lunghezza del raggio
		ctx.lineTo(ray.x + Math.cos(ray.angle) * ray.length, ray.y + Math.sin(ray.angle) * ray.length);
		// disegna la linea
		ctx.stroke();
	});
}

// anima i raggi e le stelle
function animate() {
	// pulisci la canva per dare illusione di movimento
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// stelle hanno opacità random
	starField.forEach(star => {
		star.opacity = Math.random() * 0.5 + 0.5;
	});

	// chiama le funzioni draw
	drawStars();
	drawRays();

	// muovi i raggi verso i bordi della canva
	rays.forEach(ray => {
		// ottieni la lunghezza corrente del raggio e aggiungi al suo valore il valore corrente di speed
		// aggiorna i valori e continua a iterare fino ai bordi
		ray.length += ray.speed;
		// se arriva ai bordi, resetta la lunghezza del raggio
		if (ray.length > canvas.width) ray.length = 0;
	});
	// ripeti l'animazione
	requestAnimationFrame(animate);
}

// inizializza tutto:
createRays();
createStars();
animate();
