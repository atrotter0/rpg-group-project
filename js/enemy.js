// Enemy
console.log("enemy.js loaded!");

function EnemyDictionary() {
  this.enemies = [];
  this.populateEnemies();
}

EnemyDictionary.prototype.populateEnemies = function() {
  var items = new ItemDictionary();
  var tier1 = new Enemy(1, "Skeletal Warrior", 15, 4, 20, items.fetchLevelSpecificItems(1));
  var tier2 = new Enemy(2, "Meat Banshee", 25, 7, 20, items.fetchLevelSpecificItems(2));
  var tier3 = new Enemy(3, "Drop Bear", 40, 10, 20, items.fetchLevelSpecificItems(3));
  var boss = new Enemy(4, "Franz", 75, 15, 20, items.fetchLevelSpecificItems(3));

  this.enemies.push(tier1, tier2, tier3, boss);

}



function Enemy(id, name, hp, dmg, xp, loot) {
  this.id = id;
  this.name = name;
  this.hp = hp;
  this.dmg = dmg;
  this.xp = xp;
  this.loot = loot;
  this.gp = 1;
}
