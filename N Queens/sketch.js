const width = 75;

var grid = [], img, n =0;

function preload(){ img = loadImage("./queen.png"); }

function setup() {
  imageMode(CENTER);
  createCanvas(n*width,n*width);
  for(let i=0;i<n;i++){
    let temp = [];
    for(let j=0;j<n;j++) 
      temp.push({Type : 0, isActive: false});
    grid.push(temp);
  }
}

function Attack(x,y){
    if(x>=n || y>=n) throw "Out of Bounds";
    fill('red');
    circle((x+0.5)*width,(y+0.5)*width,30);
    grid[x][y].isDrawn = true;
}

function drawQueen(x,y){
    if(x>=n || y>=n) throw "Out of Bounds";
    image(img,(x+0.5)*width,(y+0.5)*width,width,width);
}

function activeCell(x,y){
    noFill();
    stroke('red');
    strokeWeight(4);
    rect(x*width,y*width,width,width);
}

function drawGrid(){
    for(let x=0;x<n;x++){
      for(let y=0;y<n;y++){
        if (grid[x][y].Type === 'Q') drawQueen(x,y);
        else if(grid[x][y].Type) Attack(x,y);
        if(grid[x][y].isActive) activeCell(x,y); 
      }
    }
}

function drawBoard(){
  for(let i=0;i<n;i++){
    for(let j=0;j<n;j++){
      noStroke();
      fill(((i+j)%2==0)?('white'):('#3b5bdb'));
      rect(i*width,j*width,width,width);
    }
  }
}

function draw() {
    clear();
    drawBoard();
    drawGrid();
}

function placeQueen(x,y){
    if(grid[x][y].Type > 0) throw "Already Attacked";
    if(grid[x][y].Type !== 'Q'){
      grid[x][y].Type = 'Q';
      for(let i=0;i<n;i++){
        if(i!=y){
          if(grid[x][i].Type === 'Q') throw "Queen here";
          grid[x][i].Type++;
        }
      }
      for(let j=0;j<n;j++){
        if(j!=x){
          if(grid[j][y].Type === 'Q') throw "Queen here";
          grid[j][y].Type++;
        }
      }
      var r=y+1,c=x+1;
      while(r>=0 && r<n && c>=0 && c<n){
        grid[c][r].Type++;
        c++; r++;
      }
      r=y-1; c=x-1;
      while(r>=0 && r<n && c>=0 && c<n){
        if(grid[c][r]) grid[c][r].Type++;
        c--; r--;
      }
      r=y+1; c=x-1;
      while(r>=0 && r<n && c>=0 && c<n){
        grid[c][r].Type++;
        c--; r++;
      }
      r=y-1; c=x+1;
      while(r>=0 && r<n && c>=0 && c<n){
        grid[c][r].Type++;
        c++; r--;
      }
    }
}

function removeQueen(x,y){
  if(grid[x][y].Type === 'Q'){
    grid[x][y].Type=0;
    for(let i=0;i<n;i++){
      if(i!=y){
        if(grid[x][i].Type) grid[x][i].Type--;
      }
    }
    for(let j=0;j<n;j++){
      if(j!=x){
        if(grid[j][y].Type) grid[j][y].Type--;
      }
    }
    var r=y+1,c=x+1;
    while(r>=0 && r<n && c>=0 && c<n){
      grid[c][r].Type--;
      c++; r++;
    }
    r=y-1; c=x-1;
    while(r>=0 && r<n && c>=0 && c<n){
      if(grid[c][r]) grid[c][r].Type--;
      c--; r--;
    }
    r=y+1; c=x-1;
    while(r>=0 && r<n && c>=0 && c<n){
      grid[c][r].Type--;
      c--; r++;
    }
    r=y-1; c=x+1;
    while(r>=0 && r<n && c>=0 && c<n){
      grid[c][r].Type--;
      c++; r--;
    }
  }
}

function mouseClicked(evt){
    var X = floor(mouseX/width),
    Y = floor(mouseY/width);
    try{
      placeQueen(X,Y);
    }catch(err){
      if(!(err instanceof TypeError)) alert(err);
    }
}

function doubleClicked(evt){
  var X = floor(mouseX/width),
  Y = floor(mouseY/width);
  try{
    removeQueen(X,Y);
  }catch(err){
    if(!(err instanceof TypeError)) alert(err);
  }
}

window.onload = function(){
    n = parseInt(prompt("Enter N :"));
    if(n<=3 || n>10) n = parseInt(prompt("Please enter a valid N :"));
}
