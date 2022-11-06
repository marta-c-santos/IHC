import processing.sound.*;

public class Peixe {

  PImage img;
  SoundFile[] sounds = new  SoundFile[3];
  int id;
  int lastClick;
  int x, y;
  float size, reactSize;

  Peixe(int id, String img, String sound1, String sound2, String sound3, int x, int y, float size) {
    this.id = id;
    this.img = loadImage(img);
    this.x = x;
    this.y = y;
    this.size = size;
    reactSize = size;

    sounds[0] = new SoundFile(TesteDI.this, sound1);
    sounds[1] = new SoundFile(TesteDI.this, sound2);
    sounds[2] = new SoundFile(TesteDI.this, sound3);
    lastClick = -1;
  }

  void draw() {
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
