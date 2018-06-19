// Enemy
console.log("enemy.js loaded!");

var enemyMap = {};

function Enemy(id, name, hp, dmg, xp, loot) {
  this.id = id;
  this.name = name;
  this.hpMax = hp;
  this.hp = this.hpMax;
  this.dmg = dmg;
  this.xp = xp;
  this.loot = [];
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

  enemyMap.enemy1 = enemy1;
  enemyMap.enemy2 = enemy2;
}
