var cicleClock = 0;                 // contador de 4 timestamps do tempo entre ciclos
var interClock = 0;                 // contador do tempo entre slots
var instant = 0;                    // instant atual
var loopLength = 15000;             // em milissegundos
var nSlots = 100;                   // número de slots possíveis
var activeSlot = nSlots / 4 * 3;    // slot atual
var colorBar = 255;
var timeline;                       // array da timeline
var timelineRaioAux;                // raio da timeline aux
var peixesMar;                      // array peixes mar
var peixesRio;                      // array peixes rio
var peixes;                         // array peixes atual
var nPeixes = 10;                   // numero de peixes por cenario
var boia;                           // identifica a boia
var botaoEnviar = false;            // click no Botao 'Enviar Email'
var botaoFechar = false;            // click no Botao Fechar

var volumeMar = 1;
var volumeRio = 0;

var cenario = 1;                    // identifica o senario atual
var alphaChange = 0;
var changeAnim = false;

var popupOpen = false;

var thiness;
var thinCoef = 1;

var ambientSoundMar;
var ambientSoundRio;

var dragMar;
var dragMar2;
var dragRio;
var dragRio2;
var dragSound;
var dragSound2;
var dragIndex=0;

var volumeDrag = [0,0,0,0,0,0];
var volumeDrag2 = [0,0,0,0,0,0];

var angTimeline = 0;

var bg1, bg2;

let recorder, soundFile;
var recordAux = false;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function preload() {
    ambientSoundMar = loadSound("Sounds/ambient1.mp3");
    ambientSoundRio = loadSound("Sounds/ambient2.mp3");
}
function setup() {

    recorder = new p5.SoundRecorder();
    soundFile = new p5.SoundFile();
    gravacao = new p5.SoundFile();

    bg1 = loadImage('Images/1mar.png');
    bg2 = loadImage('Images/1rio.png');

    light = loadFont('Fonts/Gilroy-Light.otf');
    bold = loadFont('Fonts/Gilroy-ExtraBold.otf');

    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    noStroke();

    //ambientSoundMar.loop();       //aqui
    ambientSoundRio.loop();

    dragMar = [loadSound("Sounds/dragMar1.mp3"),
    loadSound("Sounds/dragMar2.mp3"),
    loadSound("Sounds/dragMar3.mp3")]

    dragMar2 = [loadSound("Sounds/dragMar4.mp3"),
    loadSound("Sounds/dragMar5.mp3"),
    loadSound("Sounds/dragMar6.mp3")]

    dragRio = [loadSound("Sounds/dragRio1.mp3"),
    loadSound("Sounds/dragRio2.mp3"),
    loadSound("Sounds/dragRio3.mp3")]

    dragRio2 = [loadSound("Sounds/dragRio4.mp3"),
    loadSound("Sounds/dragRio5.mp3"),
    loadSound("Sounds/dragRio6.mp3")]

    // inicializar timeline -----//-----//-----
    timeline = Array.from(new Array(nSlots), () => new Array(nPeixes));
    for (let i = 0; i < nSlots; i++) {
        for (let j = 0; j < nPeixes; j++) {
            timeline[i][j] = [-1,-1];
        }
    }

    // inicializar peixes mar-----//-----//-----
    peixesMar = new Array(nPeixes);
    peixesMar[0] = new Peixe("Images/p1.gif", "Sounds/p1_1.mp3", "Sounds/p1_2.mp3", "Sounds/p1_3.mp3", displayHeight / 8, [29, 29, 27]);
    peixesMar[1] = new Peixe("Images/p2.gif", "Sounds/p2_1.mp3", "Sounds/p2_2.mp3", "Sounds/p2_3.mp3", displayHeight / 6, [224, 110, 1]);
    peixesMar[2] = new Peixe("Images/p3.gif", "Sounds/p3_1.mp3", "Sounds/p3_2.mp3", "Sounds/p3_3.mp3", displayHeight / 8, [239, 218, 11]);
    peixesMar[3] = new Peixe("Images/p4.gif", "Sounds/p4_1.mp3", "Sounds/p4_2.mp3", "Sounds/p4_3.mp3", displayHeight / 6, [30, 58, 92]);
    peixesMar[4] = new Peixe("Images/p5.gif", "Sounds/p5_1.mp3", "Sounds/p5_2.mp3", "Sounds/p5_3.mp3", displayHeight / 6, [232, 45, 138]);

    peixesMar[5] = new Peixe("Images/p1.gif", "Sounds/p1_1.mp3", "Sounds/p1_2.mp3", "Sounds/p1_3.mp3", displayHeight / 7, [29, 29, 27]);
    peixesMar[6] = new Peixe("Images/p2.gif", "Sounds/p2_1.mp3", "Sounds/p2_2.mp3", "Sounds/p2_3.mp3", displayHeight / 5, [224, 110, 1]);
    peixesMar[7] = new Peixe("Images/p3.gif", "Sounds/p3_1.mp3", "Sounds/p3_2.mp3", "Sounds/p3_3.mp3", displayHeight / 9, [239, 218, 11]);
    peixesMar[8] = new Peixe("Images/p4.gif", "Sounds/p4_1.mp3", "Sounds/p4_2.mp3", "Sounds/p4_3.mp3", displayHeight / 7, [30, 58, 92]);
    peixesMar[9] = new Peixe("Images/p5.gif", "Sounds/p5_1.mp3", "Sounds/p5_2.mp3", "Sounds/p5_3.mp3", displayHeight / 5, [232, 45, 138]);

    // inicializar peixes rio-----//-----//-----
    peixesRio = new Array(nPeixes);
    peixesRio[0] = new Peixe("Images/p6.gif", "Sounds/p7_1.mp3", "Sounds/p7_2.mp3", "Sounds/p7_3.mp3", displayHeight / 7, [101, 132, 157]);
    peixesRio[1] = new Peixe("Images/p7.gif", "Sounds/p6_1.mp3", "Sounds/p6_2.mp3", "Sounds/p6_3.mp3", displayHeight / 6, [134, 149, 90]);
    peixesRio[2] = new Peixe("Images/p8.gif", "Sounds/p8_1.mp3", "Sounds/p8_2.mp3", "Sounds/p8_3.mp3", displayHeight / 8, [196, 22, 23]);
    peixesRio[3] = new Peixe("Images/p9.gif", "Sounds/p9_1.mp3", "Sounds/p9_2.mp3", "Sounds/p9_3.mp3", displayHeight / 6, [245, 159, 11]);
    peixesRio[4] = new Peixe("Images/p10.gif", "Sounds/p10_1.mp3", "Sounds/p10_2.mp3", "Sounds/p10_3.mp3", displayHeight / 6, [182, 93, 101]);

    peixesRio[5] = new Peixe("Images/p6.gif", "Sounds/p7_1.mp3", "Sounds/p7_2.mp3", "Sounds/p7_3.mp3", displayHeight / 7, [101, 132, 157]);
    peixesRio[6] = new Peixe("Images/p7.gif", "Sounds/p6_1.mp3", "Sounds/p6_2.mp3", "Sounds/p6_3.mp3", displayHeight / 5, [134, 149, 90]);
    peixesRio[7] = new Peixe("Images/p8.gif", "Sounds/p8_1.mp3", "Sounds/p8_2.mp3", "Sounds/p8_3.mp3", displayHeight / 8, [196, 22, 23]);
    peixesRio[8] = new Peixe("Images/p9.gif", "Sounds/p9_1.mp3", "Sounds/p9_2.mp3", "Sounds/p9_3.mp3", displayHeight / 6, [245, 159, 11]);
    peixesRio[9] = new Peixe("Images/p10.gif", "Sounds/p10_1.mp3", "Sounds/p10_2.mp3", "Sounds/p10_3.mp3", displayHeight / 6, [182, 93, 101]);

    // criacao da boia -----//-----//-----
    boia = new Boia("Images/boia.png", displayWidth / 2, displayHeight / 2, displayHeight / 6, displayHeight / 2.2);

    //loopLength = boia.tempos[boia.indTempos]*1000;
    timelineRaio = displayHeight / 5;
    timelineRaioAux = timelineRaio;

    document.getElementById("email").style.width = displayWidth - 2 * displayWidth / 4 - displayHeight / 40 * 2;
    document.getElementById("email").style.height = displayHeight / 20;
    document.getElementById("email").style.left = displayWidth / 2 - (displayWidth - 2 * displayWidth / 4) / 2 + displayHeight / 40;
    document.getElementById("email").style.top = displayHeight / 2 - (displayHeight / 20) / 2;
}

function draw() {

    if (cenario == 1) {
        peixes = peixesMar;
        dragSound = dragMar;
        dragSound2 = dragMar2;
        image(bg1, displayWidth / 2, displayHeight / 2, displayWidth, displayHeight);
        background(0, 60, 100, 100);
    }
    else {
        peixes = peixesRio;
        dragSound = dragRio;
        dragSound2 = dragRio2;
        image(bg2, displayWidth / 2, displayHeight / 2, displayWidth, displayHeight);
    }

    instant = millis();

    thiness = (displayHeight / 100) * thinCoef;

    // desenhar peixes
    for (let i = 0; i < nPeixes; i++) {
        if (peixes[i].dragged) peixes[i].rasto();
        peixes[i].draw();
    }
    if (instant - interClock >= loopLength / nSlots) {

        interClock = instant;

        // reescreve ficheiro audio
        if (activeSlot == 75 && boia.rec) {
            if (recordAux) {
                console.log("acabei de gravar");
                recorder.stop();
                soundFile = gravacao;
                //save(gravacao, 'mySound.wav');
                recordAux = false;
    
            }
            console.log("comecei a gravar");
            gravacao = new p5.SoundFile();
            recorder = new p5.SoundRecorder();
            recorder.record(gravacao);
            recordAux = true;
        }
        
        for (let i = 0; i < nPeixes; i++) {
            // tocar o som caso esteja gravado no slot
            if (timeline[activeSlot][i][0] != -1) {
                peixes[i].playSound(timeline[activeSlot][i][0]);

                peixes[i].react();
            } // gravar o som caso o slot esteja vazio
            else if (peixes[i].lastClick != -1) {
                if (boia.rec) timeline[activeSlot][i][0] = peixes[i].lastClick;
                peixes[i].lastClick = -1;
            }
        }
        if (activeSlot < nSlots - 1) {
            activeSlot += 1;
            angTimeline = activeSlot * 2 * PI / nSlots;
        }
        else {
            cicleClock = instant;
            activeSlot = 0;
            angTimeline = 0;
        }
    }

    boia.draw();

    // Mudanca de cenario
    if (changeAnim) {
        if (alphaChange < 300) {
            alphaChange += 9;
            if (cenario == 1 && volumeMar >= 0) volumeMar -= 0.05;
            if (cenario == 2 && volumeRio >= 0) volumeRio -= 0.05;
        }
        else {
            cleanTimeline();
            if (cenario == 1) cenario = 2;
            else cenario = 1;
            changeAnim = false;
            boia.opened = false;
            activeSlot = nSlots / 4 * 3;
            ambientSoundMar.stop();
            ambientSoundRio.stop();
            ambientSoundMar.play();
            ambientSoundRio.play();
        }
    }

    if (alphaChange > 0 && changeAnim == false) {
        alphaChange -= 9;
        if (cenario == 1 && volumeMar <= 1) volumeMar += 0.05;
        if (cenario == 2 && volumeRio <= 1) volumeRio += 0.05;
    }

    ambientSoundMar.setVolume(volumeMar);
    ambientSoundRio.setVolume(volumeRio);

    if (checkClickAndDrag() == false) {

        for (let i = 0;i <3;i++) {
            if (volumeDrag[i]>=0) volumeDrag[i]-= 0.01;
            else dragSound[i].stop();
            if (volumeDrag2[i]>=0)volumeDrag2[i]-= 0.01;
            else dragSound2[i].stop();
            dragSound[i].setVolume(volumeDrag[i]);
            dragSound2[i].setVolume(volumeDrag2[i]);
        }
    }
    
    noStroke();
    fill(0, 0, 0, alphaChange);
    rect(0, 0, displayWidth, displayHeight);

    //popup
    if (popupOpen) popup();

    // Botao fechar
    //if (botaoFechar) botaoFecharF();
}
