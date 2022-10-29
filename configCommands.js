//ALL DATA SENT OUT FROM THE GUI TOO THE BOARD HERE

// to sanitize strings **********
function checkUserString(userString, lengthCheck) {
  if (match(userString, "#") != null || match(userString, ",") != null) {
    return 'error no # or comma';
  }
  if (userString.length >=lengthCheck) {
    return 'error too long';
  }
  return null;
}

function checkUserIPaddress(userIP) {
  let splitNumbers = split(userIP, '.');
  if (splitNumbers.length>4 || splitNumbers.length<4) {
    return 'error not valid';
  }
  for (let i=0; i<4; i++) {
    if (isNaN(splitNumbers[i])) {
      return 'error not valid';
    }
    if (splitNumbers[i]>255 || splitNumbers[i]<0) {
      return 'error not valid';
    }
  }
  return null;
}
//******************

function appendRSSIenableCommand() {
  if (appendRSSIenableCheckbox.checked()) {
    sendData("#rssien");
  } else {
    sendData("#rssidi");
  }
}

function missionCriticalEnableCommand() {
  if (missionCriticalEnableCheckbox.checked()) {
    sendData("#missionen");
  } else {
    sendData("#missiondi");
  }
}

function missionCriticalTimeCommand() {
  let sanitizer = checkUserString(missionCriticalTimeInput.value(), 3);
  if (sanitizer!=null) {
    missionCriticalTimeInput.value("err");
    return;
  }
  if (isNaN(missionCriticalTimeInput.value())) {
    missionCriticalTimeInput.value("err");
    return;
  }
  if (missionCriticalTimeInput.value() > 60 || missionCriticalTimeInput.value() <=0) {
    missionCriticalTimeInput.value("err");
    return;
  }
  sendData("#tmiss,"+missionCriticalTimeInput.value());
}


function clockTimerEnableCommand() {
  if (clockTimerEnableCheckbox.checked()) {
    sendData("#clken");
  } else {
    sendData("#clkdi");
  }
}
function clockTimeZoneButtonCommand() {
  let sanitizer = checkUserString(clockTimeZone.value(), 5);
  if (sanitizer!=null) {
    clockTimeZone.value("err");
    return;
  }
  if (isNaN(clockTimeZone.value())) {
    clockTimeZone.value("err");
    return;
  }
  if (clockTimeZone.value() > 14 || clockTimeZone.value() <-12) {
    clockTimeZone.value("err");
    return;
  }
  sendData("#clkzn,"+clockTimeZone.value());
}
function clockSetTimeNTPCommand() {
  document.getElementById("currentTimeID").innerHTML = "PLEASE WAIT... GETTING TIME";
  sendData("#clkNTPset,");
}
function clockAppendCommand() {
  if (clockAppendCheckbox.checked()) {
    sendData("#clkappen");
  } else {
    sendData("#clkappdi");
  }
}
function clockAppendAlarmCommand() {
  if (clockAppendAlarmCheckbox.checked()) {
    sendData("#clkalmappen");
  } else {
    sendData("#clkalmappdi");
  }
}
function clockAlarmEnableCommand() {
  if (clockAlarmEnableCheckbox.checked()) {
    sendData("#clkalmen");
  } else {
    sendData("#clkalmdi");
  }
}
function clockAlarmButtonCommand() {
  let sanitizer = checkUserString(clockAlarmHour.value(), 5);
  if (sanitizer!=null) {
    clockAlarmHour.value("err");
    return;
  }
  if (isNaN(clockAlarmHour.value())) {
    clockAlarmHour.value("err");
    return;
  }
  if (clockAlarmHour.value() > 23 || clockAlarmHour.value() <0) {
    clockAlarmHour.value("err");
    return;
  }

  sanitizer = checkUserString(clockAlarmMinute.value(), 5);
  if (sanitizer!=null) {
    clockAlarmMinute.value("err");
    return;
  }
  if (isNaN(clockAlarmMinute.value())) {
    clockAlarmMinute.value("err");
    return;
  }
  if (clockAlarmMinute.value() > 59 || clockAlarmMinute.value() <0) {
    clockAlarmMinute.value("err");
    return;
  }
  sendData("#clkalmtim,"+clockAlarmHour.value() + "," + clockAlarmMinute.value());
}
function clockNTPupdateonAlarmCommand() {
  if (clockNTPupdateonAlarmCheckbox.checked()) {
    sendData("#clkNTPen");
  } else {
    sendData("#clkNTPdi");
  }
}
function clockAlarmMessageButtonCommand() {
  let sanitizer = checkUserString(clockAlarmMessage.value(), 50);
  if (sanitizer!=null) {
    clockAlarmMessage.value(sanitizer);
    return;
  }
  sendData("#clkalarMsg,"+clockAlarmMessage.value());
}

function saveWiFi() {
  let sanitizer = checkUserString(ssidInput.value(), 50);
  if (sanitizer!=null) {
    ssidInput.value(sanitizer);
    return;
  }
  sanitizer = checkUserString(pwInput.value(), 50);
  if (sanitizer!=null) {
    ssidInput.value(sanitizer);
    return;
  }
  if (pwInput.value().length <8) {
    ssidInput.value('error pw too short');
    return;
  }
  sendData("#wifi,"+ssidInput.value() + "," + pwInput.value());
}
function wifiTimeoutCommand() {
  let sanitizer = checkUserString(wifiTimeoutInput.value(), 3);
  if (sanitizer!=null) {
    wifiTimeoutInput.value("err");
    return;
  }
  if (isNaN(wifiTimeoutInput.value())) {
    wifiTimeoutInput.value("err");
    return;
  }
  if (wifiTimeoutInput.value() > 60 || wifiTimeoutInput.value() <=0) {
    wifiTimeoutInput.value("err");
    return;
  }
  sendData("#tout,"+wifiTimeoutInput.value());
}

function wordclockNameCommand() {
  let sanitizer = checkUserString(wordclockNameInput.value(), 50);
  if (sanitizer!=null) {
    wordclockNameInput.value(sanitizer);
    return;
  }
  sendData("#name,"+wordclockNameInput.value());
}

function timerCommand() {
  let sanitizer = checkUserString(timerInput.value(), 4);
  if (sanitizer!=null) {
    timerInput.value("err");
    return;
  }
  if (isNaN(timerInput.value())) {
    timerInput.value("err");
    return;
  }
  if (timerInput.value() > 255 || timerInput.value() <=0) {
    timerInput.value("err");
    return;
  }
  sendData("#tim,"+timerInput.value());
}

function timerSelectorCommand() {
  sendData("#tse,"+trim(timerSelector.value()));
}

function timerUnitSelectorCommand() {
  if (timerUnitSelector.value()=='Minutes') {
    sendData("#rtcme");
  } else {
    sendData("#rtcmd");
  }
}

function timerStillOpenCommand() {
  let sanitizer = checkUserString(timerStillOpenInput.value(), 50);
  if (sanitizer!=null) {
    timerStillOpenInput.value(sanitizer);
    return;
  }
  sendData("#tso,"+timerStillOpenInput.value());
}
function timerStillClosedCommand() {
  let sanitizer = checkUserString(timerStillClosedInput.value(), 50);
  if (sanitizer!=null) {
    timerStillClosedInput.value(sanitizer);
    return;
  }
  sendData("#tsc,"+timerStillClosedInput.value());
}

function killCommand() {
  sendData("#kill,");
}

function highSpeedCommand() {
  if (highSpeedEnableCheckbox.checked()) {
    sendData("#highSpdON");
  } else {
    sendData("#highSpdOFF");
  }
}
