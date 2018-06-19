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
  items = new ItemDictionary();
  enemy = new EnemyDictionary();

  $("#hp-added").text(0);
  $("#mp-added").text(0);
  $("#ap-added").text(0);
  $("#sp-added").text(0);

  $("#hp-add-button").click(function(){
    var currentNumber = parseInt($("#hp-added").text());
    console.log(currentNumber);
    var newNumber = currentNumber + 1;
    console.log(newNumber);
    $("#hp-added").text(newNumber);
  })

  $("#hp-subtract-button").click(function(){
    var currentNumber = parseInt($("#hp-added").text());
    console.log(currentNumber);
    var newNumber = currentNumber - 1;
    console.log(newNumber);
    $("#hp-added").text(newNumber);
  })

  $("#mp-add-button").click(function(){
    var currentNumber = parseInt($("#mp-added").text());
    console.log(currentNumber);
    var newNumber = currentNumber + 1;
    console.log(newNumber);
    $("#mp-added").text(newNumber);
  })

  $("#mp-subtract-button").click(function(){
    var currentNumber = parseInt($("#mp-added").text());
    console.log(currentNumber);
    var newNumber = currentNumber - 1;
    console.log(newNumber);
    $("#mp-added").text(newNumber);
  })

  $("#ap-add-button").click(function(){
    var currentNumber = parseInt($("#ap-added").text());
    console.log(currentNumber);
    var newNumber = currentNumber + 1;
    console.log(newNumber);
    $("#ap-added").text(newNumber);
  })

  $("#ap-subtract-button").click(function(){
    var currentNumber = parseInt($("#ap-added").text());
    console.log(currentNumber);
    var newNumber = currentNumber - 1;
    console.log(newNumber);
    $("#ap-added").text(newNumber);
  })

  $("#sp-add-button").click(function(){
    var currentNumber = parseInt($("#sp-added").text());
    console.log(currentNumber);
    var newNumber = currentNumber + 1;
    console.log(newNumber);
    $("#sp-added").text(newNumber);
  })

  $("#sp-subtract-button").click(function(){
    var currentNumber = parseInt($("#sp-added").text());
    console.log(currentNumber);
    var newNumber = currentNumber - 1;
    console.log(newNumber);
    $("#sp-added").text(newNumber);
  })
});
