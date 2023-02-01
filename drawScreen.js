
let wordclockImgPosX = 500;

function drawScreen() {
  textSize(18);
  textAlign(LEFT, TOP);
  background(255);
  fill(0);
  image(wordclocklogoImg, 0, 0);
  if (isConnected) {
    //text('Bluetooth Connected :)', 10, 140);
    if (newData) {
      image(wordclockImg, wordclockImgPosX, 200, 200, 200);
      fill(0);

      textAlign(LEFT, TOP);

      if (wifiConnected) {
        textSize(14);
        fill(0, 255, 0);
        text('WiFi Connected\n');
        fill(0,0,0);
        text('WiFi Name: '+connectedSSID+'\n'+'IP: '+ip+'\n', wordclockImgPosX, 420);
      } else {
        fill(255, 0, 0);
        text('WiFi\nDisconnected', wordclockImgPosX, 420);
      }
      if(falseWifiCredentials){
        fill(255, 0, 0);
        text('Wifi name or password is false.', wordclockImgPosX, 420);
      }
      textSize(18);
      fill(0);
      
    }
  } else {
    //text('Bluetooth Disconnected :/', 80, 150);
    newData=false;
  }
}
