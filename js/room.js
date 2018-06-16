// Room

function Room(id, name) {
  this.id = id;
  this.name = name;
  this.enemies = [];
  this.items = [];
}

$(document).ready(function() {
  console.log("room.js loaded!");
});