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


var enemyMap = {};


function Enemy(id, name, hp, dmg, xp, loot) {
  this.id = id;
  this.name = name;
  this.hpMax = hp;
  this.hp = this.hpMax;
  this.dmg = dmg;
  this.xp = xp;
  this.loot = loot;
  this.gp = 1;
  this.goesFirst = true;
}

Enemy.prototype.enemyAttack = function() {
  player.hp -= this.dmg;
  battleAlert(this.name + " hits you for " + this.dmg + " damage!");
}

Enemy.prototype.isDead = function() {
  if (this.hp <= 0) return true;
}


function buildEnemies() {
  var enemy1 = new Enemy("enemy1", "Zombie", 5, 1);
  var enemy2 = new Enemy("enemy2", "Zombie", 5, 1);
  var enemy3 = new Enemy("enemy3", "Zombie", 5, 1);
  var enemy4 = new Enemy("enemy4", "Troll", 10, 2);

  enemyMap.enemy1 = enemy1;
  enemyMap.enemy2 = enemy2;
  enemyMap.enemy3 = enemy3;
  enemyMap.enemy4 = enemy4;
}
