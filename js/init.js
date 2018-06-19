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

var newStats = {};
$(document).ready(function() {
  console.log("init.js loaded!");

  // run object builds here
  buildRooms();
  createNewPlayer("Kelli");
  newStats = new NewStats();
  // items = new ItemDictionary();
  // enemy = new EnemyDictionary();

  $("#hp-added").text(0);
  $("#mp-added").text(0);
  $("#ap-added").text(0);
  $("#sp-added").text(0);

  $("#available-points").text(newStats.availablePoints);

  $("#hp-add-button").click(function(){
    var currentHpNumber = parseInt($("#hp-added").text());
    if (currentHpNumber >= 3 || newStats.availablePoints <= 0) {
      alertError("You don't have any points left to spend!");
    } else {
    var newHpNumber = currentHpNumber + 1;
    newStats.availablePoints--;
    newStats.newHp = newHpNumber;
    $("#hp-added").text(newHpNumber);
    $("#available-points").text(newStats.availablePoints);
    }
    console.log(newStats.newHp);
  })

  $("#hp-subtract-button").click(function(){
    var currentNumber = parseInt($("#hp-added").text());
    if (currentNumber <= 0) {
      alertError("You cannot add a negative number of points!");
    } else {
      var newHpNumber = currentNumber - 1;
      newStats.availablePoints++;
      newStats.newHp = newHpNumber;
      $("#hp-added").text(newHpNumber);
      $("#available-points").text(newStats.availablePoints);
    }
    console.log(newStats.newHp);
  })

  $("#mp-add-button").click(function(){
    var currentNumber = parseInt($("#mp-added").text());
    if (currentNumber >= 3 || newStats.availablePoints <= 0) {
      alertError("You don't have any points left to spend!");
    } else {
    var newMpNumber = currentNumber + 1;
    newStats.availablePoints--;
    newStats.newMp = newMpNumber;
    $("#mp-added").text(newMpNumber);
    $("#available-points").text(newStats.availablePoints);
    }
    console.log(newStats.newMp);
  })

  $("#mp-subtract-button").click(function(){
    var currentNumber = parseInt($("#mp-added").text());
    if (currentNumber <= 0) {
      alertError("You cannot add a negative number of points!");
    } else {
      var newMpNumber = currentNumber - 1;
      newStats.availablePoints++;
      newStats.newMp = newMpNumber;
      $("#mp-added").text(newMpNumber);
      $("#available-points").text(newStats.availablePoints);
    }
    console.log(newStats.newMp);
  })

  $("#ap-add-button").click(function(){
    var currentNumber = parseInt($("#ap-added").text());
    if (currentNumber >= 3 || newStats.availablePoints <= 0) {
      alertError("You don't have any points left to spend!");
    } else {
    var newApNumber = currentNumber + 1;
    newStats.availablePoints--;
    newStats.newAp = newApNumber;
    $("#ap-added").text(newApNumber);
    $("#available-points").text(newStats.availablePoints);
    }
    console.log(newStats.newAp);
  })

  $("#ap-subtract-button").click(function(){
    var currentNumber = parseInt($("#ap-added").text());
    if (currentNumber <= 0) {
      alertError("You cannot add a negative number of points!");
    } else {
      var newApNumber = currentNumber - 1;
      newStats.availablePoints++;
      newStats.newAp = newApNumber;
      $("#ap-added").text(newApNumber);
      $("#available-points").text(newStats.availablePoints);
    }
    console.log(newStats.newAp);
  })

  $("#sp-add-button").click(function(){
    var currentNumber = parseInt($("#sp-added").text());
    if (currentNumber >= 3 || availablePoints <= 0) {
      alertError("You don't have any points left to spend!");
    } else {
    var newSpNumber = currentNumber + 1;
    availablePoints--;
    newStats.newSp = newSpNumber;
    $("#sp-added").text(newSpNumber);
    $("#available-points").text(availablePoints);
    }
    console.log(newStats.newSp);
  })

  $("#sp-subtract-button").click(function(){
    var currentNumber = parseInt($("#sp-added").text());
    if (currentNumber <= 0) {
      alertError("You cannot add a negative number of points!");
    } else {
      var newSpNumber = currentNumber - 1;
      availablePoints++;
      newStats.newSp = newSpNumber;
      $("#sp-added").text(newSpNumber);
      $("#available-points").text(availablePoints);
    }
    console.log(newStats.newSp);
  })

  $("#add-stats-button").click(function(){
    // if ()
    player.hp += newStats.newHp;
    player.mp += newStats.newMp;
    player.ap += newStats.newAp;
    player.sp += newStats.newSp;
    newStats.availablePoints = 3;
    newStats.newHp = 0;
    newStats.newMp = 0;
    newStats.newAp = 0;
    newStats.newSp = 0;
    console.log(newStats);
    console.log(player);
  })
});
