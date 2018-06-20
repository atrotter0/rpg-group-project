// UI

function hideMenuOptions() {
  $("#new-game").hide();
  $("#load-game").hide();
}

function displayNewGameBox() {
  $("#new-game-box").show();
}

function runNewGame(playerName) {
  if (!validate(playerName)) return alertError("You need to enter a valid name.");

  createNewPlayer(playerName, roomMap.room1);
  alertSuccess("Game data for [ " + player.name + " ] created!");
  //fadeOut();
  //startStory();
}

function validate(value) {
  if (value !== "") return true;
}

function alertError(msg) {
  $("#alert-field").hide().text(msg).removeClass("alert-success")
    .addClass("alert-danger").fadeIn(800).delay(3000).fadeOut(1000);
}

function alertSuccess(msg) {
  $("#alert-field").hide().text(msg).removeClass("alert-danger")
    .addClass("alert-success").fadeIn(800).delay(3000).fadeOut(1000);
}

function showRoom(player) {
  var roomId = player.room;
}

/*--------------------------
INVENTORY SCREEN FUNCTIONS -
--------------------------*/

function displayEquippedItems(player) {
  $("#equipped-weapon-text").text(player.equippedWeapon.name);
  $("#equipped-armor-text").text(player.equippedArmor.name);

  player.items.forEach(function(item, index) {
    $("#slot" + index).append(item.icon);
  });
}

function fillCharacterValues(player) {
  $("#char-name").text(player.name);
  $("#health-points-indicator").text(player.hp);
  $("#mana-points-indicator").text(player.mp);
  $("#attack-power-indicator").text(player.ap);
  $("#spell-power-indicator").text(player.sp);
  $("#experience-indicator").text(player.xp);
}

function showCharacterScreen() {
  $(".character-screen").hide().fadeIn(1000);
  $(".inventory-menu").hide().fadeIn(1000);
}

function hideCharacterScreen() {
  $(".character-screen").hide();
  $(".inventory-menu").hide();
}



$(document).ready(function() {
  console.log("ui.js loaded!");
  //hideCharacterScreen();


  $("#new-game").click(function() {
    hideMenuOptions();
    displayNewGameBox();
  });

  $("#confirm-name").click(function() {
    var playerName = $("#main-menu-player-name").val();
    runNewGame(playerName);
  });

  $("#load-game").click(function() {
    loadPlayer();
  });
});
