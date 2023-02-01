
function drawScreen() {
  textSize(18);
  textAlign(LEFT, TOP);
  background(255);
  fill(0);
  image(wordclocklogoImg, 0, 0);
  if (isConnected) {
    //text('Bluetooth Connected :)', 10, 140);
    if (newData) {
      image(wordclockImg, 20, 200);
      fill(0);

      textAlign(CENTER, Right);

      if (wifiConnected) {
        textSize(14);
        fill(0, 255, 0);
        text('WiFi\nConnected\n'+connectedSSID+'\n'+ip+'\n'+otaStatus, 500, 500);
        text
      } else {
        fill(255, 0, 0);
        text('WiFi\nDisconnected', 500, 500);
      }
      if(falseWifiCredentials){
        fill(255, 0, 0);
        text('Wifi name or password is false.', 500, 500);
      }
      textSize(18);
      fill(0);
      
    }
  } else {
    //text('Bluetooth Disconnected :/', 80, 150);
    newData=false;
  }
}
