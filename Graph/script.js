let canvas;
const SIZE = 650;
let xOffset, yOffset;
let a = 20, N = 5, unit = N * a;
let enabled1 = false, enabled2 = false;

let MIN_N = 2, MAX_N = 5;

function updatePointer() {
    document.getElementById('x').innerText = ((mouseX + xOffset) / (unit)).toFixed(2);
    document.getElementById('y').innerText = ((mouseY + yOffset) / (-unit)).toFixed(2);
}

function setup() {
    xOffset = yOffset = -3 * unit;

    canvas = createCanvas(SIZE, SIZE);
    canvas.parent("canvas");
    canvas.mouseMoved(updatePointer);

    let eqns = document.querySelectorAll('.eqn');
    eqns[0].children[3].onclick = () => enabled1 = false;
    eqns[0].children[4].onclick = () => enabled1 = true;
    eqns[1].children[3].onclick = () => enabled2 = false;
    eqns[1].children[4].onclick = () => enabled2 = true;
}

let f1 = x => math.evaluate(document.getElementById("eq1").value, { x: x })
let f2 = x => math.evaluate(document.getElementById("eq2").value, { x: x })

function draw() {
    background(255);
    let pY1 = null;
    let pY2 = null;
    for (let i = 0; i < SIZE; i++) {
        let t = xOffset + i;
        let p = yOffset + i;
        if (t % a == 0) {
            if (t == 0) {
                stroke(255, 0, 0);
                strokeWeight(3);
                line(i, 0, i, SIZE);
                let j = 0, k = 1;
                while (j < SIZE) {
                    if ((j + yOffset) % unit == 0) {
                        noStroke();
                        if ((j + yOffset) / (-unit) != 0) text((j + yOffset) / (-unit), t - xOffset + 5, j + 5);
                        k = unit;
                    }
                    j += k;
                }
            }
            else {
                stroke(0);
                strokeWeight(1);
                line(i, 0, i, SIZE);
            }
        }
        if (p % a == 0) {
            if (p == 0) {
                stroke(0, 0, 255);
                strokeWeight(3);
                line(0, i, SIZE, i);
                let j = 0, k = 1;
                while (j < SIZE) {
                    if ((j + xOffset) % unit == 0) {
                        noStroke();
                        text((j + xOffset) / unit, j + 5, p - yOffset + 12);
                        k = unit;
                    }
                    j += k;
                }
            }
            else {
                stroke(0);
                strokeWeight(1);
                line(0, i, SIZE, i);
            }
        }
        if (enabled1) {
            try {
                let y = -unit * f1(t / unit) - yOffset;
                if (i > 0) {
                    strokeWeight(2);
                    stroke(document.getElementById("col1").value);
                    line(i - 1, pY1, i, y);
                }
                pY1 = y;
            } catch {
                enabled1 = false;
            }
        }
        if (enabled2) {
            try {
                let y = -unit * f2(t / unit) - yOffset;
                if (i > 0) {
                    strokeWeight(2);
                    stroke(document.getElementById("col2").value);
                    line(i - 1, pY2, i, y);
                }
                pY2 = y;
            } catch {
                enabled2 = false;
            }
        }
    }
}

function keyPressed() {
    // ADD_KEY
    if (keyCode == 107) {
        if (N < MAX_N) {
            N++;
            unit = N * a;
            updatePointer();
        }
    }
    // SUB_KEY
    if (keyCode == 109) {
        if (N > MIN_N) {
            N--;
            unit = N * a;
            updatePointer();
        }
    }
}

const isTouchDevice = () => (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0));

function mouseDragged() {
    if (!isTouchDevice()) {
        xOffset += (pmouseX - mouseX);
        yOffset += (pmouseY - mouseY);
    }
}

window.onkeydown = (evt) => {
    if (evt.keyCode == RIGHT_ARROW ||
        evt.keyCode == LEFT_ARROW ||
        evt.keyCode == UP_ARROW ||
        evt.keyCode == DOWN_ARROW) {
        evt.preventDefault();
        switch (evt.keyCode) {
            case RIGHT_ARROW: xOffset -= 5; break;
            case LEFT_ARROW: xOffset += 5; break;
            case DOWN_ARROW: yOffset -= 5; break;
            case UP_ARROW: yOffset += 5; break;
        } updatePointer();
    }
}

// for mobile devices (can be ignored)

/*if(isTouchDevice()){
  Hammer(document.getElementById('canvas')).on('panright',() => xOffset -= 5);
  Hammer(document.getElementById('canvas')).on('panleft',() => xOffset += 5);
  Hammer(document.getElementById('canvas')).on('panup',() => yOffset += 5);
  Hammer(document.getElementById('canvas')).on('pandown',() => yOffset -= 5);
}*/

/*Hammer(document.getElementById('canvas')).on('pinchin',()=> {alert('pinchin')
  if (N > MIN_N) {
    N--;
    unit = N * a;
    //updatePointer();
  }
});
Hammer(document.getElementById('canvas')).on('pinchout',()=> {
  if (N < MAX_N) {
    N++;
    unit = N * a;
    //updatePointer();
  }
});*/