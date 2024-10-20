const textContainer = document.getElementById("birthday-text");
const fireworkContainer = document.getElementById("firework-container");
const words = [...document.querySelectorAll("#birthday-text span.word")];
let fireworkCount = 0;

// Crea fuegos artificiales y muestra cada letra con un color distinto
function createFireworks() {
  // Divide las palabras en letras y las envuelve en un <span>
  words.forEach((word) => {
    word.innerHTML = word.textContent
      .split("")
      .map((letter) => `<span>${letter}</span>`)
      .join("");
  });

  const spans = document.querySelectorAll("#birthday-text span span");

  // Crea un ciclo que desencadena el fuego artificial y la aparición de letras una por una
  spans.forEach((span, index) => {
    setTimeout(() => {
      let firework = document.createElement("div");
      firework.classList.add("firework");
      firework.style.left = `${Math.random() * 100}vw`; // Posición aleatoria al inicio
      fireworkContainer.appendChild(firework);

      // Mueve el fuego artificial hasta la letra y explota
      setTimeout(() => {
        firework.style.top = `${span.offsetTop + textContainer.offsetTop}px`;
        firework.style.left = `${span.offsetLeft + textContainer.offsetLeft}px`;

        setTimeout(() => {
          // Cambia el color de la letra cuando el fuego artificial toca la letra
          span.style.visibility = 'visible'// Letra visible
          span.style.color = getRandomColor();
          firework.remove();
 
          // Aquí se crea la explosión de partículas al impactar el fuego
            createParticles(span); // Llama a la función que genera partículas

          fireworkCount++;
          // Si es la última letra, entonces lanzar globos
          if (fireworkCount === spans.length) {
            setTimeout(() => {
              releaseBalloons();
            }, 1000);
          }
        }, 500);
      }, 500);
    }, index * 800); // Lanzar cada fuego artificial de forma secuencial
  });
}

// Nueva función para crear partículas en la explosión
function createParticles(span) {
    const particlesCount = 30; // Número de partículas a generar
  
    for (let i = 0; i < particlesCount; i++) {
      let particle = document.createElement("div");
      particle.classList.add("particle");
      fireworkContainer.appendChild(particle);
  
      // Posicionar la partícula en el lugar del impacto
      particle.style.left = `${span.offsetLeft + textContainer.offsetLeft + 15}px`; // Centrar en la letra
      particle.style.top = `${span.offsetTop + textContainer.offsetTop + 15}px`;
  
      // Establecer direcciones aleatorias para dispersar partículas
      const angle = Math.random() * 2 * Math.PI; // Ángulo aleatorio
      const distance = Math.random() * 100; // Distancia aleatoria
      particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
      particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
  
      // Aplicar una animación
      particle.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`; // Duración aleatoria
  
      // Eliminar la partícula después de que la animación termine
      particle.addEventListener("animationend", () => {
        particle.remove();
      });
    }
  }
  
  
// Función para liberar los globos y llevarse las letras
function releaseBalloons() {
  const spans = document.querySelectorAll("#birthday-text span span");

  spans.forEach((span, index) => {
    setTimeout(() => {
      let balloon = document.createElement("div");
      balloon.classList.add("balloon");
      balloon.style.backgroundColor = getRandomColor();
      balloon.style.left = `${span.offsetLeft + textContainer.offsetLeft}px`;
      balloon.style.top = `${span.offsetTop + textContainer.offsetTop}px`;

      fireworkContainer.appendChild(balloon);

      // Elevar el globo y hacer desaparecer la letra
      setTimeout(() => {
        balloon.style.opacity = 1;  // Hacer visible el globo
        span.style.opacity = 0;     // Desaparecer la letra
      }, 300);
    }, index * 300);
  });

  // Mostrar el botón después de que todos los globos hayan subido
  setTimeout(() => {
    document.getElementById("next-btn").style.display = "inline-block";
  }, spans.length * 300 + 1000);
}

// Función para obtener un color aleatorio
function getRandomColor() {
  const colors = ["#ff4d4d", "#ff9933", "#ffff66", "#66ff66", "#66b3ff", "#ff66b3"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Redireccionar a otra página
function goToNextPage() {
  window.location.href = "otra_seccion.html"; // Cambia esta ruta a la que desees
}

// Iniciar la animación de fuegos artificiales
setTimeout(createFireworks, 1000);