// Player
console.log("player.js loaded!");

var player = {};

function Player(name, room) {
  this.name = name;
  this.level = 1;
  this.hp = 10;
  this.dead = false;
  this.mp = 20;
  this.ap = 1;
  this.sp = 1;
  this.spells = [];
  this.items = [];
  this.xp = 0;
  this.room = room;
}

Player.prototype.levelUp = function(level) {
  this.level += 1;
  this.xp = 0;
  this.hp = 15 * level;
  this.mp = 3 * level;
  this.ap = 1 * level;
  this.sp = 1 * level;
}

Player.prototype.checkDead = function() {
  if(this.hp === 0) {
    return true;
  } else {
    return false;
  }
}

Player.prototype.hitSomething = function(mob) {
  const minAttack = (this.ap * .5);
  const maxAttack = this.ap;
  var rolld10 = (Math.floor((Math.random() * (maxAttack - minAttack) + minAttack)));
  var damage = this.ap * rolld10;
  if(miss()){
    damage = 0;
  }
  mob.hp -= damage;
}

Player.prototype.upgradeStats = function(item) {
  this.hp += item.healthBonus;
  this.mp += item.manaBonus;
  this.ap += item.attackBonus;
  this.sp += item.spellBonus;
}

function displayCharacterScreen(player) {
  $("#stats-area").append("Name: " + player.name);
  $("#stats-area").append("Level: " + player.level);
  $("#stats-area").append("Hit Points: " + player.hp);
  $("#stats-area").append("Mana Points: " + player.mp);
  $("#stats-area").append("Attack Power: " + player.ap);
  $("#stats-area").append("Spell Power: " + player.sp);
  $("#stats-area").append("Experience Points: " + player.xp);

  player.items.forEach(function(item){
    $("ul#inventory-list").append("<li>" + item + "</li>");
  })

}
function createNewPlayer(name) {
  player = new Player(name, roomMap.room1);
  saveGame(player);
}

function loadPlayer() {
  player = playerFromStorage();
}
