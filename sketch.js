function preload() {
  //에셋 불러오기(이미지, 사운드)
  for (let i = 1; i < 3; i++) {
    howToPlayImage[i] = loadImage("howToPlayImage" + i + ".png");
  }

  img = loadImage("assets/ChessPieces.png");
  chessBoardWhite = loadImage("assets/ChessBoardImageWhite.png");
  chessBoardBlack = loadImage("assets/ChessBoardImageBlack.png");
  fillTile = loadImage("assets/fillTile.png");
  building = loadImage("assets/ChessBuilding.png");
  creditPic = loadImage("assets/yellowCredit.png");

  //p5.party 서버 연결, 공유 객체
  partyConnect("wss://demoserver.p5party.org", "chessu_test_260527_multi");
  sharedLobbyData = partyLoadShared("lobbyData");
}

/*
setup()

1. 버튼 초기화
2. 체스 게임 초기화

3. 멀티 방 목록 초기화
4. 

*/
function setup() {
  //howToPlayPageNumber = 1;
  createCanvas(windowWidth, windowHeight);

  if (!sharedLobbyData.roomList) {
    sharedLobbyData.roomList = [];
  }

  setupElements(); //setupElements.js

  //개별 기물 스프라이트 로드
  img.resize(640, 480);
  building.resize(560, 640);
  fillTile.resize(360, 360);
  creditPic.resize(1000, 1000);
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

  pawnBuildingB = building.get(0, 0, 80, 107);
  knightBuildingB = building.get(80, 0, 160, 107);
  bishopBuildingB = building.get(240, 0, 160, 107);
  rookBuildingB = building.get(400, 0, 160, 107);
  queenBuildingB = building.get(320, 107, 240, 214);

  pawnBuildingW = building.get(0, 321, 80, 107);
  knightBuildingW = building.get(80, 321, 160, 107);
  bishopBuildingW = building.get(240, 321, 160, 107);
  rookBuildingW = building.get(400, 321, 160, 107);
  queenBuildingW = building.get(320, 428, 240, 214);

  queenBuildingB.resize(160, 107);
  queenBuildingW.resize(160, 107);

  //기물 초기 위치 선정
  chessBoard[14][1] = pioneerNum;
  chessBoard[15][0] = kingNum + trailNum;
  chessBoard[15][1] = pioneerNum;
  chessBoard[14][0] = pioneerNum;

  chessBoard[1][14] = -pioneerNum;
  chessBoard[0][15] = -kingNum - trailNum;
  chessBoard[0][14] = -pioneerNum;
  chessBoard[1][15] = -pioneerNum;

  chessBoard[15][2] = -rookNum;

  //selected 배열 초기화
  for (let i = 0; i < 30; i++) {
    selected[i] = false;
  }
  // 1. 건물 상점 이동 버튼
  shopButton = createButton("건물 상점");
  shopButton.mousePressed(openShop);
  shopButton.size(80, 40);

  // 3. 상점나가기 버튼
  escapeButton = createButton("X");
  escapeButton.mousePressed(() => (state = "game"));
  escapeButton.size(30, 30);

  shopButton.hide();
  escapeButton.hide();

  woodTile = fillTile.get(160, 80, 80, 80);
  steelTile = fillTile.get(160, 160, 80, 80);
  goldTile = fillTile.get(160, 240, 80, 80);

  initResourceMap();
}

function draw() {
  background(255);
  posX = windowWidth / 2 - 720;
  posY = windowHeight / 2 - 720;
  screenDetermination(); //screen.js
}

/*
keyPressed.js
26.06.05

기능 1 : f키를 누르면 전체화면으로 전환

입력창에서 f키 반응하지 않도록 수정 필요.
*/

function keyPressed() {
  if (key === "f") {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

//창 크기 바뀔때마다 자동실행
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
