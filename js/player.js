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
  this.equippedWeapon = {};
  this.equippedArmor = {};
}

Player.prototype.equipBestItem = function() {
  for(i = 0; i < this.items.length; i++) {
    if((this.items[i].level > this.equippedWeapon.level && this.items[i].type === "Weapon") || Object.keys(this.equippedWeapon).length === 0 && this.items[i].type === "Weapon") {
      this.equippedWeapon = this.items[i];
    }
  }

  for(i = 0; i < this.items.length; i++) {
    if((this.items[i].level > this.equippedArmor.level && this.items[i].type === "Armor") || Object.keys(this.equippedArmor).length === 0 && this.items[i].type === "Armor") {
      this.equippedArmor = this.items[i];
    }
  }

  displayEquippedItems(this);
}

Player.prototype.checkLoot = function(enemy) {
  const LOOTABLE_ITEMS = enemy.loot.length;
  var uniqueItem = false;

  while(!uniqueItem) {
    var randomNumber = rollDice(LOOTABLE_ITEMS);

    if(this.items.includes(enemy.loot[randomNumber])) {
      console.log("skip");
      console.log(enemy.loot[randomNumber]);
      continue;
    } else {
      this.items.push(enemy.loot[randomNumber]);
      console.log(enemy.loot[randomNumber]);
      uniqueItem = true;
    }
  }
}

function rollDice(maxNumber) {
  var roll = Math.floor(Math.random() * maxNumber);

  return roll;
}

function createNewPlayer(name) {
  player = new Player(name, roomMap.room1);
  saveGame(player);
  fillCharacterValues(player);
}

function loadPlayer() {
  player = playerFromStorage();
}
