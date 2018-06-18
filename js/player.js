// Player
console.log("player.js loaded!");

var player = {};

function Player(name, room) {
  this.name = name;
  this.level = 1;
  this.hp = 10;
  this.mp = 20;
  this.ap = 1;
  this.sp = 1;
  this.spells = [];
  this.items = [];
  this.xp = 0;
  this.room = room;
}

Player.prototype.checkLoot = function(enemy) {
  var isDuplicate = true;
  var loot;


  while(isDuplicate) {
    var roll = Math.floor((Math.random() * enemy.loot.length) + 1);
    loot = enemy.loot[roll];

    if(this.items.includes(loot)) {
      continue;
    } else {
      isDuplicate = false;
      break;
    }
  }

  return loot;
}

function createNewPlayer(name) {
  player = new Player(name, roomMap.room1);
  saveGame(player);
}

function loadPlayer() {
  player = playerFromStorage();
}
