// Room
console.log("room.js loaded!");

var roomMap = {};

function Room(id, name) {
  this.id = id;
  this.name = name;
  this.enemies = [];
  this.items = [];
}

function buildRooms() {
  var room1 = new Room("room1", "A Dark Cavern");
  var room2 = new Room("room2", "A Dark Tunnel");

  roomMap.room1 = room1;
  roomMap.room2 = room2;
}
