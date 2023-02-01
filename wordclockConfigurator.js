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
let newData = false;
let wifiConnected = false;
let falseWifiCredentials = false;
let firstConnected = true;
let lastSliderStatus = 0;
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
  ssidTitle = createElement('h4', 'Name');
  ssidTitle.position(10, wifiTitle.size().height + wifiTitle.y + 5);
  ssidPw = createElement('h4', 'Passwort');
  ssidPw.position(10, ssidTitle.size().height + ssidTitle.y);
  ssidInput = createInput('');
  ssidInput.position(ssidPw.size().width + ssidTitle.x + 10, ssidTitle.size().height + ssidTitle.y);
  pwInput = createInput('', 'password');
  pwInput.position(ssidPw.size().width + ssidPw.x + 10, ssidPw.size().height + ssidPw.y);
  WiFiButton = createButton('Verbinden');
  WiFiButton.position(pwInput.x, pwInput.y + pwInput.size().height + 2);
  WiFiButton.mousePressed(saveWiFi);
  WiFiButton.style('color', color(255));
  WiFiButton.style('background-color', color(77, 158, 106));
  //**************************************
  AlexaEnableTitle = createElement('h3', 'Alexa: ');
  AlexaEnableTitle.position(10, WiFiButton.size().height + WiFiButton.y + 5);
  AlexaOnTitle = createElement('h4', 'OFF');
  AlexaOnTitle.position(10, AlexaEnableTitle.size().height + AlexaEnableTitle.y + 5);
  AlexaStatusSlider = createSlider(0, 1, 0, 1);
  AlexaStatusSlider.class("AlexaStatusSlider");
  AlexaStatusSlider.position(AlexaOnTitle.size().width + AlexaOnTitle.x + 5, AlexaOnTitle.y + 17);
  AlexaOffTitle = createElement('h4', 'ON');
  AlexaOffTitle.position(AlexaStatusSlider.x + AlexaStatusSlider.size().width + 5, AlexaOnTitle.y);
  //**************************************
  ColorPickerTitle = createElement('h3', 'Farbe auswählen');
  ColorPickerTitle.position(10, AlexaOnTitle.y + AlexaOnTitle.size().height + 50);
  colorMode(HSB);
  ColorPicker = createColorPicker();
  ColorPicker.position(10, ColorPickerTitle.y + ColorPickerTitle.size().height + 5 + ColorPicker.size().height);
  ColorPicker.input(colorChanged);
  colorMode(RGB);
  //**************************************
  OTATitle = createElement('h3', 'Firware update');
  OTATitle.position(10, ColorPicker.y + ColorPicker.size().height + 30);
  OTAButton = createButton('OTA aktivieren');
  OTAButton.position(10, OTATitle.y + OTATitle.size().height * 2);
  OTAButton.mousePressed(activateOTA);
  OTAButton.style('color', color(255));
  OTAButton.style('background-color', color(0, 0, 255));
  //**************************************
  ResetButton = createButton('Reset Uhr');
  ResetButton.position(wordclockImgPosX, 480);
  ResetButton.style('color', color(255));
  ResetButton.style('background-color', color(208, 93, 73));
  ResetButton.mousePressed(resetCommand);
  //****************************************
  DebugInput = createInput('');
  DebugInput.position(10, OTAButton.y + OTAButton.size().height + 30);
  DebugButton = createButton('Send BLE data');
  DebugButton.position(10, DebugInput.y + DebugInput.size().height + 5);
  DebugButton.style('color', color(255));
  DebugButton.style('background-color', color(208, 93, 73));
  DebugButton.mousePressed(sendDebugData);


  createCanvas(1000, DebugButton.y + 100);

  hideAllParam();
}

function draw() {
  drawScreen();
}
