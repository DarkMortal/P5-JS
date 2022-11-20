var img = null,
    isImageDrawn = false;

var fileInput;

var width, height, slider;

//TODO: Load the Image
function preload(){ 
    img = loadImage("./vegito.jpg");
}

function setup() {
    width = img.width/scaleDown;
    height = img.height/scaleDown;
    
    slider = createSlider(1,10,scaleDown,0.5);
    slider.style('width', '80px');

    fileInput = createFileInput(handleFile);
    fileInput.position(10, 10);

    slider.position(500, 10);
}

function handleFile(file) {
    if (file.type === 'image'){
        img = createImg(file.data, '');
        img.hide();
    }
}

var scaleDown = 2;

function draw(){
    scaleDown = slider.value();

    width = img.width/scaleDown;
    height = img.height/scaleDown;
    
    createCanvas(width,height);
    image(img, 0, 0, width,height);
    isImageDrawn = true;
}