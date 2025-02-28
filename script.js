// // const canvas = document.getElementById('my-canvas');

// // const ctx = canvas.getContext('2d');

// // ctx.fillStyle = 'red'
// // ctx.fillRect(10, 10, 100, 50); // x, y, width, height

// // ctx.fillStyle = 'green';
// // ctx.fillRect(150, 250, 300, 100);

// // ctx.strokeStyle = 'crimson';
// // ctx.lineWidth = 4;
// // ctx.strokeRect(350, 400, 10, 50);

// // function drawRectangles() {
// //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// //     for (let i = 0; i < 100; i++) {
// //         const originX = Math.random() * 600;        
// //         const originY = Math.random() * 600;    
// //         const width = Math.random() * 200;    
// //         const height = Math.random() * 200;   

// //         const red = Math.random() * 255;
// //         const green = Math.random() * 255;
// //         const blue = Math.random() * 255;
// //         const alpha = Math.random();

// //         ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
// //         ctx.fillRect(originX, originY, width, height);
// //     }
// // }
// // setInterval(drawRectangles, 300)

// // 1000 = 1 secondo

// // ALTERNATIVA:

// // setInterval(() => {
// //     ctx.fillStyle = `rgba(255, 255, 255, 0.5)`;
// //     ctx.fillRect(0, 0, 600, 600)

// //     const width = Math.random() * 200;    
// //     const height = Math.random() * 200;   

// //     const originX = Math.random() * (600 - width);        
// //     const originY = Math.random() * (600 - height);  

// //     const red = Math.random() * 255;    
// //     const green = Math.random() * 255;
// //     const blue = Math.random() * 255;
// //     const alpha = Math.random();

// //     ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
// //     ctx.fillRect(originX, originY, width, height);

// // } , 400)

// // console.log(canvas);

// // high order function su eloquent javascript
// // prov diverse forme geometriche e sballo

// // TEST da sballo

const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const rectangles = [];

// Inizializza i quadratini
for (let i = 0; i < 300; i++) {
    rectangles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 10, // Dimensione fissa per i quadratini
        color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`,
        speed: Math.random() * 2 + 1, // Velocità casuale
        angle: Math.random() * Math.PI * 2, // Direzione casuale iniziale
        randomness: Math.random() * 0.5 + 0.5 // Fattore di casualità
    });
}

let mouseX = -100;
let mouseY = -100;

// Listener per il movimento del mouse
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
});

function drawRectangles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rectangles.forEach(rect => {
        // Calcola la distanza dal cursore
        const dx = rect.x - mouseX;
        const dy = rect.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Se il quadratino è vicino al cursore, spostalo
        if (distance < 100) {
            const force = 100 / distance; // Forza inversamente proporzionale alla distanza
            const angleToMouse = Math.atan2(dy, dx);

            // Aggiungi una componente casuale all'angolo di fuga
            rect.angle = angleToMouse + (Math.random() - 1.5) * rect.randomness;

            // Sposta il quadratino
            rect.x += Math.cos(rect.angle) * rect.speed * force;
            rect.y += Math.sin(rect.angle) * rect.speed * force;
        } else {
            // Movimento casuale quando non è vicino al cursore
            rect.x += Math.cos(rect.angle) * rect.speed * 0.1;
            rect.y += Math.sin(rect.angle) * rect.speed * 0.1;

            // Cambia leggermente la direzione per un effetto più naturale
            rect.angle += (Math.random() - 0.5) * 0.1;
        }

        // Mantieni i quadratini all'interno della canvas
        if (rect.x < 0) rect.x = canvas.width;
        if (rect.x > canvas.width) rect.x = 0;
        if (rect.y < 0) rect.y = canvas.height;
        if (rect.y > canvas.height) rect.y = 0;

        // Disegna il quadratino
        ctx.fillStyle = rect.color;
        ctx.fillRect(rect.x, rect.y, rect.size, rect.size);
    });
}

setInterval(drawRectangles, 30);

// function draw() {
// 	const ctx = document.getElementById("my-canvas").getContext("2d");

// // ctx.strokeStyle = 'crimson';
// // ctx.lineWidth = 1;
// // ctx.strokeRect(350, 400, 10, 50);
// for (let i = 0; i < 10; i++) {

// 	//diagonale da sx a dx
// 	ctx.lineWidth = 1 + i;
// 	ctx.beginPath();
// 	ctx.strokeStyle = "blue";
// 	ctx.moveTo(580 + i * 20, 580);
// 	ctx.lineTo(20 + i * 20, 20);
// 	ctx.stroke();

// 	// //diagonale da dx a sx
// 	ctx.beginPath();
// 	ctx.strokeStyle = "violet";
// 	ctx.moveTo(20, 580);
// 	ctx.lineTo(580 + i * 100, 20);
// 	// ctx.lineTo(20, 20) // aggiungendo una terza istruzione
// 	// ctx.closePath(); // insieme a closepath formo un triangolo BOOOH WOW
// 	ctx.stroke();
// }
// // // for (let i = 0; i < 10; i++) {
	
// // // ctx.lineWidth = 1 + i;
// // // ctx.beginPath(); // fa effetto anti-alias non so perché all'arco
// // // ctx.arc(300, 300, 50, 0, Math.PI * 2, true);
// // // ctx.arc(300, 300, 30, 0, Math.PI * 2, true);
// // // ctx.fill("evenodd");

// // // // La regola Even-Odd determina se un punto deve essere riempito o meno in 
// // // // base al numero di volte che un raggio tracciato da quel punto all'infinito
// // // // interseca il percorso. Ecco come funziona:
// // // // Traccia un raggio da un punto all'infinito (in qualsiasi direzione).
// // // // Conta il numero di volte che il raggio interseca il percorso.
// // // // Se il numero di intersezioni è dispari, il punto viene riempito.
// // // // Se il numero di intersezioni è pari, il punto non viene riempito.

// // // ctx.stroke();

// // // }

// }

// draw();

// //// esempio con e senza evenodd:
// // const canvas = document.getElementById("my-canvas");
// // const ctx = canvas.getContext("2d");

// // // Cerchio esterno
// // ctx.beginPath();
// // ctx.arc(100, 100, 50, 0, Math.PI * 2, true);

// // // Cerchio interno
// // ctx.arc(100, 100, 30, 0, Math.PI * 2, true);

// // // Riempimento con regola Even-Odd
// // ctx.fillStyle = "lightblue";
// // ctx.fill("evenodd");
// // ctx.stroke();

// // // Secondo esempio con riempimento predefinito
// // ctx.beginPath();
// // ctx.arc(250, 100, 50, 0, Math.PI * 2, true);
// // ctx.arc(250, 100, 30, 0, Math.PI * 2, true);

// // // Riempimento con regola predefinita
// // ctx.fillStyle = "lightgreen";
// // ctx.fill();
// // ctx.stroke();

// const canvas = document.getElementById("my-canvas");
// const ctx = canvas.getContext("2d");
// const rectangles = [];

// // Inizializza i quadratini viola
// for (let i = 0; i < 100; i++) {
//     rectangles.push({
//         x: Math.random() * canvas.width, // Posizione X casuale
//         y: Math.random() * canvas.height, // Posizione Y casuale
//         size: 10, // Dimensione fissa dei quadratini
//         speedX: (Math.random() - 0.5) * 1, // Velocità casuale lungo X
//         speedY: (Math.random() - 0.5) * 1 // Velocità casuale lungo Y
//     });
// }

// function drawRectangles() {
//     // Pulisci la canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     rectangles.forEach(rect => {
//         // per ogni quadratino, muovilo su asse x e y
//         rect.x += rect.speedX;
//         rect.y += rect.speedY;

//         // Fai rimbalzare i quadratini sui bordi della canvas
//         if (rect.x < 0 || rect.x > canvas.width) rect.speedX *= -1;
//         if (rect.y < 0 || rect.y > canvas.height) rect.speedY *= -1;

//         // Disegna il quadratino viola
//         ctx.fillStyle = "pink";
//         ctx.fillRect(rect.x, rect.y, rect.size, rect.size);
//     });

//     // Richiama la funzione per creare un'animazione continua
//     requestAnimationFrame(drawRectangles);
// }

// // Avvia l'animazione
// drawRectangles();