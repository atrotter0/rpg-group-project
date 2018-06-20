// Room
console.log("room.js loaded!");

var roomMap = {};

// Room Constructor
function Room(id, name, enemies, items, doors) {
  this.id = id;
  this.name = name;
  this.enemies = enemies;
  this.items = items;
  this.doors = doors;
}

// Room Map Constructor
function RoomMap() {
  this.populateRooms();
}

// Populates Room Map with predefined rooms (id, name, enemies, items, doors)
RoomMap.prototype.populateRooms = function() {
  var room1 = new Room(1, "Dungeon", [enemyMap.enemy1, enemyMap.enemy2], itemMap.fetchLevelSpecificItems(1), 1);
  var room2 = new Room(2, "Dungeon", [enemyMap.enemy3, enemyMap.enemy4, enemyMap.enemy5, enemyMap.enemy6], itemMap.fetchLevelSpecificItems(2), 2);

  this.room1 = room1;
  this.room2 = room2;
}

function buildRooms() {
  roomMap = new RoomMap();
}


// Creates the click events for enemies in a room
function createRoomEnemyClicks(room) {
  room.enemies.forEach(function(enemy) {
    $("#room" + room.id + "-enemy" + enemy.id).click(function() {
      alertError(enemy.name + " begins attacking you!!!");
      //runbattle function
    });
  });
}

// Creates the click events for items in a room and puts that item in the user's inventory
function createRoomItemClicks(room) {
  room.items.forEach(function(item) {
    $("#room" + room.id + "-item" + item.id).click(function() {
      player.checkClickItem();
      alertError("You found a " + player.items[player.items.length - 1].name + ".");
    });
  });
}

function createRoomDoorClicks(room) {
  room.doors.forEach(function(door) {
    $("#" + room.id + "-" + doors).click(function(){
      //load next room (door.id)
    });
  });
}
