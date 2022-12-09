function popup() {
    fill(0, 0, 0, 200);
    noStroke();
    rect(0, 0, displayWidth, displayHeight);
    fill(255, 255, 255, 75);
    rect(displayWidth / 4, displayHeight / 2.65, displayWidth - 2 * displayWidth / 4, displayHeight - 2 * displayHeight / 2.65, 5, 5, 5, 5);

    // Titulo
    fill(255, 255, 255);
    textFont(bold);
    textSize(displayWidth / 50);
    textAlign(RIGHT, CENTER);
    text("Guarda a tua música", displayWidth - 2 * displayWidth / 4 - displayHeight / 40 * 2, displayHeight / 2 - (displayHeight / 17));


    // Botao fechar - X
    noStroke();
    fill(255, 255, 255);
    textFont("arial");
    textSize(displayWidth / 65);
    textAlign(LEFT, CENTER);
    text("X", displayWidth / 4, displayHeight / 4);

    // Espaco Email
    document.getElementById("email").style.display = "block";
    var input = document.getElementById("email");

    // Botao enviar
    document.getElementById("enviar").style.display = "block";
    document.getElementById("enviar").style.left = displayWidth / 4 + displayWidth - 2 * displayWidth / 4 - displayHeight / 40 - displayWidth / 15 + displayHeight / 40 / 1.4;
    document.getElementById("enviar").style.top = displayHeight / 2 + displayHeight / 40 * 2.85 - 4;

    // Fechar a janela
    if ((mouseX < displayWidth / 4 || mouseX > displayWidth / 4 + (displayWidth - 2 * displayWidth / 4) ||
        mouseY < displayHeight / 4 || mouseY > displayHeight / 4 + (displayHeight - 2 * displayHeight / 4)) && mouseIsPressed) {
        document.getElementById("email").style.display = "none";
        document.getElementById("enviar").style.display = "none";
        popupOpen = false;
    }
}
