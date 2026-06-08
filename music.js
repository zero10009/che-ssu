function bgmplay(){
  if(!(bgm.isPlaying())) bgm.play();
}

function killplay(){
  breakSound.play();
}

function setup(){
  createCanvas(0);
  bgmplay();
}
