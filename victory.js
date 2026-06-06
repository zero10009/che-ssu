/*
victory.js

기능 : 승리 시 
*/

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
