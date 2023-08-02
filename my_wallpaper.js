//your parameter variables go here!
let gridX = 50;
let gridY = 50;

let redStar = 0;
let greenStar = 0;
let blueStar = 0;

let starScale = 0;
let starScaleLarge = 0;

let star1XPos = 0;
let star1YPos = 0;
let star2XPos = 0;
let star2YPos = 0;
let star3XPos = 0;
let star3YPos = 0;

let lineYstart = 30;
let lineYend = 20;

let points;

function setup_wallpaper(pWallpaper) {
  //pWallpaper.output_mode(DEVELOP_GLYPH);
  pWallpaper.output_mode(GRID_WALLPAPER);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(false); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = gridX;
  pWallpaper.grid_settings.cell_height = gridY;
  pWallpaper.grid_settings.row_offset  = 25;
}

function wallpaper_background() {
  background(26,64,71);
}

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

function generateCurvyLine(numPoints, canvasHeight) {
  points = [];

  let startX = 0;
  let startY = canvasHeight / 2;
  let endX = gridX; // Use gridX instead of 50
  let endY = canvasHeight / 2;

  let yRange = 100;

  points.push(createVector(startX, startY));

  for (let i = 1; i < numPoints - 1; i++) {
    let x = map(i, 0, numPoints - 1, startX, endX);
    let y = map(noise(i * 0.1), 0, 1, startY - yRange, startY + yRange);
    points.push(createVector(x, y));
  }

  points.push(createVector(endX, endY));

  return points;
}

function my_symbol() {
  star1();
  star2();
  star3();
  let numPoints = 100;
  points = generateCurvyLine(numPoints, gridY); // Pass the canvas height (gridY) as a parameter
  drawCurvyLine(points, gridY); // Pass the canvas height (gridY) as a parameter
}

function drawCurvyLine(points, canvasHeight) {
  // Draw the curvy line using Bezier curves
  beginShape();
  vertex(0, canvasHeight / 2); // Start at the left side of the canvas
  for (let i = 0; i < points.length; i += 3) {
    let x1 = points[i].x;
    let y1 = points[i].y;
    let x2 = points[i + 1].x;
    let y2 = points[i + 1].y;
    let x3 = points[i + 2].x;
    let y3 = points[i + 2].y;
    bezierVertex(x1, y1, x2, y2, x3, y3);
  }
  endShape();
}

function star1(){
  redStar = Math.floor(Math.random() * 255);
  greenStar = Math.floor(Math.random() * 255);
  blueStar = Math.floor(Math.random() * 255);
  starScaleLarge = (Math.random() * (0.30 - 0.05) + 0.05);
  starScale = starScaleLarge.toFixed(2)
  star1XPos = (Math.random() * (40.00 - 10.00) + 10.00);
  star1YPos = (Math.random() * (20.00 - 5.00) + 2.00);
  fill(redStar,greenStar,blueStar);
  push();
  rotate(10);
  star(star1XPos, star1YPos, 4, 2, 5);
  pop();
}

function star2(){
  redStar = Math.floor(Math.random() * 255);
  greenStar = Math.floor(Math.random() * 255);
  blueStar = Math.floor(Math.random() * 255);
  starScaleLarge = (Math.random() * (0.30 - 0.05) + 0.05);
  starScale = starScaleLarge.toFixed(2)
  star2XPos = (gridX - star1XPos);
  star2YPos = (((gridY/2) + star1YPos) - 2);
  fill(redStar,greenStar,blueStar);
  push();
  rotate(10);
  star(star2XPos, star2YPos, 4, 2, 5);
  pop();
}

function star3(){
  redStar = Math.floor(Math.random() * 255);
  greenStar = Math.floor(Math.random() * 255);
  blueStar = Math.floor(Math.random() * 255);
  starScaleLarge = (Math.random() * (0.30 - 0.05) + 0.05);
  starScale = starScaleLarge.toFixed(2)
  star3XPos = (gridX - star2XPos +star1XPos);
  star3YPos = (((gridY/2) + (star1YPos/2)) - 10);
  fill(redStar,greenStar,blueStar);
  push();
  rotate(10);
  pop();
  if (star3YPos<gridY){
    if (star3XPos<gridX){
      star(star3XPos, star3YPos, 4, 2, 5);
    } 
  } 
}
