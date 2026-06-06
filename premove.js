//클릭 시 해당 타일의 기물 판정
function handleChessMousePressed(){
  if (state === 'shop' && millis() - shopOpenTime < 200) {
    shopOpenTime = 0;
    return; 
  }
  
  let tileX = floor((mouseX-posX)/ 80 - 1); 
  let tileY = floor((mouseY-posY)/ 80 - 1);
  let clickedPiece;
  
  // 상점 모드에서 이미지 클릭 시 드래그 시작
  if (state === 'shop' && mouseY > windowHeight / 2 - 110 && mouseY < windowHeight / 2 - 10) {
    // 슬라이더 값(g)이 적용된 이미지 위치 계산 (첫 번째 이미지 예시)
    if (mouseX > windowWidth / 2 - 450 && mouseX < windowWidth / 2 - 370 && mouseY > windowHeight / 2 - 110 && mouseY < windowHeight / 2 - 10) {
      if (buildStateDecision('pawn')) {
        isDragging = true;
        if(turn == 1) imgBuilding = pawnBuildingB;
        if(turn == -1) imgBuilding = pawnBuildingW;
      }
    } else if (mouseX > windowWidth / 2 - 350 && mouseX < windowWidth / 2 - 190 && mouseY > windowHeight / 2 - 110 && mouseY < windowHeight / 2 - 10) {
      if (buildStateDecision('knight')) {
        isDragging = true;
        if(turn == 1) imgBuilding = knightBuildingB;
        if(turn == -1) imgBuilding = knightBuildingW;
      }
    } else if (mouseX > windowWidth / 2 - 170 && mouseX < windowWidth / 2 - 10 && mouseY > windowHeight / 2 - 110 && mouseY < windowHeight / 2 - 10) {
      if (buildStateDecision('bishop')) {
        isDragging = true;
        if(turn == 1) imgBuilding = bishopBuildingB;
        if(turn == -1) imgBuilding = bishopBuildingW;
      }
    } else if (mouseX > windowWidth / 2 + 10 && mouseX < windowWidth / 2 + 170 && mouseY > windowHeight / 2 - 110 && mouseY < windowHeight / 2 - 10) {
      if (buildStateDecision('rook')) {
        isDragging = true;
        if(turn == 1) imgBuilding = rookBuildingB;
        if(turn == -1) imgBuilding = rookBuildingW;
      }
    } else if (mouseX > windowWidth / 2 + 190 && mouseX < windowWidth / 2 + 350 && mouseY > windowHeight / 2 - 110 && mouseY < windowHeight / 2 - 10) {
      if (buildStateDecision('queen')) {
        isDragging = true;
        if(turn == 1) imgBuilding = queenBuildingB;
        if(turn == -1) imgBuilding = queenBuildingW;
      }
    }
    return;
  }
  
  // 상점 상태일 때는 일반 기물 판정을 차단
  if (state === 'shop') return;
  if (state === 'game'){
    shopButton.hide();
    escapeButton.hide();
  }
  
  if(tileX >= 0 && tileX <= 15 && tileY >= 0 && tileY <= 15){
    clickedPiece = chessBoard[tileY][tileX];
  }
  // 흔적 있을 시 무시하고 기물 판정
  if(clickedPiece >= trailNum){
    clickedPiece -= trailNum;
  }
  else if(clickedPiece <= -trailNum){
    clickedPiece += trailNum;
  }
  // 본격적 기물 판정: 고유번호와 해당 2차원 배열의 저장 값을 비교하기
  if((clickedPiece >= pioneerNum && clickedPiece <= 100 && turn == 1 && summonOnly == 0) || (clickedPiece <= -pioneerNum && clickedPiece >= -100 && turn == -1 && summonOnly == 0)){
    clearSelection();
    clickedPiece = abs(clickedPiece);
    selected[clickedPiece] = true;
    selectedPiece = clickedPiece;
    selectedX = tileX;
    selectedY = tileY;

    movableTiles = [];
    enemyTile = [];
    summonableTiles = [];

    // 개척자
    if(clickedPiece == pioneerNum){
      checkTile(tileX + 1, tileY);
      checkTile(tileX - 1, tileY);
      checkTile(tileX, tileY + 1);
      checkTile(tileX, tileY - 1);
      shopButton.position((tileX + 1) * 80 + posX -70, (tileY +1) * 80  + posY -70);
      shopButton.show();
    }

    // 킹
    if(clickedPiece == kingNum){
      checkTile(tileX + 1, tileY);
      checkTile(tileX - 1, tileY);
      checkTile(tileX, tileY + 1);
      checkTile(tileX, tileY - 1);
      checkTile(tileX + 1, tileY + 1);
      checkTile(tileX + 1, tileY - 1);
      checkTile(tileX - 1, tileY + 1);
      checkTile(tileX - 1, tileY - 1);
      
      checkEnemy(tileX + 1, tileY);
      checkEnemy(tileX - 1, tileY);
      checkEnemy(tileX, tileY + 1);
      checkEnemy(tileX, tileY - 1);
      checkEnemy(tileX + 1, tileY + 1);
      checkEnemy(tileX + 1, tileY - 1);
      checkEnemy(tileX - 1, tileY + 1);
      checkEnemy(tileX - 1, tileY - 1);
    }
    
    // 폰
    if(clickedPiece == pawnNum){
      checkTile(tileX + 1, tileY);
      checkTile(tileX - 1, tileY);
      checkTile(tileX, tileY + 1);
      checkTile(tileX, tileY - 1);
      
      checkEnemy(tileX + 1, tileY + 1);
      checkEnemy(tileX - 1, tileY - 1);
      checkEnemy(tileX - 1, tileY + 1);
      checkEnemy(tileX + 1, tileY - 1);
      
      checkBuilding(tileX + 1, tileY);
      checkBuilding(tileX - 1, tileY);
      checkBuilding(tileX, tileY + 1);
      checkBuilding(tileX, tileY - 1);
    }
    
    //나이트
    if(clickedPiece == knightNum){
      checkTile(tileX + 1, tileY + 2);
      checkTile(tileX - 1, tileY + 2);
      checkTile(tileX + 1, tileY - 2);
      checkTile(tileX - 1, tileY - 2);
      checkTile(tileX + 2, tileY + 1);
      checkTile(tileX - 2, tileY + 1);
      checkTile(tileX + 2, tileY - 1);
      checkTile(tileX - 2, tileY - 1);
      
      checkEnemy(tileX - 2, tileY - 1);
      checkEnemy(tileX + 1, tileY + 2);
      checkEnemy(tileX - 1, tileY + 2);
      checkEnemy(tileX + 1, tileY - 2);
      checkEnemy(tileX - 1, tileY - 2);
      checkEnemy(tileX + 2, tileY + 1);
      checkEnemy(tileX - 2, tileY + 1);
      checkEnemy(tileX + 2, tileY - 1);
      checkEnemy(tileX - 2, tileY - 1);
    }
    
    //룩
    if(clickedPiece == rookNum){
      let temp;
      if(tileX != 15){
        temp = constrain(tileX + 4,0,15);
        for(let i = tileX+1 ; i <= temp ; i++){
          checkTile(i, tileY);
          checkEnemy(i, tileY);
          checkEnemyBuilding(i, tileY);
          if(abs(chessBoard[tileY][i]) % 10 !== 0 || abs(chessBoard[tileY][i]) > 100) break;
        }
      }
      if(tileX != 0){
        temp = constrain(tileX - 4,0,15);
        for(let i = tileX-1 ; i >= temp; i--){
          checkTile(i, tileY);
          checkEnemy(i, tileY);
          checkEnemyBuilding(i, tileY);
          if(abs(chessBoard[tileY][i])  % 10 !== 0 || abs(chessBoard[tileY][i]) > 100) break;
        } 
      }
      if(tileY != 15){
        temp = constrain(tileY + 4,0,15);
        for(let i = tileY+1 ; i <= temp; i++){
          checkTile(tileX, i);
          checkEnemy(tileX, i);
          checkEnemyBuilding(tileX, i);
          if(abs(chessBoard[i][tileX])  % 10 !== 0 || abs(chessBoard[i][tileX]) > 100) break;
        }
      }
      if(tileX != 0){
        temp = constrain(tileY - 4,0,15);
        for(let i = tileY-1 ; i >= temp; i--){
          checkTile(tileX, i);
          checkEnemy(tileX, i);
          checkEnemyBuilding(tileX, i);
          if(abs(chessBoard[i][tileX])  % 10 !== 0 || abs(chessBoard[i][tileX]) > 100) break;
        }
      }
    }
    
    //비숍
    if(clickedPiece == bishopNum){
      let temp;
      if(tileX != 15 && tileY != 15){
        temp = min(constrain(15-tileX,1,4),constrain(15-tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX+i, tileY+i);
          checkEnemy(tileX+i, tileY+i);
          checkEnemyBuilding(tileX+i, tileY+i);
          if(abs(chessBoard[tileY+i][tileX+i])  % 10 != 0 || abs(chessBoard[tileY+i][tileX+i]) > 100) break;
        }
      }
      if(tileX != 0 && tileY != 0){
        temp = min(constrain(tileX,1,4),constrain(tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX-i, tileY-i);
          checkEnemy(tileX-i, tileY-i);
          checkEnemyBuilding(tileX-i, tileY-i);
          if(abs(chessBoard[tileY-i][tileX-i])  % 10 != 0 || abs(chessBoard[tileY-i][tileX-i]) > 100) break;
        }
      } 
      if(tileX != 15 && tileY != 0){
        temp = min(constrain(15-tileX,1,4),constrain(tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX+i, tileY-i);
          checkEnemy(tileX+i, tileY-i);
          checkEnemyBuilding(tileX+i, tileY-i);
          if(abs(chessBoard[tileY-i][tileX+i])  % 10 != 0 || abs(chessBoard[tileY-i][tileX+i]) > 100) break;
        }
      }
      if(tileX != 0 && tileY != 15){
        temp = min(constrain(tileX,1,4),constrain(15-tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX-i, tileY+i);
          checkEnemy(tileX-i, tileY+i);
          checkEnemyBuilding(tileX-i, tileY+i);
          if(abs(chessBoard[tileY+i][tileX-i])  % 10 != 0 || abs(chessBoard[tileY+i][tileX-i]) > 100) break;
        }
      }
    }
    
    //퀸
    if(clickedPiece == queenNum){
      let temp;
      if(tileX != 15){
        temp = constrain(tileX + 4,0,15);
        for(let i = tileX+1 ; i <= temp ; i++){
          checkTile(i, tileY);
          checkEnemy(i, tileY);
          checkEnemyBuilding(i, tileY);
          if(abs(chessBoard[tileY][i])  % 10 !== 0 || abs(chessBoard[tileY][i]) > 100) break;
        }
      }
      if(tileX != 0){
        temp = constrain(tileX - 4,0,15);
        for(let i = tileX-1 ; i >= temp; i--){
          checkTile(i, tileY);
          checkEnemy(i, tileY);
          checkEnemyBuilding(i, tileY);
          if(abs(chessBoard[tileY][i])  % 10 !== 0 || abs(chessBoard[tileY][i]) > 100) break;
        } 
      }
      if(tileY != 15){
        temp = constrain(tileY + 4,0,15);
        for(let i = tileY+1 ; i <= temp; i++){
          checkTile(tileX, i);
          checkEnemy(tileX, i);
          checkEnemyBuilding(tileX, i);
          if(abs(chessBoard[i][tileX])  % 10 !== 0 || abs(chessBoard[i][tileX]) > 100) break;
        }
      }
      if(tileX != 0){
        temp = constrain(tileY - 4,0,15);
        for(let i = tileY-1 ; i >= temp; i--){
          checkTile(tileX, i);
          checkEnemy(tileX, i);
          checkEnemyBuilding(tileX, i);
          if(abs(chessBoard[i][tileX])  % 10 !== 0 || abs(chessBoard[i][tileX]) > 100) break;
        }
      }
      if(tileX != 15 && tileY != 15){
        temp = min(constrain(15-tileX,1,4),constrain(15-tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX+i, tileY+i);
          checkEnemy(tileX+i, tileY+i);
          checkEnemyBuilding(tileX+i, tileY+i);
          if(abs(chessBoard[tileY+i][tileX+i])  % 10 != 0 || abs(chessBoard[tileY+i][tileX+i]) > 100) break;
        }
      }
      if(tileX != 0 && tileY != 0){
        temp = min(constrain(tileX,1,4),constrain(tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX-i, tileY-i);
          checkEnemy(tileX-i, tileY-i);
          checkEnemyBuilding(tileX-i, tileY-i);
          if(abs(chessBoard[tileY-i][tileX-i])  % 10 != 0 || abs(chessBoard[tileY-i][tileX-i]) > 100) break;
        }
      } 
      if(tileX != 15 && tileY != 0){
        temp = min(constrain(15-tileX,1,4),constrain(tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX+i, tileY-i);
          checkEnemy(tileX+i, tileY-i);
          checkEnemyBuilding(tileX+i, tileY-i);
          if(abs(chessBoard[tileY-i][tileX+i])  % 10 != 0 || abs(chessBoard[tileY-i][tileX+i]) > 100) break;
        }
      }
      if(tileX != 0 && tileY != 15){
        temp = min(constrain(tileX,1,4),constrain(15-tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX-i, tileY+i);
          checkEnemy(tileX-i, tileY+i);
          checkEnemyBuilding(tileX-i, tileY+i);
          if(abs(chessBoard[tileY+i][tileX-i])  % 10 != 0 || abs(chessBoard[tileY+i][tileX-i]) > 100) break;
        }
      }
    }
    
    //폰 건물
    if(clickedPiece == pawnBuildingNum-10) {
      checkSummonable(tileX + 1, tileY);
      checkSummonable(tileX - 1, tileY);
      checkSummonable(tileX, tileY + 1);
      checkSummonable(tileX, tileY - 1);
      checkSummonable(tileX + 1, tileY + 1);
      checkSummonable(tileX + 1, tileY - 1);
      checkSummonable(tileX - 1, tileY + 1);
      checkSummonable(tileX - 1, tileY - 1);
      if(turn == -1)summonPieceNum = -pawnNum;
      else if(turn == 1)summonPieceNum = pawnNum;
    }
    
    return;
  }

  movePiece(tileX, tileY);
  if(summonPieceNum != 0) summonPiece(tileX, tileY);
}

function pawnLevelUp(tileX,tileY,a){
  //나이트 건물
  if(abs(a) == knightBuildingNum) {
    checkSummonable(tileX + 1, tileY);
    checkSummonable(tileX - 1, tileY);
    checkSummonable(tileX, tileY + 1);
    checkSummonable(tileX, tileY - 1);
    if(tileX - 1 >= 0 && chessBoard[tileY][tileX-1] == a){
      checkSummonable(tileX, tileY);
      checkSummonable(tileX - 2, tileY);
      checkSummonable(tileX - 1, tileY + 1);
      checkSummonable(tileX - 1, tileY - 1);
    }
    if(tileX + 1 < 16 && chessBoard[tileY][tileX+1] == a){
      checkSummonable(tileX + 2, tileY);
      checkSummonable(tileX, tileY);
      checkSummonable(tileX + 1, tileY + 1);
      checkSummonable(tileX + 1, tileY - 1);
    }
    if(turn == -1) summonPieceNum = -knightNum;
    if(turn == 1) summonPieceNum = knightNum;
  }
  //비숍 건물
  if(abs(a) == bishopBuildingNum) {
    checkSummonable(tileX + 1, tileY);
    checkSummonable(tileX - 1, tileY);
    checkSummonable(tileX, tileY + 1);
    checkSummonable(tileX, tileY - 1);
    if(tileX - 1 >= 0 && chessBoard[tileY][tileX-1] == a){
      checkSummonable(tileX, tileY);
      checkSummonable(tileX - 2, tileY);
      checkSummonable(tileX - 1, tileY + 1);
      checkSummonable(tileX - 1, tileY - 1);
    }
    if(tileX + 1 < 16 && chessBoard[tileY][tileX+1] == a){
      checkSummonable(tileX + 2, tileY);
      checkSummonable(tileX, tileY);
      checkSummonable(tileX + 1, tileY + 1);
      checkSummonable(tileX + 1, tileY - 1);
    }
    if(turn == -1) summonPieceNum = -bishopNum;
    if(turn == 1) summonPieceNum = bishopNum;
  }
  //룩 건물
  if(abs(a) == rookBuildingNum) {
    checkSummonable(tileX + 1, tileY);
    checkSummonable(tileX - 1, tileY);
    checkSummonable(tileX, tileY + 1);
    checkSummonable(tileX, tileY - 1);
    if(tileX - 1 >= 0 && chessBoard[tileY][tileX-1] == a){
      checkSummonable(tileX, tileY);
      checkSummonable(tileX - 2, tileY);
      checkSummonable(tileX - 1, tileY + 1);
      checkSummonable(tileX - 1, tileY - 1);
    }
    if(tileX + 1 < 16 && chessBoard[tileY][tileX+1] == a){
      checkSummonable(tileX + 2, tileY);
      checkSummonable(tileX, tileY);
      checkSummonable(tileX + 1, tileY + 1);
      checkSummonable(tileX + 1, tileY - 1);
    }
    if(turn == -1) summonPieceNum = -rookNum;
    if(turn == 1) summonPieceNum = rookNum;
  }
  //퀸 건물
  if(abs(a) == queenBuildingNum) {
    checkSummonable(tileX + 1, tileY);
    checkSummonable(tileX - 1, tileY);
    checkSummonable(tileX, tileY + 1);
    checkSummonable(tileX, tileY - 1);
    if(tileX - 1 >= 0 && chessBoard[tileY][tileX-1] == a){
      checkSummonable(tileX, tileY);
      checkSummonable(tileX - 2, tileY);
      checkSummonable(tileX - 1, tileY + 1);
      checkSummonable(tileX - 1, tileY - 1);
    }
    if(tileX + 1 < 16 && chessBoard[tileY][tileX+1] == a){
      checkSummonable(tileX + 2, tileY);
      checkSummonable(tileX, tileY);
      checkSummonable(tileX + 1, tileY + 1);
      checkSummonable(tileX + 1, tileY - 1);
    }
    if(turn == -1) summonPieceNum = -queenNum;
    if(turn == 1) summonPieceNum = queenNum;
  }
}

//특정 타일이 비어있는 타일인지를 체크하고 맞다면 movableTiles에 해당 좌표 추가
function checkTile(x,y){
  if(x >= 0 && x < 16 && y >= 0 && y < 16){
    let tile = chessBoard[y][x];

    // 나의 기물이 없는가?
    if(abs(tile) == 10 || tile == 0){
      movableTiles.push([x,y]);
    }
  }
}

//특정 타일이 적이 있는 타일인지를 체크하고 맞다면 enemyTile에 해당 좌표 추가
function checkEnemy(x,y){
  if(x >= 0 && x < 16 && y >= 0 && y < 16){
    let tile = chessBoard[y][x];
    
    if(turn == -1 && tile > 0 && abs(tile) % 10 != 0){
      enemyTile.push([x,y]);
    }
    else if(turn == 1 && tile < 0 && abs(tile) % 10 != 0){
      enemyTile.push([x,y]);
    }
  }
}

function checkSummonable(x,y){
  if(x >= 0 && x < 16 && y >= 0 && y < 16){
    let tile = chessBoard[y][x];

    // 나의 기물이 없는가?
    if(abs(tile) == 10 || tile == 0){
      summonableTiles.push([x,y]);
    }
  }
}

function checkBuilding(x,y){
  if(x >= 0 && x < 16 && y >= 0 && y < 16){
    let tile = chessBoard[y][x];
    // 나의 건물인가?
    if(tile < -200 && turn == -1){
      enterableBuilding.push([x,y]);
    }
    else if(tile > 200 && turn == 1){
      enterableBuilding.push([x,y]);
    }
  }
}

function checkEnemyBuilding(x, y) {
  if(x >= 0 && x < 16 && y >= 0 && y < 16){
    let tile = chessBoard[y][x];
    if (turn == -1 && tile > 100) {
      destroyableBuilding.push([x, y]);
    } else if (turn == 1 && tile < -100) {
      destroyableBuilding.push([x, y]);
    }
  }
}

//클릭한 기물 종류 판정을 위한 배열과 고유번호 측정 변수 재초기화
function clearSelection(){
  for(let i = 0 ; i < selected.length ; i++){
    selected[i] = false;
  }
  selectedPiece = 0;
  destroyableBuilding = [];
}

