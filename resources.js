
function initResourceMap() {
  // 1. 16x16 체스판 영역 정의를 위한 2차원 배열 초기화
  // 0: 절대 빈칸, 1: 빈칸, 2: 나무, 3: 철, 4: 금
  let zoneMap = [];
  
  // 랜덤 자원 셔플 분배를 위해 각 영역의 타일 좌표를 수집할 객체
  let woodZoneTiles = { leftBottom: [], rightTop: [] };
  let emptyZoneTiles = { leftBottom: [], rightTop: [] };

  // -----------------------------------------------------------------
  // 2. 격리 분석 결과: 16x16 맵 좌표 기반 정확한 영역 매핑
  // -----------------------------------------------------------------
  for (let i = 0; i < 16; i++) {
    zoneMap[i] = [];
    resourceMap[i] = [];
    for (let j = 0; j < 16; j++) {
      let zone = 1; // 기본값: 빈칸 영역

      // --- [규칙 A] 절대 빈칸 영역 (흰색 - 총 18칸) ---
      // 우상단 절대 빈칸 (9칸)
      if (i >= 0 && i <= 2 && j >= 13 && j <= 15) zone = 0;
      // 좌하단 절대 빈칸 (9칸)
      else if (i >= 13 && i <= 15 && j >= 0 && j <= 2) zone = 0;

      // --- [규칙 B] 금 영역 (노란색 - 총 20칸) ---
      // 좌상단 외곽 금 거점 (4칸)
      else if ((i === 0 || i === 1) && (j === 0 || j === 1)) zone = 4;
      // 우하단 외곽 금 거점 (4칸)
      else if ((i === 14 || i === 15) && (j === 14 || j === 15)) zone = 4;
      // 중앙 대각선 금 (12칸)
      else if (
        (i === 6 && (j >= 6 && j <= 7)) || 
        (i === 7 && (j >= 6 && j <= 8)) || 
        (i === 8 && (j >= 7 && j <= 9)) || 
        (i === 9 && (j >= 8 && j <= 9)) ||
        (i === 2 && j === 2) || (i === 13 && j === 13) // 금 영역 연결 징검다리
      ) {
        zone = 4;
      }

      // --- [규칙 C] 철 영역 (회색 - 총 46칸) ---
      // 외곽 금 거점 및 중앙 금 라인을 감싸는 대각선 철 밴드
      else if (
        (i === 0 && (j === 2 || j === 3)) || (i === 1 && (j === 2 || j === 3)) || (i === 2 && (j === 0 || j === 1 || j === 3)) || (i === 3 && (j >= 0 && j <= 4)) ||
        (i === 15 && (j === 12 || j === 13)) || (i === 14 && (j === 12 || j === 13)) || (i === 13 && (j === 14 || j === 15 || j === 12)) || (i === 12 && (j >= 11 && j <= 15)) ||
        (i === 4 && (j >= 3 && j <= 5)) || (i === 5 && (j >= 4 && j <= 7)) ||
        (i === 6 && (j === 5 || j === 8)) || (i === 7 && (j === 5 || j === 9)) ||
        (i === 8 && (j === 6 || j === 10)) || (i === 9 && (j === 7 || j === 10)) ||
        (i === 10 && (j >= 8 && j <= 11)) || (i === 11 && (j >= 10 && j <= 12))
      ) {
        zone = 3;
      }

      // --- [규칙 D] 나무 영역 (갈색 - 총 100칸) ---
      // 철 밴드 외곽을 덮고 있는 두터운 대각선 나무 레이어
      else if (
        (i === 0 && j >= 4 && j <= 7) || (i === 1 && j >= 3 && j <= 7) || (i === 2 && j >= 4 && j <= 8) ||
        (i === 3 && j >= 5 && j <= 9) || (i === 4 && (j <= 2 || (j >= 6 && j <= 10))) || (i === 5 && (j <= 3 || (j >= 8 && j <= 11))) ||
        (i === 6 && (j <= 4 || (j >= 9 && j <= 12))) || (i === 7 && (j <= 4 || (j >= 10 && j <= 13))) ||
        (i === 8 && ((j >= 2 && j <= 5) || (j >= 11))) || (i === 9 && ((j >= 3 && j <= 6) || (j >= 11))) ||
        (i === 10 && ((j >= 4 && j <= 7) || (j >= 12))) || (i === 11 && ((j >= 5 && j <= 9) || (j >= 13))) || (i === 12 && j >= 6 && j <= 10) ||
        (i === 14 && j >= 8 && j <= 11) || (i === 15 && j >= 8 && j <= 11) || (i === 13 && j >= 7 && j <= 11)
      ) {
        zone = 2;
      }

      // 3. 확정된 영역 분류에 따라 고정 자원 배치 및 가변 자원 그룹 수집
      zoneMap[i][j] = zone;

      if (zone === 0) resourceMap[i][j] = RES_NONE;  // 절대 빈칸
      else if (zone === 4) resourceMap[i][j] = RES_GOLD; // 금 영역 확정
      else if (zone === 3) resourceMap[i][j] = RES_STEEL; // 철 영역 확정
      else if (zone === 2) {
        // 나무 영역 (좌하단/우상단 대칭 분할 수집)
        if (i > j) woodZoneTiles.leftBottom.push({ r: i, c: j });
        else woodZoneTiles.rightTop.push({ r: i, c: j });
      } else if (zone === 1) {
        // 빈칸 영역 (좌하단/우상단 대칭 분할 수집)
        if (i > j) emptyZoneTiles.leftBottom.push({ r: i, c: j });
        else emptyZoneTiles.rightTop.push({ r: i, c: j });
      }
    }
  }

  // -----------------------------------------------------------------
  // 4. 나무 영역 내부 랜덤 자원 셔플 분배 (총 104칸, 좌하 52 / 우상 52)
  // 규칙: 각 진영별 철 4칸, 빈칸 7칸, 나무 41칸
  // -----------------------------------------------------------------
  // 좌하단 나무 풀 빌드 및 적용
  let lbWoodPool = [];
  for (let k = 0; k < 4; k++) lbWoodPool.push(RES_STEEL);
  for (let k = 0; k < 7; k++) lbWoodPool.push(RES_NONE);
  while (lbWoodPool.length < woodZoneTiles.leftBottom.length) lbWoodPool.push(RES_WOOD);
  lbWoodPool = shuffle(lbWoodPool);
  
  for (let k = 0; k < woodZoneTiles.leftBottom.length; k++) {
    let tile = woodZoneTiles.leftBottom[k];
    resourceMap[tile.r][tile.c] = lbWoodPool[k];
  }

  // 우상단 나무 풀 빌드 및 적용
  let rtWoodPool = [];
  for (let k = 0; k < 4; k++) rtWoodPool.push(RES_STEEL);
  for (let k = 0; k < 7; k++) rtWoodPool.push(RES_NONE);
  while (rtWoodPool.length < woodZoneTiles.rightTop.length) rtWoodPool.push(RES_WOOD);
  rtWoodPool = shuffle(rtWoodPool);
  
  for (let k = 0; k < woodZoneTiles.rightTop.length; k++) {
    let tile = woodZoneTiles.rightTop[k];
    resourceMap[tile.r][tile.c] = rtWoodPool[k];
  }

  // -----------------------------------------------------------------
  // 5. 빈칸 영역 내부 랜덤 자원 셔플 분배 (총 86칸, 좌하 43 / 우상 43)
  // 규칙: 각 진영별 나무 7칸, 빈칸 36칸
  // -----------------------------------------------------------------
  // 좌하단 빈칸 풀 빌드 및 적용
  let lbEmptyPool = [];
  for (let k = 0; k < 7; k++) lbEmptyPool.push(RES_WOOD);
  while (lbEmptyPool.length < emptyZoneTiles.leftBottom.length) lbEmptyPool.push(RES_NONE);
  lbEmptyPool = shuffle(lbEmptyPool);
  
  for (let k = 0; k < emptyZoneTiles.leftBottom.length; k++) {
    let tile = emptyZoneTiles.leftBottom[k];
    resourceMap[tile.r][tile.c] = lbEmptyPool[k];
  }

  // 우상단 빈칸 풀 빌드 및 적용
  let rtEmptyPool = [];
  for (let k = 0; k < 7; k++) rtEmptyPool.push(RES_WOOD);
  while (rtEmptyPool.length < emptyZoneTiles.rightTop.length) rtEmptyPool.push(RES_NONE);
  rtEmptyPool = shuffle(rtEmptyPool);
  
  for (let k = 0; k < emptyZoneTiles.rightTop.length; k++) {
    let tile = emptyZoneTiles.rightTop[k];
    resourceMap[tile.r][tile.c] = rtEmptyPool[k];
  }
}

// 현재 턴인 플레이어의 전체 영토를 검사하여 자원을 수집하는 함수
function collectTurnResources(currentTurn) {
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      let tile = chessBoard[i][j];
      
      let isBlackTerritory = (tile >= trailNum || tile === pioneerNum);
      let isWhiteTerritory = (tile <= -trailNum || tile === -pioneerNum);
      
      if ((currentTurn === 1 && isBlackTerritory) || (currentTurn === -1 && isWhiteTerritory)) {
        let resType = resourceMap[i][j];
        addResourceToPlayer(currentTurn, resType);
      }
    }
  }
}

// 인벤토리에 자원 개수를 매칭하여 추가해주는 함수
function addResourceToPlayer(player, type) {
  let inv = playerResources[player.toString()];
  if (type === RES_WOOD) inv.wood++;
  else if (type === RES_STEEL) inv.steel++;
  else if (type === RES_GOLD) inv.gold++;
}

//턴이 교체되는 함수(nextTurn(), pieceReboot()) 내부에서 turn의 부호가 바뀌는 코드 바로 다음에 processResourcePhase();가 실행되도록 한 줄 추가
function processResourcePhase() {
  collectTurnResources(turn);
}

//기존 코드의 chessdraw() 함수 내부 dragmodeon() 위 drawResourceLayer();와 drawResourceHUD();를 추가
function drawResourceLayer() {
  push();
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      let resType = resourceMap[i][j];
      if (resType !== RES_NONE) {
        let col = resourceColors[resType];
        
        let x = (j + 1) * 80 + 40 + posX;
        let y = (i + 1) * 80 + 40 + posY;
        
        // 자원 종류별 모양 분기 수정
        push();
        if (resType === RES_WOOD) {
          tint(255,180);
          image(woodTile, x - 40, y - 40);
          
        } else if (resType === RES_STEEL) {
          tint(255,230);
          image(steelTile, x - 40, y - 40);
          
        } else if (resType === RES_GOLD) {
          tint(255,200);
          image(goldTile, x - 40, y - 40);
          
        }
        pop();
      }
    }
  }
  pop();
}

function drawResourceHUD() {
  push();
  textSize(16);
  ellipseMode(CENTER);
  rectMode(CORNER);
  
  let boardLeft = posX + 80;
  let boardTop = posY + 80;
  let boardSize = 1280; 
  let boxHeight = 40;

  // -----------------------------------------------------------------
  // 1. 체스판 바로 상단: White Player 자원 표시 상자 (나무, 철, 금)
  // -----------------------------------------------------------------
  fill(255, 150); 
  stroke(200);
  strokeWeight(1);
  rect(boardLeft, boardTop - boxHeight - 40, boardSize, boxHeight);
  
  fill(0); noStroke();
  textAlign(LEFT, CENTER);
  text("⚪ White 자원  |", boardLeft + 30, boardTop - 60);
  
  // 나무
  fill(resourceColors[RES_WOOD]); stroke(0); strokeWeight(1);
  rect(boardLeft + 160, boardTop - 27 - 40, 14, 14, 2);
  fill(0); noStroke(); text(`나무: ${playerResources["-1"].wood}`, boardLeft + 180, boardTop - 60);
  
  // 철
  fill(resourceColors[RES_STEEL]); stroke(0); strokeWeight(1);
  ellipse(boardLeft + 270, boardTop - 20 - 40, 15, 15);
  fill(0); noStroke(); text(`철: ${playerResources["-1"].steel}`, boardLeft + 290, boardTop - 60);
  
  // 금
  fill(resourceColors[RES_GOLD]); stroke(0); strokeWeight(1);
  push(); translate(boardLeft + 375, boardTop - 20 - 40); rotate(QUARTER_PI); rect(-6, -6, 12, 12); pop();
  fill(0); noStroke(); text(`금: ${playerResources["-1"].gold}`, boardLeft + 395, boardTop - 60);


  // -----------------------------------------------------------------
  // 2. 체스판 바로 하단: Black Player 자원 표시 상자 (나무, 철, 금)
  // -----------------------------------------------------------------
  fill(25, 150); 
  stroke(60);
  strokeWeight(1);
  rect(boardLeft, boardTop + boardSize + 40, boardSize, boxHeight); 
  
  let blackY = boardTop + boardSize + 20; 
  
  fill(255); noStroke();
  textAlign(LEFT, CENTER);
  text("⚫ Black 자원  |", boardLeft + 30, blackY + 40);
  
  // 나무
  fill(resourceColors[RES_WOOD]); stroke(255); strokeWeight(1);
  rect(boardLeft + 160, blackY - 7 + 40, 14, 14, 2);
  fill(255); noStroke(); text(`나무: ${playerResources["1"].wood}`, boardLeft + 180, blackY + 40);
  
  // 철
  fill(resourceColors[RES_STEEL]); stroke(255); strokeWeight(1);
  ellipse(boardLeft + 270, blackY + 40, 15, 15);
  fill(255); noStroke(); text(`철: ${playerResources["1"].steel}`, boardLeft + 290, blackY + 40);
  
  // 금
  fill(resourceColors[RES_GOLD]); stroke(255); strokeWeight(1);
  push(); translate(boardLeft + 375, blackY + 40); rotate(QUARTER_PI); rect(-6, -6, 12, 12); pop();
  fill(255); noStroke(); text(`금: ${playerResources["1"].gold}`, boardLeft + 395, blackY + 40);
  
  pop();
}