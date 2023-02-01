//globals
let blueToothRXCharacteristic;//this is a blu
let blueToothTXCharacteristic;//this is a blu

let blueTooth;
let isConnected = false;
let connectButton;
let connectedSSID;
let wordclocklogoImg;
let testImg;
let ip;
let otaStatus;
//status variables
let newData=false;
let wifiConnected = false;
let falseWifiCredentials = false;
let firstConnected = true;
//let binFileInput;

function preload() {
  testImg = loadImage('data/trigBoardlogo.png');
  wordclocklogoImg = loadImage('data/wordclockConfLogo.png');
  wordclockImg = loadImage('data/wordclockImg.png');
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

  let yPositionStart = 200;
  wifiTitle = createElement('h3', 'Wifi (2,4 GHz)');
  wifiTitle.position(10, yPositionStart);
  ssidTitle = createElement('h3', 'Name');
  ssidTitle.position(10, wifiTitle.size().height+wifiTitle.y);
  ssidPw = createElement('h3', 'Passwort');
  ssidPw.position(10, ssidTitle.size().height+ssidTitle.y);
  ssidInput = createInput('');
  ssidInput.position(ssidPw.size().width+ssidTitle.x+10, ssidTitle.size().height+ssidTitle.y);
  pwInput = createInput('', 'password');
  pwInput.position(ssidPw.size().width+ssidPw.x+10, ssidPw.size().height+ssidPw.y);  
  WiFiButton = createButton('Connect');
  WiFiButton.position(pwInput.x, pwInput.y+pwInput.size().height+2);
  WiFiButton.mousePressed(saveWiFi);
  WiFiButton.style('color', color(255));
  WiFiButton.style('background-color', color(77, 158, 106));
  //**************************************
  AlexaEnableTitle = createElement('h4', 'Activate Alexa: ');
  AlexaEnableTitle.position(10, WiFiButton.size().height+WiFiButton.y+5);
  AlexaStatusSlider = createSlider(0, 1, 0, 1);
  AlexaStatusSlider.class("AlexaStatusSlider");
  AlexaStatusSlider.position(AlexaEnableTitle.size().width+AlexaEnableTitle.x+10, AlexaEnableTitle.size().height+AlexaEnableTitle.y);
  //**************************************
  OTAButton = createButton('OTA aktivieren');
  OTAButton.position(10, AlexaStatusSlider.y+AlexaStatusSlider.size().height+30);
  OTAButton.mousePressed(activateOTA);
  OTAButton.style('color', color(255));
  OTAButton.style('background-color', color(105, 158, 106));
 //**************************************
  ResetButton = createButton('Reset Uhr');
  ResetButton.position(600, 500);
  ResetButton.style('color', color(255));
  ResetButton.style('background-color', color(208, 93, 73));
  ResetButton.mousePressed(resetCommand);
//Right side*****************************

  createCanvas(1000, OTAButton.y+100);

  hideAllParam();
}

function draw() {
  drawScreen();
}
