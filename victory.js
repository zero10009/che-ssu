/*
victory.js

기능 : 승리 시 
*/

function victory() {
  if (turn == 2 && gameover == 0) {
    push();
    textSize(100);
    text("VICTORY: BLACK WINS", windowWidth / 2 - 500, windowHeight / 2 - 220);
    pop();
  } else if (turn == -2 && gameover == 0) {
    push();
    text("VICTORY: WHITE WINS", windowWidth / 2 - 500, windowHeight / 2 - 220);
    textSize(100);
    pop();
  }
}
