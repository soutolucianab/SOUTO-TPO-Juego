// Definir las señales de tránsito, imágenes y sus opciones
const trafficSigns = [
    { 
        sign: "pare",
        image: "images/pare.jpg", 
        options: ["Pare", "Ceda el paso", "Prohibido estacionar"] 
    },
    { 
        sign: "ceda_paso", 
        image: "images/ceda_paso.png",
        options: ["Ceda el paso", "Pare", "Prohibido estacionar"] 
    },
    { 
        sign: "prohibido_estacionar", 
        image: "images/prohibido_estacionar.png",
        options: ["Prohibido estacionar", "Pare", "Ceda el paso"] 
    },
    { 
        sign: "limite_velocidad", 
        image: "images/limite_velocidad.png",
        options: ["Límite de velocidad", "Ceda el paso", "Pare"] 
    },
    { 
        sign: "no_girar_derecha", 
        image: "images/no_girar_derecha.png",
        options: ["No girar a la derecha", "No pasar", "No girar a la izquierda"] 
    },
    { 
        sign: "no_pasar", 
        image: "images/no_pasar.png",
        options: ["No pasar", "No girar a la derecha", "No girar a la izquierda"] 
    },
    { 
        sign: "no_girar_izquierda", 
        image: "images/no_girar_izquierda.png",
        options: ["No girar a la izquierda", "No girar a la derecha", "No pasar"] 
    },
    { 
        sign: "paso_peatones", 
        image: "images/paso_peatones.png",
        options: ["Paso de peatones", "Ceda el paso", "Prohibido estacionar"] 
    }
];

// Variables globales
let currentIndex = 0; // Índice de la pregunta actual
let score = 0; // Puntuación del jugador

// Función para iniciar el juego
function startGame() {
    score = 0; // Reiniciar el scoring
    currentIndex = 0; // Reiniciar el índice de preguntas
    document.getElementById('menu').style.display = 'none'; // Ocultar el menú
    document.getElementById('game-container').classList.remove('d-none'); // Mostrar el contenedor del juego
    document.getElementById('feedback').innerHTML = ''; // Limpiar el feedback anterior
    showTrafficSign();
}

// Función para mostrar la siguiente señal de tránsito
function showTrafficSign() {
    const signObj = trafficSigns[currentIndex]; // Obtener el objeto de la señal actual
    const options = signObj.options; // Obtener las opciones de respuesta
    const correctOption = options[0]; // La opción correcta siempre será la primera
    const shuffledOptions = shuffleArray(options); // Mezclar las opciones

// Actualizar la imagen de la señal de tránsito
    document.getElementById('traffic-sign').src = signObj.image;
 // Generar los botones de las opciones  
    document.getElementById('options').innerHTML = shuffledOptions.map(option => `<button class="btn btn-secondary option-btn" onclick="checkAnswer('${option}', '${correctOption}')">${option}</button>`).join('');

    currentIndex++; // Incrementar el índice de la pregunta
}

// Función para comprobar la respuesta del jugador
function checkAnswer(selectedOption, correctOption) {
    if (selectedOption === correctOption) {
        score++;
        document.getElementById('feedback').innerHTML = "<p class='text-success'>¡Correcto!</p>";
    } else {
        document.getElementById('feedback').innerHTML = "<p class='text-danger'>¡Incorrecto!</p>";
    }

    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        if (button.textContent === correctOption) {
            button.classList.add('btn-success');
        } else {
            button.classList.add('btn-danger');
        }
        button.disabled = true;
    });

    if (currentIndex < trafficSigns.length) {
        setTimeout(showTrafficSign, 1000); // Mostrar la siguiente señal después de 1 segundo
    } else {
        setTimeout(endGame, 1000); // Finalizar el juego después de 1 segundo
    }
}

// Función para finalizar el juego
function endGame() {
    let knowledgeMessage = '';
    if (score === trafficSigns.length) {
        knowledgeMessage = "¡Increíble! Tienes un conocimiento perfecto sobre señales de tránsito.";
    } else if (score >= trafficSigns.length * 0.8) {
        knowledgeMessage = "¡Muy bien! Tienes un buen conocimiento sobre señales de tránsito.";
    } else {
        knowledgeMessage = "Parece que necesitas repasar más sobre señales de tránsito.";
    }

    document.getElementById('feedback').innerHTML = `
        <p>Puntuación final: ${score}/${trafficSigns.length}</p>
        <p>${knowledgeMessage}</p>
        <button id="play-again-btn" class="btn btn-primary">Volver a jugar</button>
        <button id="final-menu-btn" class="btn btn-secondary">Menú principal</button>
    `;

    document.getElementById('play-again-btn').addEventListener('click', resetGame);
    document.getElementById('final-menu-btn').addEventListener('click', function() {
        window.location.href = 'https://soutolucianab.github.io/TPO-Grupo7/';
    });
}

// Función para reiniciar el juego
function resetGame() {
    document.getElementById('feedback').innerHTML = ''; // Limpiar el contenido del feedback
    startGame();
}

// Función para mezclar las opciones de manera aleatoria
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Event Listener para el botón de JUGAR
document.getElementById('play-btn').addEventListener('click', startGame);

// Event Listener para el botón de menú principal en el menú de inicio
document.getElement
