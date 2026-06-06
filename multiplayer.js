function leaveAndDestroyRoom() {
  let currentRoom = getCurrentRoom();

  if (currentRoom) {
    //방 플레이어 목록에서 자신의 닉네임 제거
    let myIndex = currentRoom.players.indexOf(nickname);
    if (myIndex !== -1) {
      currentRoom.players.splice(myIndex, 1);
    }

    //방에 아무도 안 남게 된다면 서버 목록에서 방 자체를 삭제
    if (currentRoom.players.length === 0) {
      let roomIndex = sharedLobbyData.roomList.indexOf(currentRoom);
      if (roomIndex !== -1) {
        sharedLobbyData.roomList.splice(roomIndex, 1);
      }
    }
  }

  // 3. 내 방 상태 초기화 및 로비 화면(모드 1)으로 이동
  myRoomTitle = "";
  changeScreenMode(1);
  showToast("방에서 나왔습니다.");
}

function createRoom() {
  let title = roomTitleInput.value().trim();

  if (title === "") {
    showToast("방 제목을 다시 입력해주세요");
    return;
  }

  let isExist = sharedLobbyData.roomList.find((room) => room.title === title);
  if (isExist) {
    showToast("중복된 이름의 방이 있습니다.");
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
      showToast("플레이어 인원 초과");
      return;
    }

    if (!targetRoom.players.includes(nickname)) {
      targetRoom.players.push(nickname);
    }
    myRoomTitle = searchTitle;
    changeScreenMode(2);
  } else {
    showToast("방이 없습니다.");
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
    showToast("방이 존재하지 않습니다.");
    changeScreenMode(1);
    return;
  }

  tryStartRoomGame(currentRoom);

  //2명되면시작
  if (currentRoom.gameStarted && currentRoom.players.length === 2) {
    changeScreenMode(3);
    return;
  }

  exitRoomButton.position(windowWidth / 2 - 45, windowHeight * 0.75);
  exitRoomButton.show();

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

function showGameScreen() {
  let currentRoom = getCurrentRoom();

  if (!currentRoom) {
    showToast("방이 종료되었습니다.");
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
