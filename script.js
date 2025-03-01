document.getElementById("emailForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;


    alertElement.innerHTML = "Espere un momento, no recargue la página. Estamos consultando su solicitud.";


    // Espera aleatoria entre 10 y 25 segundos antes de hacer la solicitud
    const delay = Math.floor(Math.random() * (25000 - 10000 + 1)) + 10000;
    setTimeout(async () => {
        const response = await fetch("/.netlify/functions/getLastEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        document.body.removeChild(alertElement); // Eliminar mensaje de espera

        if (data.link) {
            window.location.href = data.link; // Redirige automáticamente
        } else {
            alert("No se encontró resultado para tu cuenta, vuelve a intentarlo nuevamente. Recuerda que solo tendrás 10 minutos después de solicitado el código.");
        }
    }, delay);
});
