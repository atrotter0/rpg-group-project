// Player

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

$(document).ready(function() {
  console.log("player.js loaded!");
});