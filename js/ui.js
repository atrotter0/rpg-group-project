// UI

function hideMenuOptions() {
  $("#new-game").hide();
  $("#load-game").hide();
}

function displayNewGameBox() {
  $("#new-game-box").show();
}

function runNewGame(playerName) {
  if (!validate(playerName)) alertError("You need to enter a valid name.");
  createNewPlayer(playerName, roomMap.room1);
  //showRoom(player);
}

function validate(value) {
  if (value !== "") return true;
}

function alertError(msg) {
  $("#alert-field").text(msg).removeClass("alert-success").addClass("alert-danger").fadeIn(800).delay(3000).fadeOut(1000);
}

function showRoom(player) {
  var roomId = player.room;
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
});
