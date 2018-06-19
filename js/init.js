// Game init

function playerFromStorage() {
  if (checkStorage()) {
    var playerData = getPlayer();
    alertSuccess("Game data for [ " + playerData.name + " ] loaded!");
    return playerData;
  } else {
    return alertError("No player data found.");
  }
}

function checkStorage() {
  if (localStorage.getItem("rpg-game")) return true;
}

function getPlayer() {
  var player = JSON.parse(localStorage.getItem("rpg-game"));
  return player;
}

function saveGame(playerObject) {
  var key = "rpg-game";
  var object = JSON.stringify(playerObject);
  localStorage.setItem(key, object);
}

function deleteGame() {
  localStorage.removeItem("rpg-game");
}

$(document).ready(function() {
  console.log("init.js loaded!");

  // run object builds here
  buildRooms();
  // items = new ItemDictionary();
  // enemy = new EnemyDictionary();

  $("#hp-added").text(0);
  $("#mp-added").text(0);
  $("#ap-added").text(0);
  $("#sp-added").text(0);

  var availablePoints = 3;
  $("#available-points").text(availablePoints);

  $("#hp-add-button").click(function(){
    var currentNumber = parseInt($("#hp-added").text());
    if (currentNumber >= 3 || availablePoints <= 0) {
      alertError("You don't have any points left to spend!");
    } else {
    var newHpNumber = currentNumber + 1;
    availablePoints--;
    console.log(availablePoints);
    $("#hp-added").text(newHpNumber);
    $("#available-points").text(availablePoints);
    }
  })

  $("#hp-subtract-button").click(function(){
    var currentNumber = parseInt($("#hp-added").text());
    if (currentNumber <= 0) {
      alertError("You cannot add a negative number of points!");
    } else {
      var newHpNumber = currentNumber - 1;
      availablePoints++;
      $("#hp-added").text(newHpNumber);
      $("#available-points").text(availablePoints);
    }

  })

  $("#mp-add-button").click(function(){
    console.log(availablePoints);
    var currentNumber = parseInt($("#mp-added").text());
    if (currentNumber >= 3 || availablePoints <= 0) {
      alertError("You don't have any points left to spend!");
    } else {
    var newMpNumber = currentNumber + 1;
    availablePoints--;
    console.log(availablePoints);
    $("#mp-added").text(newMpNumber);
    $("#available-points").text(availablePoints);
    }

  })

  $("#mp-subtract-button").click(function(){
    console.log(availablePoints);
    var currentNumber = parseInt($("#mp-added").text());
    if (currentNumber <= 0) {
      alertError("You cannot add a negative number of points!");
    } else {
      var newMpNumber = currentNumber - 1;
      availablePoints++;
      $("#mp-added").text(newMpNumber);
      $("#available-points").text(availablePoints);
    }
  })

  $("#ap-add-button").click(function(){
    var currentNumber = parseInt($("#ap-added").text());
    if (currentNumber >= 3 || availablePoints <= 0) {
      alertError("You don't have any points left to spend!");
    } else {
    var newApNumber = currentNumber + 1;
    availablePoints--;
    $("#ap-added").text(newApNumber);
    $("#available-points").text(availablePoints);
    }
  })

  $("#ap-subtract-button").click(function(){
    var currentNumber = parseInt($("#ap-added").text());
    if (currentNumber <= 0) {
      alertError("You cannot add a negative number of points!");
    } else {
      var newApNumber = currentNumber - 1;
      availablePoints++;
      $("#ap-added").text(newApNumber);
      $("#available-points").text(availablePoints);
    }
  })

  $("#sp-add-button").click(function(){
    var currentNumber = parseInt($("#sp-added").text());
    if (currentNumber >= 3 || availablePoints <= 0) {
      alertError("You don't have any points left to spend!");
    } else {
    var newSpNumber = currentNumber + 1;
    availablePoints--;
    $("#sp-added").text(newSpNumber);
    $("#available-points").text(availablePoints);
    }
  })

  $("#sp-subtract-button").click(function(){
    var currentNumber = parseInt($("#sp-added").text());
    if (currentNumber <= 0) {
      alertError("You cannot add a negative number of points!");
    } else {
      var newHpNumber = currentNumber - 1;
      availablePoints++;
      $("#sp-added").text(newHpNumber);
      $("#available-points").text(availablePoints);
    }
  })
});
