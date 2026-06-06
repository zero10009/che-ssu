function setupElements() {
  //screenMode별 Elements 초기화
  initTitleElements();
  initLobbyElements();
  initCreateRoomPopupElements();
  initJoinRoomPopupElements();
  initGameRoomElements();

  //모든 elements 숨김 처리
  hideAllUIElements();
}

//타이틀
function initTitleElements() {
  playButton = createButton("play");
  playButton.size(90, 40);
  playButton.mousePressed(() => {
    nickname = inputNickname.value();
    changeScreenMode(1);
  });

  NicknameSaveButton = createButton("닉네임 변경");
  NicknameSaveButton.size(90, 40);
  NicknameSaveButton.mousePressed(() => {
    nickname = inputNickname.value();
    showToast("닉네임이 변경되었습니다.");
    inputNickname.value(nickname);
  });
}

function initLobbyElements() {
  inputNickname = createInput("guest");
  inputNickname.size(120, 40);

  createRoomButton = createButton("방 생성");
  createRoomButton.position(windowWidth / 2 - 60, windowHeight / 2 - 25);
  createRoomButton.mousePressed(() => {
    createRoomPopUpOpened = true;
  });

  joinRoomButton = createButton("방 들어가기");
  joinRoomButton.position(windowWidth / 2 - 60, windowHeight / 2 + 35);
  joinRoomButton.mousePressed(() => {
    joinRoomPopUpOpened = true;
  });
}

//
function initCreateRoomPopupElements() {
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
}

// --- 3. 방 입장 팝업 관련 요소 ---
function initJoinRoomPopupElements() {
  searchTitleInput = createInput("입장할 방 제목");
  searchTitleInput.size(240, 30);

  joinConfirmButton = createButton("입장");
  joinConfirmButton.mousePressed(() => {
    let searchTitle = searchTitleInput.value().trim();
    if (searchTitle !== "") {
      joinRoom(searchTitle);
      joinRoomPopUpOpened = false;
    } else {
      showToast("방 제목을 입력하세요.");
    }
  });

  closeJoinPopUpButton = createButton("X");
  closeJoinPopUpButton.mousePressed(() => {
    joinRoomPopUpOpened = false;
  });
}

// --- 4. 게임 방 내부 관련 요소 ---
function initGameRoomElements() {
  readyButton = createButton("준비");
  kickButton = createButton("강퇴");
  changeHostButton = createButton("방장 위임");
  startButton = createButton("시작");

  exitRoomButton = createButton("나가기");
  exitRoomButton.size(90, 40);
  exitRoomButton.mousePressed(() => {
    leaveAndDestroyRoom();
  });
}

// --- 5. 전체 UI 숨김 처리 ---
function hideAllUIElements() {
  selectAll("button").forEach((btn) => btn.hide());
  selectAll("input").forEach((inp) => inp.hide());
}
