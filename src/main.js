import Square from "./Square.js";
import Snake from "./Snake.js";

console.log("Iniciando Juego");
const myCanvas = document.getElementById('myCanvas');
const context = myCanvas.getContext('2d');

const snake = new Snake();

const SIZE = 20;
let food = null;
let dx = 0;
let dy = 0;

let lastAxis;

setInterval(main, 150);

function main() {
    update(); // Actualizar las varialbes del juego
    draw();  // dibijar todos los objetos del juego
}

function update() {
    const collisionDetected = checkSnakeCollision();
    if (collisionDetected) {
      gameOver();
      return;
    }

    // salvar la posicion previa de la cabeza de la serpiente
    let prevX, prevY;
    if (body.length >= 1){
        prevX = body[body.length-1].x; // Solo afecta al body y se queda con la posicion anterio de body[0]
        prevY = body[body.length-1].y;
    } else {
        prevX = head.x;  // si no hay body toma la referencia anterio antes de aumentar
        prevY = head.y;
    }

    // El cuerpo de la serpiente siga a la cabeza de la serpiente
    for (let i=(body.length-1); i>=1; --i){
        body[i].x = body[i-1].x; // Aumenta la posicion de la fila del body con la ultima posicion del ultimo elemento
        body[i].y = body[i -1].y;
    }
    if (body.length >= 1) {
        body[0].x = head.x; // Aumenta la posicion solo para el body[0]
        body[0].y = head.y;
    }

    // Actualizar la coords de la cabeza de la serpiente
    head.move(dx, dy);

    // Evitar el movimiento contrario de la ultima tecla presionada
    if (dx !== 0) {
        lastAxis = 'X';
    } else if (dy !== 0) {
        lastAxis = 'Y';
    }

    // detectar si la serpiente ha consumido el alimento
    if (food && head.checkCollision(food)) {
        food = null;
        // aumentar el tamaño de la serpiente
        increaseSnakeSize(prevX, prevY);
    }

    // generar el alimento en caso que no exista
    if (!food){
        food = randomFootPosition();
    }
}

function randomFootPosition() {
   let position;
   do {
       position = new Square(getRandomX(), getRandomY());
   } while (checkFoodCollision(position));
   return position;
}

function checkFoodCollision(position) {
    for (let i = 0; i < body.length; i++){
        if(body[i].checkCollision(position)) {
            return true;
        }
    }

    if(head.checkCollision(position)) {
        return true;
    }

    return false;
}

function checkSnakeCollision() {
    for (let i = 0; i < body.length; i++){
        if(body[i].checkCollision(head)) {
            return true;
        }
    }

    const  topCollision = (head.y < 0);
    const bottonCollision = (head.y > 440);
    const rightCollision = (head.x < 0);
    const leftCollision = ( head.x > 380);

    if (topCollision || bottonCollision || rightCollision || leftCollision) {
        return true;
    }

    return false;
}

function increaseSnakeSize(prevX, prevY) {
    body.push(new Square(prevX, prevX));
}

function gameOver() {
    alert("Has perdido");
    head.x = 0;
    head.y = 0;
    dy = 0;
    dx = 0;
    body.length = 0;
}

function draw() {
    //context.clearRect(0, 0, myCanvas.width, myCanvas.height);
    context.fillStyle = 'black';
    context.fillRect(0, 0, myCanvas.width, myCanvas.height);

    drawObject(head, 'lime');
    body.forEach(element => drawObject(element, 'line'));
    drawObject(food, 'white');
}

function getRandomX() {
    return 20 * (parseInt(Math.random() * 20));
}

function getRandomY() {
    return 20 * (parseInt(Math.random() * 23));
}

function drawObject(obj, color) {
    context.fillStyle = color;
    context.fillRect(obj.x, obj.y, SIZE, SIZE);
}

document.addEventListener('keydown', moveSnake);

function moveSnake(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (lastAxis !== 'Y') {
                dx = 0;
                dy = -SIZE;
                console.log('Mover hacia arriba');
            }
            break;
        case 'ArrowDown':
            if (lastAxis !== 'Y') {
                dx = 0;
                dy = +SIZE;
                console.log('Mover hacia abajo');
            }
            break;
        case 'ArrowRight':
            if (lastAxis !== 'X') {
                dx = +SIZE;
                dy = 0;
                console.log('Mover hacia la derecha');
            }
            break;
        case 'ArrowLeft':
            if (lastAxis !== 'X') {
                dx = -SIZE;
                dy = 0;
                console.log('Mover hacia la izquierda');
            }
            break;
    }
}