// Game init

// object instantiation examples:
// remove this example before prod push
function runExample() {
  var firebolt1 = new Spell("firebolt1", "Firebolt", "Fire");
  var armor1 = new Item("armor1", "Mythril Plate", "Armor", 1, 0, 0, 0);
  var staff1 = new Item("staff1", "Staff of the Magi", "Weapon", 0, 0, 5, 5);
  var potion1 = new Consumable("potion1", "Potion of Healing", 5, 0, 0);
  var snake1 = new Enemy("snake1", "Poisonous Snake", 3, 1, 1, [potion1]);
  var room1 = new Room("room1", "Dark Cavern", [snake1], [potion1, armor1]);
  var player = new Player("Test");
  player.spells.push(firebolt1);
  console.log(player);
}

function playerFromStorage() {
  if (checkStorage()) {
    return getPlayer();
  } else {
    aler("No player data found.");
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

$(document).ready(function() {
  console.log("init.js loaded!");

  // run builds here after page loads
  buildRooms();
});
