//Parameter Variables
//grid size
let gridX = 50;
let gridY = 50;

//background colour
let bgRed = 20;
let bgGreen = 5;
let bgBlue = 80;

//line adjustments
let step = 8;
let numSteps = 20;
let numSegments = 50;

//star adjustments
let starScaler = 3;
let starPoints = 5;

//Dont Change variables
let prevLineRed, prevLineGreen, prevLineBlue;

lineRed = Math.floor(Math.random() * 156) + 100;
lineGreen = Math.floor(Math.random() * 156) + 100;
lineBlue = Math.floor(Math.random() * 156) + 100;

let starScale = 0;

let redStar = 0;
let greenStar = 0;
let blueStar = 0;

let star1XPos = 0;
let star1YPos = 0;
let star2XPos = 0;
let star2YPos = 0;
let star3XPos = 0;
let star3YPos = 0;

let curveControlPoints = [];
let curveEndY = (Math.random() * (gridY - 10.00) + 10.00);
let startPoint, endPoint;

function setup_wallpaper(pWallpaper) {
  //pWallpaper.output_mode(DEVELOP_GLYPH);
  pWallpaper.output_mode(GRID_WALLPAPER);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(false); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = gridX;
  pWallpaper.grid_settings.cell_height = gridY;
  pWallpaper.grid_settings.row_offset  = 25;

  startPoint = createVector(0, curveEndY);
  endPoint = createVector(gridX,curveEndY);
}

function wallpaper_background() {
  background(bgRed,bgGreen,bgBlue);
}

//star code found through p5.js wiki
function star(x, y, radius1, radius2, npoints) {
  let angle = 360 / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function my_symbol() {
  star1();
  star2();
  //star3();
  drawCurvyLine();
}

function star1(){
  starScale = (Math.random() * starScaler) + 1;
  star1XPos = (Math.random() * ((gridX/2) - 10.00) + 10.00);
  star1YPos = (Math.random() * ((gridY/2) - 5.00) + 2.00);
  starColour = color(random(100, 255), random(100, 255), random(100, 255));
  fill(starColour);
  push();
  rotate(50);
  star(star1XPos, star1YPos, (starScale * 2), starScale, starPoints);
  pop();
}

function star2(){
  starScale = (Math.random() * starScaler) + 1;
  star2XPos = ((gridX - star1XPos)+5);
  star2YPos = (((gridY/2) + star1YPos) - 2);
  starColour = color(random(100, 255), random(100, 255), random(100, 255));
  fill(starColour);
  push();
  rotate(10);
  star(star2XPos, star2YPos, (starScale * 2), starScale, starPoints);
  pop();
}

function star3(){
  starScale = (Math.random() * starScaler) + 1;
  star3XPos = (gridX - star2XPos +star1XPos);
  star3YPos = (((gridY/2) + (star1YPos/2)) - 10);
  starColour = color(random(100, 255), random(100, 255), random(100, 255));
  fill(starColour);
  push();
  rotate(120);
  pop();
  if (star3YPos<gridY){
    if (star3XPos<gridX){
      star(star3XPos, star3YPos, (starScale * 2), starScale, starPoints);
    } 
  } 
}

function drawCurvyLine() {
  curveControlPoints = [];
  curveControlPoints.push(startPoint.copy()); // Starting point
  curveControlPoints.push(createVector(startPoint.x + (Math.random() * gridX), startPoint.y + (Math.random() * gridX))); // Control point 1
  curveControlPoints.push(createVector(endPoint.x - (Math.random() * gridX), endPoint.y - (Math.random() * gridX))); // Control point 2
  curveControlPoints.push(endPoint.copy()); // Ending point

  for (let i = 0; i < numSteps; i++) {
    prevLineRed = lineRed;
    prevLineGreen = lineGreen;
    prevLineBlue = lineBlue;

    let redChange = (Math.random() * (2 * step + 1)) + (-step);
    let greenChange = (Math.random() * (2 * step + 1)) + (-step);
    let blueChange = (Math.random() * (2 * step + 1)) + (-step);

    lineRed = Math.max(100, Math.min(230, prevLineRed + redChange));
    lineGreen = Math.max(100, Math.min(230, prevLineGreen + greenChange));
    lineBlue = Math.max(100, Math.min(230, prevLineBlue + blueChange));

    let lineColour = color(lineRed, lineGreen, lineBlue);
    stroke(lineColour);
    noFill();
    beginShape();
    //math calculated through chatgpt3
    for (let j = 0; j <= numSegments; j++) {
      let t = j / numSegments;
      let p = getCurvePoint(t, curveControlPoints);
      vertex(p.x, p.y);
    }
    endShape();
  }
  curveEndY = endPoint.y;
}

function getCurvePoint(t, controlPoints) {
  if (controlPoints.length === 1) {
    return controlPoints[0].copy();
  }

  let nextControlPoints = [];
  //math calculated through chatgpt3
  for (let i = 0; i < controlPoints.length - 1; i++) {
    let x = lerp(controlPoints[i].x, controlPoints[i + 1].x, t);
    let y = lerp(controlPoints[i].y, controlPoints[i + 1].y, t);
    nextControlPoints.push(createVector(x, y));
  }
  return getCurvePoint(t, nextControlPoints);
}