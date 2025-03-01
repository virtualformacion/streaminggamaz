document.getElementById("emailForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;

    // Mostrar el mensaje de espera al usuario
    const waitMessage = document.getElementById("waitMessage");
    waitMessage.style.display = "block"; // Mostrar mensaje de espera

    // Generar un tiempo de retraso aleatorio entre 10 y 25 segundos (10000 - 25000 ms)
    const delay = Math.floor(Math.random() * (25000 - 10000 + 1)) + 10000; // Retraso aleatorio entre 10 y 25 segundos

    // Esperar durante el tiempo aleatorio antes de continuar
    await new Promise(resolve => setTimeout(resolve, delay)); // Espera el tiempo antes de continuar

    // Realizar la solicitud después del retraso
    const response = await fetch("/.netlify/functions/getLastEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    
    // Ocultar el mensaje de espera después de la respuesta
    waitMessage.style.display = "none"; // Ocultar mensaje de espera

    if (data.link) {
        window.location.href = data.link; // Redirige automáticamente al enlace
    } else {
        alert("No se encontró resultado para tu cuenta, vuelve a intentarlo nuevamente. Recuerda que solo tendrás 10 minutos después de solicitado el código para poder obtenerlo aquí, no dejes vencer tu código.");
    }
});
