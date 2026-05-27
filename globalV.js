let chessBoard = [];
let gameover = 0;
//고유번호
const trailNum = 10;
const pioneerNum = 2;
const pawnNum = 3;
const knightNum = 4;
const rookNum = 5;
const bishopNum = 6;
const queenNum = 7;
const kingNum = 8;

const pawnBuildingNum = 110;
const knightBuildingNum = 210;

//클릭한 기물 종류 판정을 위한 배열과 고유번호 측정 변수
let selected = [];
let selectedPiece = 0;
//클릭한 기물 위치
let selectedX = -1;
let selectedY = -1;

//기물 이동범위
let movableTiles = [];
let enemyTile = [];

//전체 스프라이트 로드
let img;
let pioneerSpriteB;
let kingSpriteB;
let pawnSpriteB;
let knightSpriteB;
let rookSpriteB;
let bishopSpriteB;
let queenSpriteB;
let pioneerSpriteW;
let kingSpriteW;
let pawnSpriteW;
let knightSpriteW;
let rookSpriteW;
let bishopSpriteW;
let queenSpriteW;

let pioneerSpriteBRed;
let kingSpriteBRed;
let pawnSpriteBRed;
let knightSpriteBRed;
let rookSpriteBRed;
let bishopSpriteBRed;
let queenSpriteBRed;
let pioneerSpriteWRed;
let kingSpriteWRed;
let pawnSpriteWRed;
let knightSpriteWRed;
let rookSpriteWRed;
let bishopSpriteWRed;
let queenSpriteWRed;

let chessBoardWhite;
let chessBoardBlack;

let whiteTile;
let blackTile;
let fillTile;
let building;

let pawnBuilding;
let knightBuilding;

//턴
let turn = 1;

// 건물 상점 버튼과 상태
let state = "game"; // 현재 화면 상태 ('game' 또는 'shop')
let shopButton;
let escapeButton;
let slider;
let g;
let imgBuilding;

// --- 드래그 관련 변수 추가 ---
let isDragging = false;
let dragX = 0;
let dragY = 0;
const buildNum = 100;
let s = 3;

let summonableTiles = [];
let summonPieceNum = 0;
let enterableBuilding = [];

let posX;
let posY;

let chessUiInitialized = false;
let lastSeenGameVersion = -1;

function canOpenBuildingShop() {
  return (
    turn === chessMyColor && state === "game" && selectedPiece === pioneerNum
  );
}

function getShopTriggerRect() {
  if (selectedX < 0 || selectedY < 0) return null;
  return {
    x: (selectedX + 1) * 80 + posX - 70,
    y: (selectedY + 1) * 80 + posY - 70,
    w: 92,
    h: 42,
  };
}

function openBuildingShop() {
  if (!canOpenBuildingShop()) return;
  state = "shop";
  shopButton.hide();
}

function createInitialChessBoardState() {
  const board = Array.from({ length: 16 }, () => Array(16).fill(0));

  //기물 초기 위치 선정
  board[14][1] = pioneerNum;
  board[15][0] = kingNum + trailNum;
  board[15][1] = pioneerNum;
  board[14][0] = pioneerNum;

  board[1][14] = -pioneerNum;
  board[0][15] = -kingNum - trailNum;
  board[0][14] = -pioneerNum;
  board[1][15] = -pioneerNum;

  return board;
}

function createInitialSharedGameState(playerColors = {}) {
  return {
    board: createInitialChessBoardState(),
    turn: 1,
    playerColors,
    gameVersion: 0,
    startedAt: Date.now(),
  };
}

function chessGamePreload() {
  img = loadImage("assets/ChessPieces.png");
  chessBoardWhite = loadImage("assets/ChessBoardImageWhite.png");
  chessBoardBlack = loadImage("assets/ChessBoardImageBlack.png");
  fillTile = loadImage("assets/FillTile.png");
  building = loadImage("assets/ChessBuilding.png");
  creditPic = loadImage("assets/creditPic.png");
}

function chessGameSetup() {
  if (chessUiInitialized) return;

  if (img) img.resize(640, 480);
  if (building) building.resize(560, 480);
  if (fillTile) fillTile.resize(360, 360);

  pioneerSpriteB = img.get(0, 0, 80, 120);
  pawnSpriteB = img.get(80, 0, 80, 120);
  knightSpriteB = img.get(160, 0, 80, 120);
  rookSpriteB = img.get(240, 0, 80, 120);
  bishopSpriteB = img.get(0, 120, 80, 120);
  queenSpriteB = img.get(80, 120, 80, 120);
  kingSpriteB = img.get(160, 120, 80, 120);
  pioneerSpriteW = img.get(320, 0, 80, 120);
  pawnSpriteW = img.get(400, 0, 80, 120);
  knightSpriteW = img.get(480, 0, 80, 120);
  rookSpriteW = img.get(560, 0, 80, 120);
  bishopSpriteW = img.get(320, 120, 80, 120);
  queenSpriteW = img.get(400, 120, 80, 120);
  kingSpriteW = img.get(480, 120, 80, 120);

  pioneerSpriteBRed = img.get(0, 240, 80, 120);
  pawnSpriteBRed = img.get(80, 240, 80, 120);
  knightSpriteBRed = img.get(160, 240, 80, 120);
  rookSpriteBRed = img.get(240, 240, 80, 120);
  bishopSpriteBRed = img.get(0, 360, 80, 120);
  queenSpriteBRed = img.get(80, 360, 80, 120);
  kingSpriteBRed = img.get(160, 360, 80, 120);
  pioneerSpriteWRed = img.get(320, 240, 80, 120);
  pawnSpriteWRed = img.get(400, 240, 80, 120);
  knightSpriteWRed = img.get(480, 240, 80, 120);
  rookSpriteWRed = img.get(560, 240, 80, 120);
  bishopSpriteWRed = img.get(320, 360, 80, 120);
  queenSpriteWRed = img.get(400, 360, 80, 120);
  kingSpriteWRed = img.get(480, 360, 80, 120);

  blackTile = fillTile.get(0, 0, 80, 80);
  whiteTile = fillTile.get(80, 0, 80, 80);

  pawnBuilding = building.get(0, 0, 80, 120);
  knightBuilding = building.get(80, 0, 160, 120);

  for (let i = 0; i < 300; i++) {
    selected[i] = false;
  }

  shopButton = createButton("건물 상점");
  shopButton.mousePressed(() => {
    openBuildingShop();
  });
  shopButton.size(80, 40);
  shopButton.hide();

  escapeButton = createButton("X");
  escapeButton.mousePressed(() => (state = "game"));
  escapeButton.size(30, 30);
  escapeButton.hide();

  slider = createSlider(0, 255);
  slider.position(windowWidth / 2, windowHeight / 2 + 100);
  slider.size(80);
  slider.hide();

  chessUiInitialized = true;
}

let chessMyColor = 0;

function chessSyncFromRoom(room, myColor) {
  chessMyColor = myColor || 0;

  if (!room || !room.game) return;

  chessBoard = room.game.board;
  turn = room.game.turn;

  if (lastSeenGameVersion !== room.game.gameVersion) {
    clearSelection();
    movableTiles = [];
    enemyTile = [];
    summonableTiles = [];
    enterableBuilding = [];
    summonPieceNum = 0;
    state = "game";
    isDragging = false;
    shopButton.hide();
    escapeButton.hide();
    slider.hide();
    lastSeenGameVersion = room.game.gameVersion;
  }
}

function chessCommitToRoom(room) {
  if (!room || !room.game) return;
  room.game.board = chessBoard;
  room.game.turn = turn;
  room.game.gameVersion = (room.game.gameVersion || 0) + 1;
  lastSeenGameVersion = room.game.gameVersion;
}

function chessGameDraw(room, myColor, myNickname) {
  chessSyncFromRoom(room, myColor);

  background(100);
  posX = windowWidth / 2 - 720;
  posY = windowHeight / 2 - 720;

  chessdraw();

  if (state === "shop" && turn === myColor) {
    showShop();
  } else {
    shopButton.hide();
    escapeButton.hide();
    slider.hide();
  }

  if (isDragging) {
    push();
    imageMode(CENTER);
    if (imgBuilding === pawnBuilding) {
      image(imgBuilding, mouseX, mouseY, 80, 120);
      let tileX = floor((mouseX - posX) / 80 - 1);
      let tileY = floor((mouseY - posY) / 80 - 1);
      if (tileX >= 0 && tileX <= 15 && tileY >= 0 && tileY <= 15) {
        buildingTile(
          (tileX + 1) * 80 + 40 + posX,
          (tileY + 1) * 80 + 40 + posY,
          pawnBuildingNum,
        );
      }
    } else if (imgBuilding === knightBuilding) {
      image(imgBuilding, mouseX + 40, mouseY, 160, 120);
      let tileX = floor((mouseX - posX) / 80 - 1);
      let tileY = floor((mouseY - posY) / 80 - 1);
      if (tileX >= 0 && tileX <= 15 && tileY >= 0 && tileY <= 15) {
        buildingTile(
          (tileX + 1) * 80 + 40 + posX,
          (tileY + 1) * 80 + 40 + posY,
          knightBuildingNum,
        );
      }
    }
    pop();
  }

  g = slider.value();
  s = 3;

  drawGameHud(myColor, myNickname);
  drawShopTrigger();
}

function drawShopTrigger() {
  if (!canOpenBuildingShop()) {
    shopButton.hide();
    return;
  }

  const rectInfo = getShopTriggerRect();
  if (!rectInfo) {
    shopButton.hide();
    return;
  }

  shopButton.position(rectInfo.x, rectInfo.y);
  shopButton.size(rectInfo.w, rectInfo.h);
  shopButton.show();

  push();
  rectMode(CORNER);
  fill(32, 32, 32, 210);
  stroke(255);
  strokeWeight(2);
  rect(rectInfo.x, rectInfo.y, rectInfo.w, rectInfo.h, 8);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("건물 상점", rectInfo.x + rectInfo.w / 2, rectInfo.y + rectInfo.h / 2);
  pop();
}

function drawGameHud(myColor, myNickname) {
  push();
  fill(255);
  textAlign(LEFT, TOP);
  textSize(20);
  const myColorText =
    myColor === 1 ? "흑(선공)" : myColor === -1 ? "백(후공)" : "관전자";
  const turnText = turn === 1 ? "흑 차례" : "백 차례";
  const actionText = turn === myColor ? "내 턴입니다." : "상대 턴입니다.";
  text(`닉네임: ${myNickname || ""}`, 20, 20);
  text(`내 진영: ${myColorText}`, 20, 50);
  text(`현재 턴: ${turnText}`, 20, 80);
  text(actionText, 20, 110);
  pop();
}

function showShop() {
  shopButton.hide();
  escapeButton.position(windowWidth / 2 + 430, windowHeight / 2 - 180);
  escapeButton.show();
  slider.position(windowWidth / 2, windowHeight / 2 + 100);
  slider.show();

  push();
  fill(50, 220);
  rectMode(CENTER);
  rect(windowWidth / 2, windowHeight / 2, 960, 300, 10);
  pop();

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(50);
  text("🏗️ 건물 상점", windowWidth / 2 - 350, windowHeight / 2 - 200);

  menuShop();
}

function menuShop() {
  push();
  if (buildStateDecision()) {
    noTint();
  } else {
    tint(100);
  }
  image(
    pawnBuilding,
    windowWidth / 2 - 480 + g,
    windowHeight / 2 - 110,
    80,
    120,
  );
  image(
    knightBuilding,
    windowWidth / 2 - 330 + g,
    windowHeight / 2 - 110,
    160,
    120,
  );
  pop();
}

function buildStateDecision() {
  if (s === 3) {
    return true;
  }
  return false;
}

function chessGameMouseDragged(room, myColor) {
  chessSyncFromRoom(room, myColor);

  if (turn !== myColor) return;

  if (isDragging) {
    dragX = mouseX;
    dragY = mouseY;
    state = "game";
    escapeButton.hide();
  }
}

function chessGameMouseReleased(room, myColor) {
  chessSyncFromRoom(room, myColor);

  if (turn !== myColor) {
    isDragging = false;
    return;
  }

  if (isDragging) {
    let tileX = floor((mouseX - posX) / 80 - 1);
    let tileY = floor((mouseY - posY) / 80 - 1);

    if (tileX >= 0 && tileX <= 15 && tileY >= 0 && tileY <= 15) {
      if (imgBuilding === pawnBuilding) {
        if (chessBoard[tileY][tileX] === trailNum) {
          chessBoard[tileY][tileX] = pawnBuildingNum;
          nextTurn();
          chessCommitToRoom(room);
        }
      }
      if (imgBuilding === knightBuilding) {
        if (
          chessBoard[tileY][tileX] === trailNum &&
          tileX + 1 < 16 &&
          chessBoard[tileY][tileX + 1] === trailNum
        ) {
          chessBoard[tileY][tileX] = knightBuildingNum;
          chessBoard[tileY][tileX + 1] = knightBuildingNum;
          nextTurn();
          chessCommitToRoom(room);
        }
      }
    }
    isDragging = false;
  }
}

function nextTurn() {
  movableTiles = [];
  enemyTile = [];
  enterableBuilding = [];
  summonableTiles = [];
  summonPieceNum = 0;
  clearSelection();
  turn = -turn;
}

function chessGameMousePressed(room, myColor) {
  chessSyncFromRoom(room, myColor);

  if (turn !== myColor) {
    return;
  }

  let tileX = floor((mouseX - posX) / 80 - 1);
  let tileY = floor((mouseY - posY) / 80 - 1);
  let clickedPiece;

  if (canOpenBuildingShop()) {
    const rectInfo = getShopTriggerRect();
    if (
      rectInfo &&
      mouseX >= rectInfo.x &&
      mouseX <= rectInfo.x + rectInfo.w &&
      mouseY >= rectInfo.y &&
      mouseY <= rectInfo.y + rectInfo.h
    ) {
      openBuildingShop();
      return;
    }
  }

  if (
    state === "shop" &&
    mouseY > windowHeight / 2 - 110 &&
    buildStateDecision()
  ) {
    if (
      mouseX > windowWidth / 2 - 480 + g &&
      mouseX < windowWidth / 2 - 380 + g &&
      mouseY > windowHeight / 2 - 110 &&
      mouseY < windowHeight / 2 - 10
    ) {
      isDragging = true;
      imgBuilding = pawnBuilding;
    } else if (
      mouseX > windowWidth / 2 - 330 + g &&
      mouseX < windowWidth / 2 - 170 + g &&
      mouseY > windowHeight / 2 - 110 &&
      mouseY < windowHeight / 2 - 10
    ) {
      isDragging = true;
      imgBuilding = knightBuilding;
    }
    return;
  }

  if (state === "game") {
    shopButton.hide();
    escapeButton.hide();
    slider.hide();
  }

  if (tileX >= 0 && tileX <= 15 && tileY >= 0 && tileY <= 15) {
    clickedPiece = chessBoard[tileY][tileX];
  }

  if (clickedPiece >= trailNum) {
    clickedPiece -= trailNum;
  } else if (clickedPiece <= -trailNum) {
    clickedPiece += trailNum;
  }

  if (
    (clickedPiece >= pioneerNum && clickedPiece <= 100 && turn === 1) ||
    (clickedPiece <= -pioneerNum && clickedPiece >= -100 && turn === -1)
  ) {
    clearSelection();
    clickedPiece = abs(clickedPiece);
    selected[clickedPiece] = true;
    selectedPiece = clickedPiece;
    selectedX = tileX;
    selectedY = tileY;

    movableTiles = [];
    enemyTile = [];
    summonableTiles = [];
    enterableBuilding = [];
    summonPieceNum = 0;

    if (clickedPiece === pioneerNum) {
      checkTile(tileX + 1, tileY);
      checkTile(tileX - 1, tileY);
      checkTile(tileX, tileY + 1);
      checkTile(tileX, tileY - 1);
    }

    if (clickedPiece === kingNum) {
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

    if (clickedPiece === pawnNum) {
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

    if (clickedPiece === knightNum) {
      checkTile(tileX + 1, tileY + 2);
      checkTile(tileX - 1, tileY + 2);
      checkTile(tileX + 1, tileY - 2);
      checkTile(tileX - 1, tileY - 2);
      checkTile(tileX + 2, tileY + 1);
      checkTile(tileX - 2, tileY + 1);
      checkTile(tileX + 2, tileY - 1);

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

    if (clickedPiece === rookNum) {
      let temp;
      if (tileX !== 15) {
        temp = constrain(tileX + 4, 0, 15);
        for (let i = tileX + 1; i <= temp; i++) {
          checkTile(i, tileY);
          checkEnemy(i, tileY);
          if (abs(chessBoard[tileY][i]) % 10 !== 0) break;
        }
      }
      if (tileX !== 0) {
        temp = constrain(tileX - 4, 0, 15);
        for (let i = tileX - 1; i >= temp; i--) {
          checkTile(i, tileY);
          checkEnemy(i, tileY);
          if (abs(chessBoard[tileY][i]) % 10 !== 0) break;
        }
      }
      if (tileY !== 15) {
        temp = constrain(tileY + 4, 0, 15);
        for (let i = tileY + 1; i <= temp; i++) {
          checkTile(tileX, i);
          checkEnemy(tileX, i);
          if (abs(chessBoard[i][tileX]) % 10 !== 0) break;
        }
      }
      if (tileY !== 0) {
        temp = constrain(tileY - 4, 0, 15);
        for (let i = tileY - 1; i >= temp; i--) {
          checkTile(tileX, i);
          checkEnemy(tileX, i);
          if (abs(chessBoard[i][tileX]) % 10 !== 0) break;
        }
      }
    }

    if (clickedPiece === bishopNum) {
      let temp;
      if (tileX !== 15 && tileY !== 15) {
        temp = min(constrain(15 - tileX, 1, 4), constrain(15 - tileY, 1, 4));
        for (let i = 1; i <= temp; i++) {
          checkTile(tileX + i, tileY + i);
          checkEnemy(tileX + i, tileY + i);
          if (abs(chessBoard[tileY + i][tileX + i]) % 10 !== 0) break;
        }
      }
      if (tileX !== 0 && tileY !== 0) {
        temp = min(constrain(tileX, 1, 4), constrain(tileY, 1, 4));
        for (let i = 1; i <= temp; i++) {
          checkTile(tileX - i, tileY - i);
          checkEnemy(tileX - i, tileY - i);
          if (abs(chessBoard[tileY - i][tileX - i]) % 10 !== 0) break;
        }
      }
      if (tileX !== 15 && tileY !== 0) {
        temp = min(constrain(15 - tileX, 1, 4), constrain(tileY, 1, 4));
        for (let i = 1; i <= temp; i++) {
          checkTile(tileX + i, tileY - i);
          checkEnemy(tileX + i, tileY - i);
          if (abs(chessBoard[tileY - i][tileX + i]) % 10 !== 0) break;
        }
      }
      if (tileX !== 0 && tileY !== 15) {
        temp = min(constrain(tileX, 1, 4), constrain(15 - tileY, 1, 4));
        for (let i = 1; i <= temp; i++) {
          checkTile(tileX - i, tileY + i);
          checkEnemy(tileX - i, tileY + i);
          if (abs(chessBoard[tileY + i][tileX - i]) % 10 !== 0) break;
        }
      }
    }

    if (clickedPiece === queenNum) {
      let temp;
      if (tileX !== 15) {
        temp = constrain(tileX + 4, 0, 15);
        for (let i = tileX + 1; i <= temp; i++) {
          checkTile(i, tileY);
          checkEnemy(i, tileY);
          if (abs(chessBoard[tileY][i]) % 10 !== 0) break;
        }
      }
      if (tileX !== 0) {
        temp = constrain(tileX - 4, 0, 15);
        for (let i = tileX - 1; i >= temp; i--) {
          checkTile(i, tileY);
          checkEnemy(i, tileY);
          if (abs(chessBoard[tileY][i]) % 10 !== 0) break;
        }
      }
      if (tileY !== 15) {
        temp = constrain(tileY + 4, 0, 15);
        for (let i = tileY + 1; i <= temp; i++) {
          checkTile(tileX, i);
          checkEnemy(tileX, i);
          if (abs(chessBoard[i][tileX]) % 10 !== 0) break;
        }
      }
      if (tileY !== 0) {
        temp = constrain(tileY - 4, 0, 15);
        for (let i = tileY - 1; i >= temp; i--) {
          checkTile(tileX, i);
          checkEnemy(tileX, i);
          if (abs(chessBoard[i][tileX]) % 10 !== 0) break;
        }
      }
      if (tileX !== 15 && tileY !== 15) {
        temp = min(constrain(15 - tileX, 1, 4), constrain(15 - tileY, 1, 4));
        for (let i = 1; i <= temp; i++) {
          checkTile(tileX + i, tileY + i);
          checkEnemy(tileX + i, tileY + i);
          if (abs(chessBoard[tileY + i][tileX + i]) % 10 !== 0) break;
        }
      }
      if (tileX !== 0 && tileY !== 0) {
        temp = min(constrain(tileX, 1, 4), constrain(tileY, 1, 4));
        for (let i = 1; i <= temp; i++) {
          checkTile(tileX - i, tileY - i);
          checkEnemy(tileX - i, tileY - i);
          if (abs(chessBoard[tileY - i][tileX - i]) % 10 !== 0) break;
        }
      }
      if (tileX !== 15 && tileY !== 0) {
        temp = min(constrain(15 - tileX, 1, 4), constrain(tileY, 1, 4));
        for (let i = 1; i <= temp; i++) {
          checkTile(tileX + i, tileY - i);
          checkEnemy(tileX + i, tileY - i);
          if (abs(chessBoard[tileY - i][tileX + i]) % 10 !== 0) break;
        }
      }
      if (tileX !== 0 && tileY !== 15) {
        temp = min(constrain(tileX, 1, 4), constrain(15 - tileY, 1, 4));
        for (let i = 1; i <= temp; i++) {
          checkTile(tileX - i, tileY + i);
          checkEnemy(tileX - i, tileY + i);
          if (abs(chessBoard[tileY + i][tileX - i]) % 10 !== 0) break;
        }
      }
    }

    if (clickedPiece === pawnBuildingNum - 10) {
      checkSummonable(tileX + 1, tileY);
      checkSummonable(tileX - 1, tileY);
      checkSummonable(tileX, tileY + 1);
      checkSummonable(tileX, tileY - 1);
      checkSummonable(tileX + 1, tileY + 1);
      checkSummonable(tileX + 1, tileY - 1);
      checkSummonable(tileX - 1, tileY + 1);
      checkSummonable(tileX - 1, tileY - 1);
      summonPieceNum = pawnNum;
    }

    return;
  }

  const moved = movePiece(tileX, tileY);
  if (moved) {
    chessCommitToRoom(room);
    return;
  }

  const summoned = summonPieceNum !== 0 ? summonPiece(tileX, tileY) : false;
  if (summoned) {
    chessCommitToRoom(room);
  }
}

function pawnLevelUp(tileX, tileY, a) {
  if (a === knightBuildingNum) {
    checkSummonable(tileX + 1, tileY);
    checkSummonable(tileX - 1, tileY);
    checkSummonable(tileX, tileY + 1);
    checkSummonable(tileX, tileY - 1);
    if (tileX - 1 >= 0 && chessBoard[tileY][tileX - 1] === knightBuildingNum) {
      checkSummonable(tileX + 1, tileY);
      checkSummonable(tileX - 1, tileY);
      checkSummonable(tileX, tileY + 1);
      checkSummonable(tileX, tileY - 1);
    }
    if (tileX + 1 < 16 && chessBoard[tileY][tileX + 1] === knightBuildingNum) {
      checkSummonable(tileX + 1, tileY);
      checkSummonable(tileX - 1, tileY);
      checkSummonable(tileX, tileY + 1);
      checkSummonable(tileX, tileY - 1);
    }
    summonPieceNum = knightNum;
  }
}

function checkTile(x, y) {
  if (x >= 0 && x < 16 && y >= 0 && y < 16) {
    let tile = chessBoard[y][x];
    if (abs(tile) === 10 || tile === 0) {
      movableTiles.push([x, y]);
    }
  }
}

function checkEnemy(x, y) {
  if (x >= 0 && x < 16 && y >= 0 && y < 16) {
    let tile = chessBoard[y][x];
    if (turn === -1 && tile > 0 && abs(tile) % 10 !== 0) {
      enemyTile.push([x, y]);
    } else if (turn === 1 && tile < 0 && abs(tile) % 10 !== 0) {
      enemyTile.push([x, y]);
    }
  }
}

function checkSummonable(x, y) {
  if (x >= 0 && x < 16 && y >= 0 && y < 16) {
    let tile = chessBoard[y][x];
    if (abs(tile) === 10 || tile === 0) {
      summonableTiles.push([x, y]);
    }
  }
}

function checkBuilding(x, y) {
  if (x >= 0 && x < 16 && y >= 0 && y < 16) {
    let tile = chessBoard[y][x];
    if (abs(tile) > 200) {
      enterableBuilding.push([x, y]);
    }
  }
}

function clearSelection() {
  for (let i = 0; i < selected.length; i++) {
    selected[i] = false;
  }
  selectedPiece = 0;
  selectedX = -1;
  selectedY = -1;
}

function movePiece(tileX, tileY) {
  let temp1 = 0;
  let temp2 = 0;
  let temp3 = 0;

  for (let tile of movableTiles) {
    temp1 = pieceReboot(tile, tileX, tileY);
    if (temp1 === 1) return true;
  }

  for (let tile of enemyTile) {
    temp2 = pieceReboot(tile, tileX, tileY);
    if (temp2 === 1) return true;
  }

  for (let tile of enterableBuilding) {
    temp3 = pawnGone(tile, tileX, tileY);
    if (temp3 === 1) return true;
  }

  return false;
}

function pieceReboot(tile, tileX, tileY) {
  if (tile[0] === tileX && tile[1] === tileY) {
    if (chessBoard[selectedY][selectedX] >= trailNum) {
      chessBoard[selectedY][selectedX] -= selectedPiece;
    } else if (chessBoard[selectedY][selectedX] <= -trailNum) {
      chessBoard[selectedY][selectedX] += selectedPiece;
    } else {
      if (selectedPiece === pioneerNum) {
        chessBoard[selectedY][selectedX] = trailNum * turn;
      } else {
        chessBoard[selectedY][selectedX] = 0;
      }
    }

    if (abs(chessBoard[tileY][tileX]) >= trailNum) {
      chessBoard[tileY][tileX] = (selectedPiece + trailNum) * turn;
    } else {
      chessBoard[tileY][tileX] = selectedPiece * turn;
    }
    clearSelection();
    movableTiles = [];
    enemyTile = [];
    enterableBuilding = [];
    summonableTiles = [];
    summonPieceNum = 0;
    turn *= -1;
    return 1;
  }
  return 0;
}

function pawnGone(tile, tileX, tileY) {
  if (tile[0] === tileX && tile[1] === tileY) {
    if (chessBoard[selectedY][selectedX] >= trailNum) {
      chessBoard[selectedY][selectedX] -= selectedPiece;
    } else if (chessBoard[selectedY][selectedX] <= -trailNum) {
      chessBoard[selectedY][selectedX] += selectedPiece;
    } else {
      chessBoard[selectedY][selectedX] = 0;
    }
    clearSelection();
    movableTiles = [];
    enemyTile = [];
    enterableBuilding = [];
    pawnLevelUp(tileX, tileY, chessBoard[tileY][tileX]);
    return 1;
  }
  return 0;
}

function chessdraw() {
  push();
  imageMode(CENTER);
  if (turn === -1) image(chessBoardWhite, width / 2, height / 2);
  else if (turn === 1) image(chessBoardBlack, width / 2, height / 2);
  pop();

  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      if (chessBoard[i][j] >= trailNum || chessBoard[i][j] === 2) {
        image(blackTile, (j + 1) * 80 + posX, (i + 1) * 80 + posY, 80);
      } else if (chessBoard[i][j] <= -trailNum || chessBoard[i][j] === -2) {
        image(whiteTile, (j + 1) * 80 + posX, (i + 1) * 80 + posY, 80);
      }
    }
  }

  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      let piece = chessBoard[i][j];
      if (piece >= trailNum) piece -= trailNum;
      else if (piece <= -trailNum) piece += trailNum;

      if ((piece >= pioneerNum || piece <= -pioneerNum) && abs(piece) < 100) {
        drawPiece((j + 1) * 80 + 40 + posX, (i + 1) * 80 + 40 + posY, piece);
      } else if (piece >= 100) {
        drawBuilding(j, i, piece + 10);
      }
    }
  }

  drawMovableTiles();
  drawKillableEnemy();
  drawSummonableTiles();
  drawEnterableBuilding();
  isItOver();
}

function drawPiece(x, y, a) {
  push();
  if (a === pioneerNum) image(pioneerSpriteB, x - 40, y - 90);
  if (a === kingNum) image(kingSpriteB, x - 40, y - 90);
  if (a === pawnNum) image(pawnSpriteB, x - 40, y - 90);
  if (a === knightNum) image(knightSpriteB, x - 40, y - 90);
  if (a === rookNum) image(rookSpriteB, x - 40, y - 90);
  if (a === bishopNum) image(bishopSpriteB, x - 40, y - 90);
  if (a === queenNum) image(queenSpriteB, x - 40, y - 90);

  if (a === -pioneerNum) image(pioneerSpriteW, x - 40, y - 90);
  if (a === -kingNum) image(kingSpriteW, x - 40, y - 90);
  if (a === -pawnNum) image(pawnSpriteW, x - 40, y - 90);
  if (a === -knightNum) image(knightSpriteW, x - 40, y - 90);
  if (a === -rookNum) image(rookSpriteW, x - 40, y - 90);
  if (a === -bishopNum) image(bishopSpriteW, x - 40, y - 90);
  if (a === -queenNum) image(queenSpriteW, x - 40, y - 90);
  pop();
}

function drawMovableTiles() {
  for (let tile of movableTiles) {
    let x = tile[0];
    let y = tile[1];
    push();
    noStroke();
    fill(0, 255, 0);
    circle((x + 1) * 80 + 40 + posX, (y + 1) * 80 + 40 + posY, 20);
    pop();
  }
}

function drawKillableEnemy() {
  for (let tile of enemyTile) {
    let x = tile[0];
    let y = tile[1];
    push();
    noStroke();
    fill(0, 255, 0);
    if (turn === -1) {
      let piece = chessBoard[y][x];
      if (piece > 10) piece -= 10;
      blackPieceInDanger(
        (x + 1) * 80 + 40 + posX,
        (y + 1) * 80 + 40 + posY,
        piece,
      );
    } else if (turn === 1) {
      let piece = chessBoard[y][x];
      if (piece < -10) piece += 10;
      whitePieceInDanger(
        (x + 1) * 80 + 40 + posX,
        (y + 1) * 80 + 40 + posY,
        piece,
      );
    }
    pop();
  }
}

function drawSummonableTiles() {
  for (let tile of summonableTiles) {
    let x = tile[0];
    let y = tile[1];
    push();
    noStroke();
    fill(0, 0, 255);
    circle((x + 1) * 80 + 40 + posX, (y + 1) * 80 + 40 + posY, 20);
    pop();
  }
}

function drawEnterableBuilding() {
  for (let tile of enterableBuilding) {
    let x = tile[0];
    let y = tile[1];
    push();
    noStroke();
    fill(0, 0, 255);
    circle((x + 1) * 80 + 40 + posX, (y + 1) * 80 + 40 + posY, 20);
    pop();
  }
}

function blackPieceInDanger(x, y, a) {
  push();
  if (a === pioneerNum) image(pioneerSpriteBRed, x - 40, y - 90);
  if (a === kingNum) image(kingSpriteBRed, x - 40, y - 90);
  if (a === pawnNum) image(pawnSpriteBRed, x - 40, y - 90);
  if (a === knightNum) image(knightSpriteBRed, x - 40, y - 90);
  if (a === rookNum) image(rookSpriteBRed, x - 40, y - 90);
  if (a === bishopNum) image(bishopSpriteBRed, x - 40, y - 90);
  if (a === queenNum) image(queenSpriteBRed, x - 40, y - 90);
  pop();
}

function whitePieceInDanger(x, y, a) {
  push();
  if (a === -pioneerNum) image(pioneerSpriteWRed, x - 40, y - 90);
  if (a === -kingNum) image(kingSpriteWRed, x - 40, y - 90);
  if (a === -pawnNum) image(pawnSpriteWRed, x - 40, y - 90);
  if (a === -knightNum) image(knightSpriteWRed, x - 40, y - 90);
  if (a === -rookNum) image(rookSpriteWRed, x - 40, y - 90);
  if (a === -bishopNum) image(bishopSpriteWRed, x - 40, y - 90);
  if (a === -queenNum) image(queenSpriteWRed, x - 40, y - 90);
  pop();
}

function buildingTile(x, y, a) {
  push();
  rectMode(CENTER);
  noFill();
  stroke(0, 0, 255);
  strokeWeight(5);
  if (a === pawnBuildingNum) square(x, y, 80);
  if (a === knightBuildingNum) rect(x + 40, y, 160, 80);
  pop();
}

function drawBuilding(x, y, a) {
  push();
  if (a === pawnBuildingNum) {
    image(
      pawnBuilding,
      (x + 1) * 80 + 40 + posX - 40,
      (y + 1) * 80 + 40 + posY - 90,
    );
  }
  if (a === knightBuildingNum) {
    if (x - 1 >= 0 && chessBoard[y][x - 1] === 210) {
      // 이미 그려진 좌측 절반이 있으므로 생략
    } else {
      image(
        knightBuilding,
        (x + 1) * 80 + 40 + posX - 40,
        (y + 1) * 80 + 40 + posY - 90,
      );
    }
  }
  pop();
}

function summonPiece(tileX, tileY) {
  for (let tile of summonableTiles) {
    let temp = summonedPieceSet(tile, tileX, tileY);
    if (temp === 1) return true;
  }
  return false;
}

function summonedPieceSet(tile, tileX, tileY) {
  if (tile[0] === tileX && tile[1] === tileY) {
    if (chessBoard[tileY][tileX] === 10) {
      chessBoard[tileY][tileX] = summonPieceNum + 10;
    } else if (chessBoard[tileY][tileX] === -10) {
      chessBoard[tileY][tileX] = -(summonPieceNum + 10);
    } else {
      chessBoard[tileY][tileX] = summonPieceNum * turn;
    }
    summonableTiles = [];
    summonPieceNum = 0;
    turn *= -1;
    return 1;
  }
  return 0;
}

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

function keyPressed() {
  if (key == " " && abs(turn) == 2) {
    gameover = 1;
  }
}

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
