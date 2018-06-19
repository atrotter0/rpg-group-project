// Player
console.log("player.js loaded!");

var player = {};

function Player(name, room) {
  this.name = name;
  this.level = 1;
  this.hpMax = 10;
  this.hp = this.hpMax;
  this.mpMax = 20;
  this.mp = 20;
  this.ap = 1;
  this.sp = 3;
  this.spells = ["Firebolt"];
  this.items = [];
  this.xp = 0;
  this.room = room;
  this.currentEnemy = {};
  this.lastRoom = "";
  this.hasHealingConsumable = false;
  this.hasManaConsumable = false;
}

Player.prototype.playerAttack = function(enemy) {
  enemy.hp -= this.ap;
  battleAlert(this.name + " hits " + enemy.name + " for " + this.ap + " damage!");
}

Player.prototype.noMp = function() {
  if (this.mp <= 0) return true;
}

Player.prototype.playerCastSpell = function(enemy) {
  enemy.hp -= this.sp;
  this.mp -= 5;
  battleAlert(this.name + " casts " + this.spells[0] + " on " + enemy.name + " for " + this.sp + " damage!");
}

Player.prototype.isDead = function() {
  if (this.hp <= 0) return true;
}

Player.prototype.checkForConsumables = function() {
  for(var i = 0; i < player.items.length; i++) {
    if (this.hasHealingPotion(player.items[i])) {
      this.hasHealingConsumable = true;
    } else if (this.hasManaPotion(player.items[i])) {
      this.hasManaConsumable = true;
    }
  }
}

Player.prototype.hasHealingPotion = function(item) {
  if (item.type === "Consumable" && item.addHp !== undefined && item.addHp > 0) {
    return true;
  }
}

Player.prototype.hasManaPotion = function(item) {
  if (item.type === "Consumable" && item.addHp !== undefined && item.addHp > 0) {
    return true;
  }
}

function createNewPlayer(name) {
  player = new Player(name, roomMap.room1);
  saveGame(player);
}

function loadPlayer() {
  player = playerFromStorage();
}
