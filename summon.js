function summonPiece(tileX,tileY){
  for(let tile of summonableTiles){
    temp = summonedPieceSet(tile,tileX, tileY);
    if(temp == 1) break;
  }
}

function summonedPieceSet(tile,tileX, tileY){
  if(tile[0] == tileX && tile[1] == tileY){
    //흔적 위인가?
    if(chessBoard[tileY][tileX] == trailNum && turn == 1){
      chessBoard[tileY][tileX] = summonPieceNum + trailNum;
    }
    else if(chessBoard[tileY][tileX] == -trailNum && turn == -1){
      chessBoard[tileY][tileX] = summonPieceNum - trailNum;
    }
    else{
      chessBoard[tileY][tileX] = summonPieceNum;
    }
    summonableTiles = [];
    summonOnly = 0;
    turn *= -1;
    return 1;
  }
  return 0;
}