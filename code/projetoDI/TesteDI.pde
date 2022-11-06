import processing.sound.*;

int cicleClock = 0; //contador de 4 timestamps do tempo entre ciclos
int interClock = 0; //contador do tempo entre slots
int instant = 0; //instant atual
int loopLength = 5000; //em milissegundos
int nSlots = 60; //número de slots possíveis
int activeSlot = 0; //slot atual 
boolean goodToDraw = true;

float timeToTravelX, timeToTravelY; //tempo que a barra demora a percorrer os lados do ecrã
float incBarX, incBarY; //incremento em pixeis da barra
int xBar = 0, yBar = 0; //tamanho atual da barra
int invertX = 0,invertY = 0; //auxiliares à construção da barra

int[][] timeline; //array da timeline
Peixe[] peixes; //array de peixes
int nPeixes = 2; //numero de peixes

Boia boia;

float thiness;
PFont f;

SoundFile ambientSound1;

void setup(){
    
    frameRate(30);
    fullScreen();
    //size(displayWidth, displayHeight);
    background(175,238,238);
    noStroke();

    thiness = float(displayHeight/100);
    timeToTravelX = (float(displayWidth)/(2*displayWidth + 2*displayHeight))*loopLength;
    timeToTravelY = (float(displayHeight)/(2*displayWidth + 2*displayHeight))*loopLength;
    incBarX=displayWidth/(timeToTravelX*30/1000);
    incBarY=displayHeight/(timeToTravelY*30/1000);

    ambientSound1 = new SoundFile(this, "ambientSound1.mp3");
    ambientSound1.loop();
    ambientSound1.amp(0.75);
    
    //inicializar timeline -----//-----//-----
    
    timeline = new int[nSlots][nPeixes];
    
    for (int i = 0; i<nSlots; i++) {
      for (int j=0; j<nPeixes; j++) {
        timeline[i][j] = -1;
      }
    }
    
    //inicializar peixes -----//-----//-----
    
    peixes = new Peixe[nPeixes];
    
    peixes[0] = new Peixe(0, "peixinho1.png", "som1.mp3", "som2.mp3", "som3.mp3", 100, 100, displayHeight/7);
    peixes[1] = new Peixe(0, "peixinho2.png", "som4.mp3", "som5.mp3", "som6.mp3", 750, 750, displayHeight/6);
    
    //criacao da boia -----//-----//-----
    
    boia = new Boia("boia.png","botoes",displayWidth/2,displayHeight/2,displayHeight/6);
    
    f = createFont("Arial",16,true);
}

void draw(){
  
  instant = millis();
  background(175,238,238);
  
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
  
  textFont(f,16);                  
  fill(0);                      
  text(str(activeSlot),10,100); 
  fill(255,255,255);  
  }
