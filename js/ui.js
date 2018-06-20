// UI

function hideMenuOptions() {
  $("#new-game").hide();
  $("#load-game").hide();
}

function displayNewGameBox() {
  $("#new-game-box").show();
}

function runNewGame(playerName) {
  if (!validate(playerName)) return alertError("You need to enter a valid name.");

  createNewPlayer(playerName, roomMap.room1);
  alertSuccess("Game data for [ " + player.name + " ] created!");
  //fadeOut();
  //startStory();
}

function validate(value) {
  if (value !== "") return true;
}

function alertError(msg) {
  $("#alert-field").hide().text(msg).removeClass("alert-success")
    .addClass("alert-danger").fadeIn(800).delay(3000).fadeOut(1000);
}

function alertSuccess(msg) {
  $("#alert-field").hide().text(msg).removeClass("alert-danger")
    .addClass("alert-success").fadeIn(800).delay(3000).fadeOut(1000);
}

function showRoom(player) {
  var roomId = player.room;
}

function initiateNewStats() {
  $("#hp-added").text(0);
  $("#mp-added").text(0);
  $("#ap-added").text(0);
  $("#sp-added").text(0);
  $("#available-points").text(newStats.availablePoints);
}

function initiateNewStatsInGame() {
  $("#hp-added2").text(0);
  $("#mp-added2").text(0);
  $("#ap-added2").text(0);
  $("#sp-added2").text(0);
  $("#available-points2").text(newStats.availablePoints);
  console.log("initiate new stats in game");
}

function addPoint(number, stat) {
  if (number >= 3 || newStats.availablePoints <= 0) {
    alertError("You don't have any points left to spend!");
  } else {
  var newNumber = number + 1;
  newStats.availablePoints--;
  newStats.newHp = newNumber;
  $("#" + stat + "-added").text(newNumber);
  $("#available-points").text(newStats.availablePoints);
  }
}

function addPointInGame(number, stat) {
  if (number >= 3 || newStats.availablePoints <= 0) {
    alertError("You don't have any points left to spend!");
  } else {
  var newNumber = number + 1;
  newStats.availablePoints--;
  newStats.newHp = newNumber;
  $("#" + stat + "-added2").text(newNumber);
  $("#available-points2").text(newStats.availablePoints);
  }
}

function subtractPoint(number, stat) {
  if (number <= 0) {
    alertError("You cannot add a negative number of points!");
  } else {
    var newNumber = number - 1;
    newStats.availablePoints++;
    newStats.newHp = newNumber;
    $("#" + stat + "-added").text(newNumber);
    $("#available-points").text(newStats.availablePoints);
  }
}

function subtractPointInGame(number, stat) {
  if (number <= 0) {
    alertError("You cannot add a negative number of points!");
  } else {
    var newNumber = number - 1;
    newStats.availablePoints++;
    newStats.newHp = newNumber;
    $("#" + stat + "-added2").text(newNumber);
    $("#available-points2").text(newStats.availablePoints);
  }
}

function upgradeStats() {
  if (newStats.availablePoints !== 0) {
  alertError("You haven't spent all your points yet!")
} else {
  player.hp += newStats.newHp;
  player.mp += newStats.newMp;
  player.ap += newStats.newAp;
  player.sp += newStats.newSp;
  newStats.availablePoints = 3;
  newStats.newHp = 0;
  newStats.newMp = 0;
  newStats.newAp = 0;
  newStats.newSp = 0;
  }
}



$(document).ready(function() {
  console.log("ui.js loaded!");

  $("#new-game").click(function() {
    hideMenuOptions();
    initiateNewStats();
    displayNewGameBox();
    initiateNewStatsInGame();
  });

  $("#confirm-name").click(function() {
    var playerName = $("#main-menu-player-name").val();
    runNewGame(playerName);
  });

  $("#load-game").click(function() {
    loadPlayer();
  });

  $("#hp-add-button").click(function(){
    var currentHpNumber = parseInt($("#hp-added").text());
    addPoint(currentHpNumber, "hp");
  })

  $("#hp-subtract-button").click(function(){
    var currentHpNumber = parseInt($("#hp-added").text());
    subtractPoint(currentHpNumber, "hp");
  })

  $("#mp-add-button").click(function(){
    var currentMpNumber = parseInt($("#mp-added").text());
    addPoint(currentMpNumber, "mp");
  })

  $("#mp-subtract-button").click(function(){
    var currentMpNumber = parseInt($("#mp-added").text());
    subtractPoint(currentMpNumber, "mp");
  })

  $("#ap-add-button").click(function(){
    var currentApNumber = parseInt($("#ap-added").text());
    addPoint(currentApNumber, "ap");
  })

  $("#ap-subtract-button").click(function(){
    var currentApNumber = parseInt($("#ap-added").text());
    subtractPoint(currentApNumber, "ap");
  })

  $("#sp-add-button").click(function(){
    var currentSpNumber = parseInt($("#sp-added").text());
    addPoint(currentSpNumber, "sp");
  })

  $("#sp-subtract-button").click(function(){
    var currentSpNumber = parseInt($("#sp-added").text());
    subtractPoint(currentSpNumber, "sp");
  })

  $("#add-stats-button").click(function(){
    upgradeStats();
  })

  $("#hp-add-button2").click(function(){
    var currentHpNumber = parseInt($("#hp-added2").text());
    addPointInGame(currentHpNumber, "hp");
  })

  $("#hp-subtract-button2").click(function(){
    var currentHpNumber = parseInt($("#hp-added2").text());
    subtractPointInGame(currentHpNumber, "hp");
  })

  $("#mp-add-button2").click(function(){
    var currentMpNumber = parseInt($("#mp-added2").text());
    addPointInGame(currentMpNumber, "mp");
  })

  $("#mp-subtract-button2").click(function(){
    var currentMpNumber = parseInt($("#mp-added2").text());
    subtractPointInGame(currentMpNumber, "mp");
  })

  $("#ap-add-button2").click(function(){
    var currentApNumber = parseInt($("#ap-added2").text());
    addPointInGame(currentApNumber, "ap");
  })

  $("#ap-subtract-button2").click(function(){
    var currentApNumber = parseInt($("#ap-added2").text());
    subtractPointInGame(currentApNumber, "ap");
  })

  $("#sp-add-button2").click(function(){
    var currentSpNumber = parseInt($("#sp-added2").text());
    addPointInGame(currentSpNumber, "sp");
  })

  $("#sp-subtract-button2").click(function(){
    var currentSpNumber = parseInt($("#sp-added2").text());
    subtractPointInGame(currentSpNumber, "sp");
  })

  $("#add-stats-button2").click(function(){
    upgradeStats();
    $("#level-up-div2").hide();
  })

});
