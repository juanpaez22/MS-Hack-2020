document.getElementById("tab").addEventListener("click", openHomeContent);
document.getElementById("tab2").addEventListener("click", closeContentOpenData);
document.getElementById("tab3").addEventListener("click", closeContentOpenSettings);

function openHomeContent() {
  var homeDisplay = document.getElementById("HomeContent");
  var dataDisplay = document.getElementById("DataContent");
  var settingsDisplay =  document.getElementById("SettingContent");
  if (homeDisplay.style.display === "none") {
    homeDisplay.style.display = "block";
    dataDisplay.style.display = "none";
    settingsDisplay.style.display = "none";
  } else {
    homeDisplay.style.display = "none";
  }
}

function closeContentOpenData() {
  var homeDisplay = document.getElementById("HomeContent");
  var dataDisplay = document.getElementById("DataContent");
  var settingsDisplay =  document.getElementById("SettingContent");
  if (homeDisplay.style.display === "block") {
    homeDisplay.style.display = "none";
    dataDisplay.style.display = "block";
  }
  else if (settingsDisplay.style.display === "block") {
    homeDisplay.style.display = "none";
    settingsDisplay.style.display = "block";
  }
}

function closeContentOpenSettings() {
  var homeDisplay = document.getElementById("HomeContent");
  var dataDisplay = document.getElementById("DataContent");
  var settingsDisplay =  document.getElementById("SettingContent");
  if (homeDisplay.style.display === "block") {
    homeDisplay.style.display = "none";
    dataDisplay.style.display = "none";
    settingsDisplay.style.display = "block";
  }
  else if (dataDisplay.style.display === "block") {
    homeDisplay.style.display = "none";
    dataDisplay.style.display = "none";
    settingsDisplay.style.display = "block";
  }
}
