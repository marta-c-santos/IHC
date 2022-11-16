var cicleClock = 0; //contador de 4 timestamps do tempo entre ciclos
var interClock = 0; //contador do tempo entre slots
var instant = 0; //instant atual
var loopLength = 5000; //em milissegundos
var nSlots = 120; //número de slots possíveis
var activeSlot = 0; //slot atual
var goodToDraw = true;
var colorBar = 255;
var amp = 0;
var timeToTravelX, timeToTravelY; //tempo que a barra demora a percorrer os lados do ecrã
var incBarX, incBarY; //incremento em pixeis da barra
var xBar = 0,
    yBar = 0; //tamanho atual da barra
var invertX = 0,
    invertY = 0; //auxiliares à construção da barra
var timeline; //array da timeline
var peixes; //array de peixes
var nPeixes = 2; //numero de peixes
var boia;
var thiness;
var thinCoef = 1;
var f;
var ambientSound1;

function setup() {
    frameRate(30);
    //fullscreen(); 
    createCanvas(windowWidth, windowHeight);
    background(175, 238, 238);
    noStroke();
    timeToTravelX =
        (float(displayWidth) / (2 * displayWidth + 2 * displayHeight)) *
        loopLength;
    timeToTravelY =
        (float(displayHeight) / (2 * displayWidth + 2 * displayHeight)) *
        loopLength;
    incBarX = displayWidth / ((timeToTravelX * 30) / 1000);
    incBarY = displayHeight / ((timeToTravelY * 30) / 1000);
    ambientSound1 = new Audio("ambientSound1.mp3");
    ambientSound1.play();
    //ambientSound1.loop();
    //ambientSound1.amp(amp); //inicializar timeline -----//-----//-----
    timeline = Array.from(new Array(nSlots), () => new Array(nPeixes));
    for (let i = 0; i < nSlots; i++) {
        for (let j = 0; j < nPeixes; j++) {
            timeline[i][j] = -1;
        }
    } //inicializar peixes -----//-----//-----
    peixes = new Array(nPeixes);
    peixes[0] = new Peixe(
        0,
        "peixinho1.png",
        "som1.mp3",
        "som2.mp3",
        "som3.mp3",
        displayWidth / 2,
        200,
        displayHeight / 7,
        (1 / 2) * PI
    );
    peixes[1] = new Peixe(
        0,
        "peixinho2.png",
        "som4.mp3",
        "som5.mp3",
        "som6.mp3",
        displayWidth / 2,
        displayHeight - 200,
        displayHeight / 6,
        (3 / 2) * PI
    ); //criacao da boia -----//-----//-----
    boia = new Boia(
        "boia.png",
        "botoes.png",
        displayWidth / 2,
        displayHeight / 2,
        displayHeight / 6,
        displayHeight / 3
    );
}
function preload() {
    //ambientSound1 = new Audio("ambientSound1.mp3");
    f = "Arial";
}
function draw() {
    instant = millis();
    background(175, 238, 238);
    thiness = (displayHeight / 100) * thinCoef;
    if (colorBar < 255) colorBar += 9;
    if (thinCoef > 1) {
        thinCoef -= 0.05;
        fill(255, colorBar, colorBar);
        noStroke();
        rect(0, 0, displayWidth, thiness);
        rect(displayWidth - thiness, 0, thiness, displayHeight);
        rect(0, displayHeight - thiness, displayWidth, thiness);
        rect(0, 0, thiness, displayHeight);
    }
    boia.draw(); //desenhar peixes
    for (let i = 0; i < nPeixes; i++) {
        peixes[i].draw();
    }
    if (instant - interClock >= loopLength / nSlots) {
        interClock = instant;
        for (let i = 0; i < nPeixes; i++) {
            //tocar o som caso esteja gravado no slot
            if (timeline[activeSlot][i] != -1) {
                peixes[i].playSound(timeline[activeSlot][i]);
                peixes[i].react();
            } //gravar o som caso o slot esteja vazio
            else if (peixes[i].lastClick != -1) {
                timeline[activeSlot][i] = peixes[i].lastClick;
                peixes[i].lastClick = -1;
            }
        }
        if (activeSlot < nSlots - 1) activeSlot += 1;
        else {
            cicleClock = instant;
            activeSlot = 0;
            goodToDraw = true;
        }
    }
    if (goodToDraw) drawTimeline(); //textFont(f,16);
    //fill(0);
    //text(str(activeSlot),10,100);
    //fill(255,255,255);
}
function keyPressed() {
    if (key == "m") {
        if (amp == 0.75) {
            amp = 0;
            //ambientSound1.amp(amp);
        } else {
            amp = 0.75;
            //ambientSound1.amp(amp);
        }
    }
}
function cleanTimeline() {
    for (let i = 0; i < nSlots; i++) {
        for (let j = 0; j < nPeixes; j++) {
            timeline[i][j] = -1;
        }
    }
}

// ------------------------------------------ Peixe ------------------------------------------
class Peixe {
  img;
  sounds = new Array(3);
  id;
  lastClick;
  x;
  y;
  size;
  reactSize;
  phase;
  constructor(id, img, sound1, sound2, sound3, x, y, size, phase) {
      this.id = id;
      this.img = loadImage(img);
      this.x = x;
      this.y = y;
      this.phase = phase;
      this.size = createCanvas;
      this.reactSize = createCanvas;
      this.sounds[0] = new Audio(sound1);
      this.sounds[1] = new Audio(sound2);
      this.sounds[2] = new Audio(sound3);
      this.lastClick = -1;
  }
  draw() {
      this.phase += 0.01;
      this.x = displayWidth / 2 + 500 * sin(this.phase);
      if (this.reactSize > this.size) {
          this.reactSize -= 2;
          image(this.img, this.x, this.y, this.reactSize, this.reactSize);
          imageMode(CENTER);
      } else {
          image(this.img, this.x, this.y, this.size, this.size);
          imageMode(CENTER);
      }
      if (
          !(
              mouseX < this.x - this.size / 2 ||
              mouseX > this.x + this.size / 2 ||
              mouseY < this.y - this.size / 2 ||
              mouseY > this.y + this.size / 2
          ) &&
          mouseIsPressed
      ) {
          mouseIsPressed = false;
          this.playAndRecord();
          this.react();
      }
  }
  react() {
      this.reactSize = this.size * 1.1;
  }
  playAndRecord() {
      this.lastClick = int(random(3));
      this.sounds[this.lastClick].play();
  }
  playSound(index) {
      this.sounds[index].play();
  }
}


// ------------------------------------------ Boia ------------------------------------------
class Boia {
  imgBoia;
  imgButtons;
  x;
  y;
  size1;
  size2;
  reactSize;
  ang = 1;
  opa1 = 1;
  opa2 = 0;
  raioPulsar = 0;
  opened = false;
  sound = new Audio("bubble.mp3");
  delete = new Audio("bubbleDelete.mp3");
  constructor(imgBoia, imgButtons, x, y, size1, size2) {
      this.imgBoia = loadImage(imgBoia);
      this.imgButtons = loadImage(imgButtons);
      this.x = x;
      this.y = y;
      this.size1 = size1;
      this.size2 = size2;
  }
  draw() {
      //menu
      if (this.opened) {
          if (this.opa2 < 255) this.opa2++;
          push();
          translate(this.x, this.y);
          rotate(radians((PI / 2.0) * this.ang));
          image(this.imgButtons, 0, 0, this.size2, this.size2);
          imageMode(CENTER);
          translate(-this.x, -this.y);
          pop();
          if (
              mouseX < this.x + this.size2 / 2 &&
              mouseX > this.x - this.size2 / 2 &&
              mouseY < this.y + this.size2 / 2 &&
              mouseY > this.y - this.size2 / 2 &&
              mouseIsPressed
          ) {
              if (
                  mouseX < this.x - this.size1 / 2 ||
                  mouseX > this.x + this.size1 / 2 ||
                  mouseY < this.y - this.size1 / 2 ||
                  mouseY > this.y + this.size1 / 2
              ) {
                  this.delete.amp(1);
                  this.delete.play();
                  cleanTimeline();
                  colorBar = 0;
                  thinCoef = 2;
                  mouseIsPressed = false;
              }
          }
      }
      if (
          !(
              mouseX < this.x - this.size1 / 2 ||
              mouseX > this.x + this.size1 / 2 ||
              mouseY < this.y - this.size1 / 2 ||
              mouseY > this.y + this.size1 / 2
          ) &&
          mouseIsPressed
      ) {
          this.react();
          this.sound.amp(1);
          this.sound.play();
          mouseIsPressed = false;
          this.opened = !this.opened;
      }
      if (this.opa2 > 0) this.opa2--; //boia
      push();
      translate(this.x, this.y);
      rotate(radians((PI / 2.0) * this.ang));
      if (this.reactSize > this.size1) {
          this.reactSize -= 2;
          image(this.imgBoia, 0, 0, this.reactSize, this.reactSize);
      } else image(this.imgBoia, 0, 0, this.size1, this.size1);
      imageMode(CENTER);
      translate(-this.x, -this.y);
      pop(); //pulso
      this.ang += 0.2;
      if (this.raioPulsar < 50) {
          this.opa1 = (255 - (255 * this.raioPulsar) / 50) * 2;
          this.raioPulsar += 2;
      } else this.raioPulsar = 0;
      noFill();
      stroke(255, 255, 255, this.opa1);
      strokeWeight(6);
      circle(this.x, this.y, this.raioPulsar);
  }
  react() {
      this.reactSize = this.size1 * 1.1;
  }
}

// ------------------------------------------ Timeline ------------------------------------------
function drawTimeline() {
  fill(255, colorBar, colorBar);
  noStroke();
  if (invertX == 0 && invertY == 0) {
      rect(0, 0, xBar, thiness);
      xBar += incBarX;
      if (xBar >= displayWidth) invertX = 1;
  } else if (invertX == 1 && invertY == 0) {
      rect(0, 0, displayWidth, thiness);
      rect(displayWidth - thiness, 0, thiness, yBar);
      yBar += incBarY;
      if (yBar >= displayHeight) invertY = 1;
  } else if (invertX == 1 && invertY == 1) {
      if (xBar > 0) xBar = 0;
      rect(0, 0, displayWidth, thiness);
      rect(displayWidth - thiness, 0, thiness, displayHeight);
      rect(displayWidth - thiness, displayHeight - thiness, xBar, thiness);
      xBar -= incBarX;
      if (xBar <= -displayWidth) invertX = 0;
  } else if (invertX == 0 && invertY == 1) {
      if (yBar > 0) yBar = 0;
      rect(0, 0, displayWidth, thiness);
      rect(displayWidth - thiness, 0, thiness, displayHeight);
      rect(0, displayHeight - thiness, displayWidth, thiness);
      rect(0, displayHeight - thiness, thiness, yBar);
      yBar -= incBarY;
      if (yBar <= -displayHeight) {
          invertY = 0;
          xBar = 0;
          yBar = 0;
          goodToDraw = false;
      }
  }
}


