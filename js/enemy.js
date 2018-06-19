// Enemy
console.log("enemy.js loaded!");
var enemy = {};

function EnemyDictionary() {
  this.populateEnemies();
}

EnemyDictionary.prototype.populateEnemies = function() {
  var tier1 = new Enemy(1, "Skeletal Warrior", 15, 4, 5, items.fetchLevelSpecificItems(1));
  var tier2 = new Enemy(2, "Cave Troll", 25, 7, 10, items.fetchLevelSpecificItems(2));
  var tier3 = new Enemy(3, "Crusader", 40, 10, 20, items.fetchLevelSpecificItems(3));
  var boss = new Enemy(4, "Franz", 75, 15, 20, items.fetchLevelSpecificItems(3));

  this.tier1 = tier1;
  this.tier2 = tier2;
  this.tier3 = tier3;
  this.boss = boss;

}

function Enemy(id, name, hp, dmg, xp, loot) {
  this.id = id;
  this.name = name;
  this.hp = hp;
  this.dmg = dmg;
  this.xp = xp;
  this.loot = loot;
}
