var slider,colorPicker;
const n = 12, angle = 360/n;

function setup(){
    createCanvas(600,500);
    angleMode(DEGREES);
    background("#171f2e");

    slider = createSlider(1,10,4,0.5);
    slider.style('width', '80px');
    colorPicker = createColorPicker('white');
    
    // Code to draw reference Lines
    /*translate(width/2,height/2);
    stroke(255,0,0);
    strokeWeight(2);
    for(let i=0;i<n;i++){
        rotate(angle);
        line(0,0,width,0);
    }*/
}

function draw(){
    translate(width/2,height/2);

    let mx = mouseX - width/2;
    let my = mouseY - height/2;
    let pmx = pmouseX - width/2;
    let pmy = pmouseY - height/2;

    if(mouseIsPressed && mouseX<=600 && mouseY<=500 && mouseButton === LEFT){
        stroke(colorPicker.color());
        strokeWeight(slider.value());
        for(let i=0;i<n;i++){
            push();
            rotate(i*angle);
            line(mx, my, pmx, pmy);
            scale(-1,1);
            line(mx, my, pmx, pmy);
            pop(); 
        }
    }
}