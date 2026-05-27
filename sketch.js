//AI 도움 최소화, 공식 doc + 유니북 참고 버전
//html 수정해야 적용됨.

//시스템 전역변수
let nickname;
let screenMode = 0;

//UI 전역변수
let playButton;
let inputNickname;
let NicknameSaveButton;

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

//서버 공유 데이터 전역변수
let sharedLobbyData;
let myRoomTitle = "";

function preload() {
  for (let i = 1; i < 3; i++) {
    howToPlayImage[i] = loadImage("howToPlayImage" + i + ".png");
  }

  partyConnect("wss://demoserver.p5party.org", "chessu_test_260527_multi");
  sharedLobbyData = partyLoadShared("lobbyData");

  chessGamePreload();
}

function setup() {
  howToPlayPageNumber = 1;
  createCanvas(windowWidth, windowHeight);

  if (!sharedLobbyData.roomList) {
    sharedLobbyData.roomList = [];
  }

  setupButton();
  chessGameSetup();
}

function draw() {
  background(255);
  screenDetermination();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setupButton() {
  playButton = createButton("play");
  playButton.mousePressed(() => {
    nickname = inputNickname.value();
    changeScreenMode(1);
  });

  NicknameSaveButton = createButton("닉네임 변경");
  NicknameSaveButton.mousePressed(() => {
    nickname = inputNickname.value();
    alert("닉네임이 변경되었습니다.");
    inputNickname.value(nickname);
  });
  NicknameSaveButton.position(windowWidth / 2 + 30, windowHeight / 2 - 30);
  NicknameSaveButton.size(90, 40);

  playButton.position(windowWidth / 2 - 50, windowHeight / 2 + 30);

  inputNickname = createInput("guest");
  inputNickname.position(windowWidth / 2 - 100, windowHeight / 2 - 30);
  inputNickname.size(120, 40);

  createRoomButton = createButton("방 생성");
  createRoomButton.mousePressed(() => {
    createRoomPopUpOpened = true;
  });
  createRoomButton.position(windowWidth / 2 - 60, windowHeight / 2 - 25);

  joinRoomButton = createButton("방 들어가기");
  joinRoomButton.mousePressed(() => {
    let searchTitle = prompt("여기에 방 제목 입력 :");
    if (searchTitle) {
      joinRoom(searchTitle);
    }
  });
  joinRoomButton.position(windowWidth / 2 - 60, windowHeight / 2 + 35);

  roomTitleInput = createInput("방 제목을 입력하세요");
  roomTitleInput.position(windowWidth / 2 - 120, windowHeight / 2 - 30);
  roomTitleInput.size(240, 30);

  createCreateButton = createButton("생성");
  createCreateButton.position(windowWidth / 2 - 40, windowHeight / 2 + 20);
  createCreateButton.mousePressed(() => {
    createRoom();
    createRoomPopUpOpened = false;
  });

  closePopUpButton = createButton("X");
  closePopUpButton.position(windowWidth / 2 + 120, windowHeight / 2 - 70);
  closePopUpButton.size(25, 25);
  closePopUpButton.mousePressed(() => {
    createRoomPopUpOpened = false;
  });

  readyButton = createButton("준비");
  kickButton = createButton("강퇴");
  changeHostButton = createButton("방장 위임");
  startButton = createButton("시작");

  selectAll("button").forEach((btn) => btn.hide());
  selectAll("input").forEach((inp) => inp.hide());
}

function screenDetermination() {
  if (screenMode === 0) {
    showTitleScreen();
    showHowToPlayScreen();
  } else if (screenMode === 1) {
    drawMyNickName();
    if (createRoomPopUpOpened) {
      showCreateRoomUI();
    } else {
      showLobbyScreen();
    }
  } else if (screenMode === 2) {
    showRoomScreen();
  } else if (screenMode === 3) {
    if (gameover == 0) showGameScreen();
    if (gameover == 1) creditScene();
    victory();
  }
}

function changeScreenMode(modeNumber) {
  screenMode = modeNumber;
  if (screenMode === 1) {
    inputNickname.value(nickname);
  }
  selectAll("button").forEach((btn) => btn.hide());
  selectAll("input").forEach((inp) => inp.hide());
}

function showHowToPlayScreen() {
  image(howToPlayImage[howToPlayPageNumber], 0, 0);
}

function showTitleScreen() {
  playButton.show();
  inputNickname.position(windowWidth / 2 - 100, windowHeight / 2 - 30);
  inputNickname.show();
  NicknameSaveButton.position(windowWidth / 2 + 30, windowHeight / 2 - 30);
  NicknameSaveButton.show();
}

function showLobbyScreen() {
  createRoomButton.show();
  joinRoomButton.show();

  roomTitleInput.hide();
  createCreateButton.hide();
  closePopUpButton.hide();

  inputNickname.position(windowWidth / 2 - 130, 110);
  inputNickname.show();
  NicknameSaveButton.position(windowWidth / 2 + 10, 110);
  NicknameSaveButton.show();
}

function showCreateRoomUI() {
  createRoomButton.hide();
  joinRoomButton.hide();

  push();
  rectMode(CENTER);
  fill(225);
  stroke(0);
  strokeWeight(2);
  rect(windowWidth / 2, windowHeight / 2, 300, 160, 10);
  pop();

  roomTitleInput.show();
  createCreateButton.show();
  closePopUpButton.show();
}

function createRoom() {
  let title = roomTitleInput.value().trim();

  if (title === "") {
    alert("방 제목을 입력 :");
    return;
  }

  let isExist = sharedLobbyData.roomList.find((room) => room.title === title);
  if (isExist) {
    alert("중복된 이름의 방이 있습니다.");
    return;
  }

  let newRoom = {
    title: title,
    host: nickname,
    players: [nickname],
    gameStarted: false,
    playerColors: {},
    game: null,
  };

  sharedLobbyData.roomList.push(newRoom);
  myRoomTitle = title;
  changeScreenMode(2);
}

function joinRoom(searchTitle) {
  let targetRoom = sharedLobbyData.roomList.find(
    (room) => room.title === searchTitle,
  );

  if (targetRoom) {
    if (targetRoom.players.length >= 2) {
      alert("플레이어 인원 초과");
      return;
    }

    if (!targetRoom.players.includes(nickname)) {
      targetRoom.players.push(nickname);
    }
    myRoomTitle = searchTitle;
    changeScreenMode(2);
  } else {
    alert("방이 없습니다.");
  }
}

function getCurrentRoom() {
  return sharedLobbyData.roomList.find((room) => room.title === myRoomTitle);
}

function shuffleArray(arr) {
  let copied = [...arr];
  for (let i = copied.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function tryStartRoomGame(room) {
  if (!room) return;
  if (room.players.length !== 2) return;
  if (room.gameStarted) return;
  if (room.host !== nickname) return;

  const randomizedPlayers = shuffleArray(room.players);
  room.playerColors = {
    [randomizedPlayers[0]]: 1,
    [randomizedPlayers[1]]: -1,
  };
  room.game = createInitialSharedGameState(room.playerColors);
  room.gameStarted = true;
}

function showRoomScreen() {
  let currentRoom = getCurrentRoom();

  if (!currentRoom) {
    alert("방이 존재하지 않습니다.");
    changeScreenMode(1);
    return;
  }

  tryStartRoomGame(currentRoom);

  if (currentRoom.gameStarted && currentRoom.players.length === 2) {
    changeScreenMode(3);
    return;
  }

  push();
  textAlign(CENTER);
  fill(0);

  textSize(30);
  text("방 제목 : " + currentRoom.title, windowWidth / 2, 100);

  textSize(20);
  text(
    "현재 인원 : " + currentRoom.players.length + " / 2",
    windowWidth / 2,
    150,
  );
  text("접속자 : " + currentRoom.players.join(", "), windowWidth / 2, 200);
  text("2명이 되면 자동으로 게임을 시작합니다.", windowWidth / 2, 260);

  pop();
}

function drawMyNickName() {
  push();
  textSize(20);
  fill(0);
  textAlign(CENTER);
  text("내 닉네임: " + nickname, windowWidth / 2, 80);
  pop();
}

function showGameScreen() {
  let currentRoom = getCurrentRoom();

  if (!currentRoom) {
    alert("방이 종료되었습니다.");
    changeScreenMode(1);
    return;
  }

  tryStartRoomGame(currentRoom);

  if (!currentRoom.gameStarted || !currentRoom.game) {
    push();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("상대를 기다리는 중입니다...", width / 2, height / 2);
    pop();
    return;
  }

  const myColor = currentRoom.playerColors?.[nickname] || 0;
  chessGameDraw(currentRoom, myColor, nickname);
}

function mousePressed() {
  if (screenMode === 3) {
    const currentRoom = getCurrentRoom();
    if (!currentRoom || !currentRoom.gameStarted) return;
    const myColor = currentRoom.playerColors?.[nickname] || 0;
    chessGameMousePressed(currentRoom, myColor);
  }
}

function mouseDragged() {
  if (screenMode === 3) {
    const currentRoom = getCurrentRoom();
    if (!currentRoom || !currentRoom.gameStarted) return;
    const myColor = currentRoom.playerColors?.[nickname] || 0;
    chessGameMouseDragged(currentRoom, myColor);
  }
}

function mouseReleased() {
  if (screenMode === 3) {
    const currentRoom = getCurrentRoom();
    if (!currentRoom || !currentRoom.gameStarted) return;
    const myColor = currentRoom.playerColors?.[nickname] || 0;
    chessGameMouseReleased(currentRoom, myColor);
  }
}

function keyPressed() {
  if (key === "f") {
    let fs = fullscreen();
    fullscreen(!fs);
  }

  if (key == " " && abs(turn) == 2) {
    gameover = 1;
  }
}

function isItOver() {
  let blackKing = 0,
    whiteKing = 0;
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      if (chessBoard[i][j] == kingNum || chessBoard[i][j] == kingNum + 10) {
        blackKing = 1;
      } else if (
        chessBoard[i][j] == -kingNum ||
        chessBoard[i][j] == -kingNum - 10
      ) {
        whiteKing = 1;
      }
    }
  }
  if (blackKing == 0) turn = -2;
  else if (whiteKing == 0) turn = 2;
}
