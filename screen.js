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
    showTitleScreen();
    showHowToPlayScreen();
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
}

function showTitleScreen() {
  inputNickname.position(windowWidth / 2 - 100, windowHeight / 2 - 30);
  inputNickname.show();

  NicknameSaveButton.position(windowWidth / 2 + 30, windowHeight / 2 - 30);
  NicknameSaveButton.show();

  playButton.position(windowWidth / 2 - 50, windowHeight / 2 + 30);
  playButton.show();
}

function showHowToPlayScreen() {
  //image(howToPlayImage[howToPlayPageNumber], 0, 0, windowWidth, windowHeight);
}

function showLobbyScreen() {
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
