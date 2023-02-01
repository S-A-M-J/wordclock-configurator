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
  sendData("#wifi,"+ssidInput.value() + "," + pwInput.value()) + ",";
}

function alexaEnableCommand(){
  if (AlexaStatusSlider.value() == "0") {
    sendData("#alexaOff");
  } else {
    sendData("#alexaOn");
  }
}

function resetCommand() {
  sendData("#reset,");
  disconnectBle();
}

function activateOTA() {
  sendData("#OTAOn,");
  otaStatus = 'OTA active';
}

