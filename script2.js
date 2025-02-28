let entities = [];
let canvas;
let ctx;

function setUp() {
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');

    for (let i = 0; i < 100; i++) {
        const rect = {};  
    
        rect.width = 5;    
        rect.height = 5;   
        rect.originX = Math.random() * (600 - rect.width);        
        rect.originY = Math.random() * (600 - rect.height);
        rect.speedX = Math.round(Math.random() * 4) + 1;
        entities.push(rect);
    }
}

function update() {
    for (let i = 0; i < entities.length; i++) {
        const rect = entities[i];
        rect.originX += 1;
        rect.originY += 10;
        rect.originX = rect.originX % 600; // perché avanzando, quando da origine (0) arriva a 600 (estremo opposto grandezza del canva)
        rect.originY = rect.originY % 600; // avremo 600 % 600 che inevitabilmente fa 0 ergo rect.originX torna a essere 0 e riparte
        rect.originX += rect.speedX;
        
        // if (rect.originX < 1) rect.originX = canvas.width;
        // if (rect.originX > canvas.width) rect.originX = 0;
        // if (rect.originY < 1) rect.originY = canvas.height;
        // if (rect.originY > canvas.height) rect.originY = 0;   
    }
}

function draw() {
    // ctx.clearRect(0, 0, 600, 600);

    ctx.fillStyle = 'rgba(15, 0, 81, 0.2)';
    ctx.fillRect(0, 0, 600, 600);

    ctx.fillStyle = 'white';

    for (let i = 0; i < entities.length; i++) {
        const rect = entities[i];
        ctx.fillRect(rect.originX, rect.originY, rect.width, rect.height);   
    }
}

function gameLoop(elapsedTime) {
    console.log(elapsedTime); // mostra in millisecondi quanto tempo passa lungo il loop - deltatime
    update();
    draw();
    requestAnimationFrame(gameLoop); // questo loop richiama sé stesso e di conseguenza anche draw e update a rotazione in loop
}

function start() {
    setUp();
    requestAnimationFrame(gameLoop);
}

start();

// function setInterval() { // è nostro amico non si da un tempo "ogni quanto" ma mantiene un framerate di 60

// }