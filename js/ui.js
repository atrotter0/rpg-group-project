// UI

function hideMainMenu() {
  $("#new-game").hide();
  $("#load-game").hide();
}

function displayNewGameBox() {
  $("#new-game-box").show();
}

function runNewGame(playerName) {
  createNewPlayer(playerName, roomMap.room1);
  //showRoom(player);
}

function showRoom(player) {
  var roomId = player.room;
}

$(document).ready(function() {
  console.log("ui.js loaded!");

  $("#new-game").click(function() {
    hideMainMenu();
    displayNewGameBox();
  });

  $("#confirm-name").click(function() {
    var playerName = $("#player-name").val();
    runNewGame(playerName);
  });
});