function initTabs() {
  document.getElementById("tab").addEventListener("click", openHomeContent);
  document.getElementById("tab2").addEventListener("click", openDataContent);
  document.getElementById("tab3").addEventListener("click", openSettingsContent);
  document.getElementById("tab4").addEventListener("click", openResourcesContent);
}

function openHomeContent() {
  var homeDisplay = document.getElementById("HomeContent");
  var dataDisplay = document.getElementById("DataContent");
  var settingsDisplay =  document.getElementById("SettingContent");
  var resourcesDisplay =  document.getElementById("ResourcesContent");
  homeDisplay.style.display = "block";
  dataDisplay.style.display = "none";
  settingsDisplay.style.display = "none";
  resourcesDisplay.style.display = "none";
}

function openDataContent() {
  var homeDisplay = document.getElementById("HomeContent");
  var dataDisplay = document.getElementById("DataContent");
  var settingsDisplay =  document.getElementById("SettingContent");
  var resourcesDisplay =  document.getElementById("ResourcesContent");
  homeDisplay.style.display = "none";
  dataDisplay.style.display = "block";
  settingsDisplay.style.display = "none";
  resourcesDisplay.style.display = "none";
}

function openSettingsContent() {
  var homeDisplay = document.getElementById("HomeContent");
  var dataDisplay = document.getElementById("DataContent");
  var settingsDisplay =  document.getElementById("SettingContent");
  var resourcesDisplay =  document.getElementById("ResourcesContent");
  homeDisplay.style.display = "none";
  dataDisplay.style.display = "none";
  settingsDisplay.style.display = "block";
  resourcesDisplay.style.display = "none";
}

function openResourcesContent() {
  var homeDisplay = document.getElementById("HomeContent");
  var dataDisplay = document.getElementById("DataContent");
  var settingsDisplay =  document.getElementById("SettingContent");
  var resourcesDisplay =  document.getElementById("ResourcesContent");
  homeDisplay.style.display = "none";
  dataDisplay.style.display = "none";
  settingsDisplay.style.display = "none";
  resourcesDisplay.style.display = "block";
}

