// Room
console.log("room.js loaded!");

var roomMap = {};

// Room Constructor
function Room(id, name, enemies, doors) {
  this.id = id;
  this.name = name;
  this.enemies = enemies;
  this.doors = doors;
}

// Room Map Constructor
function RoomMap() {
  this.populateRooms();
}

// Populates Room Map with predefined rooms (id, name, enemies, doors)
RoomMap.prototype.populateRooms = function() {
  var room1 = new Room(1, "Dungeon", [enemyMap.enemy1, enemyMap.enemy2], 1);
  var room2 = new Room(2, "Dungeon", [enemyMap.enemy3, enemyMap.enemy4, enemyMap.enemy5, enemyMap.enemy6], 2);

  this.room1 = room1;
  this.room2 = room2;
}

function buildRooms() {
  roomMap = new RoomMap();
}


// Creates the click events for enemies in a room
function createEnemyClickEvents() {
  //First Room
  $("#room1-enemy1").click(function(){
    alertError(enemyMap.enemy1.name + " is attacking you!");
    // runbattle function
  });

  $("#room1-enemy2").click(function(){
    alertError(enemyMap.enemy2.name + " is attacking you!");
    // runbattle function
  });

  //Second Room
  $("#room2-enemy3").click(function(){
    alertError(enemyMap.enemy3.name + " is attacking you!");
    // runbattle function
  });

  $("#room2-enemy4").click(function(){
    alertError(enemyMap.enemy4.name + " is attacking you!");
    // runbattle function
  });

  $("#room2-enemy5").click(function(){
    alertError(enemyMap.enemy5.name + " is attacking you!");
    // runbattle function
  });

  $("#room2-enemy6").click(function(){
    alertError(enemyMap.enemy6.name + " is attacking you!");
    // runbattle function
  });
}

// Creates the click events for enemies in a room
function createItemClickEvents() {
  //First Room
  $("#room1-item1").click(function(){
    player.checkClickItem();
    alertSuccess("You found a " + player.items[player.items.length - 1].name + ".");
  });

  $("#room1-item2").click(function(){
    player.checkClickConsumable();
    alertSuccess("You found a " + player.items[player.items.length - 1].name + ".");
  });

  //Second Room
  $("#room2-item3").click(function(){
    player.checkClickItem();
    alertSuccess("You found a " + player.items[player.items.length - 1].name + ".");
  });
}


//1 2 7 8 13 14
//Create click events for items
Room.prototype.createClickEvents = function() {
  $("#room" + this.id + "-item1").click(function() {
      player.checkClickItem();
      alertError("You found a " + player.items[player.items.length - 1].name + ".");
  });
}

// Creates the click events for items in a room and puts that item in the user's inventory
// function createRoomItemClicks(room) {
//   $("#room" + room.id + "-item1").click(function() {
//       player.checkClickItem();
//       alertError("You found a " + player.items[player.items.length - 1].name + ".");
//   });
//
//   $("#room" + room.id + "-item1").click(function() {
//       player.checkClickItem();
//       alertError("You found a " + player.items[player.items.length - 1].name + ".");
//   });


function createRoomDoorClicks(room) {
  room.doors.forEach(function(door) {
    $("#" + room.id + "-" + doors).click(function(){
      //load next room (door.id)
    });
  });
}
