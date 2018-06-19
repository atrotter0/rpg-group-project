// Item
console.log("item.js loaded!");

var itemMap = {};

function Item(id, name, type, hp, ap, sp, mp) {
  this.id = id;
  this.name = name;
  this.type = type;
  this.addHp = hp;
  this.addAp = ap;
  this.addSp = sp;
  this.addMp = mp;
}

function buildItems() {
  var healPotion1 = new Item("healPotion1", "Health Potion", "Consumable", 5);

  itemMap.healPotion1 = healPotion1;
}
