import processing.sound.*;

public class Peixe {

  PImage img;
  SoundFile[] sounds = new  SoundFile[3];
  int id;
  int lastClick;
  float x, y;
  float size, reactSize;
  float phase;

  Peixe(int id, String img, String sound1, String sound2, String sound3, int x, int y, float size,float phase) {
    this.id = id;
    this.img = loadImage(img);
    this.x = x;
    this.y = y;
    this.phase = phase;
    this.size = size;
    reactSize = size;

    sounds[0] = new SoundFile(TesteDI.this, sound1);
    sounds[1] = new SoundFile(TesteDI.this, sound2);
    sounds[2] = new SoundFile(TesteDI.this, sound3);
    lastClick = -1;
  }

  void draw() {
    
    phase += 0.01;
    
    x = displayWidth/2 + 500*sin(phase);
   
    if (reactSize > size) {
      reactSize-=2;
      image(img, x, y, reactSize, reactSize);
      imageMode(CENTER);
      
    }
    else {
      image(img, x, y, size, size);
      imageMode(CENTER);
    }
    
    if (!(mouseX < x-size/2 || mouseX > x+size/2 || mouseY < y-size/2 || mouseY > y+size/2) && mousePressed) {
    mousePressed = false;
    this.playAndRecord();
    this.react();
    }
  }
  
  void react() {
    reactSize = size*1.1;
  }
  
  void playAndRecord() {
    lastClick = int(random(3));
    sounds[lastClick].play();
  }
  
  void playSound(int index) {
    sounds[index].play();
  }
}
