// =============================================================
// game_bridge.js
// multiplayer.js 와 기존 게임 코드 사이의 연결 함수 모음
// =============================================================

// ─────────────────────────────────────────────
// 공유 게임 상태 → 로컬 전역변수 동기화
// ─────────────────────────────────────────────
function syncFromGame(game) {
  let oldTurn = turn;

  // 체스판
  for (let i = 0; i < 16; i++)
    for (let j = 0; j < 16; j++) chessBoard[i][j] = game.chessBoard[i][j];

  // 턴
  turn = game.turn;

  // 자원
  for (let key of ["1", "-1"]) {
    playerResources[key].wood = game.playerResources[key].wood;
    playerResources[key].steel = game.playerResources[key].steel;
    playerResources[key].gold = game.playerResources[key].gold;
  }

  // 건물 목록
  allBlackBuilding = JSON.parse(JSON.stringify(game.allBlackBuilding || []));
  allWhiteBuilding = JSON.parse(JSON.stringify(game.allWhiteBuilding || []));

  // 자원 맵 (호스트가 생성한 값으로 고정)
  if (game.resourceMap) {
    for (let i = 0; i < 16; i++)
      for (let j = 0; j < 16; j++) resourceMap[i][j] = game.resourceMap[i][j];
  }

  // 소환 관련 상태
  summonOnly = game.summonOnly || 0;
  summonPieceNum = game.summonPieceNum || 0;

  // 턴이 바뀌면 로컬 선택 상태 초기화
  if (turn !== oldTurn) {
    movableTiles = [];
    enemyTile = [];
    summonableTiles = [];
    enterableBuilding = [];
    destroyableBuilding = [];
    selectedX = -1;
    selectedY = -1;
    selectedPiece = 0;
    for (let i = 0; i < selected.length; i++) selected[i] = false;
  }
}

// ─────────────────────────────────────────────
// 로컬 전역변수 → 공유 게임 상태 동기화
// ─────────────────────────────────────────────
function syncToGame(game) {
  for (let i = 0; i < 16; i++)
    for (let j = 0; j < 16; j++) game.chessBoard[i][j] = chessBoard[i][j];

  game.turn = turn;

  for (let key of ["1", "-1"]) {
    game.playerResources[key].wood = playerResources[key].wood;
    game.playerResources[key].steel = playerResources[key].steel;
    game.playerResources[key].gold = playerResources[key].gold;
  }

  game.allBlackBuilding = JSON.parse(JSON.stringify(allBlackBuilding));
  game.allWhiteBuilding = JSON.parse(JSON.stringify(allWhiteBuilding));

  game.summonOnly = summonOnly;
  game.summonPieceNum = summonPieceNum;
}

// ─────────────────────────────────────────────
// 게임 초기 공유 상태 생성 (방 시작 시 호스트가 호출)
// ─────────────────────────────────────────────
function createInitialSharedGameState(playerColors) {
  // 현재 초기화된 chessBoard 복사
  let boardCopy = [];
  for (let i = 0; i < 16; i++) {
    boardCopy[i] = [];
    for (let j = 0; j < 16; j++) boardCopy[i][j] = chessBoard[i][j];
  }

  // 호스트의 resourceMap 복사 (랜덤 배치 결과 공유)
  let resMapCopy = [];
  for (let i = 0; i < 16; i++) {
    resMapCopy[i] = [];
    for (let j = 0; j < 16; j++) resMapCopy[i][j] = resourceMap[i][j];
  }

  return {
    chessBoard: boardCopy,
    turn: -1,
    playerResources: {
      1: { wood: 0, steel: 0, gold: 0 },
      "-1": { wood: 0, steel: 0, gold: 0 },
    },
    allBlackBuilding: [],
    allWhiteBuilding: [],
    resourceMap: resMapCopy,
    summonOnly: 0,
    summonPieceNum: 0,
  };
}

// ─────────────────────────────────────────────
// 멀티플레이어 게임 화면 그리기
// ─────────────────────────────────────────────
function chessGameDraw(room, myColor, nickname) {
  syncFromGame(room.game);

  // 내 턴이 아닐 때 상점 UI 강제 닫기
  if (myColor !== turn) {
    shopButton.hide();
    escapeButton.hide();
    if (state === "shop") state = "game";
  }

  chessdraw();

  // 턴 안내 텍스트
  push();
  fill(0);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  let msg =
    myColor === turn ? "✅ 당신의 차례입니다" : "⏳ 상대방의 차례입니다";
  text(msg, width / 2, 10);
  pop();
}

// ─────────────────────────────────────────────
// 멀티플레이어 마우스 이벤트 핸들러
// ─────────────────────────────────────────────
function chessGameMousePressed(room, myColor) {
  syncFromGame(room.game);
  if (myColor !== turn) return;
  handleChessMousePressed();
  syncToGame(room.game);
}

function chessGameMouseDragged(room, myColor) {
  syncFromGame(room.game);
  if (myColor !== turn) return;
  handleChessDrag();
  syncToGame(room.game);
}

function chessGameMouseReleased(room, myColor) {
  syncFromGame(room.game);
  if (myColor !== turn) return;
  handleChessRelease();
  syncToGame(room.game);
}
