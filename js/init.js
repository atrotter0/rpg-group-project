// Game init

function playerFromStorage() {
  if (checkStorage()) {
    var playerData = getPlayer();
    alertRoom("Game data for [ " + playerData.name + " ] loaded!");
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

  buildItems();
  buildEnemies();
  buildRooms();
  createItemClickEvents();
  createDoorClickEvents();
  createTrapClickEvents();
  buildStats();
  buildPlayer();
});
