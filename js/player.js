// Player
console.log("player.js loaded!");

var player = {};

function Player(room) {
  this.name = "";
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
  this.storyChapter = storyMap.chapter1;
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
  if (this.items.includes(itemMap.healthPotion1)) {
   this.hasHealingConsumable = true;
  } else {
    this.hasHealingConsumable = false;
  }
}

Player.prototype.checkManaPotion = function() {
  if (this.items.includes(itemMap.manaPotion1)) {
   this.hasManaConsumable = true;
  } else {
    this.hasManaConsumable = false;
  }
}

Player.prototype.useHealthPotion = function() {
  this.removeItem(itemMap.healthPotion1.name);
  this.hp += itemMap.healthPotion1.addHp;

  if (this.hp > this.hpMax) this.hp = this.hpMax;
  battleAlert(this.name + " uses a " + itemMap.healthPotion1.name + " and recovers " + itemMap.healthPotion1.addHp + " health!");
}

Player.prototype.useManaPotion = function() {
  this.removeItem(itemMap.manaPotion1.name);
  this.mp += itemMap.manaPotion1.addMp;

  if (this.mp > this.mpMax) this.mp = this.mpMax;
  battleAlert(this.name + " uses a " + itemMap.manaPotion1.name + " and recovers " + itemMap.manaPotion1.addMp + " mana!");
}

Player.prototype.removeItem = function(itemName) {
  for(var i = 0; i < this.items.length; i++) {
    if (this.items[i].name === itemName) {
      this.items.splice(i, 1);
    }
  }
}

Player.prototype.checkLoot = function(enemy) {
  const LOOTABLE_ITEMS = enemy.loot.length - 1;
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
  console.log(this.items);
}

Player.prototype.checkClickItem = function() {
  var outcome = rollDice(4);
  if (this.room.id === 1) {
    if (outcome === 1) {
      this.items.push(itemMap.sword1);
    }
    if (outcome === 2) {
      this.items.push(itemMap.staff1);
    }
    if (outcome === 3) {
      this.items.push(itemMap.armor1);
    }
    if (outcome === 4) {
      this.items.push(itemMap.armor2);
    }
  }
  else if (this.room.id === 2) {
    if (outcome === 1) {
      this.items.push(itemMap.midSword1);
    }
    if (outcome === 2) {
      this.items.push(itemMap.midStaff1);
    }
    if (outcome === 3) {
      this.items.push(itemMap.midArmor1);
    }
    if (outcome === 4) {
      this.items.push(itemMap.midArmor2);
    }
  }
}

Player.prototype.checkClickConsumable = function() {
  var outcome = rollDice(2);
  if (this.room.id === 1) {
    if (outcome === 1) {
      this.items.push(itemMap.healthPotion1);
    }
    if (outcome === 2) {
      this.items.push(itemMap.manaPotion1);
    }
  }
}

Player.prototype.levelUp = function(level) {
  this.level += 1;
  this.xp = 0;
}

Player.prototype.checkForLevel = function() {
  if (this.xp >= 100) return true;
}

Player.prototype.startLevelUp = function() {
  newStats.availablePoints = 3;
  this.levelUp();
  alertSuccess("Level Up! You are now level " + this.level);
  runLevelUp();
}

Player.prototype.unEquipItem = function(item) {
  this.hp -= item.healthBonus;
  this.mp -= item.manaBonus;
  this.ap -= item.attackBonus;
  this.sp -= item.spellBonus;
}

Player.prototype.equipItem = function(item) {
  this.hp += newItem.healthBonus;
  this.mp += item.manaBonus;
  this.ap += item.attackBonus;
  this.sp += item.spellBonus;
}

Player.prototype.giveAwardsToPlayer = function(enemy) {
  this.xp += enemy.xp;
  this.checkLoot(enemy);
}

Player.prototype.getLastItem = function() {
  return this.items[this.items.length - 1];
}

function buildPlayer() {
  player = new Player(roomMap.room1);
}

function createNewPlayer(name) {
  player.name = name;
  saveGame(player); 
  fillCharacterValues(player);
}

function loadPlayer() {
  var storedPlayer = playerFromStorage();
  updatePlayerFromStorage(storedPlayer);
}

function updatePlayerFromStorage(storedPlayer) {
  player.name = storedPlayer.name;
  player.level = storedPlayer.level;
  player.hpMax = storedPlayer.hpMax;
  player.hp = storedPlayer.hp;
  player.mpMax = storedPlayer.mpMax;
  player.mp = storedPlayer.mp;
  player.ap = storedPlayer.ap;
  player.sp = storedPlayer.sp;
  player.spells = storedPlayer.spells;
  player.items = storedPlayer.items;
  player.xp = storedPlayer.xp;
  player.room = storedPlayer.room;
  player.equippedWeapon = storedPlayer.equippedWeapon;
  player.equippedArmor = storedPlayer.equippedArmor;
  player.currentEnemy = storedPlayer.currentEnemy;
  player.lastRoom = storedPlayer.lastRoom;
  player.hasHealingConsumable = storedPlayer.hasHealingConsumable;
  player.hasManaConsumable = storedPlayer.hasManaConsumable;
  player.storyChapter = storedPlayer.storyChapter;
}

function rollDice(maxNumber) {
  var roll = Math.floor(Math.random() * maxNumber) + 1;
  return roll;
}
