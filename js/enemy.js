// Enemy
console.log("enemy.js loaded!");

function Enemy(id, name, hp, dmg, xp, loot) {
  this.id = id;
  this.name = name;
  this.hp = hp;
  this.dmg = dmg;
  this.xp = xp;
  this.loot = [];
  this.gp = 1;
}
