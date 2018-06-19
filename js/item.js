
var items = {};

// Item

// Item Dictionary
function ItemDictionary() {
  this.populateItems();
}

ItemDictionary.prototype.addItem = function(item) {
  this.items.push(item);
}

ItemDictionary.prototype.fetchItemByName = function(itemName) {
  var item = {};

  for(i = 0; i < this.items.length; i++) {
    if(this.items[i].name === itemName) {
      item = this.items[i];
    }
  }

  return item;
}

ItemDictionary.prototype.fetchItemById = function(itemId) {
  var item = {};

  for(i = 0; i < this.items.length; i++) {
    if(this.items[i].id === parseInt(itemId)) {
      item = this.items[i];
    }
  }

  return item;
}


ItemDictionary.prototype.fetchLevelSpecificItems = function(level) {
  var itemArray = [];

  for(var item in this) {
    if(this[item].level === level) {
      itemArray.push(this[item]);
    }
  }

  return itemArray;
}

// Populate dictionary with a predefined list of items
ItemDictionary.prototype.populateItems = function() {
  var sword1 = new Item(1, "Sword of Woe", "Weapon", 1, 1, 3, 0, 0);
  var staff1 = new Item(2, "Staff of Wizardry", "Weapon", 1, 0, 0, 3, 1);
  var midSword1 = new Item(3, "Warrior's Blade", "Weapon", 2, 2, 5, 0, 0);
  var midStaff1 = new Item(4, "Staff of Conjured Dreams", "Weapon", 2, 0, 0, 5, 2);
  var epicSword1 = new Item(5, "Sword of A Thousand Truths", "Weapon", 3, 3, 5, 0, 0);
  var epicStaff1 = new Item(6, "Grand Magus Staff", "Weapon", 3, 0, 0, 5, 3);
  var armor1 = new Item(7, "Sturdy Hauberk", "Armor", 1, 1, 0, 0, 0);
  var armor2 = new Item(8, "Apprentice Garb", "Armor", 1, 0, 0, 0, 1);
  var midArmor1 = new Item(9, "Veteran's Breastplate", "Armor", 2, 3, 2, 0, 0);
  var midArmor2 = new Item(10, "Wizard's Robe", "Armor", 2, 0, 0, 2, 3);
  var epicArmor1 = new Item(11, "Cuirass of The Colossus", "Armor", 3, 8, 4, 0, 0);
  var epicArmor2 = new Item(12, "Robe of Seething Power", "Armor", 3, 0, 0, 4, 8);

  this.sword1 = sword1;
  this.staff1 = staff1;
  this.midSword1 = midSword1;
  this.midStaff1 = midStaff1;
  this.epicSword1 = epicSword1;
  this.epicStaff1 = epicStaff1;
  this.armor1 = armor1;
  this.armor2 = armor2;
  this.midArmor1 = midArmor1;
  this.midArmor2 = midArmor2;
  this.epicArmor1 = epicArmor1;
  this.epicArmor2 = epicArmor2;
}
// Populate dictionary with a predefined list of items
ItemDictionary.prototype.populateItems = function() {
  var sword1 = new Item(1, "Sword of Woe", "Weapon", 1, 3, 0, 0);
  var staff1 = new Item(2, "Staff of Wizardry", "Weapon", 0, 0, 3, 1);
  var midSword1 = new Item(3, "Warrior's Blade", "Weapon", 2, 5, 0, 0);
  var midStaff1 = new Item(4, "Staff of Conjured Dreams", "Weapon", 0, 0, 5, 2);
  var epicSword1 = new Item(5, "Sword of A Thousand Truths", "Weapon", 3, 5, 0, 0);
  var epicStaff1 = new Item(6, "Grand Magus Staff", "Weapon", 0, 0, 5, 3);
  var armor1 = new Item(7, "Sturdy Halberk", "Armor", 1, 0, 0, 0);
  var armor2 = new Item(8, "Apprentice Garb", "Armor", 0, 0, 0, 1);
  var midArmor1 = new Item(9, "Veteran's Breastplate", "Armor", 3, 2, 0, 0);
  var midArmor2 = new Item(10, "Wizard's Robe", "Armor", 0, 0, 2, 3);
  var epicArmor1 = new Item(11, "Cuirass of The Colossus", "Armor", 8, 4, 0, 0);
  var epicArmor2 = new Item(12, "Robe of Seething Power", "Armor", 0, 0, 4, 8);

  this.sword1 = sword1;
  this.staff1 = staff1;
}

// Item Constructor

function Item(id, name, type, level, hp, ap, sp, mp) {
  this.id = id; // Unique single digit number (e.g, 3)
  this.name = name; // String (e.g, "Sword of Woe")
  this.type = type; // "Weapon" or "Armor"
  this.level = level;
  this.healthBonus = hp;
  this.attackBonus = ap;
  this.spellBonus = sp;
  this.manaBonus = mp;
}
