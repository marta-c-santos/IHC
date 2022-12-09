// ------------------------------------------ Boia ------------------------------------------
class Boia {
    imgBoia;
    x;
    y;
    size1;
    size2;
    sizeAux1;
    sizeAux2;

    size3;
    size4;

    ang = 0;

    opa1 = 1;
    opa2 = 0;

    opaChange = 75;
    opaDelete = 75;
    opaSave = 75;
    opaRec = 75;

    rec = false;

    raioPulsar = 0;
    opened = false;

    deleteAnimation = false;
    opaDeleteAnim = 255;
    deleteRaio;

    sound = new Howl({ src: ["Sounds/bubble.mp3"] });
    delete = new Howl({ src: ["Sounds/bubbleDelete.mp3"] });
    click = new Howl({ src: ["Sounds/click.mp3"], volume: 0.7 });

    saveIcon = loadImage("Icons/save.png");
    deleteIcon = loadImage("Icons/delete.png");
    marIcon = loadImage("Icons/mar.png");
    rioIcon = loadImage("Icons/rio.png");

    constructor(imgBoia, x, y, size1, size2) {
        this.imgBoia = loadImage(imgBoia);
        this.x = x;
        this.y = y;
        this.size1 = size1;
        this.sizeAux1 = size1;
        this.size2 = size2;
        this.sizeAux2 = size2;

        this.size3 = displayHeight / 4.4;
        this.deleteRaio = this.sizeAux2;
    }

    draw() {
        //menu
        if (this.opened) {
            fill(0, 0, 0, 100);
            noStroke();
            rect(0, 0, displayWidth, displayHeight);

            noStroke();

            if (checkNotes()) {
                fill(255, 255, 255, this.opaSave);
                arc(displayWidth / 2, displayHeight / 2, this.sizeAux2, this.sizeAux2, 0 + PI / 4, PI / 2 + PI / 4);

                fill(255, 255, 255, this.opaDelete);
                arc(displayWidth / 2, displayHeight / 2, this.sizeAux2, this.sizeAux2, PI / 2 + PI / 4, PI + PI / 4);
            }

            fill(255, 255, 255, this.opaChange);
            arc(displayWidth / 2, displayHeight / 2, this.sizeAux2, this.sizeAux2, PI + PI / 4, 3 * PI / 2 + PI / 4);
            fill(255, 255, 255, this.opaRec);
            arc(displayWidth / 2, displayHeight / 2, this.sizeAux2, this.sizeAux2, 3 * PI / 2 + PI / 4, 2 * PI + PI / 4);

            if (this.opaChange > 75) this.opaChange -= 5;
            if (this.opaDelete > 75) this.opaDelete -= 5;
            if (this.opaSave > 75) this.opaSave -= 5;
            if (this.opaRec > 75 && this.rec == false) this.opaRec -= 5;

            noFill();
            strokeCap(SQUARE);
            strokeWeight(thiness / 3);
            stroke(255, 255, 255);

            arc(displayWidth / 2, displayHeight / 2, this.sizeAux2, this.sizeAux2, 0, 2 * PI);

            push();
            translate(this.x, this.y);

            rotate(PI / 2);
            push();
            rotate(PI / 4);
            line(-displayHeight / 9, 0, -this.size3, 0);
            pop();
            push();
            translate(this.size4, 0);
            rotate(-PI / 2);
            image(this.saveIcon, 0, 0, displayHeight / 20, displayHeight / 20);
            pop();

            rotate(PI / 2);
            push();
            rotate(PI / 4);
            line(-displayHeight / 9, 0, -this.size3, 0);
            pop();
            push();
            translate(this.size4, 0);
            rotate(-PI / 2);
            image(this.deleteIcon, 0, 0, displayHeight / 20, displayHeight / 20);
            pop();

            rotate(PI / 2);
            push();
            rotate(PI / 4);
            line(-displayHeight / 9, 0, -this.size3, 0);
            pop();
            push();
            translate(this.size4, 0);
            rotate(-PI / 2);
            if (cenario == 1) image(this.rioIcon, 0, 0, displayHeight / 12, displayHeight / 12);
            else image(this.marIcon, 0, 0, displayHeight / 8, displayHeight / 8);
            pop();

            rotate(PI / 2);
            push();
            rotate(PI / 4);
            line(-displayHeight / 9, 0, -this.size3, 0);
            pop();
            push();
            translate(this.size4, 0);
            rotate(-PI / 2);
            if (this.rec) {
                noStroke();
                fill(255, 0, 0);
            } else {
                noStroke();
                fill(255, 255, 255);
            }
            circle(0, 0, displayHeight / 25);
            pop();

            pop();

            //botoes bloqueados
            if (checkNotes() == false) {
                fill(0, 0, 0, 75);
                arc(displayWidth / 2, displayHeight / 2, this.sizeAux2, this.sizeAux2, 0 + PI / 4, PI / 2 + PI / 4);
                arc(displayWidth / 2, displayHeight / 2, this.sizeAux2, this.sizeAux2, PI / 2 + PI / 4, PI + PI / 4);
            }

            let auxX = mouseX - displayWidth / 2;
            let auxY = -(mouseY - displayHeight / 2);

            if (popupOpen == false) {
                if ((dist(this.x, this.y, mouseX, mouseY) < this.sizeAux2 / 2 && dist(this.x, this.y, mouseX, mouseY) > this.size1 / 2) && mouseIsPressed) {
                    if ((auxY > 0 && auxX > 0 && auxY > auxX) || (auxY > 0 && auxX < 0 && auxY > abs(auxX))) this.changeHandle();
                    if ((auxY > 0 && auxX < 0 && auxY < abs(auxX)) || (auxY < 0 && auxX < 0 && abs(auxY) < abs(auxX))) if (checkNotes()) this.deleteHandle();
                    if ((auxY < 0 && auxX < 0 && abs(auxY) > abs(auxX)) || (auxY < 0 && auxX > 0 && abs(auxY) > auxX)) if (checkNotes()) this.saveHandle();
                    if ((auxY < 0 && auxX > 0 && abs(auxY) < auxX) || (auxY > 0 && auxX > 0 && auxY < auxX)) this.recHandle();
                    mouseIsPressed = false;
                }

                if (dist(this.x, this.y, mouseX, mouseY) > this.sizeAux2 / 2 && mouseIsPressed) {
                    mouseIsPressed = false;
                    this.opened = !this.opened;
                }
            }
        }
        if (popupOpen == false) {
            if ((dist(this.x, this.y, mouseX, mouseY) < this.size1 / 2) && mouseIsPressed) {
                this.react();
                this.react2();
                this.react3();
                this.react4();
                this.sound.play();
                mouseIsPressed = false;
                this.opened = !this.opened;
            }
        }

        if (this.opa2 > 0) this.opa2--;

        this.ang += 0.005;

        //boia
        push();
        translate(this.x, this.y);
        rotate(PI / 2.0 + this.ang);
        image(this.imgBoia, 0, 0, this.sizeAux1, this.sizeAux1);
        imageMode(CENTER);
        translate(-this.x, -this.y);
        pop();

        //pulso
        if (this.raioPulsar < 50) {
            this.opa1 = (255 - (255 * this.raioPulsar) / 50) * 2;
            this.raioPulsar += 0.5;
        } else this.raioPulsar = 0;
        noFill();
        stroke(255, 255, 255, this.opa1);
        strokeWeight(6);
        circle(this.x, this.y, this.raioPulsar);

        drawTimeline();

        //rec centro
        /*if (this.rec == true && this.opened == false) {
            noStroke();
            fill(255,0,0);
            circle(displayWidth/2,displayHeight/2,displayHeight/30);
        }*/

        //delete animation
        if (this.deleteAnimation) {
            noStroke();
            fill(200, 0, 0, this.opaDeleteAnim);
            if (this.deleteRaio < displayWidth * 2) {
                this.opaDeleteAnim = this.opaDeleteAnim - 6;
                this.deleteRaio += 50;
            } else {
                this.deleteRaio = this.sizeAux2;
                this.opaDeleteAnim = 255;
                this.deleteAnimation = false;
            }
            circle(displayWidth / 2, displayHeight / 2, this.deleteRaio, this.deleteRaio);
        }

        if (this.sizeAux1 > this.size1) this.sizeAux1 -= 1;
        if (this.sizeAux2 > this.size2) this.sizeAux2 -= 3;
        if (this.size3 > displayHeight / 4.4) this.size3 -= 1.8;
        if (this.size4 > displayHeight / 6.2) this.size4 -= 1;
    }

    react() {
        this.sizeAux1 = this.size1 * 1.1;
        this.opaChange = 175;
        this.opaDelete = 175;
        this.opaRec = 175;
        this.opaSave = 175;
        timelineRaio = timelineRaio * 1.1;
    }

    react2() {
        this.sizeAux2 = this.size2 * 1.1;
    }

    react3() {
        this.size3 = displayHeight / 4.4 * 1.1;
    }

    react4() {
        this.size4 = displayHeight / 6.2 * 1.1;
    }

    saveHandle() {
        popupOpen = true;
        this.opened = false;
        this.opaSave = 175;
        this.click.play();
        this.react2();
        this.react3();
        this.react4();
    }

    recHandle() {
        this.opaRec = 175;
        if (this.rec == true) this.rec = false;
        else this.rec = true;
        colorBar = 0;
        this.click.play();
        this.react2();
        this.react3();
        this.react4();
    }

    deleteHandle() {
        this.deleteAnimation = true;
        this.deleteRaio = this.sizeAux2;
        this.opaDeleteAnim = 255;
        this.opaDelete = 175;
        cleanTimeline();
        this.delete.play();
        this.react2();
        this.react3();
        this.react4();
        //this.opened = false;
    }

    changeHandle() {
        this.opaChange = 175;
        this.react2();
        this.react3();
        this.react4();
        changeAnim = true;
        this.click.play();
    }
}