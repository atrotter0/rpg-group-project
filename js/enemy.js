// Enemy
console.log("enemy.js loaded!");

var enemyMap = {};

// Enemy Constructor
function Enemy(id, tier, name, hp, dmg, xp, gold) {
  this.id = id;
  this.tier = tier;
  this.name = name;
  this.hpMax = hp;
  this.hp = this.hpMax;
  this.dmg = dmg;
  this.xp = xp;
  this.goesFirst = true;
  this.loot = itemMap.fetchLevelSpecificItems(this.tier);
  this.gold = gold;
}

// Enemy Map Constructor
function EnemyMap() {
  this.populateEnemies();
}

// Populates map with a predefined list of enemies set by tier (id, tier, name, hp, dmg, xp, loot)
EnemyMap.prototype.populateEnemies = function() {
  //Room 1 Enemies
  var enemy1 = new Enemy(1, 1, "Skeleton Guard", 5, 1, 50, 10);
  var enemy2 = new Enemy(2, 1, "Skeleton Guard", 5, 1, 50, 10);

  //Room 2 Enemies
  var enemy3 = new Enemy(3, 2, "Skeleton Warrior", 10, 2, 65, 25);
  var enemy4 = new Enemy(4, 2, "Skeleton Warrior", 10, 2, 65, 25);
  var enemy5 = new Enemy(5, 2, "Skeleton Warlord", 15, 3, 80, 25);
  var enemy6 = new Enemy(6, 3, "Troll King", 25, 5, 150, 100);

  this.enemy1 = enemy1;
  this.enemy2 = enemy2;
  this.enemy3 = enemy3;
  this.enemy4 = enemy4;
  this.enemy5 = enemy5;
  this.enemy6 = enemy6;
}

function buildEnemies() {
  enemyMap = new EnemyMap();
}

// Lowers Player HP when attacked by enemy during battle
Enemy.prototype.enemyAttack = function() {
  player.hp -= this.dmg;
  battleAlert(this.name + " hits you for " + this.dmg + " damage!");
}

// Checks if an enemy is dead during battle
Enemy.prototype.isDead = function() {
  if (this.hp <= 0) return true;
}
