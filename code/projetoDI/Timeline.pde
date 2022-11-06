void drawTimeline() { 
    if (invertX == 0 && invertY == 0) {
    rect(0,0,xBar,thiness);
    xBar+=incBarX;
    if (xBar>=displayWidth) invertX = 1;
  }
  else if (invertX == 1 && invertY == 0) {
    rect(0,0,displayWidth,thiness);
    rect(displayWidth-thiness,0,thiness,yBar);
    yBar+=incBarY;
    if (yBar>=displayHeight) invertY = 1;
  }
  else if (invertX == 1 && invertY == 1) {
    if (xBar > 0) xBar = 0;
    rect(0,0,displayWidth,thiness);
    rect(displayWidth-thiness,0,thiness,displayHeight);
    rect(displayWidth-thiness,displayHeight-thiness,xBar,thiness);
    xBar-=incBarX;
    if (xBar <= -displayWidth) invertX = 0;
  }
  else if(invertX == 0 && invertY == 1){
    if (yBar > 0) yBar = 0;
    rect(0,0,displayWidth,thiness);
    rect(displayWidth-thiness,0,thiness,displayHeight);
    rect(0,displayHeight-thiness,displayWidth,thiness);
    rect(0,displayHeight-thiness,thiness,yBar);
    yBar-=incBarY;
    if (yBar <= -displayHeight) {
      invertY = 0;
      xBar = 0;
      yBar = 0;
      goodToDraw = false;
    }
  }
}
