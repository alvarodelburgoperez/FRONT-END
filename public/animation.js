document.addEventListener('DOMContentLoaded', () => {
    const chicken = document.querySelector('.pixelart-to-css');
    const container = document.querySelector('.boat');

    // Posiciona el sprite y el contenedor
    chicken.style.position = 'absolute';
    chicken.style.left = '0px';
    container.style.position = 'relative';
    container.style.width = '70%'; // Ajusta según sea necesario

    let chickenPosition = 0;
    const speed = 1.5; // Ajusta la velocidad del movimiento
    let goingRight = true; // Variable para controlar la dirección

    // Función para actualizar la posición del sprite
    function updatePosition() {
        if (goingRight) {
            chickenPosition += speed;
        } else {
            chickenPosition -= speed;
        }

        // Limita el movimiento dentro del contenedor y cambia la dirección
        if (chickenPosition >= container.clientWidth - chicken.clientWidth) {
            goingRight = false;
        } else if (chickenPosition <= 0) {
            goingRight = true;
        }

        chicken.style.left = chickenPosition + 'px';
    }

    // Llama a la función de actualización cada cierto tiempo
    setInterval(updatePosition, 2); // Ajusta el intervalo para controlar la velocidad
});