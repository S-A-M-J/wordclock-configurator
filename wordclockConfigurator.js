//globals
let blueToothRXCharacteristic;//this is a blu
let blueToothTXCharacteristic;//this is a blu

let blueTooth;
let isConnected = false;
let connectButton;

let wordclocklogoImg;
let testImg;
//status variables
let newData=false;
let wifiConnected = false;
let falseWifiCredentials = false;
let firstConnected = true;
//let binFileInput;

function preload() {
  testImg = loadImage('data/trigBoardlogo.png');
  wordclocklogoImg = loadImage('data/wordclockConfLogo.png');
}

function setup() {

  // Create a p5ble class
  console.log("setting up");
  blueTooth = new p5ble();

  connectButton = createButton('CONNECT');
  connectButton.mousePressed(connectToBle);
  connectButton.position(15, 250);
  connectButton.style('color', color(255));
  connectButton.style('background-color', color(77, 158, 106));

  LEDblinkStartTime=millis();

  killButton = createButton('DISCONNECT');
  killButton.position(15, 250);
  killButton.style('color', color(255));
  killButton.style('background-color', color(208, 93, 73));
  killButton.mousePressed(killCommand);

  //espotaButton = createButton('espota');
  //espotaButton.position(380, 300);
  //espotaButton.style('color', color(255));
  //espotaButton.style('background-color', color(62, 129, 182));
  //espotaButton.mousePressed(espotacommand);
  ////binFileInput = createFileInput(handleFile);
  ////binFileInput.position(380, 320);

  let yPositionStart = 300;
  ssidTitle = createElement('h3', 'WiFi SSID (2.4GHz)');
  ssidTitle.position(10, yPositionStart);
  ssidInput = createInput('');
  ssidInput.position(ssidTitle.size().width+ssidTitle.x+10, ssidTitle.size().height+ssidTitle.y);

  ssidPw = createElement('h3', 'WiFi Password');
  ssidPw.position(10, ssidTitle.size().height+ssidTitle.y);
  pwInput = createInput('', 'password');
  pwInput.position(ssidPw.size().width+ssidPw.x+10, ssidPw.size().height+ssidPw.y);  
  WiFiButton = createButton('Save and Connect with DHCP');
  WiFiButton.position(pwInput.x+pwInput.width, pwInput.y);
  WiFiButton.mousePressed(saveWiFi);
  //**************************************

  createCanvas(600, WiFiButton.y+100);

  hideAllParam();
}


function draw() {
  drawScreen();
}