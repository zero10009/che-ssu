

//기물 이동 위치 확인
function movePiece(tileX, tileY){
  let temp1, temp2, temp3, temp4;
  for(let tile of movableTiles){
    temp1 = pieceReboot(tile,tileX, tileY);
    if(temp1 == 1) break;
  }
  
  for(let tile of enemyTile){
    temp2 = pieceReboot(tile,tileX, tileY);
    if(temp1 == 1 || temp2 == 1){
      if (temp2 == 1) killplay();
      break;
    }
  }
  
  for(let tile of enterableBuilding){
    temp3 = pawnGone(tile,tileX, tileY);
    if(temp1 == 1 || temp2 == 1 || temp3 == 1) break;
  }
  
  for(let tile of destroyableBuilding){
    temp4 = pieceReboot(tile,tileX, tileY);
    if(temp1 == 1 || temp2 == 1 || temp3 == 1 || temp4 == 1){
      if (temp4 == 1) killplay();
      break;
    }
  }
}

//기물 이동을 위한 위치 재설정
function pieceReboot(tile,tileX,tileY){
  if(tile[0] == tileX && tile[1] == tileY){
      // 이전 위치 처리
      // 흔적 위 기물이었는가? ==> 맞다면 흔적 무시
      if(chessBoard[selectedY][selectedX] >= trailNum)
        chessBoard[selectedY][selectedX] -= selectedPiece;
      else if(chessBoard[selectedY][selectedX] <= -trailNum)
        chessBoard[selectedY][selectedX] += selectedPiece;
      else{
        // 개척자가 떠나면 흔적 생성
        if(selectedPiece == pioneerNum){
          chessBoard[selectedY][selectedX] = trailNum*turn;
        }
        else{
          chessBoard[selectedY][selectedX] = 0;
        }
      }
    
      if(abs(chessBoard[tileY][tileX]) > 200) destroyBuilding(tileX, tileY);

      // 새 위치 처리
      // 흔적 위로 이동
      if(abs(chessBoard[tileY][tileX]) >= trailNum){
        chessBoard[tileY][tileX] = (selectedPiece + trailNum)*turn;
      }
      else{
        chessBoard[tileY][tileX] = selectedPiece*turn;
      }
      clearSelection();
      movableTiles = [];
      enemyTile = [];
      enterableBuilding = [];
      turn *= -1;
      processResourcePhase();
    
      return 1;
    }
  return 0;
}

//폰이 건물 안으로 들어가기 위해 폰의 기존 자리 비우기
function pawnGone(tile,tileX,tileY) {
  if(tile[0] == tileX && tile[1] == tileY){
      // 이전 위치 처리
      // 흔적 위 기물이었는가? ==> 맞다면 흔적 무시
      if(chessBoard[selectedY][selectedX] >= trailNum)
        chessBoard[selectedY][selectedX] -= selectedPiece;
      else if(chessBoard[selectedY][selectedX] <= -trailNum)
        chessBoard[selectedY][selectedX] += selectedPiece;
      else{
        chessBoard[selectedY][selectedX] = 0;
      }
      clearSelection();
      movableTiles = [];
      enemyTile = [];
      enterableBuilding = [];
      pawnLevelUp(tileX,tileY,chessBoard[tileY][tileX]);
      summonOnly = 1;
      return 1;
    }
  return 0;
}

function destroyBuilding(tileX, tileY) {
  if(turn == 1){
    for (let i = allWhiteBuilding.length - 1; i >= 0; i--) {
      let building = allWhiteBuilding[i];
      let found = false;

      for (let coord of building) {
        if (coord[0] == tileX && coord[1] == tileY) {
          found = true;
          break;
        }
      }

      if (found) {
        for (let coord of building) {
          chessBoard[coord[1]][coord[0]] = trailNum;
        }
        allWhiteBuilding.splice(i, 1);
        return;
      }
    }
  }
  if(turn == -1){
    for (let i = allBlackBuilding.length - 1; i >= 0; i--) {
      let building = allBlackBuilding[i];
      let found = false;

      for (let coord of building) {
        if (coord[0] == tileX && coord[1] == tileY) {
          found = true;
          break;
        }
      }

      if (found) {
        for (let coord of building) {
          chessBoard[coord[1]][coord[0]] = -trailNum;
        }
        allBlackBuilding.splice(i, 1);
        return;
      }
    }
  }
}
