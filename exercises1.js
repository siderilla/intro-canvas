//////////////// 1 ////////////////
// data una variabile che chiamata gridSize, disegnare una scacchiera di dimensioni gridSize * gridsize
// si disegna un quadrato che si ripete alternato????

let rect = {};
let canvas;
let ctx;
let countX = 0;
let countY = 0;
const gridSize = 8;
const color1 = 'white';
const color2 = 'black';

function setUp() {
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');

    //dimensioni rect
    rect.size = 600/gridSize;

    //partenza rect
    rect.originX = 0;
    rect.originY = 0;

    //colori rect iniziale
    rect.color = color1;

    draw();
}

function update() {
    countX++;

    if(rect.originX === (gridSize - 1) * rect.size){
        rect.originY += rect.size;
        rect.originX = 0;
        countX = 0;
        countY++;
    }
    else{
        rect.originX += rect.size;
    }


    if ((countX + countY) % 2 === 0) {
        rect.color = color1;
    } else {
        rect.color = color2;
    }


}

function draw() {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.originX, rect.originY, rect.size, rect.size);
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

//////////////// 2 ////////////////
// far nevicare la canva (magari si usa l'emoji?)

//////////////// 3 ////////////////
// rettangoli (height sempre uguale, width variabile) in linea su altezze diverse della canva
// che si muovono verso dx a velocità diverse
// per ogni riga un array di rettangoli

//////////////// 4 ////////////////
// leggere capitolo sort eloquentjs
// algoritmo di sorting - bubblesort
// https://www.geeksforgeeks.org/bubble-sort-algorithm/