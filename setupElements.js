function setupElements() {
  //screenMode별 Elements 초기화
  initTitleElements();
  initLobbyElements();
  initCreateRoomPopupElements();
  initJoinRoomPopupElements();
  initGameRoomElements();

  initRulePopupElements();

  //모든 elements 숨김 처리
  hideAllUIElements();
}

//타이틀
function initTitleElements() {
  playButton = createButton("시작하기");
  playButton.size(220, 50);
  playButton.style("background-color", "#ffffff");
  playButton.style("color", "#8a4be2");
  playButton.style("font-size", "20px");
  playButton.style("border", "none");
  playButton.style("border-radius", "25px");
  playButton.style("cursor", "pointer");
  playButton.style("box-shadow", "0px 4px 0px #d8bfd8");

  playButton.mousePressed(() => {
    nickname = inputNickname.value();
    changeScreenMode(1);
  });

  NicknameSaveButton = createButton("변경");
  NicknameSaveButton.size(70, 45);
  NicknameSaveButton.style("background-color", "#5a1ea0");
  NicknameSaveButton.style("color", "#ffffff");
  NicknameSaveButton.style("font-size", "15px");
  NicknameSaveButton.style("border", "2px solid #ffffff");
  NicknameSaveButton.style("border-radius", "0px 10px 10px 0px");
  NicknameSaveButton.style("cursor", "pointer");

  NicknameSaveButton.mousePressed(() => {
    nickname = inputNickname.value();
    showToast("닉네임이 변경되었습니다.");
    inputNickname.value(nickname);
  });
  ruleButtonTitle = createButton("게임 방법");
  ruleButtonTitle.size(220, 50);
  ruleButtonTitle.style("background-color", "#ffffff");
  ruleButtonTitle.style("color", "#8a4be2");
  ruleButtonTitle.style("font-size", "20px");
  ruleButtonTitle.style("border", "none");
  ruleButtonTitle.style("border-radius", "25px");
  ruleButtonTitle.style("cursor", "pointer");
  ruleButtonTitle.style("box-shadow", "0px 4px 0px #d8bfd8");
  ruleButtonTitle.mousePressed(() => {
    rulePopupOpened = true;
    rulePage = 1;
  });
}

function initLobbyElements() {
  inputNickname = createInput("GUEST_" + floor(random(1000, 9999)));
  inputNickname.size(125, 40);
  inputNickname.style("background-color", "#ffffff");
  inputNickname.style("color", "#000000");
  inputNickname.style("border", "2px solid #ffffff");
  inputNickname.style("border-radius", "10px 0px 0px 10px");
  inputNickname.style("padding-left", "15px");
  inputNickname.style("font-size", "16px");

  createRoomButton = createButton("방 생성");
  createRoomButton.position(windowWidth / 2 - 60, windowHeight / 2 - 25);
  createRoomButton.mousePressed(() => {
    createRoomPopUpOpened = true;
  });

  creditButton = createButton("크레딧");
  creditButton.size(120, 40);
  creditButton.mousePressed(() => {
    creditOpened = true;
    hideAllUIElements();
  });

  closeCreditButton = createButton("X");
  closeCreditButton.size(25, 25);
  closeCreditButton.mousePressed(() => {
    creditOpened = false;
    hideAllUIElements();
  });

  joinRoomButton = createButton("방 들어가기");
  joinRoomButton.position(windowWidth / 2 - 60, windowHeight / 2 + 35);
  joinRoomButton.mousePressed(() => {
    joinRoomPopUpOpened = true;
  });
  ruleButtonLobby = createButton("게임 방법");
  ruleButtonLobby.size(120, 40);
  ruleButtonLobby.style("background-color", "#ffffff");
  ruleButtonLobby.style("color", "#8a4be2");
  ruleButtonLobby.style("font-size", "16px");
  ruleButtonLobby.style("border", "none");
  ruleButtonLobby.style("border-radius", "20px");
  ruleButtonLobby.style("cursor", "pointer");
  ruleButtonLobby.style("box-shadow", "0px 3px 0px #d8bfd8");
  ruleButtonLobby.mousePressed(() => {
    rulePopupOpened = true;
    rulePage = 1;
  });
}

function initRulePopupElements() {
  rulePrevButton = createButton("<");
  rulePrevButton.size(40, 40);
  rulePrevButton.style("background-color", "#ffffff");
  rulePrevButton.style("color", "#8a4be2");
  rulePrevButton.style("font-size", "20px");
  rulePrevButton.style("border", "none");
  rulePrevButton.style("border-radius", "20px");
  rulePrevButton.style("cursor", "pointer");
  rulePrevButton.mousePressed(() => {
    if (rulePage > 1) {
      rulePage--;
    }
  });
  ruleNextButton = createButton(">");
  ruleNextButton.size(40, 40);
  ruleNextButton.style("background-color", "#ffffff");
  ruleNextButton.style("color", "#8a4be2");
  ruleNextButton.style("font-size", "20px");
  ruleNextButton.style("border", "none");
  ruleNextButton.style("border-radius", "20px");
  ruleNextButton.style("cursor", "pointer");
  ruleNextButton.mousePressed(() => {
    if (rulePage < 8) {
      rulePage++;
    }
  });
  ruleCloseButton = createButton("X");
  ruleCloseButton.size(30, 30);
  ruleCloseButton.style("background-color", "#5a1ea0");
  ruleCloseButton.style("color", "#ffffff");
  ruleCloseButton.style("font-size", "15px");
  ruleCloseButton.style("border", "2px solid #ffffff");
  ruleCloseButton.style("border-radius", "15px");
  ruleCloseButton.style("cursor", "pointer");
  ruleCloseButton.mousePressed(() => {
    rulePopupOpened = false;
    rulePrevButton.hide();
    ruleNextButton.hide();
    ruleCloseButton.hide();
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
