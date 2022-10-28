
function connectToBle() {
  // Connect to a device by passing the service UUID
  blueTooth.connect("a5f125c0-7cec-4334-9214-58cffb8706c0", gotCharacteristics);
  console.log('trying to connect');
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
  console.log('looking for characteristics');
  if (error) { 
    console.log('error: ', error);
  }
  console.log('characteristics: ', characteristics);

  console.log(characteristics.length);
  if (characteristics.length != 2) {
    return;
  }


  for (let i=0; i<2; i++) {
    if (characteristics[i].uuid == 'a5f125c1-7cec-4334-9214-58cffb8706c0') {
      blueToothTXCharacteristic = characteristics[i];
    }
    if (characteristics[i].uuid == 'a5f125c2-7cec-4334-9214-58cffb8706c0') {
      blueToothRXCharacteristic = characteristics[i];
    }
  }

  blueTooth.startNotifications(blueToothRXCharacteristic, gotValue, 'string');
  isConnected = blueTooth.isConnected();

  connectButton.hide();
  showAllParam();

  // Add a event handler when the device is disconnected
  blueTooth.onDisconnected(onDisconnected);
}


// A function that will be called once got values
function gotValue(value) {
  // console.log('value: ', value);
  let splitString = split(value, ',');
  if (splitString[0]=='stat') {//status string
    newData=true;
    if (splitString[1]=='co') {
      wifiConnected=true;
    } else {
      wifiConnected=false;
    }
    if (splitString[3]=='op') {
      contactOpen=true;
    } else {
      contactOpen=false;
    }
    if (splitString[4]=='bt') {
      buttonPressed=true;
    } else {
      buttonPressed=false;
    }
    macAddress = splitString[5];
    fwVersion = splitString[6];
    ipAddress = splitString[7];
    connectedSSID = splitString[8];
    //here is where time can go
    if (splitString[9]!=null) {
      document.getElementById("currentTimeID").innerHTML = splitString[9];
    }

    if (wifiConnected) {
      otaStartButton.show();
      otaHelpTextTitle.hide();
    } else {
      otaStartButton.hide();
      otaHelpTextTitle.show();
    }

    if (firstConnected) {
      sendData("#param,");
    }
  }


  if (splitString[0]=='ssid') {//ssid string
    firstConnected = false;
    ssidInput.value(splitString[1]);
  }
  if (splitString[0]=='pw') {//pw string
    pwInput.value(splitString[1]);
  }
  if (splitString[0]=='tout') {//timeout
    wifiTimeoutInput.value(splitString[1]/1000);
  }
  if (splitString[0]=='name') {//name
    wordclockNameInput.value(splitString[1]);
  }
  if (splitString[0]=='sel') {//selection
    triggerOpensTitle.hide();
    triggerOpensInput.hide();
    triggerOpensButton.hide();
    triggerClosesTitle.hide();
    triggerClosesInput.hide();
    triggerClosesButton.hide();
    if (splitString[1]=='Close') {
      triggerSelector.value('Contact Close');
      triggerClosesTitle.show();
      triggerClosesInput.show();
      triggerClosesButton.show();
    }
    if (splitString[1]=='Open') {
      triggerSelector.value('Contact Open');
      triggerOpensTitle.show();
      triggerOpensInput.show();
      triggerOpensButton.show();
    }    
    if (splitString[1]=='Both') {
      triggerSelector.value('Open and Close');
      triggerOpensTitle.show();
      triggerOpensInput.show();
      triggerOpensButton.show();
      triggerClosesTitle.show();
      triggerClosesInput.show();
      triggerClosesButton.show();
    }
  }
  if (splitString[0]=='ope') {//open message
    triggerOpensInput.value(splitString[1]);
  }
  if (splitString[0]=='clo') {//close message
    triggerClosesInput.value(splitString[1]);
  } 
  if (splitString[0]=='tim') {//countdown
    timerInput.value(splitString[1]);
  }
  if (splitString[0]=='tse') {//timer select
    if (splitString[1]=='Nothing') {
      timerSelector.value('Nothing');
      timerStillOpenTitle.hide();
      timerStillOpenInput.hide();
      timerStillOpenButton.hide();
      timerStillClosedTitle.hide();
      timerStillClosedInput.hide();
      timerStillClosedButton.hide();
    }
    if (splitString[1]=='Closed') {
      timerSelector.value('Contact Still Closed');
      timerStillOpenTitle.hide();
      timerStillOpenInput.hide();
      timerStillOpenButton.hide();
      timerStillClosedTitle.show();
      timerStillClosedInput.show();
      timerStillClosedButton.show();
    }
    if (splitString[1]=='Open') {
      timerSelector.value('Contact Still Open');
      timerStillOpenTitle.show();
      timerStillOpenInput.show();
      timerStillOpenButton.show();
      timerStillClosedTitle.hide();
      timerStillClosedInput.hide();
      timerStillClosedButton.hide();
    }
    if (splitString[1]=='Either') {
      timerSelector.value('Either Contact');
      timerStillOpenTitle.show();
      timerStillOpenInput.show();
      timerStillOpenButton.show();
      timerStillClosedTitle.show();
      timerStillClosedInput.show();
      timerStillClosedButton.show();
    }
  }
  if (splitString[0]=='tso') {//still open
    timerStillOpenInput.value(splitString[1]);
  }
  if (splitString[0]=='tsc') {//still closed
    timerStillClosedInput.value(splitString[1]);
  }  



  if (splitString[0]=='poe') {//push over enable
    if (splitString[1]=='t') {
      pushOverEnableCheckbox.checked(true);
      pushCredentTitle.show();
      pushuserTitle.show();
      pushuserInput.show();
      pushapiTitle.show();
      pushapiInput.show();
      pushOverSaveButton.show();
    } else {
      pushOverEnableCheckbox.checked(false);
      pushCredentTitle.hide();
      pushuserTitle.hide();
      pushuserInput.hide();
      pushapiTitle.hide();
      pushapiInput.hide();
      pushOverSaveButton.hide();
    }
  } 
  if (splitString[0]=='pouser') {//user key
    pushuserInput.value(splitString[1]);
  }  
  if (splitString[0]=='poapi') {//api key
    pushapiInput.value(splitString[1]);
  }
  if (splitString[0]=='wak') {//wake button message
    wakeButtonInput.value(splitString[1]);
  }

  if (splitString[0]=='pse') {//push safer enable
    if (splitString[1]=='t') {
      pushSaferEnableCheckbox.checked(true);
      pushSaferTitle.show();
      pushSaferKeyTitle.show();
      pushSaferInput.show();
      pushSaferSaveButton.show();
    } else {
      pushSaferEnableCheckbox.checked(false);
      pushSaferTitle.hide();
      pushSaferKeyTitle.hide();
      pushSaferInput.hide();
      pushSaferSaveButton.hide();
    }
  }
  if (splitString[0]=='psk') {//push safer key
    pushSaferInput.value(splitString[1]);
  }

  if (splitString[0]=='rtcm') {//timer units 
    if (splitString[1]=='t') {
      timerUnitSelector.value('Minutes');
    } else {
      timerUnitSelector.value('Seconds');
    }
  }

  if (splitString[0]=='highSpd') {//high speed mode
    if (splitString[1]=='t') {
      highSpeedEnableCheckbox.checked(true);
    } else {
      highSpeedEnableCheckbox.checked(false);
    }
  }
  if (splitString[0]=='clkEnable') {//clock enable
    if (splitString[1]=='t') {
      clockTimerEnableCheckbox.checked(true);
      clockCurrentTime.show();
      clockTimeZoneTitle.show();
      clockTimeZone.show();
      clockTimeZoneButton.show();
      clockSetTimeNTPtitle.show();
      clockAppendTitle.show();
      clockAppendCheckbox.show();
      clockAppendButton.show();
      clockAlarmEnableTitle.show();
      clockAlarmEnableCheckbox.show();
      clockAlarmEnableButton.show();
    } else {
      clockTimerEnableCheckbox.checked(false);
      clockCurrentTime.hide();
      clockTimeZoneTitle.hide();
      clockTimeZone.hide();
      clockTimeZoneButton.hide();
      clockSetTimeNTPtitle.hide();
      clockSetTimeButton.hide();
      clockAppendTitle.hide();
      clockAppendCheckbox.hide();
      clockAppendButton.hide();
      clockAlarmEnableTitle.hide();
      clockAlarmEnableCheckbox.hide();
      clockAlarmEnableButton.hide();
      clockAlarmSettingTitle.hide();
      clockAlarmHour.hide();
      clockAlarmMinute.hide();
      clockAlarmButton.hide();
      clockNTPupdateonAlarmTitle.hide();
      clockNTPupdateonAlarmCheckbox.hide();
      clockNTPupdateonAlarmButton.hide();
      clockAlarmMessageTitle.hide();
      clockAlarmMessage.hide();
      clockAlarmMessageButton.hide();
    }
  }

  if (wifiConnected && clockTimerEnableCheckbox.checked()) {
    document.getElementById("clockSetTimeNTPtitleID").innerHTML = "Set Time with NTP server ";
    clockSetTimeButton.show();
  } else {
    document.getElementById("clockSetTimeNTPtitleID").innerHTML = "Note: Connect to WiFi to set Time from NTP Server! ";
    clockSetTimeButton.hide();
  }

  if (splitString[0]=='clkTimeZone') {//clock time zone
    clockTimeZone.value(splitString[1]);
  }
  if (splitString[0]=='clkAppendEnable') {//clock append enable
    if (splitString[1]=='t') {
      clockAppendCheckbox.checked(true);
    } else {
      clockAppendCheckbox.checked(false);
    }
  }
  if (splitString[0]=='clkAlarmEnable') {//clock append enable
    if (splitString[1]=='t') {
      clockAlarmEnableCheckbox.checked(true);
      clockAlarmSettingTitle.show();
      clockAlarmHour.show();
      clockAlarmMinute.show();
      clockAlarmButton.show();
      clockNTPupdateonAlarmTitle.show();
      clockNTPupdateonAlarmCheckbox.show();
      clockNTPupdateonAlarmButton.show();
      clockAlarmMessageTitle.show();
      clockAlarmMessage.show();
      clockAlarmMessageButton.show();
      clockAppendAlarmTitle.show();
      clockAppendAlarmCheckbox.show();
      clockAppendAlarmButton.show();
    } else {
      clockAlarmEnableCheckbox.checked(false);
      clockAlarmSettingTitle.hide();
      clockAlarmHour.hide();
      clockAlarmMinute.hide();
      clockAlarmButton.hide();
      clockNTPupdateonAlarmTitle.hide();
      clockNTPupdateonAlarmCheckbox.hide();
      clockNTPupdateonAlarmButton.hide();
      clockAlarmMessageTitle.hide();
      clockAlarmMessage.hide();
      clockAlarmMessageButton.hide();
      clockAppendAlarmTitle.hide();
      clockAppendAlarmCheckbox.hide();
      clockAppendAlarmButton.hide();
    }
  }
  if (splitString[0]=='clkAlarmHour') {//clock alarm hour
    clockAlarmHour.value(splitString[1]);
  }
  if (splitString[0]=='clkAlarmMinute') {//clock alarm hour
    clockAlarmMinute.value(splitString[1]);
  }
  if (splitString[0]=='clkUpdateNPTenable') {//clock NPT update
    if (splitString[1]=='t') {
      clockNTPupdateonAlarmCheckbox.checked(true);
    } else {
      clockNTPupdateonAlarmCheckbox.checked(false);
    }
  }
  if (splitString[0]=='clkAlarmMessage') {//clock alarm message
    clockAlarmMessage.value(splitString[1]);
  }
  if (splitString[0]=='clkAppendAlmEnable') {//clock alarm append time
    if (splitString[1]=='t') {
      clockAppendAlarmCheckbox.checked(true);
    } else {
      clockAppendAlarmCheckbox.checked(false);
    }
  }

  if (splitString[0]=='appendRSSI') {//append rssi
    if (splitString[1]=='t') {
      appendRSSIenableCheckbox.checked(true);
    } else {
      appendRSSIenableCheckbox.checked(false);
    }
  }

  if (splitString[0]=='missionEnable') {//mission critical enable
    if (splitString[1]=='t') {
      missionCriticalEnableCheckbox.checked(true);
      missionCriticalTimeTitle.show();
      missionCriticalTimeInput.show();
      missionCriticalTimeButton.show();
    } else {
      missionCriticalEnableCheckbox.checked(false);
      missionCriticalTimeTitle.hide();
      missionCriticalTimeInput.hide();
      missionCriticalTimeButton.hide();
    }
  }

  if (splitString[0]=='missionTimeafter') {//mission critical time
    missionCriticalTimeInput.value(splitString[1]);
  }
}

function onDisconnected() {
  console.log('Device got disconnected.');
  isConnected = false;
  firstConnected = true;
  connectButton.show();
  hideAllParam();
}

function sendData(data) {
  const inputValue = data;
  if (!("TextEncoder" in window)) {
    console.log("Sorry, this browser does not support TextEncoder...");
  }
  var enc = new TextEncoder(); // always utf-8
  blueToothTXCharacteristic.writeValue(enc.encode(inputValue));
}
