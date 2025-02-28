//////////////// 1 ////////////////
// data una variabile che chiamata gridSize, disegnare una scacchiera di dimensioni gridSize * gridsize
// si disegna un quadrato che si ripete alternato????

// let rect = {};
// let canvas;
// let ctx;
// let countX = 0;
// let countY = 0;
// const gridSize = 8;
// const color1 = 'white';
// const color2 = 'black';

// function setUp() {
//     canvas = document.getElementById('my-canvas');
//     ctx = canvas.getContext('2d');

//     //dimensioni rect
//     rect.size = 600/gridSize;

//     //partenza rect
//     rect.originX = 0;
//     rect.originY = 0;

//     //colori rect iniziale
//     rect.color = color1;

//     draw();
// }

// function update() {
//     countX++;

//     if(rect.originX === (gridSize - 1) * rect.size){
//         rect.originY += rect.size;
//         rect.originX = 0;
//         countX = 0;
//         countY++;
//     }
//     else{
//         rect.originX += rect.size;
//     }


//     if ((countX + countY) % 2 === 0) {
//         rect.color = color1;
//     } else {
//         rect.color = color2;
//     }


// }

// function draw() {
//     ctx.fillStyle = rect.color;
//     ctx.fillRect(rect.originX, rect.originY, rect.size, rect.size);
// }

// function gameLoop(elapsedTime) {
    
//     update();

//     draw();

//     requestAnimationFrame(gameLoop);
// }

// function start() {
//     setUp();

//     requestAnimationFrame(gameLoop);
// }

// start();

//////////////// 2 ////////////////
// far nevicare la canva (magari si usa l'emoji?)

let entities = [];
let canvas;
let ctx;

function setUp() {
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');

    for (let i = 0; i < 200; i++) {
        const rect = {};

        //dimensioni rect - dell'emoji non la cambia
        // rect.width = 15;
        // rect.height = 15;

        //partenza rect
        rect.originX = Math.random() * 600;
        rect.originY = Math.random() * -600;

		//emoji al posto del rect.color
        rect.emoji = "❄️";
		
		//colori rect iniziale
        // rect.color = 'white'

        //velocità rect inziale
        rect.speedX = 0;
        rect.speedY = 1;
        
        entities.push(rect);
    }
}

function update() {
    for (let i = 0; i < entities.length; i++) {
        const rect = entities[i];

        rect.originY += rect.speedY;
        rect.originX += rect.speedX;

		//genera all'infinito
		if (rect.originY > 600) {
            rect.originY = Math.random() * -50;
            rect.originX = Math.random() * 600;
            rect.speedX = 0
            rect.speedY = 1
        }
		// rect.speedX += (Math.random() - 0.5) * 0.02;

        //CAMBIA VELOCITA

        const rollX = Math.random();

        //probabilità di cambiare velocità
        if(rollX < 0.5) {
            //la curva e velocità
            const speedDelta = -0.01; // ho diminuito il valore del delta
            rect.speedX += speedDelta;
        } else {
            const speedDelta = 0.01;
            rect.speedX += speedDelta;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, 600, 600);

	//SCELTA FONT PER INSERIMENTO EMOJI 
	ctx.font = "12px Arial"; // assegnazione grandezza emoji + font a caso per avere accesso

    for (let i = 0; i < entities.length; i++) {
        const rect = entities[i];
		ctx.fillStyle = 'white';
        ctx.fillText(rect.emoji, rect.originX, rect.originY);
        // ctx.fillStyle = rect.color;
        // ctx.fillRect(rect.originX, rect.originY, rect.width, rect.height);
    }
}

function gameLoop(elapsedTime) {

    update();

    draw();

    requestAnimationFrame(gameLoop);
}

function start() {
    setUp();

    requestAnimationFrame(gameLoop);
}

start();

//////////////// 3 ////////////////
// rettangoli (height sempre uguale, width variabile) in linea su altezze diverse della canva
// che si muovono verso dx a velocità diverse
// per ogni riga un array di rettangoli

//////////////// 4 ////////////////
// leggere capitolo sort eloquentjs
// algoritmo di sorting - bubblesort
// https://www.geeksforgeeks.org/bubble-sort-algorithm/