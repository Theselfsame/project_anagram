function returnToLanding() {
    document.querySelector('#logo').addEventListener('click', () => {
        window.location.href = "index.html";
    })
}

export  { returnToLanding }