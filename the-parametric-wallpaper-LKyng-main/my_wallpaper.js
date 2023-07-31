//your parameter variables go here!
let redStar = 0;
let greenStar = 0;
let blueStar = 0;
let starScale = 0;
let starScaleLarge = 0;
let starXPos = 0;
let starYPos = 0;

function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(DEVELOP_GLYPH);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(true); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = 50;
  pWallpaper.grid_settings.cell_height = 50;
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


function my_symbol() { // do not rename this function. Treat this similarly to a Draw function
  star1();
  star2();
}

function star1(){
  redStar = Math.floor(Math.random() * 255);
  greenStar = Math.floor(Math.random() * 255);
  blueStar = Math.floor(Math.random() * 255);
  starScaleLarge = (Math.random() * (0.30 - 0.05 + 0.05)) + 0.1;
  starScale = starScaleLarge.toFixed(2)
  starXPos = Math.floor(Math.random() * (49.00 - 1.00 + 1.00)) + 1.00;
  starYPos = Math.floor(Math.random() * (49.00 - 1.00 + 1.00)) + 1.00;
  fill(redStar,greenStar,blueStar);
  noStroke();
  push();
  rotate(10);
  star(starXPos, starYPos, 4, 2, 5);
  pop();
}

function star2(){
  redStar = Math.floor(Math.random() * 255);
  greenStar = Math.floor(Math.random() * 255);
  blueStar = Math.floor(Math.random() * 255);
  starScaleLarge = (Math.random() * (0.30 - 0.05 + 0.05)) + 0.1;
  starScale = starScaleLarge.toFixed(2)
  starXPos = Math.floor(Math.random() * (49.00 - 1.00 + 1.00)) + 1.00;
  starYPos = Math.floor(Math.random() * (49.00 - 1.00 + 1.00)) + 1.00;
  fill(redStar,greenStar,blueStar);
  noStroke();
  push();
  rotate(10);
  star(starXPos, starYPos, 4, 2, 5);
  pop();
}