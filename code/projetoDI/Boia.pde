public class Boia {
  PImage imgBoia;
  PImage imgButtons;
  int x, y;
  int size;

  Boia(String imgBoia, String imgButtons, int x, int y, int size) {
    this.imgBoia = loadImage(imgBoia);
    this.x = x;
    this.y = y;
    this.size = size;
  }
  void draw() {
    image(imgBoia, x, y, size, size);
    imageMode(CENTER);
  }
  }
