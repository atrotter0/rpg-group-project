// Item
console.log("item.js loaded!");

var itemMap = {};

function Item(id, name, type, hp, mp, ap, sp) {
  this.id = id;
  this.name = name;
  this.type = type;
  this.addHp = hp;
  this.addAp = ap;
  this.addSp = sp;
  this.addMp = mp;
}

function buildItems() {
  var healthPotion = new Item("healthPotion", "Health Potion", "Consumable", 5);
  var manaPotion = new Item("manaPotion", "Mana Potion", "Consumable", 0, 5);

  itemMap.healthPotion = healthPotion;
  itemMap.manaPotion = manaPotion;
}
