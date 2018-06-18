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
  this.currentEnemy = {};
}

Player.prototype.playerAttacks = function(enemy) {
  enemy.hp -= player.ap;
  battleAlert(player.name + " hits " + enemy.name + " for " + player.ap + " damage!");
}

function createNewPlayer(name) {
  player = new Player(name, roomMap.room1);
  saveGame(player);
}

function loadPlayer() {
  player = playerFromStorage();
}
