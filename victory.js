/*
victory.js

기능 : 승리 시 
*/

function victory() {
  if (turn == 2 && gameover == 0) {
    push();
    textAlign(CENTER, CENTER);
    textSize(100);
    text("VICTORY: BLACK WINS", windowWidth / 2, windowHeight / 2 - 100);
    pop();
  } else if (turn == -2 && gameover == 0) {
    push();
    textAlign(CENTER, CENTER);
    text("VICTORY: WHITE WINS", windowWidth / 2, windowHeight / 2 - 100);
    textSize(100);
    pop();
  }
}
