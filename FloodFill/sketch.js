const padding = 10, sizeX = 500+padding, sizeY = 500+padding, boxSize = 50;

var mode = "draw";
var slider,colorPicker;

var grid = [];
var r = parseInt((sizeX-padding)/boxSize);
var c = parseInt((sizeY-padding)/boxSize);

function initializeGrid(){
    for(let i=0;i<r;i++){
        var arr = [];
        for(let j=0;j<c;j++) arr.push(color(255,255,255));
        grid.push([...arr]);
    }
}

function setup(){
    createCanvas(sizeX,sizeY);
    fill("#171f2e");
    rect(0,0,sizeX,sizeY,10);
    initializeGrid();
    drawGrid();
    colorPicker = createColorPicker('#ff0000');
}

function drawGrid(){
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[i].length;j++){
            fill(grid[i][j]);
            rect(i*boxSize+padding/2,j*boxSize+padding/2,boxSize,boxSize,10);
        }
    }
}

function colorCompare(a,b){
    for(let i=0;i<a.levels.length;i++){
        if(a.levels[i] != b.levels[i]) return false;
    }
    return true;
}

function floodFill(i,j,old_colour,new_colour){ 
    if( i<0 || i>=r || j<0 || j>=c || !colorCompare(grid[i][j],old_colour)) return;
    
    grid[i][j] = new_colour;
    floodFill(i+1,j,old_colour,new_colour);
    floodFill(i-1,j,old_colour,new_colour);
    floodFill(i,j+1,old_colour,new_colour);
    floodFill(i,j-1,old_colour,new_colour);
}

function mouseClicked(){
    if(    mouseX<=sizeX-padding
        && mouseY<=sizeY-padding 
        && mouseButton === LEFT && mode == "fill"){
        let x = parseInt(mouseX/boxSize);
        let y = parseInt(mouseY/boxSize);
        if( x<c && y<r) floodFill(x,y,grid[x][y],colorPicker.color());
        drawGrid();
    }
}

function draw(){
    if(    mouseIsPressed
        && mouseX<=sizeX-padding
        && mouseY<=sizeY-padding 
        && mouseButton === LEFT && mode == "draw"){
            let x = parseInt(mouseX/boxSize);
            let y = parseInt(mouseY/boxSize);
            if( x<c && y<r) grid[x][y] = colorPicker.color();
            drawGrid();
    }
        
}

window.onload = () => {
    document.getElementById('selector').addEventListener('change',evt => {
        mode = evt.target.value;
    });
}

function clearGrid(){
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[i].length;j++) 
            grid[i][j] = color(255,255,255);
    } drawGrid();
}