// Enemy
console.log("enemy.js loaded!");

enemyMap = {};

function Enemy(id, name, hp, dmg, xp, loot) {
  this.id = id;
  this.name = name;
  this.hp = hp;
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
  var enemy1 = new Enemy("enemy1", "Franz", 5, 1);

  enemyMap.enemy1 = enemy1;
}
