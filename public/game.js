const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables de juego
let birdX = 50;
let birdY = 150;
let birdWidth = 50;
let birdHeight = 50;
let gravity = 0.8;
let birdVelocity = 0;
let birdLift = -10;
let isGameOver = false;

let pipeWidth = 50;
let pipeGap = 170;
let pipeX = canvas.width;
let pipeY = Math.floor(Math.random() * (canvas.height - pipeGap));
let score = 0; // Variable para la puntuación

// Control del pájaro
document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    birdVelocity = birdLift;
  }
});


// Cargar la imagen del loro
const birdImage = new Image();
birdImage.src = 'assets/parrot-game.png'; // Cambia esto por la ruta correcta de tu imagen

// Dibujar el pájaro (loro)
function drawBird() {
  // Asegúrate de que la imagen esté cargada antes de dibujar
  if (birdImage.complete) {
    ctx.drawImage(birdImage, birdX, birdY, birdWidth, birdHeight);
  } else {
    // Si la imagen aún no se ha cargado, usa el evento onload para dibujarla cuando esté lista
    birdImage.onload = function() {
      ctx.drawImage(birdImage, birdX, birdY, birdWidth, birdHeight);
    };
  }
}


function drawPipes() {
  // Dibuja el tronco del árbol (tubo inferior)
  ctx.fillStyle = "#8B4513"; // Color marrón para el tronco
  ctx.fillRect(pipeX + pipeWidth / 4, pipeY + pipeGap, pipeWidth / 2, canvas.height - pipeY - pipeGap); // Tronco

  // Dibuja la copa del árbol (triángulo)
  ctx.fillStyle = "#228B22"; // Color verde para la copa
  ctx.beginPath();
  ctx.moveTo(pipeX, pipeY + pipeGap); // Punto inferior izquierdo
  ctx.lineTo(pipeX + pipeWidth, pipeY + pipeGap); // Punto inferior derecho
  ctx.lineTo(pipeX + pipeWidth / 2, pipeY + pipeGap - 50); // Punta del árbol
  ctx.closePath();
  ctx.fill();

  //ctx.fillStyle = "#FFFFFF"; // Color blanco para el tubo
  //const tubeX = pipeX; // Posición x del tubo
  //const tubeY = pipeY - 30; // Altura donde empieza el tubo
  //const tubeHeight = tubeY; // La altura del tubo llega al borde superior
  //ctx.fillRect(tubeX, 0, pipeWidth, tubeHeight); // Tubo

  // Dibuja una nube (objeto superior)
  ctx.fillStyle = "#FFFFFF"; // Color blanco para la nube
  ctx.beginPath();
  ctx.arc(pipeX + pipeWidth / 2, pipeY - 30, 20, 0, Math.PI * 2); // Nube
  ctx.arc(pipeX + pipeWidth / 4, pipeY - 40, 20, 0, Math.PI * 2); // Nube izquierda
  ctx.arc(pipeX + (3 * pipeWidth) / 4, pipeY - 40, 20, 0, Math.PI * 2); // Nube derecha
  ctx.fill();
}



// Dibujar la puntuación
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("Puntuación: " + score, 10, 20); // Muestra la puntuación en la parte superior izquierda
}

// Actualizar el juego
function updateGame() {
  if (!isGameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gravedad y movimiento del pájaro
    birdVelocity += gravity;
    birdY += birdVelocity;

    // Movimiento de los tubos
    pipeX -= 2;
    if (pipeX + pipeWidth < 0) {
      pipeX = canvas.width;
      pipeY = Math.floor(Math.random() * (canvas.height - pipeGap));
      score++; // Incrementa la puntuación al pasar un tubo
    }

    // Dibuja los elementos
    drawBird();
    drawPipes();
    drawScore(); // Dibuja la puntuación

    // Detección de colisiones
    if (birdY + birdHeight > canvas.height || birdY < 0 || 
        (birdX + birdWidth > pipeX && birdX < pipeX + pipeWidth &&
        (birdY < pipeY || birdY + birdHeight > pipeY + pipeGap))) {
      isGameOver = true;
    }

    requestAnimationFrame(updateGame);
  } else {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mostrar mensaje de "Game Over" en un elemento HTML
    const messageContainer = document.createElement("div");
    messageContainer.className = "game-over-message"; // Añadir clase
    messageContainer.innerHTML = "Game Over";
    messageContainer.style.position = "absolute";
    messageContainer.style.left = "50%";
    messageContainer.style.top = "50%";
    messageContainer.style.transform = "translate(-50%, -50%)";
    messageContainer.style.fontSize = "30px";
    messageContainer.style.color = "#000";
    document.body.appendChild(messageContainer);


    // Mostrar la puntuación final
    const finalScoreContainer = document.createElement("div");
    finalScoreContainer.className = "final-score-message"; // Clase para la puntuación final
    finalScoreContainer.innerHTML = "Puntuación Final: " + score;
    finalScoreContainer.style.position = "absolute";
    finalScoreContainer.style.left = "50%";
    finalScoreContainer.style.top = "60%";
    finalScoreContainer.style.transform = "translate(-50%, -50%)";
    finalScoreContainer.style.fontSize = "20px";
    finalScoreContainer.style.color = "#000";
    document.body.appendChild(finalScoreContainer);
    
    // Crear un botón para reiniciar el juego

    document.getElementById("buttonContainer1").innerHTML = '<a href="/"><i class="fas fa-home"></i></a>';
    document.getElementById("buttonContainer").innerHTML = '<a onclick="location.reload();"><i class="fas fa-rotate-right"></i></a>';

    
  }
  
}

let countdown = 3; // Cuenta atrás en segundos
let countdownInterval;

function startCountdown() {
    const countdownContainer = document.createElement("div");
    countdownContainer.className = "countdown-message"; // Clase para el mensaje
    countdownContainer.style.position = "absolute";
    countdownContainer.style.left = "50%";
    countdownContainer.style.top = "50%";
    countdownContainer.style.transform = "translate(-50%, -50%)";
    countdownContainer.style.fontSize = "40px";
    countdownContainer.style.color = "#000";
    document.body.appendChild(countdownContainer);

    countdownInterval = setInterval(() => {
        if (countdown > 0) {
            countdownContainer.innerHTML = countdown;
            countdown--;
        } else {
            clearInterval(countdownInterval);
            countdownContainer.innerHTML = "¡Listo! Presiona espacio para jugar";
            setTimeout(() => {
                countdownContainer.remove(); // Eliminar la cuenta atrás
                updateGame(); // Iniciar el juego
            }, 2000); // Espera 2 segundos antes de iniciar el juego
        }
    }, 1000); // Actualiza cada segundo
}

