import processing.sound.*;

public class Boia {
  PImage imgBoia;
  PImage imgButtons;
  int x, y;
  int size1,size2;
  float reactSize;
  float ang = 1;
  float opa1 = 1, opa2 = 0;
  int raioPulsar = 0;
  boolean opened = false;
  
  SoundFile sound = new SoundFile(TesteDI.this, "bubble.mp3");
  SoundFile delete = new SoundFile(TesteDI.this, "bubbleDelete.mp3");

  Boia(String imgBoia, String imgButtons, int x, int y, int size1, int size2) {
    this.imgBoia = loadImage(imgBoia);
    this.imgButtons = loadImage(imgButtons);
    this.x = x;
    this.y = y;
    this.size1 = size1;
    this.size2 = size2;
  }
  void draw() {

    //menu
    if (opened) {
      if (opa2 < 255) opa2++;
      pushMatrix();
      translate(x, y);
      rotate(radians(PI/2.0*ang));
      image(imgButtons, 0, 0, size2, size2);
      imageMode(CENTER);
      translate(-x, -y);
      popMatrix();
      
      if (mouseX < x+size2/2 && mouseX > x-size2/2 && mouseY < y+size2/2 && mouseY > y-size2/2 && mousePressed) {
        if (mouseX < x-size1/2 || mouseX > x+size1/2 || mouseY < y-size1/2 || mouseY > y+size1/2) {
      delete.amp(1);
      delete.play();
      cleanTimeline();
      colorBar = 0;
      thinCoef = 2;
      mousePressed = false;
        }
    }
    } 

    if (!(mouseX < x-size1/2 || mouseX > x+size1/2 || mouseY < y-size1/2 || mouseY > y+size1/2) && mousePressed) {
      react();
      sound.amp(1);
      sound.play();
      mousePressed = false;
      opened = !opened;
    }
    
    if (opa2 > 0) opa2--;
    
    //boia
    pushMatrix();
    translate(x, y);
    rotate(radians(PI/2.0*ang));
     if (reactSize > size1) {
      reactSize-=2;
      image(imgBoia, 0, 0, reactSize, reactSize);
      }
      else  image(imgBoia, 0, 0, size1, size1);
    imageMode(CENTER);
    translate(-x, -y);
    popMatrix();

    //pulso
    ang+= 0.2;

    if (raioPulsar < 50) {
      opa1 = (255-255*raioPulsar/50)*2;
      raioPulsar+=2;
    } else raioPulsar = 0;

    noFill();
    stroke(255, 255, 255, opa1);
    strokeWeight(6);
    circle(x, y, raioPulsar);
  }
  
  void react() {
    reactSize = size1*1.1;
  }
  
}
