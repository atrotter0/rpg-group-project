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

function pulsateElement(id) {
  $(id).effect("pulsate");
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

/*--------------------------
INVENTORY SCREEN FUNCTIONS -
--------------------------*/

function displayEquippedItems(player) {
  $("#equipped-weapon-text").text(player.equippedWeapon.name);
  $("#equipped-armor-text").text(player.equippedArmor.name);

  for(i = 0; i < player.items.length; i++) {
    $("#slot" + (i)).append(player.items[i].icon);
  }
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

function initiateNewStats() {
  $("#hp-added").text(0);
  $("#mp-added").text(0);
  $("#ap-added").text(0);
  $("#sp-added").text(0);
  $("#available-points").text(newStats.availablePoints);
}

function initiateNewStatsInGame() {
  $("#hp-added2").text(0);
  $("#mp-added2").text(0);
  $("#ap-added2").text(0);
  $("#sp-added2").text(0);
  $("#available-points2").text(newStats.availablePoints);
  console.log("initiate new stats in game");
}

function addHp(number) {
  if (number >= 3 || newStats.availablePoints <= 0) {
    alertError("You don't have any points left to spend!");
  } else {
  var newNumber = number + 1;
  newStats.availablePoints--;
  newStats.newHp = newNumber;
  $("#hp-added").text(newNumber);
  $("#available-points").text(newStats.availablePoints);
  }
}

function addMp(number) {
  if (number >= 3 || newStats.availablePoints <= 0) {
    alertError("You don't have any points left to spend!");
  } else {
  var newNumber = number + 1;
  newStats.availablePoints--;
  newStats.newMp = newNumber;
  $("#mp-added").text(newNumber);
  $("#available-points").text(newStats.availablePoints);
  }
}

function addAp(number) {
  if (number >= 3 || newStats.availablePoints <= 0) {
    alertError("You don't have any points left to spend!");
  } else {
  var newNumber = number + 1;
  newStats.availablePoints--;
  newStats.newAp = newNumber;
  $("#ap-added").text(newNumber);
  $("#available-points").text(newStats.availablePoints);
  }
}

function addSp(number) {
  if (number >= 3 || newStats.availablePoints <= 0) {
    alertError("You don't have any points left to spend!");
  } else {
  var newNumber = number + 1;
  newStats.availablePoints--;
  newStats.newSp = newNumber;
  $("#sp-added").text(newNumber);
  $("#available-points").text(newStats.availablePoints);
  }
}

function addHpInGame(number) {
  if (number >= 3 || newStats.availablePoints <= 0) {
    alertError("You don't have any points left to spend!");
  } else {
  var newNumber = number + 1;
  newStats.availablePoints--;
  newStats.newHp = newNumber;
  $("#hp-added2").text(newNumber);
  $("#available-points2").text(newStats.availablePoints);
  }
}

function addMpInGame(number) {
  if (number >= 3 || newStats.availablePoints <= 0) {
    alertError("You don't have any points left to spend!");
  } else {
  var newNumber = number + 1;
  newStats.availablePoints--;
  newStats.newMp = newNumber;
  $("#mp-added2").text(newNumber);
  $("#available-points2").text(newStats.availablePoints);
  }
}

function addApInGame(number) {
  if (number >= 3 || newStats.availablePoints <= 0) {
    alertError("You don't have any points left to spend!");
  } else {
  var newNumber = number + 1;
  newStats.availablePoints--;
  newStats.newAp = newNumber;
  $("#ap-added2").text(newNumber);
  $("#available-points2").text(newStats.availablePoints);
  }
}

function addSpInGame(number) {
  if (number >= 3 || newStats.availablePoints <= 0) {
    alertError("You don't have any points left to spend!");
  } else {
  var newNumber = number + 1;
  newStats.availablePoints--;
  newStats.newSp = newNumber;
  $("#sp-added2").text(newNumber);
  $("#available-points2").text(newStats.availablePoints);
  }
}

function subtractHp(number) {
  if (number <= 0) {
    alertError("You cannot add a negative number of points!");
  } else {
    var newNumber = number - 1;
    newStats.availablePoints++;
    newStats.newHp = newNumber;
    $("#hp-added").text(newNumber);
    $("#available-points").text(newStats.availablePoints);
  }
}

function subtractMp(number) {
  if (number <= 0) {
    alertError("You cannot add a negative number of points!");
  } else {
    var newNumber = number - 1;
    newStats.availablePoints++;
    newStats.newMp = newNumber;
    $("#mp-added").text(newNumber);
    $("#available-points").text(newStats.availablePoints);
  }
}

function subtractAp(number) {
  if (number <= 0) {
    alertError("You cannot add a negative number of points!");
  } else {
    var newNumber = number - 1;
    newStats.availablePoints++;
    newStats.newAp = newNumber;
    $("#ap-added").text(newNumber);
    $("#available-points").text(newStats.availablePoints);
  }
}

function subtractSp(number) {
  if (number <= 0) {
    alertError("You cannot add a negative number of points!");
  } else {
    var newNumber = number - 1;
    newStats.availablePoints++;
    newStats.newSp = newNumber;
    $("#sp-added").text(newNumber);
    $("#available-points").text(newStats.availablePoints);
  }
}

function subtractHpInGame(number) {
  if (number <= 0) {
    alertError("You cannot add a negative number of points!");
  } else {
    var newNumber = number - 1;
    newStats.availablePoints++;
    newStats.newHp = newNumber;
    $("#hp-added2").text(newNumber);
    $("#available-points2").text(newStats.availablePoints);
  }
}

function subtractMpInGame(number) {
  if (number <= 0) {
    alertError("You cannot add a negative number of points!");
  } else {
    var newNumber = number - 1;
    newStats.availablePoints++;
    newStats.newMp = newNumber;
    $("#mp-added2").text(newNumber);
    $("#available-points2").text(newStats.availablePoints);
  }
}

function subtractApInGame(number) {
  if (number <= 0) {
    alertError("You cannot add a negative number of points!");
  } else {
    var newNumber = number - 1;
    newStats.availablePoints++;
    newStats.newAp = newNumber;
    $("#ap-added2").text(newNumber);
    $("#available-points2").text(newStats.availablePoints);
  }
}

function subtractSpInGame(number) {
  if (number <= 0) {
    alertError("You cannot add a negative number of points!");
  } else {
    var newNumber = number - 1;
    newStats.availablePoints++;
    newStats.newSp = newNumber;
    $("#sp-added2").text(newNumber);
    $("#available-points2").text(newStats.availablePoints);
  }
}

function upgradeStats() {
  if (newStats.availablePoints !== 0) {
  alertError("You haven't spent all your points yet!")
} else {
  player.hp += newStats.newHp;
  player.mp += newStats.newMp;
  player.ap += newStats.newAp;
  player.sp += newStats.newSp;
  newStats.availablePoints = 3;
  newStats.newHp = 0;
  newStats.newMp = 0;
  newStats.newAp = 0;
  newStats.newSp = 0;
  }
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

function showLootScreen() {
  //var itemName = player.getLastItem.name
  hideCurrentScreen();
  $("#battle-loot-screen").addClass("current-screen").show();
  $("#battle-xp").text("XP: " + player.currentEnemy.xp);
  $("#battle-items").text("Items: " + player.getLastItem().name);
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

function runLevelUp() {
  hideCurrentScreen();
  $("#level-up-window").show().addClass("current-screen");
}

$(document).ready(function() {
  console.log("ui.js loaded!");
  //hideCharacterScreen();
  $("#main-menu").show();
  /* FOR THE CLICK EVENT OR HOWEVER WE TRANSITION INTO THE LEVEL UP/ADD STATS SCREEN */
  initiateNewStatsInGame();
  $("#level-reached").text(player.level);
  $("#current-hp").text(player.hp);
  $("#current-mp").text(player.mp);
  $("#current-ap").text(player.ap);
  $("#current-sp").text(player.sp);
  /* END OF STUFF FOR CLICK EVENT OR HOWEVER WE TRANSITION INTO THE LEVEL UP/ADD STATS SCREEN */

  $("#new-game").click(function() {
    hideMenuOptions();
    initiateNewStats();
    displayNewGameBox();
    $("#current-hp-init").text(player.hp);
    $("#current-mp-init").text(player.mp);
    $("#current-ap-init").text(player.ap);
    $("#current-sp-init").text(player.sp);
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

  /* START GAME ADD STATS */
  $("#hp-add-button").click(function(){
    var currentHpNumber = parseInt($("#hp-added").text());
    addHp(currentHpNumber);
  });

  $("#hp-subtract-button").click(function(){
    var currentHpNumber = parseInt($("#hp-added").text());
    subtractHp(currentHpNumber);
  });

  $("#mp-add-button").click(function(){
    var currentMpNumber = parseInt($("#mp-added").text());
    addMp(currentMpNumber);
  });

  $("#mp-subtract-button").click(function(){
    var currentMpNumber = parseInt($("#mp-added").text());
    subtractMp(currentMpNumber, "mp");
  });

  $("#ap-add-button").click(function(){
    var currentApNumber = parseInt($("#ap-added").text());
    addAp(currentApNumber, "ap");
  });

  $("#ap-subtract-button").click(function(){
    var currentApNumber = parseInt($("#ap-added").text());
    subtractAp(currentApNumber, "ap");
  });

  $("#sp-add-button").click(function(){
    var currentSpNumber = parseInt($("#sp-added").text());
    addSp(currentSpNumber, "sp");
  });

  $("#sp-subtract-button").click(function(){
    var currentSpNumber = parseInt($("#sp-added").text());
    subtractSp(currentSpNumber, "sp");
  });

  $("#add-stats-button").click(function(){
    upgradeStats();
    $("#current-hp-init").text(player.hp);
    $("#current-mp-init").text(player.mp);
    $("#current-ap-init").text(player.ap);
    $("#current-sp-init").text(player.sp);
  });

  /* IN GAME UPGRADE STATS */
  $("#hp-add-button2").click(function(){
    var currentHpNumber = parseInt($("#hp-added2").text());
    addHpInGame(currentHpNumber, "hp");
  });

  $("#hp-subtract-button2").click(function(){
    var currentHpNumber = parseInt($("#hp-added2").text());
    subtractHpInGame(currentHpNumber, "hp");
  });

  $("#mp-add-button2").click(function(){
    var currentMpNumber = parseInt($("#mp-added2").text());
    addMpInGame(currentMpNumber, "mp");
  });

  $("#mp-subtract-button2").click(function(){
    var currentMpNumber = parseInt($("#mp-added2").text());
    subtractMpInGame(currentMpNumber, "mp");
  });

  $("#ap-add-button2").click(function(){
    var currentApNumber = parseInt($("#ap-added2").text());
    addApInGame(currentApNumber, "ap");
  });

  $("#ap-subtract-button2").click(function(){
    var currentApNumber = parseInt($("#ap-added2").text());
    subtractApInGame(currentApNumber, "ap");
  });

  $("#sp-add-button2").click(function(){
    var currentSpNumber = parseInt($("#sp-added2").text());
    addSpInGame(currentSpNumber, "sp");
  });

  $("#sp-subtract-button2").click(function(){
    var currentSpNumber = parseInt($("#sp-added2").text());
    subtractSpInGame(currentSpNumber, "sp");
  });

  $("#add-stats-button2").click(function(){
    upgradeStats();
    $("#current-hp").text(player.hp);
    $("#current-mp").text(player.mp);
    $("#current-ap").text(player.ap);
    $("#current-sp").text(player.sp);
  });

  /* Battle System */
  $(".enemy").click(function() {
    //var enemyId = $(this).attr(id);
    //var enemyId = "enemy";
    player.currentEnemy = enemyMap["enemy1"];
    startBattle(player.currentEnemy);
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

  $("#loot-screen-confirm").click(function() {
    player.checkXP();
  });
});
