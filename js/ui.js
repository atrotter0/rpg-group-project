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

function hideCurrentScreen() {
  $(".current-screen").hide().removeClass("current-screen");
}

function showBattleScreen() {
  $("#battle-screen").addClass("current-screen").show();
}

$(document).ready(function() {
  console.log("ui.js loaded!");

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

  $(".enemy").click(function() {
    var enemy = new Enemy("Franz");
    startBattle(enemy);
  });

  $("#attack").click(function() {
    playerAttacks();
  });

  $("#spell").click(function() {
    playerCastSpell();
  });

  $("#item").click(function() {

  });

  $("#run").click(function() {

  });
});
