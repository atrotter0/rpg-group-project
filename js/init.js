// Game init

//object instantiation examples:
function runExample() {
  var firebolt1 = new Spell("firebolt1", "Firebolt", "Fire");
  var items = new ItemDictionary(); // populate the item database
  var potion1 = new Consumable("potion1", "Potion of Healing", 5, 0, 0);
  var snake1 = new Enemy("snake1", "Poisonous Snake", 3, 1, 1, [potion1]);
  var room1 = new Room("room1", "Dark Cavern", [snake1], [potion1]);
  var player = new Player("Test");
  player.spells.push(firebolt1);
  console.log(player);
}

$(document).ready(function() {
  console.log("init.js loaded!");
  runExample();
});
