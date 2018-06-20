// Player
console.log("player.js loaded!");

var player = {};

function Player(name, room) {
  this.name = name;
  this.level = 1;
  this.hpMax = 10;
  this.hp = this.hpMax;
  this.mpMax = 20;
  this.mp = this.mpMax;
  this.ap = 1;
  this.sp = 3;
  this.spells = ["Firebolt"];
  this.items = [];
  this.xp = 0;
  this.room = room;
  this.equippedWeapon = {};
  this.equippedArmor = {};
  this.currentEnemy = {};
  this.lastRoom = "";
  this.hasHealingConsumable = false;
  this.hasManaConsumable = false;
}

Player.prototype.equipItem = function(item) {
  if(item.type === "Weapon") {
    this.equippedWeapon = item;
    this.upgradeStats(this.equippedWeapon);
  } else if(item.type === "Armor") {
    this.equippedArmor = item;
    this.upgradeStats(this.equippedArmor);
  } else {
    alertError("You can only equip weapons or armor items.");
  }
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

  if (this.mp < 0) this.mp = 0;
  battleAlert(this.name + " casts " + this.spells[0] + " on " + enemy.name + " for " + this.sp + " damage!");
}

Player.prototype.isDead = function() {
  if (this.hp <= 0) return true;
}

Player.prototype.checkForConsumables = function() {
  this.checkHealingPotion();
  this.checkManaPotion();
}

Player.prototype.checkHealingPotion = function() {
  if (this.items.includes(itemMap.healthPotion)) {
   this.hasHealingConsumable = true;
  } else {
    this.hasHealingConsumable = false;
  }
}

Player.prototype.checkManaPotion = function() {
  if (this.items.includes(itemMap.manaPotion)) {
   this.hasManaConsumable = true;
  } else {
    this.hasManaConsumable = false;
  }
}

Player.prototype.useHealthPotion = function() {
  this.removeItem("Health Potion");
  this.hp += itemMap.healthPotion.addHp;

  if (this.hp > this.hpMax) this.hp = this.hpMax;
  battleAlert(this.name + " uses a " + itemMap.healthPotion.name + " and recovers " + itemMap.healthPotion.addHp + " health!");
}

Player.prototype.useManaPotion = function() {
  this.removeItem("Mana Potion");
  this.mp += itemMap.manaPotion.addMp;

  if (this.mp > this.mpMax) this.mp = this.mpMax;
  battleAlert(this.name + " uses a " + itemMap.manaPotion.name + " and recovers " + itemMap.manaPotion.addMp + " mana!");
}

Player.prototype.removeItem = function(itemName) {
  for(var i = 0; i < this.items.length; i++) {
    if (this.items[i].name === itemName) {
      this.items.splice(i, 1);
    }
  }
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

Player.prototype.levelUp = function(level) {
  this.level += 1;
  this.xp = 0;
}

Player.prototype.checkXP = function() {
  if(this.xp === 100) {
    this.levelUp();
    alertSuccess("Level Up! You are now level " + this.level);
  }
}

Player.prototype.upgradeStats = function(item) {
  this.hp -= this.equippdWeapon;
  

  this.hp += item.healthBonus;
  this.mp += item.manaBonus;
  this.ap += item.attackBonus;
  this.sp += item.spellBonus;
}

function createNewPlayer(name) {
  player = new Player(name, roomMap.room1);
  saveGame(player);
  fillCharacterValues(player);
}

function loadPlayer() {
  player = playerFromStorage();
}

function rollDice(maxNumber) {
  var roll = Math.floor(Math.random() * maxNumber);
  return roll;
}
