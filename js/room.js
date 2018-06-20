// Room
console.log("room.js loaded!");

var roomMap = {};

// Room Constructor
function Room(id, name, enemies) {
  this.id = id;
  this.name = name;
  this.enemies = enemies;
}

// Room Map Constructor
function RoomMap() {
  this.populateRooms();
}

// Populates Room Map with predefined rooms (id, name, enemies, doors)
RoomMap.prototype.populateRooms = function() {
  var room1 = new Room(1, "Dungeon", [enemyMap.enemy1, enemyMap.enemy2]);
  var room2 = new Room(2, "Dungeon", [enemyMap.enemy3, enemyMap.enemy4, enemyMap.enemy5, enemyMap.enemy6]);

  this.room1 = room1;
  this.room2 = room2;
}

function buildRooms() {
  roomMap = new RoomMap();
}

function grabEnemyId(element) {
  var enemyId = $(element).attr("id");
  enemyId = enemyId.split("-")[1];
  return enemyId;
}


// Creates the click events for enemies in a room
function createItemClickEvents() {
  //First Room
  $("#room1-item1").click(function(){
    player.checkClickItem();
    alertRoom("You found a " + player.items[player.items.length - 1].name + ".");
    $("#room1-item1").off("click");
    $("#room1-item1").css({'cursor' : 'default'});

  });

  $("#room1-item2").click(function(){
    player.checkClickConsumable();
    alertRoom("You found a " + player.items[player.items.length - 1].name + ".");
    $("#room1-item2").off("click");
    $("#room1-item2").css({'cursor' : 'default'});
  });

  //Second Room
  $("#room2-item3").click(function(){
    player.checkClickItem();
    alertRoom("You found a " + player.items[player.items.length - 1].name + ".");
  });
}

function createDoorClickEvents() {
  $("#room1-door1").click(function(){
    player.lastRoom = player.room;
    player.room = roomMap.room2;
    hideCurrentScreen();
    $("#room-2").show().addClass("current-screen");
  });

  $("#room2-door2").click(function(){
    player.lastRoom = player.room;
    player.room = roomMap.room1;
    hideCurrentScreen();
    $("#room-1").show().addClass("current-screen");
  });

  $("#room2-door3").click(function(){
    player.lastRoom = player.room;
    player.room = roomMap.room3;
    hideCurrentScreen();
    $("#room-3").show().addClass("current-screen");
  });
}
