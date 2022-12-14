import processing.sound.*;

int cicleClock = 0; //contador de 4 timestamps do tempo entre ciclos
int interClock = 0; //contador do tempo entre slots
int instant = 0; //instant atual
int loopLength = 5000; //em milissegundos
int nSlots = 120; //número de slots possíveis
int activeSlot = 0; //slot atual 
boolean goodToDraw = true;

int colorBar = 255;

float amp = 0;

float timeToTravelX, timeToTravelY; //tempo que a barra demora a percorrer os lados do ecrã
float incBarX, incBarY; //incremento em pixeis da barra
int xBar = 0, yBar = 0; //tamanho atual da barra
int invertX = 0,invertY = 0; //auxiliares à construção da barra

int[][] timeline; //array da timeline
Peixe[] peixes; //array de peixes
int nPeixes = 2; //numero de peixes

Boia boia;

float thiness;
float thinCoef = 1;
PFont f;

SoundFile ambientSound1;

void setup(){
    
    frameRate(30);
    fullScreen();
    //size(displayWidth, displayHeight);
    background(175,238,238);
    noStroke();

    timeToTravelX = (float(displayWidth)/(2*displayWidth + 2*displayHeight))*loopLength;
    timeToTravelY = (float(displayHeight)/(2*displayWidth + 2*displayHeight))*loopLength;
    incBarX=displayWidth/(timeToTravelX*30/1000);
    incBarY=displayHeight/(timeToTravelY*30/1000);

    ambientSound1 = new SoundFile(this, "ambientSound1.mp3");
    ambientSound1.loop();
    ambientSound1.amp(amp);
    
    //inicializar timeline -----//-----//-----
    
    timeline = new int[nSlots][nPeixes];
    
    for (int i = 0; i<nSlots; i++) {
      for (int j=0; j<nPeixes; j++) {
        timeline[i][j] = -1;
      }
    }
    
    //inicializar peixes -----//-----//-----
    
    peixes = new Peixe[nPeixes];
    
    peixes[0] = new Peixe(0, "peixinho1.png", "som1.mp3", "som2.mp3", "som3.mp3", displayWidth/2, 200, displayHeight/7,(1/2)*PI);
    peixes[1] = new Peixe(0, "peixinho2.png", "som4.mp3", "som5.mp3", "som6.mp3", displayWidth/2, displayHeight-200, displayHeight/6,(3/2)*PI);
    
    //criacao da boia -----//-----//-----
    
    boia = new Boia("boia.png","botoes.png",displayWidth/2,displayHeight/2,displayHeight/6,displayHeight/3);
    
    f = createFont("Arial",16,true);
}

void draw(){
  
  instant = millis();
  background(175,238,238);
  
  thiness = displayHeight/100*thinCoef;
  
  if(colorBar < 255) colorBar+=9;
  if (thinCoef > 1) {
    thinCoef-=0.05;
    fill(255,colorBar,colorBar);
    noStroke();
    rect(0,0,displayWidth,thiness);
    rect(displayWidth-thiness,0,thiness,displayHeight);
    rect(0,displayHeight-thiness,displayWidth,thiness);
    rect(0,0,thiness,displayHeight);
  }
  
  boia.draw();
  
  //desenhar peixes
  for (int i = 0; i<nPeixes; i++) {
    peixes[i].draw();
  }
  
  if (instant-interClock >= loopLength/nSlots) {

    interClock = instant;
    
    for (int i = 0; i<nPeixes; i++) {
      //tocar o som caso esteja gravado no slot
      if (timeline[activeSlot][i] != -1) {
        peixes[i].playSound(timeline[activeSlot][i]);
        peixes[i].react();
      }
      //gravar o som caso o slot esteja vazio
      else if (peixes[i].lastClick != -1) {
        timeline[activeSlot][i] = peixes[i].lastClick;
        peixes[i].lastClick = -1;
      }
    }
    
    if (activeSlot < nSlots-1) activeSlot += 1;
    else {
      cicleClock = instant;
      activeSlot = 0;
      goodToDraw = true;
  }
  }
  
  if (goodToDraw) drawTimeline();
  
  //textFont(f,16);                  
  //fill(0);                      
  //text(str(activeSlot),10,100); 
  //fill(255,255,255);  
  }
  
  void keyPressed() {
  if (key == 'm') {
    if (amp == 0.75) {
      amp = 0;
      ambientSound1.amp(amp);
    }
    else {
      amp = 0.75;
      ambientSound1.amp(amp);
    }
  }
  }
  
 void cleanTimeline() {
       for (int i = 0; i<nSlots; i++) {
      for (int j=0; j<nPeixes; j++) {
        timeline[i][j] = -1;
      }
    }
 }
