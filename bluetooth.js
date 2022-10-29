
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
      console.log('detected first characteristic');
    }
    if (characteristics[i].uuid == 'a5f125c2-7cec-4334-9214-58cffb8706c0') {
      blueToothRXCharacteristic = characteristics[i];
      console.log('detected second characteristic');
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
    
    } else {
     
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
