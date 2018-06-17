// Game init

function playerFromStorage() {
  if (checkStorage()) {
    return getPlayer();
  } else {
    alert("No player data found.");
  }
}

function checkStorage() {
  if (localStorage.getItem("rpg-game")) return true;
}

function getPlayer() {
  var player = JSON.parse(localStorage.getItem("rpg-game"));
  return player;
}

function addToStorage(playerObject) {
  var key = "rpg-game";
  var object = JSON.stringify(playerObject);
  localStorage.setItem(key, object);
}

function clearStorage() {
  localStorage.removeItem("rpg-game");
}

$(document).ready(function() {
  console.log("init.js loaded!");

  // run object builds here
  buildRooms();
});
