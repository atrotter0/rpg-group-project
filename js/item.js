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
  var item1 = new Item("item1", "Basic Sword", "Weapon", 0, 2, 0, 0);
  var item2 = new Item("item2", "Health Potion", "Consumable", 10, 0, 0, 0);

  itemMap.item1 = item1;
  itemMap.item2 = item2;
}
