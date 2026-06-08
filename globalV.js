//AI 도움 최소화, 공식 doc + 유니북 참고 버전
//html 수정해야 적용됨.

//시스템 전역변수


let nickname;
let screenMode = 0;

//UI 전역변수
let rulePage = 1;
let rulePopupOpened = false;
let ruleButtonTitle;
let ruleButtonLobby;
let rulePrevButton;
let ruleNextButton;
let ruleCloseButton;

let creditOpened = false;
let playButton;
let inputNickname;
let NicknameSaveButton;
let exitRoomButton;

let createRoomButton;
let joinRoomButton;
let roomTitleInput;
let createCreateButton;
let readyButton;
let kickButton;
let changeHostButton;
let startButton;
let howToPlayImage = [];
let howToPlayPageNumber;
let closePopUpButton;
let createRoomPopUpOpened = false;
let joinRoomPopUpOpened = false;
let searchTitleInput;
let joinConfirmButton;
let closeJoinPopUpButton;

//서버 공유 데이터 전역변수
let sharedLobbyData;
let myRoomTitle = "";

let chessBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
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
const bishopBuildingNum = 310;
const rookBuildingNum = 410;
const queenBuildingNum = 510;

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
let ChessBoardBlack;

let whiteTile;
let blackTile;

let pawnBuildingB;
let knightBuildingB;
let bishopBuildingB;
let rookBuildingB;
let queenBuildingB;

let pawnBuildingW;
let knightBuildingW;
let bishopBuildingW;
let rookBuildingW;
let queenBuildingW;

let creditPic;

//턴
let turn = -1;

// 건물 상점 버튼과 상태
let state = "game"; // 현재 화면 상태 ('game' 또는 'shop')
let shopButton;
let escapeButton;
let slider;
let g;
let imgBuilding;
let shopOpenTime = 0;

// --- 드래그 관련 변수 추가 ---
let isDragging = false;
let dragX = 0;
let dragY = 0;
const buildNum = 100;
let s = 3;

let summonableTiles = [];
let summonPieceNum = 0;
let summonOnly = 0;

let enterableBuilding = [];
let allBlackBuilding = []; // [[x1,y1], [x2,y2]] 쌍으로 저장
let allWhiteBuilding = [];
let destroyableBuilding = [];

// --- 자원 시스템 관련 변수 수정 ---
let woodTile;
let steelTile;
let goldTile;

// 자원 고유 번호 정의 (STONE을 제거하고 GOLD 추가)
const RES_NONE = 0;
const RES_WOOD = 1;
const RES_STEEL = 2; // 철의 ID 변경 (기존 코드와의 연속성을 위해 순차 정렬)
const RES_GOLD = 3; // 금 추가

// 자원별 RGB 색상 변경
const resourceColors = {
  1: [139, 69, 19], // Wood: 갈색
  2: [128, 128, 128], // Steel: 돌 색상(회색)으로 변경
  3: [255, 215, 0], // Gold: 노란색(금색) 추가
};

// 16x16 체스판 전체의 자원 배치를 저장할 배열
let resourceMap = [];

// 플레이어별 자원 보유량 인벤토리 업데이트
let playerResources = {
  1: { wood: 0, steel: 0, gold: 0 }, // Black 턴 자원
  "-1": { wood: 0, steel: 0, gold: 0 }, // White 턴 자원
};

let costs = {
  pawn: { wood: 10, steel: 0, gold: 0 },
  knight: { wood: 15, steel: 5, gold: 0 },
  bishop: { wood: 20, steel: 5, gold: 1 },
  rook: { wood: 25, steel: 5, gold: 1 },
  queen: { wood: 30, steel: 10, gold: 3 },
};

let posX;
let posY;
