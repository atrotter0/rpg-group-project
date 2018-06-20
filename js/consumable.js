// Consumable
console.log("consumable.js loaded!");

function Consumable(id, name, hp, mp, xp) {
  this.id = id;
  this.name = name;
  this.restoreHp = hp;
  this.restoreMp = mp;
  this.giveXp = xp;
}
