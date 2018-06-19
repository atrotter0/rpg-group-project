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
  buildEnemies();
  buildItems();
  

  //test code
  player = new Player("Abe");
  player.hp = 5;
  player.mp = 5;
  player.items.push(itemMap.healthPotion);
  player.items.push(itemMap.manaPotion);
});
