function victory() {
  if (turn == 2 && gameover == 0) {
    push();
    textSize(100);
    text("VICTORY: BLACK WINS", width / 2 - 500, height / 2 - 220);
    pop();
  } else if (turn == -2 && gameover == 0) {
    push();
    text("VICTORY: BLACK WINS", width / 2 - 500, height / 2 - 220);
    textSize(100);
    pop();
  }
}

/*
function keyPressed() {
  if (key == " " && abs(turn) == 2) {
    gameover = 1;
  }
}
*/

function creditScene() {
  push();
  rectMode(CENTER);
  fill(0);
  noStroke();
  square(width / 2, height / 2, 1440);
  imageMode(CENTER);
  image(creditPic, width / 2, height / 2);
  pop();
}
