function Player(name) {
  this.name = name;
  this.level = 1;
  this.hp = 10;
  this.mp = 20;
  this.ap = 1;
  this.sp = 1;
  this.spells = [];
  this.items = [];
  this.xp = 0;
}

function Spell(id, name, element) {
  this.id = id;
  this.name = name;
  this.element = element;
}

function Enemy(id, name, hp, dmg, xp, loot) {
  this.id = id;
  this.name = name;
  this.hp = hp;
  this.dmg = dmg;
  this.xp = xp;
  this.loot = [];
  this.gp = 1;
}

function Item(id, name, type, hp, ap, sp, mp) {
  this.id = id;
  this.name = name;
  this.type = type;
  this.addHp = hp;
  this.addAp = ap;
  this.addSp = sp;
  this.addMp = mp;
}

function Consumable(id, name, hp, mp, xp) {
  this.id = id;
  this.name = name;
  this.restoreHp = hp;
  this.restoreMp = mp;
  this.giveXp = xp;
}

function Room(id, name) {
  this.id = id;
  this.name = name;
  this.enemies = [];
  this.items = [];
}

function Story() {
  this.chapters = [];
}

function Chapter(title) {
  this.title = title;
  this.text = [];
}

//object instantiation examples:
var firebolt1 = new Spell("firebolt1", "Firebolt", "Fire");
var armor1 = new Item("armor1", "Mythril Plate", "Armor", 1, 0, 0, 0);
var staff1 = new Item("staff1", "Staff of the Magi", "Weapon", 0, 0, 5, 5);
var potion1 = new Consumable("potion1", "Potion of Healing", 5, 0, 0);
var snake1 = new Enemy("snake1", "Poisonous Snake", 3, 1, 1, [potion1]);
var room1 = new Room("room1", "Dark Cavern", [snake1], [potion1, armor1]);
var player = new Player("Test");
player.spells.push(firebolt1);
