/*enum으로 screenMode 관리
const screenMode = {
  Title: "0",
  Lobby: "1",
  Room: "2",
  Game: "3",
};
Object.freeze(screenMode);
*/

function changeScreenMode(modeNumber) {
  screenMode = modeNumber;
  if (screenMode === 1) {
    inputNickname.value(nickname);
  }
  hideAllUIElements(); //setupElements.js
}

function screenDetermination() {
  if (screenMode === 0) {
    Background();

    showTitleScreen();
    //showHowToPlayScreen();
  } else if (screenMode === 1) {
    drawMyNickName();
    if (createRoomPopUpOpened) {
      showCreateRoomUI();
    } else if (joinRoomPopUpOpened) {
      showJoinRoomUI();
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
  if (rulePopupOpened === true) {
    drawRulePopup();
  }
}

function Background() {
  push();
  background(138, 43, 226);
  textAlign(CENTER, CENTER);
  textFont("Arial");
  textSize(80);
  fill(40, 10, 70);
  text("CHE:SSU", windowWidth / 2, windowHeight / 2 - 186);
  fill(255);
  text("CHE:SSU", windowWidth / 2, windowHeight / 2 - 190);
  rectMode(CENTER);
  stroke(90, 20, 150);
  strokeWeight(3);
  fill(110, 30, 180);
  rect(windowWidth / 2, windowHeight / 2 + 50, 340, 320, 15);
  textAlign(CENTER, TOP);
  textSize(22);
  fill(255);
  text("닉네임 설정", windowWidth / 2, windowHeight / 2 - 60);
  pop();
}

function showTitleScreen() {
  if (rulePopupOpened === true) {
    inputNickname.hide();
    NicknameSaveButton.hide();
    playButton.hide();
    ruleButtonTitle.hide();
    return;
  }

  inputNickname.position(windowWidth / 2 - 110, windowHeight / 2 - 10);
  inputNickname.show();
  NicknameSaveButton.position(windowWidth / 2 + 40, windowHeight / 2 - 10);
  NicknameSaveButton.show();
  playButton.position(windowWidth / 2 - 110, windowHeight / 2 + 70);
  playButton.show();

  ruleButtonTitle.position(windowWidth / 2 - 110, windowHeight / 2 + 135);
  ruleButtonTitle.show();
}

function showHowToPlayScreen() {
  //image(howToPlayImage[howToPlayPageNumber], 0, 0, windowWidth, windowHeight);
}

function showLobbyScreen() {
  if (rulePopupOpened === true) {
    createRoomButton.hide();
    joinRoomButton.hide();
    ruleButtonLobby.hide();
    inputNickname.hide();
    NicknameSaveButton.hide();
    return;
  }
  createRoomButton.position(width / 2 - 60, height / 2 - 25);
  createRoomButton.show();
  joinRoomButton.position(width / 2 - 60, height / 2 + 35);
  joinRoomButton.show();

  roomTitleInput.hide();
  createCreateButton.hide();
  closePopUpButton.hide();

  inputNickname.position(windowWidth / 2 - 130, 110);
  inputNickname.show();
  NicknameSaveButton.position(windowWidth / 2 + 10, 110);
  NicknameSaveButton.show();

  searchTitleInput.hide();
  joinConfirmButton.hide();
  closeJoinPopUpButton.hide();

  ruleButtonLobby.position(width / 2 - 60, height / 2 + 95);
  ruleButtonLobby.show();
}

function drawRulePopup() {
  push();
  rectMode(CENTER);
  fill(0, 0, 0, 150);
  rect(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
  fill(110, 30, 180);
  stroke(255);
  strokeWeight(3);
  rect(windowWidth / 2, windowHeight / 2, 680, 520, 15);
  imageMode(CENTER);
  if (howToPlayImage[rulePage]) {
    image(
      howToPlayImage[rulePage],
      windowWidth / 2,
      windowHeight / 2,
      640,
      480,
    );
  }
  rulePrevButton.position(windowWidth / 2 - 390, windowHeight / 2 - 20);
  rulePrevButton.show();
  ruleNextButton.position(windowWidth / 2 + 350, windowHeight / 2 - 20);
  ruleNextButton.show();
  ruleCloseButton.position(windowWidth / 2 + 310, windowHeight / 2 - 240);
  ruleCloseButton.show();
  pop();
}

function showCreateRoomUI() {
  createRoomButton.hide();
  joinRoomButton.hide();

  //배경
  push();
  rectMode(CENTER);
  fill(225);
  stroke(0);
  strokeWeight(2);
  rect(windowWidth / 2, windowHeight / 2, 300, 160, 10);
  pop();

  //Elements
  roomTitleInput.position(windowWidth / 2 - 120, windowHeight / 2 - 35);
  roomTitleInput.show();
  createCreateButton.size(80, 30);
  createCreateButton.position(windowWidth / 2 - 40, windowHeight / 2 + 15);
  createCreateButton.show();
  closePopUpButton.position(windowWidth / 2 + 120, windowHeight / 2 - 70);
  closePopUpButton.show();

  //닉네임 UI 유지
  inputNickname.position(windowWidth / 2 - 130, 110);
  NicknameSaveButton.position(windowWidth / 2 + 10, 110);
}

function showJoinRoomUI() {
  createRoomButton.hide();
  joinRoomButton.hide();

  //배경
  push();
  rectMode(CENTER);
  fill(225);
  stroke(0);
  strokeWeight(2);
  rect(windowWidth / 2, windowHeight / 2, 300, 160, 10);
  pop();

  //Elements
  searchTitleInput.position(windowWidth / 2 - 120, windowHeight / 2 - 35);
  searchTitleInput.show();

  joinConfirmButton.size(80, 30);
  joinConfirmButton.position(windowWidth / 2 - 40, windowHeight / 2 + 15);
  joinConfirmButton.show();

  closeJoinPopUpButton.position(windowWidth / 2 + 120, windowHeight / 2 - 70);
  closeJoinPopUpButton.size(25, 25);
  closeJoinPopUpButton.show();

  //닉네임 UI 유지
  inputNickname.position(windowWidth / 2 - 130, 110);
  NicknameSaveButton.position(windowWidth / 2 + 10, 110);
}

function drawMyNickName() {
  push();
  textSize(20);
  fill(0);
  textAlign(CENTER);
  text("내 닉네임: " + nickname, windowWidth / 2, 80);
  pop();
}
