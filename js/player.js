// Player
console.log("player.js loaded!");

var player = {};

function Player(room) {
  this.name = "";
  this.level = 1;
  this.hpMax = 15;
  this.hp = this.hpMax;
  this.mpMax = 20;
  this.mp = this.mpMax;
  this.ap = 2;
  this.sp = 3;
  this.spells = ["Firebolt"];
  this.items = [];
  this.xp = 0;
  this.room = room;
  this.currentEnemy = {};
  this.lastRoom = "";
  this.hasHealingConsumable = false;
  this.hasManaConsumable = false;
  this.nextLevel = 100;
  this.equippedWeapon = "";
  this.equippedArmor = "";
  this.gold = 0;
  this.lastLootAwarded = "";
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
  var counter = 1;

  while(!uniqueItem && counter <= itemMap.maxRollsAllowed()) {
    var randomNumber = rollForItem(LOOTABLE_ITEMS);
    counter++;

    if (this.items.includes(enemy.loot[randomNumber])) {
      console.log("skip");
      console.log(enemy.loot[randomNumber]);
      continue;
    } else {
      this.items.push(enemy.loot[randomNumber]);
      console.log(enemy.loot[randomNumber]);
      this.lastLootAwarded = enemy.loot[randomNumber].name;
      uniqueItem = true;
    }
  }
  this.makeDuplicateRoll(counter, enemy);
}

Player.prototype.makeDuplicateRoll = function(counter, enemy) {
  if (counter >= itemMap.maxRollsAllowed()) this.rewardGold(enemy);
}

Player.prototype.rewardGold = function(enemy) {
  console.log("Rewarding gold instead of duplicate item...");
  var randomGold = rollDice(enemy.gold);
  this.gold += randomGold;
  this.lastLootAwarded = randomGold + " gold";
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
  if (this.xp >= this.nextLevel) return true;
}

Player.prototype.startLevelUp = function() {
  this.nextLevel = this.nextLevel * 2;
  newStats.availablePoints = 3;
  this.levelUp();
  alertSuccess("Level Up! You are now level " + this.level);
  runLevelUp();
}

Player.prototype.giveAwardsToPlayer = function(enemy) {
  this.xp += enemy.xp;
  this.lootAwarded = this.checkLoot(enemy);
}

Player.prototype.getLastItem = function() {
  return this.items[this.items.length - 1];
}

Player.prototype.rebuildItems = function() {
  for (var i = 0; i < this.items.length; i++) {
    var item = this.items[i];
    if (item.id === itemMap[item.id].id) {
      this.items[i] = itemMap[item.id];
      this.recallEquippedWeapon();
      this.recallEquippedArmor();
    }
  }
}

Player.prototype.runEquip = function(itemName) {
  var item = getItemFromItemName(itemName);
  if (item.type !== "Consumable" && item.equipped) {
    this.unEquipItem(item);
  } else if (item.type !== "Consumable" && !item.equipped) {
    this.unEquipItem(item);
    this.equipItem(item);
  }
}

Player.prototype.equipItem = function(item) {
  if (item.type === "Weapon") {
    this.equippedWeapon = item.name;
  } else {
    this.equippedArmor = item.name;
  }
  this.updateEquippedItem(item, true);
  this.addItemStats(item);
}

Player.prototype.unEquipItem = function(item) {
  var oldWeapon = getItemFromItemName(this.equippedWeapon);
  var oldArmor = getItemFromItemName(this.equippedArmor);
  if (item.type === "Weapon") {
    if (oldWeapon !== undefined) this.updateAndRemove(oldWeapon, false);
    this.equippedWeapon = "";
  } else {
    if (oldArmor !== undefined) this.updateAndRemove(oldArmor, false);
    this.equippedArmor = "";
  }
}

Player.prototype.updateAndRemove = function(item, equippedValue) {
  this.updateEquippedItem(item, equippedValue);
  this.removeItemStats(item);
}

Player.prototype.addItemStats = function(item) {
  this.hpMax += item.addHp;
  this.hp += item.addHp;
  this.mpMax += item.addMp;
  this.mp += item.addMp;
  this.ap += item.attackBonus;
  this.sp += item.spellBonus;
  adjustCharacterStats();
}

Player.prototype.removeItemStats = function(item) {
  this.hpMax -= item.addHp;
  this.hp -= item.addHp;
  this.mpMax -= item.addMp;
  this.mp -= item.addMp;
  this.ap -= item.attackBonus;
  this.sp -= item.spellBonus;
  adjustCharacterStats();
}

Player.prototype.updateEquippedItem = function(item, equippedValue) {
  for (var i = 0; i < player.items.length; i++) {
    if (item === player.items[i]) {
      player.items[i].equipped = equippedValue;
    }
  }
}

Player.prototype.recallEquippedWeapon = function() {
  for (var i = 0; i < player.items.length; i++) {
    if (player.items[i].name === player.equippedWeapon) {
      player.items[i].equipped = true;
      break;
    }
  }
}

Player.prototype.recallEquippedArmor = function() {
  for (var i = 0; i < player.items.length; i++) {
    if (player.items[i].name === player.equippedArmor) {
      player.items[i].equipped = true;
      break;
    }
  }
}

function getItemFromItemName(name) {
  for (var i = 0; i < player.items.length; i++) {
    if (name === player.items[i].name) return player.items[i];
  }
}

function getIdFromItemName(name) {
  for (var i = 0; i < player.items.length; i++) {
    if (player.items[i].name === name) return player.items[i].id;
  }
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
  player.currentEnemy = storedPlayer.currentEnemy;
  player.lastRoom = storedPlayer.lastRoom;
  player.hasHealingConsumable = storedPlayer.hasHealingConsumable;
  player.hasManaConsumable = storedPlayer.hasManaConsumable;
  player.nextLevel = storedPlayer.nextLevel;
  player.equippedWeapon = storedPlayer.equippedWeapon;
  player.equippedArmor = storedPlayer.equippedArmor;
  player.gold = storedPlayer.gold;
  player.lastLootAwarded = storedPlayer.lastLootAwarded;

  player.rebuildItems();
}

// returns a random number between 0 and maxNumber
function rollForItem(maxNumber) {
  var roll = Math.floor(Math.random() * maxNumber);
  return roll;
}

// returns a random number between 1 and maxNumber
function rollDice(maxNumber) {
  var roll = Math.floor(Math.random() * maxNumber) + 1;
  return roll;
}

function refillHpMp() {
  player.hp = player.hpMax;
  player.mp = player.mpMax;
}

