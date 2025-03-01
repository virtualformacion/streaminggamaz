document.getElementById("emailForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;

    // Mostrar el mensaje de espera
    const alertElement = document.createElement("div");
    alertElement.id = "loadingAlert";
    alertElement.innerHTML = "Espere un momento, no recargue la página. Estamos consultando su solicitud.";
    alertElement.style.position = "fixed";
    alertElement.style.top = "50%";
    alertElement.style.left = "50%";
    alertElement.style.transform = "translate(-50%, -50%)";
    alertElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    alertElement.style.color = "white";
    alertElement.style.padding = "20px";
    alertElement.style.borderRadius = "10px";
    document.body.appendChild(alertElement);

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

