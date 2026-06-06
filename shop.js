function showShop() {
  shopButton.hide();
  escapeButton.position(windowWidth / 2 + 430, windowHeight / 2 - 180);
  escapeButton.show();
  
  // 상점 UI 그리기
  push();
  fill(50, 220);
  rectMode(CENTER);
  rect(windowWidth / 2, windowHeight / 2, 960, 300, 10); // 상점 배경판
  pop();
  
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(50);
  text("🏗️ 건물 상점", windowWidth / 2 - 350, windowHeight / 2 - 200);
  
  menuShop();
}

/*function menuShop() {
  push();
  if (buildStateDecision()) {
    noTint();
  } else tint(100);
  if(turn == 1){
    image(pawnBuildingB, windowWidth / 2 - 500+50, windowHeight / 2 - 110, 80,104);
    image(knightBuildingB, windowWidth / 2 - 400+50, windowHeight / 2 - 110, 160, 104);
    image(bishopBuildingB, windowWidth / 2 - 220+50, windowHeight / 2 - 110, 160, 104);
    image(rookBuildingB, windowWidth / 2 - 40+50, windowHeight / 2 - 110, 160, 104);
    image(queenBuildingB, windowWidth / 2 + 140+50, windowHeight / 2 - 110, 160, 104);
  }
  if(turn == -1){
    image(pawnBuildingW, windowWidth / 2 - 500+50, windowHeight / 2 - 110, 80,104);
    image(knightBuildingW, windowWidth / 2 - 400+50, windowHeight / 2 - 110, 160, 104);
    image(bishopBuildingW, windowWidth / 2 - 220+50, windowHeight / 2 - 110, 160, 104);
    image(rookBuildingW, windowWidth / 2 - 40+50, windowHeight / 2 - 110, 160, 104);
    image(queenBuildingW, windowWidth / 2 + 140+50, windowHeight / 2 - 110, 160, 104);
  }
  
  //image(img, windowWidth / 2 + 270 + g, windowHeight / 2 - 110, 100, 100);*/
  //pop();
//}

function menuShop() {
  push();

  // 현재 턴인 플레이어의 문자열 키값 ("1" 또는 "-1")
  let currentTurnStr = turn.toString();

  // 2. 기본 텍스트 스타일 설정
  textAlign(CENTER, CENTER);
  
  // -----------------------------------------------------------------
  // [건물 1] 폰 (Pawn Building)
  // -----------------------------------------------------------------
  let pawnX = windowWidth / 2 - 500 + 50;
  let pawnY = windowHeight / 2 - 110;
  
  // 상단 건물명 (이미지 위쪽 Y: -30)
  fill(255); textSize(25); textStyle(BOLD);
  text("폰 기지", pawnX + 40, pawnY - 10); // 이미지 가로폭(80)의 절반인 40을 더해 중앙 정렬
  
  // 이미지 출력 (기존 조건 유지)
  if (buildStateDecision('pawn')) noTint(); 
  else tint(100);
  if(turn == 1) image(pawnBuildingB, pawnX, pawnY, 80, 104);
  else image(pawnBuildingW, pawnX, pawnY, 80, 104);
  
  // 하단 자원 조건 (이미지 아래쪽 Y: +140부터 한 줄씩)
  noTint(); fill(200); textSize(20); textStyle(NORMAL);
  text(`나무: ${costs.pawn.wood}개`, pawnX + 40, pawnY + 145);
  text(`철: ${costs.pawn.steel}개`, pawnX + 40, pawnY + 175);
  text(`금: ${costs.pawn.gold}개`, pawnX + 40, pawnY + 205);


  // -----------------------------------------------------------------
  // [건물 2] 나이트 (Knight Building)
  // -----------------------------------------------------------------
  let knightX = windowWidth / 2 - 400 + 50;
  let knightY = windowHeight / 2 - 110;
  
  fill(255); textSize(25); textStyle(BOLD);
  text("나이트 요새", knightX + 80, knightY - 10); // 이미지 가로폭(160)의 절반인 80을 더해 중앙 정렬
  
  if (buildStateDecision('knight')) noTint(); 
  else tint(100);
  if(turn == 1) image(knightBuildingB, knightX, knightY, 160, 104);
  else image(knightBuildingW, knightX, knightY, 160, 104);
  
  noTint(); fill(200); textSize(20); textStyle(NORMAL);
  text(`나무: ${costs.knight.wood}개`, knightX + 80, knightY + 145);
  text(`철: ${costs.knight.steel}개`, knightX + 80, knightY + 175);
  text(`금: ${costs.knight.gold}개`, knightX + 80, knightY + 205);


  // -----------------------------------------------------------------
  // [건물 3] 비숍 (Bishop Building)
  // -----------------------------------------------------------------
  let bishopX = windowWidth / 2 - 220 + 50;
  let bishopY = windowHeight / 2 - 110;
  
  fill(255); textSize(25); textStyle(BOLD);
  text("비숍 성당", bishopX + 80, bishopY - 10);
  
  if (buildStateDecision('bishop')) noTint(); 
  else tint(100);
  if(turn == 1) image(bishopBuildingB, bishopX, bishopY, 160, 104);
  else image(bishopBuildingW, bishopX, bishopY, 160, 104);
  
  noTint(); fill(200); textSize(20); textStyle(NORMAL);
  text(`나무: ${costs.bishop.wood}개`, bishopX + 80, bishopY + 145);
  text(`철: ${costs.bishop.steel}개`, bishopX + 80, bishopY + 175);
  text(`금: ${costs.bishop.gold}개`, bishopX + 80, bishopY + 205);


  // -----------------------------------------------------------------
  // [건물 4] 룩 (Rook Building)
  // -----------------------------------------------------------------
  let rookX = windowWidth / 2 - 40 + 50;
  let rookY = windowHeight / 2 - 110;
  
  fill(255); textSize(25); textStyle(BOLD);
  text("룩 타워", rookX + 80, rookY - 10);
  
  if (buildStateDecision('rook')) noTint(); 
  else tint(100);
  if(turn == 1) image(rookBuildingB, rookX, rookY, 160, 104);
  else image(rookBuildingW, rookX, rookY, 160, 104);
  
  noTint(); fill(200); textSize(20); textStyle(NORMAL);
  text(`나무: ${costs.rook.wood}개`, rookX + 80, rookY + 145);
  text(`철: ${costs.rook.steel}개`, rookX + 80, rookY + 175);
  text(`금: ${costs.rook.gold}개`, rookX + 80, rookY + 205);

  
  // -----------------------------------------------------------------
  // [건물 4] 퀸 (Queen Building)
  // -----------------------------------------------------------------
  let queenX = windowWidth / 2 + 140 + 50;
  let queenY = windowHeight / 2 - 110;

  fill(255); textSize(25); textStyle(BOLD);
  text("퀸 궁전", queenX + 80, queenY - 10);
  
  if (buildStateDecision('queen')) noTint(); 
  else tint(100);
  if(turn == 1) image(queenBuildingB, queenX, queenY, 160, 104);
  else image(queenBuildingW, queenX, queenY, 160, 104);
  
  noTint(); fill(200); textSize(20); textStyle(NORMAL);
  text(`나무: ${costs.queen.wood}개`, queenX + 80, queenY + 145);
  text(`철: ${costs.queen.steel}개`, queenX + 80, queenY + 175);
  text(`금: ${costs.queen.gold}개`, queenX + 80, queenY + 205);
  
  pop();
}

function buildStateDecision(buildingType) {

  // 2. 현재 턴인 플레이어의 자원 인벤토리 가져오기 ("1" 또는 "-1")
  let inv = playerResources[turn.toString()];
  let cost = costs[buildingType];

  // 3. 나무, 철, 금이 모두 요구량 이상인지 판별
  if (inv.wood >= cost.wood && inv.steel >= cost.steel && inv.gold >= cost.gold) {
    return true;  // 자원 충족 시 활성화
  } else {
    return false; // 자원 부족 시 비활성화
  }
}

function handleChessDrag() {
  if (isDragging) {
    // 드래그 중인 좌표 업데이트 (draw에서 이미지 그림)
    dragX = mouseX;
    dragY = mouseY;
    state = 'game';
    escapeButton.hide();
  }
  
  // 상점 상태일 때는 일반 기물 판정을 차단
  if (state === 'shop') return;
}

function dragModeOn(){
  if (state === 'shop') {
    showShop();
  }
  
  // 드래그 중인 이미지 표시
  if (isDragging) {
    push();
    imageMode(CENTER);
    if (imgBuilding === pawnBuildingB){
      image(imgBuilding, mouseX, mouseY, 80, 120);
      let tileX = floor((mouseX-posX)/ 80 - 1); 
      let tileY = floor((mouseY-posY)/ 80 - 1);
      if(tileX >= 0 && tileX <= 15 && tileY >= 0 && tileY <= 15)
        buildingTile((tileX+1) * 80+40 + posX, (tileY+1) * 80+40 + posY, pawnBuildingNum);
    } 
    else if (imgBuilding === pawnBuildingW){
      image(imgBuilding, mouseX, mouseY, 80, 120);
      let tileX = floor((mouseX-posX)/ 80 - 1); 
      let tileY = floor((mouseY-posY)/ 80 - 1);
      if(tileX >= 0 && tileX <= 15 && tileY >= 0 && tileY <= 15)
        buildingTile((tileX+1) * 80+40 + posX, (tileY+1) * 80+40 + posY, pawnBuildingNum);
    }
    else{
      image(imgBuilding, mouseX+40, mouseY, 160, 120);
      let tileX = floor((mouseX-posX)/ 80 - 1); 
      let tileY = floor((mouseY-posY)/ 80 - 1);
      if(tileX >= 0 && tileX <= 15 && tileY >= 0 && tileY <= 15)
        buildingTile((tileX+1) * 80+40 + posX, (tileY+1) * 80+40 + posY, knightBuildingNum);
    }
    pop();
  }
  
  //건물 그리기 
  //s = 3;
}

function handleChessRelease() {
  if (isDragging) {
    let tileX = floor((mouseX-posX)/ 80 - 1); 
    let tileY = floor((mouseY-posY)/ 80 - 1);
    
    // 현재 턴인 플레이어의 문자열 키값 ("1" 또는 "-1")
    let currentTurnStr = turn.toString();

    // 체스판 범위 내에 놓았을 때만 설치
    if(tileX >= 0 && tileX <= 15 && tileY >= 0 && tileY <= 15) {
      // 지나간 길(10)에만 설치 가능하도록 설정
      if(imgBuilding == pawnBuildingB){
        if(chessBoard[tileY][tileX] === trailNum){
          chessBoard[tileY][tileX] = pawnBuildingNum;
          
          // 자원 차감 코드 수행
          playerResources[currentTurnStr].wood -= costs.pawn.wood;
          playerResources[currentTurnStr].steel -= costs.pawn.steel;
          playerResources[currentTurnStr].gold -= costs.pawn.gold;
          
          nextTurn();
        }
      }
      if(imgBuilding == knightBuildingB){
        if(chessBoard[tileY][tileX] === trailNum && tileX+1<16 && chessBoard[tileY][tileX+1] === trailNum){
          chessBoard[tileY][tileX] = knightBuildingNum;
          chessBoard[tileY][tileX+1] = knightBuildingNum;
          registerBuilding(tileX, tileY, tileX+1, tileY);
          
          // 자원 차감 코드 수행
          playerResources[currentTurnStr].wood -= costs.knight.wood;
          playerResources[currentTurnStr].steel -= costs.knight.steel;
          playerResources[currentTurnStr].gold -= costs.knight.gold;
          
          nextTurn();
        }
      }
      if(imgBuilding == bishopBuildingB){
        if(chessBoard[tileY][tileX] === trailNum && tileX+1<16 && chessBoard[tileY][tileX+1] === trailNum){
          chessBoard[tileY][tileX] = bishopBuildingNum;
          chessBoard[tileY][tileX+1] = bishopBuildingNum;
          registerBuilding(tileX, tileY, tileX+1, tileY);
          
          // 자원 차감 코드 수행
          playerResources[currentTurnStr].wood -= costs.bishop.wood;
          playerResources[currentTurnStr].steel -= costs.bishop.steel;
          playerResources[currentTurnStr].gold -= costs.bishop.gold;
          
          nextTurn();
        }
      }
      if(imgBuilding == rookBuildingB){
        if(chessBoard[tileY][tileX] === trailNum && tileX+1<16 && chessBoard[tileY][tileX+1] === trailNum){
          chessBoard[tileY][tileX] = rookBuildingNum;
          chessBoard[tileY][tileX+1] = rookBuildingNum;
          registerBuilding(tileX, tileY, tileX+1, tileY);
          
          // 자원 차감 코드 수행
          playerResources[currentTurnStr].wood -= costs.rook.wood;
          playerResources[currentTurnStr].steel -= costs.rook.steel;
          playerResources[currentTurnStr].gold -= costs.rook.gold;
          
          nextTurn();
        }
      }
      if(imgBuilding == queenBuildingB){
        if(chessBoard[tileY][tileX] === trailNum && tileX+1<16 && chessBoard[tileY][tileX+1] === trailNum){
          chessBoard[tileY][tileX] = queenBuildingNum;
          chessBoard[tileY][tileX+1] = queenBuildingNum;
          registerBuilding(tileX, tileY, tileX+1, tileY);
          
          // 자원 차감 코드 수행
          playerResources[currentTurnStr].wood -= costs.queen.wood;
          playerResources[currentTurnStr].steel -= costs.queen.steel;
          playerResources[currentTurnStr].gold -= costs.queen.gold;
          
          nextTurn();
        }
      }
      if(imgBuilding == pawnBuildingW){
        if(chessBoard[tileY][tileX] === -trailNum){
          chessBoard[tileY][tileX] = -pawnBuildingNum;
          registerBuilding(tileX, tileY, tileX+1, tileY);
          
          // 자원 차감 코드 수행
          playerResources[currentTurnStr].wood -= costs.pawn.wood;
          playerResources[currentTurnStr].steel -= costs.pawn.steel;
          playerResources[currentTurnStr].gold -= costs.pawn.gold;
          
          nextTurn();
        }
      }
      if(imgBuilding == knightBuildingW){
        if(chessBoard[tileY][tileX] === -trailNum && tileX+1<16 && chessBoard[tileY][tileX+1] === -trailNum){
          chessBoard[tileY][tileX] = -knightBuildingNum;
          chessBoard[tileY][tileX+1] = -knightBuildingNum;
          registerBuilding(tileX, tileY, tileX+1, tileY);
          
          // 자원 차감 코드 수행
          playerResources[currentTurnStr].wood -= costs.knight.wood;
          playerResources[currentTurnStr].steel -= costs.knight.steel;
          playerResources[currentTurnStr].gold -= costs.knight.gold;
          
          nextTurn();
        }
      }
      if(imgBuilding == bishopBuildingW){
        if(chessBoard[tileY][tileX] === -trailNum && tileX+1<16 && chessBoard[tileY][tileX+1] === -trailNum){
          chessBoard[tileY][tileX] = -bishopBuildingNum;
          chessBoard[tileY][tileX+1] = -bishopBuildingNum;
          registerBuilding(tileX, tileY, tileX+1, tileY);
          
          // 자원 차감 코드 수행
          playerResources[currentTurnStr].wood -= costs.bishop.wood;
          playerResources[currentTurnStr].steel -= costs.bishop.steel;
          playerResources[currentTurnStr].gold -= costs.bishop.gold;
          
          nextTurn();
        }
      }
      if(imgBuilding == rookBuildingW){
        if(chessBoard[tileY][tileX] === -trailNum && tileX+1<16 && chessBoard[tileY][tileX+1] === -trailNum){
          chessBoard[tileY][tileX] = -rookBuildingNum;
          chessBoard[tileY][tileX+1] = -rookBuildingNum;
          registerBuilding(tileX, tileY, tileX+1, tileY);
          
          // 자원 차감 코드 수행
          playerResources[currentTurnStr].wood -= costs.rook.wood;
          playerResources[currentTurnStr].steel -= costs.rook.steel;
          playerResources[currentTurnStr].gold -= costs.rook.gold;
          
          nextTurn();
        }
      }
      if(imgBuilding == queenBuildingW){
        if(chessBoard[tileY][tileX] === -trailNum && tileX+1<16 && chessBoard[tileY][tileX+1] === -trailNum){
          chessBoard[tileY][tileX] = -queenBuildingNum;
          chessBoard[tileY][tileX+1] = -queenBuildingNum;
          registerBuilding(tileX, tileY, tileX+1, tileY);
          
          // 자원 차감 코드 수행
          playerResources[currentTurnStr].wood -= costs.queen.wood;
          playerResources[currentTurnStr].steel -= costs.queen.steel;
          playerResources[currentTurnStr].gold -= costs.queen.gold;
          
          nextTurn();
        }
      }
    }
    isDragging = false;
  }
}

function registerBuilding(x1, y1, x2, y2) {
  if (x2 !== undefined && y2 !== undefined) {
    if(turn == -1) allWhiteBuilding.push([[x1, y1], [x2, y2]]);
    if (turn == 1) allBlackBuilding.push([[x1, y1], [x2, y2]]);
  }
}

function nextTurn(){
  movableTiles = [];
  enemyTile = [];
  destroyableBuilding = [];
  turn = -turn;
  
  processResourcePhase();
}

function buildingInstall() {
  let tileX = floor(mouseX / 80);
  let tileY = floor(mouseY / 80);
}

function openShop() {
  state = 'shop'; // 게임 상태를 상점으로 전환
  shopOpenTime = millis(); // 상점이 열린 '방금 그 순간'의 컴퓨터 시간(밀리초)을 기록
}