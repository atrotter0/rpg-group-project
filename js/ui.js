// UI

function hideMenuOptions() {
  $("#new-game").hide();
  $("#load-game").hide();
}

function displayNewGameBox() {
  $("#new-game-box").show();
  $("#main-menu-player-name").focus();
}

function hideNewGameBox() {
  $("#new-game-box").hide();
}

function displayMenuOptions() {
  $("#new-game").show();
  $("#load-game").show();
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
    .addClass("alert-success").fadeIn(800).delay(1000).fadeOut(1000);
}

function disableButton(id) {
  $(id).attr("disabled", true);
}

function enableButton(id) {
  $(id).prop("disabled", false)
}

function battleAlert(msg) {
  $("#battle-alert").text(msg);
}

function battleAnimationPlayer() {
  shakeElement("#player-sprite");
  adjustHp("player");
}

function battleAnimationEnemy() {
  shakeElement("#enemy-sprite");
  adjustHp("enemy");
  adjustMp("player");
}

function battleAnimationStatRestore() {
  bounceElement("#player-sprite");
  adjustHp("player");
  adjustMp("player");
}

function animationEnemyDefeated() {
  $("#enemy-stats").addClass("invisible");
  $("#enemy-sprite-img").effect("pulsate", { times: 4 }).toggle("explode", { pieces: 48 });
}

function shakeElement(id) {
  $(id).effect("shake", { direction: "right", times: 2, distance: 4 }, 300);
}

function bounceElement(id) {
  $(id).effect("pulsate").effect("bounce");
}

function adjustHp(target) {
  var percent = 0;
  if (target === "player") {
    percent = (player.hp * 100) / player.hpMax;
    $("#battle-stats-hp-player").css("width", percent + "%");
  } else if (target === "enemy") {
    percent = (player.currentEnemy.hp * 100) / player.currentEnemy.hpMax;
    $("#battle-stats-hp-enemy").css("width", percent + "%");
  }
}

function adjustMp(target) {
  var percent = 0;
  if (target === "player") {
    percent = (player.mp * 100) / player.mpMax;
    $("#battle-stats-mp-player").css("width", percent+ "%");
  }
}

function showRoom(player) {
  var roomId = player.room;
}

function hideCurrentScreen() {
  $(".current-screen").hide().removeClass("current-screen");
}

function showBattleScreen() {
  adjustHp("player");
  adjustMp("player");
  adjustHp("enemy");
  hideCurrentScreen();
  $("#battle-screen").addClass("current-screen").show();
}

function showDeathScreen() {
  hideCurrentScreen();
  $("#death-screen").addClass("current-screen").show();
}

function hideBattleMenu() {
  $("#battle-menu").hide();
}

function showBattleMenu() {
  $("#battle-menu").show();
}

function showBattleItemMenu() {
  $("#item-menu").show();
}

function hideBattleItemMenu() {
  $("#item-menu").hide();
}

function setDisabledConsumables() {
  if (player.hasHealingConsumable) {
    enableButton("#battle-health-potion");
  } else {
    disableButton("#battle-health-potion");
  }

  if (player.hasManaConsumable) {
    enableButton("#battle-mana-potion");
  } else {
    disableButton("#battle-mana-potion");
  }
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

  $("#main-menu-back").click(function() {
    hideNewGameBox();
    displayMenuOptions();
  });

  $("#load-game").click(function() {
    loadPlayer();
  });

  $(".enemy").click(function() {
    //var enemyId = $(this).attr(id);
    var enemyId = "enemy1";
    player.currentEnemy = enemyMap[enemyId];
    startBattle(enemyMap[enemyId]);
  });

  $("#attack").click(function() {
    runPlayerAttack(player.currentEnemy);
    hideBattleMenu();
  });

  $("#spell").click(function() {
    runPlayerSpell(player.currentEnemy);
    hideBattleMenu();
  });

  $("#item").click(function() {
    player.checkForConsumables();
    setDisabledConsumables();
    hideBattleMenu();
    showBattleItemMenu();
  });

  $("#battle-item-close").click(function() {
    hideBattleItemMenu();
    showBattleMenu();
  });

  $("#battle-health-potion").click(function() {
    runPlayerHealthPotion();
    player.checkForConsumables();
    setDisabledConsumables();
    hideBattleItemMenu();
  });

  $("#battle-mana-potion").click(function() {
    runPlayerManaPotion();
    player.checkForConsumables();
    setDisabledConsumables();
    hideBattleItemMenu();
  });
});
