// Room
console.log("room.js loaded!");

var roomMap = {};

// Room Constructor
function Room(id, name, enemies) {
  this.id = id;
  this.name = name;
  this.enemies = enemies;
  this.story = "";
}

// Room Map Constructor
function RoomMap() {
  this.populateRooms();
}

// Populates Room Map with predefined rooms (id, name, enemies, doors)
RoomMap.prototype.populateRooms = function() {
  var room1 = new Room(1, "Dungeon", [enemyMap.enemy1, enemyMap.enemy2]);
  room1.story = "Find your way out of the dungeon!"
  var room2 = new Room(2, "Dungeon", [enemyMap.enemy3, enemyMap.enemy4, enemyMap.enemy5, enemyMap.enemy6]);
  room2.story = "Oh, no! The troll king is guarding the exit!"

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


// Creates the click events for items doors hero and traps in a room
function createItemClickEvents() {
  //First Room
  $("#room1-item1").click(function(){
    if (enemyMap.enemy2.isDead()) {
      player.checkClickItem();
      alertRoom("You found a " + player.items[player.items.length - 1].name + ".");
      $("#room1-item1").off("click");
      $("#room1-item1").css({'cursor' : "url('img/gauntlet_mouse.png') 10 10, pointer"});
    }
    else {
      alertRoom("Can't access, an enemy is in your path!")
    }
  });

  $("#room1-item2").click(function(){
      player.checkClickConsumable();
      alertRoom("You found a " + player.items[player.items.length - 1].name + ".");
      $("#room1-item2").off("click");
      $("#room1-item2").css({'cursor' : "url('img/gauntlet_mouse.png') 10 10, pointer"});
  });

  $("#room2-item3").click(function(){
    if (enemyMap.enemy4.isDead() && enemyMap.enemy5.isDead()) {
      player.checkClickItem();
      alertRoom("You found a " + player.items[player.items.length - 1].name + ".");
      $("#room2-item3").off("click");
      $("#room2-item3").css({'cursor' : "url('img/gauntlet_mouse.png') 10 10, pointer"});
    }
    else {
      alertRoom("Can't access, enemies guard the area!")
    }
  });
}

function createDoorClickEvents() {
  $("#room1-door1").click(function() {
    if (enemyMap.enemy1.isDead() && enemyMap.enemy2.isDead()) {
      player.lastRoom = player.room;
      player.room = roomMap.room2;
      hideCurrentScreen();
      $("#room-2").show().addClass("current-screen");
      alertRoom(player.room.story);
    }
    else {
      alertRoom("Can't leave, the enemies won't let you!")
    }
  });

  $("#room2-door2").click(function() {
    player.lastRoom = player.room;
    player.room = roomMap.room1;
    hideCurrentScreen();
    $("#room-1").show().addClass("current-screen");
    alertRoom(player.room.story);
  });

  $("#room2-door3").click(function() {
    if (enemyMap.enemy3.isDead() && enemyMap.enemy4.isDead() && enemyMap.enemy5.isDead() && enemyMap.enemy6.isDead()) {
      saveGame(player);
      showWinScreen();
    }
    else {
      alertRoom("Can't leave, the enemies won't let you!")
    }

  });
}

function createTrapClickEvents() {
  $("#room2-trap1").click(function(){
    var spikeDamage = player.hpMax * 0.25;
    player.hp = player.hp - spikeDamage;
    alertRoom("You stepped on a spike trap and lost " + spikeDamage + " health!");
    setTimeout(function() { checkPlayerDead(); }, 2000);
  });
}

function createHeroClickEvents() {
  $("#room1-hero").click(function(){
    alertRoom("You opened your inventory.");
    //show inventory
  });

  $("#room2-hero").click(function(){
    alertRoom("You opened your inventory.");
    //show inventory
  });
}
