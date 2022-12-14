// ------------------------------------------ Peixe ------------------------------------------
class Peixe {
    img;
    sounds = new Array(3);
    id;
    lastClick;
    x;
    y;
    size;
    sizeAux;
    phase;
    raioPulsar;
    opa = 0;
    instant;
    interval;
    color;
    clicked = false;
    dragged = false;
    auxSlot = 0;
    count = 0;

    position;
    velocity;
    angle = int(random(1, 360));

    margin;

    playing = 0;
    playing2 = 0;
    vol;
    vol2;
    pIndex;

    rastos = [];

    constructor(img, sound1, sound2, sound3, size, color) {
        this.img = loadImage(img);
        this.size = size;
        this.sizeAux = size;
        this.sounds[0] = loadSound(sound1);
        this.sounds[1] = loadSound(sound2);
        this.sounds[2] = loadSound(sound3);
        this.sounds[0].setVolume(0.5);
        this.sounds[1].setVolume(0.5);
        this.sounds[2].setVolume(0.5);
        this.lastClick = -1;
        this.color = color;

        this.raioPulsar = this.size * 2;

        this.margin = this.size / 2;

        this.position = createVector(int(random(this.margin, windowWidth - this.margin)), int(random(this.margin, windowHeight - this.margin)));

        this.calcVelocity(random(0.1, 1.5));

        this.interval = int(random(5001, 10001));

        this.x = this.position.x;
        this.y = this.position.y;
    }

    draw() {

        if(this.click == false && this.dragged == false) this.pIndex = -1;

        this.instant = millis();

        this.vol = 1 - mouseX / (displayWidth - this.size);
        this.vol2 = mouseX / (displayWidth - this.size);

        //pulsar
        if (this.raioPulsar < this.size * 2) {
            this.opa = (255 - (255 * this.raioPulsar) / (this.size * 2 - displayWidth / 100)) * 2;
            this.raioPulsar += 6;
        }
        noFill();
        stroke(255, 255, 255, this.opa);
        strokeWeight(6);
        circle(this.x, this.y, this.raioPulsar);

        if (this.dragged == false) this.move();

        //comportament aleatorio
        if (this.instant - this.interval >= 0) {
            this.interval = this.instant + int(random(1001, 8001));
            this.angle = int(random(1, 360));
            this.calcVelocity(random(1, 1.5));
        }

        if (this.dragged == false) {
            this.x = this.position.x;
            this.y = this.position.y;
        }

        if (this.sizeAux > this.size) this.sizeAux -= 2;

        push();
        translate(this.x, this.y);
        rotate(radians(this.angle));
        image(this.img, 0, 0, this.sizeAux, this.sizeAux);
        pop();
        imageMode(CENTER);

        if (boia.opened == false && popupOpen == false) {
            if (!(mouseX < this.x - this.size / 2 || mouseX > this.x + this.size / 2
                || mouseY < this.y - this.size / 2 || mouseY > this.y + this.size / 2)
                && dist(displayWidth / 2, displayHeight / 2, this.x, this.y) > boia.size1
                && mouseIsPressed) {
                this.playAndRecord();
                this.react();
                mouseIsPressed = false;
            }
        }
    }

    react() {
        this.raioPulsar = this.size / 1.5;
        this.sizeAux = this.size * 1.1;
    }

    playAndRecord() {
        this.lastClick = int(random(3));

        this.sounds[this.lastClick].play();
    }

    playSound(index) {
        this.sounds[index].play();
    }

    calcVelocity(exp) {
        this.velocity = p5.Vector.fromAngle(radians(this.angle));
        this.velocity.mult(exp);
    }

    move() {
        var newPos = p5.Vector.add(this.position, this.velocity);

        if (newPos.x > displayWidth - this.margin || newPos.x < 0 + this.margin) {
            this.angle = 180 - this.angle;
            this.calcVelocity(random(0.1, 1.5));
        }

        if (newPos.y > displayHeight - this.margin || newPos.y < 0 + this.margin) {
            this.angle = 360 - this.angle;
            this.calcVelocity(random(0.1, 1.5));
        }


        this.position.add(this.velocity);
    }

    rasto() {
        //fill(this.color[0],this.color[1],this.color[2],100);
        stroke(this.color[0], this.color[1], this.color[2]);
        strokeWeight(this.size / 10);
        strokeCap(ROUND);
        if (this.rastos.length > 0) {
            for (let i = 1; i < this.rastos.length; i++) {
                line(this.rastos[i][0], this.rastos[i][1], this.rastos[i - 1][0], this.rastos[i - 1][1]);
            }
        }
    }

}

function mousePressed() {
    for (let i = 0; i < nPeixes; i++) {
        if (!(mouseX < peixes[i].x - peixes[i].size / 2 || mouseX > peixes[i].x + peixes[i].size / 2
            || mouseY < peixes[i].y - peixes[i].size / 2 || mouseY > peixes[i].y + peixes[i].size / 2)
            && dist(displayWidth / 2, displayHeight / 2, peixes[i].x, peixes[i].y) > boia.size1) {
            peixes[i].clicked = true;
        } else {
            peixes[i].clicked = false;
        }
    }
}

function mouseReleased() {
    for (let i = 0; i < nPeixes; i++) {
        if (peixes[i].dragged) {
            peixes[i].position.x = peixes[i].x;
            peixes[i].position.y = peixes[i].y;
            peixes[i].clicked = false;
            peixes[i].dragged = false;
            peixes[i].rastos = [];
            dragIndex = peixes[i].pIndex;
        }
    }

}

function mouseDragged() {
    for (let i = 0; i < nPeixes; i++) {
        if (peixes[i].clicked) {
            if (dist(mouseX, mouseY, peixes[i].x, peixes[i].y) > peixes[i].size / 2 && peixes[i].dragged == false) {
                peixes[i].x = mouseX;
                peixes[i].y = mouseY;
                peixes[i].dragged = true;
                peixes[i].pIndex = int(random(3));
                dragSound[peixes[i].pIndex].stop();
                dragSound2[peixes[i].pIndex].stop();
                peixes[i].playing = dragSound[peixes[i].pIndex].play();
                peixes[i].playing2 = dragSound2[peixes[i].pIndex].play();
            }
            else if (peixes[i].dragged) {
                if(peixes[i].auxSlot != activeSlot) {
                    peixes[i].count+=1;
                    timeline[activeSlot][i][1]+=1;
                    peixes[i].auxSlot = activeSlot;
                    timeline[activeSlot][i][1] = peixes[i].count;
                    console.log(timeline[activeSlot][i]);
                }

                if (mouseX > peixes[i].size / 2 && mouseX < displayWidth - peixes[i].size / 2
                    && mouseY > peixes[i].size / 2 && mouseY < displayHeight - peixes[i].size / 2) {

                    peixes[i].x = mouseX;
                    peixes[i].y = mouseY;
                    peixes[i].rastos.push([mouseX, mouseY]);
                    dragSound[peixes[i].pIndex].setVolume(peixes[i].vol);
                    dragSound2[peixes[i].pIndex].setVolume(peixes[i].vol2);

                    volumeDrag[peixes[i].pIndex] = peixes[i].vol;
                    volumeDrag2[peixes[i].pIndex] = peixes[i].vol2;
                }
            }
        }
    }
}

function checkClickAndDrag() {

    for (let i = 0; i < nPeixes; i++) {
        if (peixes[i].clicked && peixes[i].dragged) return true;
    }
    return false;
}
