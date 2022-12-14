
function drawScreen() {
  textSize(18);
  textAlign(LEFT, TOP);
  background(255);
  fill(0);
  image(wordclocklogoImg, 0, 0);
  if (isConnected) {
    //text('Bluetooth Connected :)', 10, 140);
    if (newData) {
      noStroke();
      if (millis()-LEDblinkStartTime < 200) {
        fill(71, 134, 222, 150);//LED flasher
        rect(243, 520, 13, 20);
      }
      if (millis()-LEDblinkStartTime > 400) {
        LEDblinkStartTime=millis();
      }

      fill(0);

      textAlign(CENTER, TOP);

      if (wifiConnected) {
        textSize(14);
        fill(0, 255, 0);
        text('WiFi\nConnected\n'+connectedSSID+'\n'+ip+'\n'+otaStatus, 250, 250);
        text
      } else {
        fill(255, 0, 0);
        text('WiFi\nDisconnected', 250, 250);
      }
      if(falseWifiCredentials){
        fill(255, 0, 0);
        text('Wifi name or password is false.', 250, 250);
      }
      textSize(18);
      fill(0);
      
    }
  } else {
    //text('Bluetooth Disconnected :/', 80, 150);
    newData=false;
  }
}
