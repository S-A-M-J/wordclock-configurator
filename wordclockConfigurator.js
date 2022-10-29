//globals
let blueToothRXCharacteristic;//this is a blu
let blueToothTXCharacteristic;//this is a blu

let blueTooth;
let isConnected = false;
let connectButton;

let wordclocklogoImg;
//status variables
let newData=false;
let wifiConnected = false;
let batteryVoltage=0.0;
let contactOpen = false;
let buttonPressed = false;
let LEDblinkStartTime;
let OTAinProgress=" ";
let OTAisActive = false;
let firstConnected = true;
let udpEnabled = false;
let tcpEnabled = false;
//let binFileInput;

function preload() {
  wordclocklogoImg = loadImage('data/wordclock_conf_logo.png');
}

function setup() {

  // Create a p5ble class
  console.log("setting up");
  blueTooth = new p5ble();

  connectButton = createButton('CONNECT');
  connectButton.mousePressed(connectToBle);
  connectButton.position(15, 150);
  connectButton.style('color', color(255));
  connectButton.style('background-color', color(77, 158, 106));

  LEDblinkStartTime=millis();

  killButton = createButton('DISCONNECT');
  killButton.position(15, 150);
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

  let yPositionStart = 600;
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
  wifiTimeoutTitle = createElement('h4', 'WiFi Timeout (seconds 1-60)');
  wifiTimeoutTitle.position(10, WiFiButton.size().height+WiFiButton.y+5);
  wifiTimeoutInput = createInput('');
  wifiTimeoutInput.size(30);
  wifiTimeoutInput.position(wifiTimeoutTitle.size().width+wifiTimeoutTitle.x+10, wifiTimeoutTitle.size().height+wifiTimeoutTitle.y);  
  wifiTimeoutButton = createButton('Save');
  wifiTimeoutButton.position(wifiTimeoutInput.x+wifiTimeoutInput.width, wifiTimeoutInput.y);
  wifiTimeoutButton.mousePressed(wifiTimeoutCommand);
  //**************************************
  wordclockNameTitle = createElement('h4', 'wordclock Name');
  wordclockNameTitle.position(10, wifiTimeoutTitle.size().height+wifiTimeoutTitle.y+5);
  wordclockNameInput = createInput('');
  wordclockNameInput.position(wordclockNameTitle.size().width+wordclockNameTitle.x+10, wordclockNameTitle.size().height+wordclockNameTitle.y);  
  wordclockNameButton = createButton('Save');
  wordclockNameButton.position(wordclockNameInput.x+wordclockNameInput.width, wordclockNameInput.y);
  wordclockNameButton.mousePressed(wordclockNameCommand);
  //**************************************
  highSpeedEnableTitle = createElement('h4', 'High Speed Trigger: ');
  highSpeedEnableTitle.position(10, wordclockNameTitle.size().height+wordclockNameTitle.y+5);
  highSpeedEnableCheckbox = createCheckbox('', false);
  highSpeedEnableCheckbox.position(highSpeedEnableTitle.size().width+highSpeedEnableTitle.x+10, highSpeedEnableTitle.size().height+highSpeedEnableTitle.y);
  highSpeedEnableButton = createButton('Save');
  highSpeedEnableButton.position(highSpeedEnableTitle.size().width+highSpeedEnableTitle.x+40, highSpeedEnableTitle.size().height+highSpeedEnableTitle.y);
  highSpeedEnableButton.mousePressed(highSpeedCommand);
  //**************************************
  timerUnitTitle = createElement('h4', 'Timer Units: ');
  timerUnitTitle.position(10, highSpeedEnableTitle.size().height+highSpeedEnableTitle.y+5);
  timerUnitSelector = createSelect();
  timerUnitSelector.position(timerUnitTitle.x+timerUnitTitle.size().width+10, timerUnitTitle.size().height+timerUnitTitle.y);
  timerUnitSelector.option('Minutes');
  timerUnitSelector.option('Seconds');
  timerUnitSelectorButton = createButton('Save');
  timerUnitSelectorButton.position(timerUnitSelector.x+timerUnitSelector.width+50, timerUnitSelector.y);
  timerUnitSelectorButton.mousePressed(timerUnitSelectorCommand);
  //**************************************
  timerTitle = createElement('h4', 'Timer Wake Time (1-255)');
  timerTitle.position(10, timerUnitTitle.size().height+timerUnitTitle.y+5);
  timerInput = createInput('');
  timerInput.size(50);
  timerInput.position(timerTitle.size().width+timerTitle.x+10, timerTitle.size().height+timerTitle.y);  
  timerButton = createButton('Save');
  timerButton.position(timerInput.x+timerInput.width, timerInput.y);
  timerButton.mousePressed(timerCommand);
  //**************************************
  timerSelectionTitle = createElement('h4', 'Timer Checks for Lo-Battery and: ');
  timerSelectionTitle.position(10, timerTitle.size().height+timerTitle.y+5);
  timerSelector = createSelect();
  timerSelector.position(timerSelectionTitle.x+timerSelectionTitle.size().width+10, timerSelectionTitle.size().height+timerSelectionTitle.y);
  timerSelector.option('Nothing');
  timerSelector.option('Contact Still Closed');
  timerSelector.option('Contact Still Open');
  timerSelector.option('Either Contact');
  timerSelectorButton = createButton('Save');
  timerSelectorButton.position(timerSelector.x+timerSelector.width+100, timerSelector.y);
  timerSelectorButton.mousePressed(timerSelectorCommand);
  //**************************************
  timerStillOpenTitle = createElement('h4', 'Timer Message for Contact still Open:');
  timerStillOpenTitle.position(10, timerSelectionTitle.size().height+timerSelectionTitle.y+5);
  timerStillOpenInput = createInput('');
  timerStillOpenInput.position(timerStillOpenTitle.size().width+timerStillOpenTitle.x+10, timerStillOpenTitle.size().height+timerStillOpenTitle.y);  
  timerStillOpenButton = createButton('Save');
  timerStillOpenButton.position(timerStillOpenInput.x+timerStillOpenInput.width, timerStillOpenInput.y);
  timerStillOpenButton.mousePressed(timerStillOpenCommand);
  //**************************************
  timerStillClosedTitle = createElement('h4', 'Timer Message for Contact still Closed:');
  timerStillClosedTitle.position(10, timerStillOpenTitle.size().height+timerStillOpenTitle.y+5);
  timerStillClosedInput = createInput('');
  timerStillClosedInput.position(timerStillClosedTitle.size().width+timerStillClosedTitle.x+10, timerStillClosedTitle.size().height+timerStillClosedTitle.y);  
  timerStillClosedButton = createButton('Save');
  timerStillClosedButton.position(timerStillClosedInput.x+timerStillClosedInput.width, timerStillClosedInput.y);
  timerStillClosedButton.mousePressed(timerStillClosedCommand);
  //**************************************
  clockTimerEnableTitle = createElement('h4', 'Clock Enable: (supported in FW 8/16/21 or newer)');
  clockTimerEnableTitle.position(10, timerStillClosedTitle.size().height+timerStillClosedTitle.y+5);
  clockTimerEnableCheckbox = createCheckbox('', false);
  clockTimerEnableCheckbox.position(clockTimerEnableTitle.size().width+clockTimerEnableTitle.x+10, clockTimerEnableTitle.size().height+clockTimerEnableTitle.y);
  clockTimerEnableButton = createButton('Save');
  clockTimerEnableButton.position(clockTimerEnableTitle.size().width+clockTimerEnableTitle.x+40, clockTimerEnableTitle.size().height+clockTimerEnableTitle.y);
  clockTimerEnableButton.mousePressed(clockTimerEnableCommand);
  clockCurrentTime = createElement('h4', 'Current Value: 00:00:00 mm/dd/yy');
  clockCurrentTime.position(20, clockTimerEnableTitle.size().height+clockTimerEnableTitle.y+5);
  clockCurrentTime.id('currentTimeID');
  clockTimeZoneTitle = createElement('h4', 'Timezone Offset ex. -5 for EST: ');
  clockTimeZoneTitle.position(20, clockCurrentTime.size().height+clockCurrentTime.y+5);
  clockTimeZone = createInput('');
  clockTimeZone.size(40);
  clockTimeZone.position(clockTimeZoneTitle.size().width+clockTimeZoneTitle.x+10, clockTimeZoneTitle.size().height+clockTimeZoneTitle.y);  
  clockTimeZoneButton = createButton('Save');
  clockTimeZoneButton.position(clockTimeZone.x+clockTimeZone.width, clockTimeZone.y);
  clockTimeZoneButton.mousePressed(clockTimeZoneButtonCommand);
  clockSetTimeNTPtitle = createElement('h4', 'Set Time with NTP server');
  clockSetTimeNTPtitle.id('clockSetTimeNTPtitleID');
  clockSetTimeNTPtitle.position(20, clockTimeZoneTitle.size().height+clockTimeZoneTitle.y+5);
  clockSetTimeButton = createButton('Set');
  clockSetTimeButton.position(clockSetTimeNTPtitle.x+clockSetTimeNTPtitle.size().width+10, clockSetTimeNTPtitle.y+clockSetTimeNTPtitle.size().height);
  clockSetTimeButton.mousePressed(clockSetTimeNTPCommand);
  clockAppendTitle = createElement('h4', 'Append Time to Push Messages: ');
  clockAppendTitle.position(20, clockSetTimeNTPtitle.size().height+clockSetTimeNTPtitle.y+5);
  clockAppendCheckbox = createCheckbox('', false);
  clockAppendCheckbox.position(clockAppendTitle.size().width+clockAppendTitle.x+10, clockAppendTitle.size().height+clockAppendTitle.y);
  clockAppendButton = createButton('Save');
  clockAppendButton.position(clockAppendTitle.size().width+clockAppendTitle.x+40, clockAppendTitle.size().height+clockAppendTitle.y);
  clockAppendButton.mousePressed(clockAppendCommand);  
  clockAlarmEnableTitle = createElement('h4', 'Daily Alarm Wake Enable: ');
  clockAlarmEnableTitle.position(20, clockAppendTitle.size().height+clockAppendTitle.y+5);
  clockAlarmEnableCheckbox = createCheckbox('', false);
  clockAlarmEnableCheckbox.position(clockAlarmEnableTitle.size().width+clockAlarmEnableTitle.x+10, clockAlarmEnableTitle.size().height+clockAlarmEnableTitle.y);
  clockAlarmEnableButton = createButton('Save');
  clockAlarmEnableButton.position(clockAlarmEnableTitle.size().width+clockAlarmEnableTitle.x+40, clockAlarmEnableTitle.size().height+clockAlarmEnableTitle.y);
  clockAlarmEnableButton.mousePressed(clockAlarmEnableCommand); 
  clockAlarmSettingTitle = createElement('h4', 'Alarm Setting in 24hr format hh:mm');
  clockAlarmSettingTitle.position(30, clockAlarmEnableTitle.size().height+clockAlarmEnableTitle.y+5);
  clockAlarmHour = createInput('');
  clockAlarmHour.size(40);
  clockAlarmHour.position(50, clockAlarmSettingTitle.size().height+clockAlarmSettingTitle.y+25);  
  clockAlarmMinute = createInput('');
  clockAlarmMinute.size(40);
  clockAlarmMinute.position(clockAlarmHour.size().width+clockAlarmHour.x+10, clockAlarmSettingTitle.size().height+clockAlarmSettingTitle.y+25);  
  clockAlarmButton = createButton('Save');
  clockAlarmButton.position(clockAlarmMinute.x+clockAlarmMinute.width+5, clockAlarmMinute.y);
  clockAlarmButton.mousePressed(clockAlarmButtonCommand);
  clockNTPupdateonAlarmTitle = createElement('h4', 'Update Time with NTP Server on every Alarm Wake: ');
  clockNTPupdateonAlarmTitle.position(30, clockAlarmHour.y+5);
  clockNTPupdateonAlarmCheckbox = createCheckbox('', false);
  clockNTPupdateonAlarmCheckbox.position(clockNTPupdateonAlarmTitle.size().width+clockNTPupdateonAlarmTitle.x+10, clockNTPupdateonAlarmTitle.size().height+clockNTPupdateonAlarmTitle.y);
  clockNTPupdateonAlarmButton = createButton('Save');
  clockNTPupdateonAlarmButton.position(clockNTPupdateonAlarmTitle.size().width+clockNTPupdateonAlarmTitle.x+40, clockAlarmEnableTitle.size().height+clockNTPupdateonAlarmTitle.y);
  clockNTPupdateonAlarmButton.mousePressed(clockNTPupdateonAlarmCommand); 
  clockAlarmMessageTitle = createElement('h4', 'Alarm Wake Message: ');
  clockAlarmMessageTitle.position(30, clockNTPupdateonAlarmTitle.size().height+clockNTPupdateonAlarmTitle.y+5);
  clockAlarmMessage = createInput('');
  //clockAlarmMessage.size(40);
  clockAlarmMessage.position(clockAlarmMessageTitle.size().width+clockAlarmMessageTitle.x+10, clockAlarmMessageTitle.size().height+clockAlarmMessageTitle.y);  
  clockAlarmMessageButton = createButton('Save');
  clockAlarmMessageButton.position(clockAlarmMessage.x+clockAlarmMessage.width, clockAlarmMessage.y);
  clockAlarmMessageButton.mousePressed(clockAlarmMessageButtonCommand);
  clockAppendAlarmTitle = createElement('h4', 'Append Time to Alarm Message: ');
  clockAppendAlarmTitle.position(30, clockAlarmMessageTitle.size().height+clockAlarmMessageTitle.y+5);
  clockAppendAlarmCheckbox = createCheckbox('', false);
  clockAppendAlarmCheckbox.position(clockAppendAlarmTitle.size().width+clockAppendAlarmTitle.x+10, clockAppendAlarmTitle.size().height+clockAppendAlarmTitle.y);
  clockAppendAlarmButton = createButton('Save');
  clockAppendAlarmButton.position(clockAppendAlarmTitle.size().width+clockAppendAlarmTitle.x+40, clockAppendAlarmTitle.size().height+clockAppendAlarmTitle.y);
  clockAppendAlarmButton.mousePressed(clockAppendAlarmCommand); 
  //**************************************
  appendRSSIenableTitle = createElement('h4', 'Append RSSI (Signal Strength) to Push Message: (supported in FW 11/29/21 or newer)');
  appendRSSIenableTitle.position(10, clockAppendAlarmTitle.size().height+clockAppendAlarmTitle.y+5);
  appendRSSIenableCheckbox = createCheckbox('', false);
  appendRSSIenableCheckbox.position(appendRSSIenableTitle.size().width+appendRSSIenableTitle.x+10, appendRSSIenableTitle.size().height+appendRSSIenableTitle.y);
  appendRSSIenableButton = createButton('Save');
  appendRSSIenableButton.position(appendRSSIenableTitle.size().width+appendRSSIenableTitle.x+40, appendRSSIenableTitle.size().height+appendRSSIenableTitle.y);
  appendRSSIenableButton.mousePressed(appendRSSIenableCommand); 
  //**************************************
  missionCriticalEnableTitle = createElement('h4', 'Mission Critical Check: (supported in FW 11/29/21 or newer)');
  missionCriticalEnableTitle.position(10, appendRSSIenableTitle.size().height+appendRSSIenableTitle.y+5);
  missionCriticalEnableCheckbox = createCheckbox('', false);
  missionCriticalEnableCheckbox.position(missionCriticalEnableTitle.size().width+missionCriticalEnableTitle.x+10, missionCriticalEnableTitle.size().height+missionCriticalEnableTitle.y);
  missionCriticalEnableButton = createButton('Save');
  missionCriticalEnableButton.position(missionCriticalEnableTitle.size().width+missionCriticalEnableTitle.x+40, missionCriticalEnableTitle.size().height+missionCriticalEnableTitle.y);
  missionCriticalEnableButton.mousePressed(missionCriticalEnableCommand); 
  missionCriticalTimeTitle = createElement('h4', 'Seconds (1-60) to verify contact after wake');
  missionCriticalTimeTitle.position(30, missionCriticalEnableTitle.size().height+missionCriticalEnableTitle.y+5);
  missionCriticalTimeInput = createInput('');
  missionCriticalTimeInput.size(50);
  missionCriticalTimeInput.position(missionCriticalTimeTitle.size().width+missionCriticalTimeTitle.x+10, missionCriticalTimeTitle.size().height+missionCriticalTimeTitle.y);  
  missionCriticalTimeButton = createButton('Save');
  missionCriticalTimeButton.position(missionCriticalTimeInput.x+missionCriticalTimeInput.width, missionCriticalTimeInput.y);
  missionCriticalTimeButton.mousePressed(missionCriticalTimeCommand);

  createCanvas(600, missionCriticalTimeInput.y+100);


  hideAllParam();
}


function draw() {
  drawScreen();
}