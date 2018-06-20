// Room
console.log("room.js loaded!");

var roomMap = {};

function Room(id, name, enemies, items, doors) {
  this.id = id;
  this.name = name;
  this.enemies = enemies;
  this.items = items;
  this.doors = doors;
}

function buildRooms() {
  var room1 = new Room("room1", "Dungeon", [enemyMap.enemy1, enemyMap.enemy2], [itemMap.item1, itemMap.item2], []);
  var room2 = new Room("room2", "Dungeon", [enemyMap.enemy1, enemyMap.enemy2, enemyMap.enemy3, enemyMap.enemy4], [itemMap.item3], []);

  roomMap.room1 = room1;
  roomMap.room2 = room2;

}


function createRoomEnemyClicks(room) {
  room.enemies.forEach(function(enemy) {
    $("#" + room.id + "-" + enemy.id).click(function() {
      alertError(enemy.name + " begins attacking you!!!");
      //runbattle function
    });
  });
}

//fix this to work with new inventory
function createRoomItemClicks(room) {
  // room.items.forEach(function(item) {
  //   $("#" + room.id + "-" + item.id).click(function() {
  //     alertError("You found a " + item.name + ".");
  //   });
  // });
}

function createRoomDoorClicks(room) {
  room.doors.forEach(function(door) {
    $("#" + room.id + "-" + doors).click(function(){
      //load next room (door.id)
    });
  });
}
