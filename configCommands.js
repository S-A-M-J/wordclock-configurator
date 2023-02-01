//ALL DATA SENT OUT FROM THE GUI TOO THE BOARD HERE

// to sanitize strings **********
function checkUserString(userString, lengthCheck) {
  if (match(userString, "#") != null || match(userString, ",") != null) {
    return 'error no # or comma';
  }
  if (userString.length >= lengthCheck) {
    return 'error too long';
  }
  return null;
}

function saveWiFi() {
  let sanitizer = checkUserString(ssidInput.value(), 50);
  if (sanitizer != null) {
    ssidInput.value(sanitizer);
    return;
  }
  sanitizer = checkUserString(pwInput.value(), 50);
  if (sanitizer != null) {
    ssidInput.value(sanitizer);
    return;
  }
  if (pwInput.value().length < 8) {
    ssidInput.value('error pw too short');
    return;
  }
  if (ssidInput.value() == "debugshow") {
    DebugInput.show();
    DebugButton.show();
  } else if (ssidInput.value() == "debughide") {
    DebugInput.hide();
    DebugButton.hide();
  } else {
    sendData("#wifi," + ssidInput.value() + "," + pwInput.value()) + ",";
  }
}

function mouseReleased() {
  if (lastSliderStatus != AlexaStatusSlider.value()) {
    if (AlexaStatusSlider.value() == "0" && wifiConnected) {
      sendData("#alexaOff");
    } else {
      sendData("#alexaOn");
    }
    lastSliderStatus = AlexaStatusSlider.value();
  }
}

function colorChanged(){
  colorMode(HSB,255,255,255);
  hueInput = hue(ColorPicker.color());
  satInput = saturation(ColorPicker.color());
  briInput = brightness(ColorPicker.color());
  sendData('#setColor,'+hue+','+sat+','+bri);
  colorMode(RGB,255);
}

function resetCommand() {
  sendData("#reset,");
  disconnectBle();
}

function sendDebugData() {
  sendData(DebugInput.value());
}

function activateOTA() {
  sendData("#OTAOn,");
}

