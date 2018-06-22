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

  if (newStats.availablePoints <= 3 && newStats.availablePoints > 0) return alertError("You still have stat points left to spend!");

  player.name = playerName;
  alertSuccess("Game data for [ " + playerName + " ] created!");
  saveGame(player);
  hideCurrentScreen();
  $("#room-" + player.room.id).show().addClass("current-screen");
  showStory();
}

function showStory() {
  alertRoom(player.room.story);
  setTimeout(function() { resetRoomAlert(); }, 2000);
}

function runLoadGame() {
  hideCurrentScreen();
  alertSuccess("Game data for [ " + player.name + " ] loaded!");
  $("#room-" + player.room.id).show().addClass("current-screen");
}

function validate(value) {
  if (value !== "") return true;
}

function alertError(msg) {
  $(".alert").hide().text(msg).removeClass("alert-success")
    .addClass("alert-danger").fadeIn(800).delay(3000).fadeOut(1000);
}

function alertSuccess(msg) {
  $(".alert").hide().text(msg).removeClass("alert-danger")
    .addClass("alert-success").fadeIn(800).delay(1000).fadeOut(1000);
}

function alertRoom(msg) {
  $(".alert-room").text(msg);
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

function resetEnemySprite() {
  $("#enemy-sprite-img").toggle("explode", { pieces: 48 });
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

/******************************/
/* INVENTORY SCREEN FUNCTIONS */
/******************************/

function equipItemOnClick() {
  $(".grid-item").click(function() {
    var itemName = $(this).children("p").text();

    for(i = 0; i < player.items.length; i++) {
      if(player.items[i].name === itemName) {
        if(player.items[i].type === "Weapon" && !jQuery.isEmptyObject(player.equippedWeapon)) {
          if(itemName === player.equippedWeapon.name) {
            console.log("same weapon");
            player.unEquipItem(player.equippedWeapon);
          } else {
            console.log("new weapon");
            player.unEquipItem(player.equippedWeapon);
            player.equipItem(player.items[i]);
          }
        } else if(player.items[i].type === "Weapon" && jQuery.isEmptyObject(player.equippedWeapon)) {
          player.equipItem(player.items[i]);
        }
        if(player.items[i].type === "Armor" && !jQuery.isEmptyObject(player.equippedArmor)) {
          if(itemName === player.equippedArmor.name) {
            player.unEquipItem(player.equippedArmor);
          } else {
            player.unEquipItem(player.equippedArmor);
            player.equipItem(player.items[i]);
          }
        } else if(player.items[i].type === "Armor" && jQuery.isEmptyObject(player.equippedArmor)) {
          player.equipItem(player.items[i]);
        }

        displayEquippedItems(player);
      }
    }
    // CHANGE HP MAX STUFF
  });
}

function clearInventory() {
  $("#equipped-weapon-text").text("");
  $("#equipped-armor-text").text("");

  $(".grid-item").empty();
}

function displayEquippedItems(player) {
  clearInventory();
  $("#equipped-weapon-text").text(player.equippedWeapon.name);
  $("#equipped-armor-text").text(player.equippedArmor.name);

  for(i = 0; i < player.items.length; i++) {
    var itemName = player.items[i].name;
    var itemLevel = player.items[i].level;
    var hp = player.items[i].addHp;
    var ap = player.items[i].attackBonus;
    var sp = player.items[i].spellBonus;
    var mp = player.items[i].addMp;
    var tooltip = "" + itemName + "\nLevel: " + itemLevel + "\nHP: " + hp + "\nAP: " + ap + "\nSP: " + sp + "\nMP: " + mp;

    $("#slot" + (i)).append(player.items[i].icon);
    $("#slot" + (i)).append("<p class='itemNameVal'>" + itemName + "</p>");
    $("#slot" + (i)).attr("data-title", tooltip);
  }
  enableToolTips();
}

function enableToolTips() {
  $('.itemNameVal').tooltip({
    content: function() {
        return $(this).attr('title');
    }
  });
}

function fillCharacterValues(player) {
  $("#char-name").text(player.name);
  $("#health-points-indicator").text(player.hp + " / " + player.hpMax);
  $("#mana-points-indicator").text(player.mp + " / " + player.mpMax);
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
    player.hpMax += newStats.newHp;
    player.mpMax += newStats.newMp;
    player.ap += newStats.newAp;
    player.sp += newStats.newSp;
    newStats.newHp = 0;
    newStats.newMp = 0;
    newStats.newAp = 0;
    newStats.newSp = 0;
    player.hp = player.hpMax;
  }
}

function hideCurrentScreen() {
  $(".current-screen").hide().removeClass("current-screen");
}

function showBattleScreen() {
  $("#enemy-stats").removeClass("invisible");
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

function showWinScreen() {
  hideCurrentScreen();
  $("#win-screen").addClass("current-screen").fadeIn(1200);
  $("#win-message").fadeIn(2300);
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
  hideCurrentScreen();
  $("#battle-loot-screen").addClass("current-screen").show();
  $("#loot-screen-enemy-name").text(player.currentEnemy.name + " slain!");
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
  initiateLevelUp();
  hideCurrentScreen();
  $("#level-up-window").show().addClass("current-screen");
  $("#level-up-table2").show();
}

function initiateLevelUp() {
  initiateNewStatsInGame();
  $("#level-reached").text(player.level);
  $("#current-hp").text(player.hpMax);
  $("#current-mp").text(player.mpMax);
  $("#current-ap").text(player.ap);
  $("#current-sp").text(player.sp);
}

function resetCharacterPointScreen() {
  player.hpMax = 15;
  player.mpMax = 20;
  player.ap = 2;
  player.sp = 3;
  $("#level-up-table").show();
}

function loadRoomPostBattle() {
  hideCurrentScreen();
  $("#room-" + player.room.id).show().addClass("current-screen");
}

function resetRoomAlert() {
  alertRoom("");
}

function postBattleMsg() {
  alertRoom("Phew, that was close...");
}

function removeEnemyFromRoom() {
  if (player.currentEnemy.hp <= 0) {
    $("#room" + player.room.id + "-enemy" + player.currentEnemy.id).off();
    $("#room" + player.room.id + "-enemy" + player.currentEnemy.id).css({'background-image' : 'url("")'});
    $("#room" + player.room.id + "-enemy" + player.currentEnemy.id).css({'cursor' : "url('img/gauntlet_mouse.png') 10 10, pointer"});
  }
}

var dungeonSong = new Audio('audio/dungeon_song.mp3');
var battleSong = new Audio('audio/battle_song.mp3');
var attackSound = new Audio('audio/attack.ogg');
var spellSound = new Audio('audio/firebolt.ogg');

function playDungeonSong() {
  battleSong.pause();
  battleSong.currentTime = 0;
  dungeonSong.currentTime = 0;
  dungeonSong.play();
}

function playBattleSong() {
  dungeonSong.pause();
  dungeonSong.currentTime = 0;
  battleSong.play();
}

function playAttackSound() {
  attackSound.play();
}

function playSpellSound() {
  spellSound.play();
}


$(document).ready(function() {
  console.log("ui.js loaded!");

  $("#new-game").click(function() {
    hideMenuOptions();
    initiateNewStats();
    displayNewGameBox();
    $("#current-hp-init").text(player.hpMax);
    $("#current-mp-init").text(player.mpMax);
    $("#current-ap-init").text(player.ap);
    $("#current-sp-init").text(player.sp);
    playDungeonSong();
  });

  $("#confirm-name").click(function() {
    var playerName = $("#main-menu-player-name").val();
    runNewGame(playerName);
  });

  $("#main-menu-back").click(function() {
    hideNewGameBox();
    displayMenuOptions();
    resetCharacterPointScreen();
  });

  $("#load-game").click(function() {
    loadPlayer();
    runLoadGame();
    playDungeonSong();
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
    if (newStats.availablePoints !== 0) {
      alertError("You haven't spent all your points!");
    } else {
      upgradeStats();
      $("#current-hp-init").text(player.hpMax);
      $("#current-mp-init").text(player.mpMax);
      $("#current-ap-init").text(player.ap);
      $("#current-sp-init").text(player.sp);
      $("#level-up-table").hide();
    }
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
    if (newStats.availablePoints !== 0) {
      alertError("You haven't spent all your points!");
    } else {
      upgradeStats();
      $("#current-hp").text(player.hpMax);
      $("#current-mp").text(player.mpMax);
      $("#current-ap").text(player.ap);
      $("#current-sp").text(player.sp);
      $("#add-stats-button2").hide();
      $("#level-up-table2").hide();
      $("#finish-allocating-points").show();
    }
  });

  $("#finish-allocating-points").click(function() {
    refillHpMp();
    loadRoomPostBattle();
  });

  /* Battle System */
  $(".enemy").click(function() {
    playBattleSong();
    var enemyId = grabEnemyId(this);
    alertRoom(enemyMap[enemyId].name + " is attacking you!");
    player.currentEnemy = enemyMap[enemyId];
    if (player.currentEnemy.id === 6) {
      $("#enemy-sprite").html('<img src="img/enemy6.png" alt="Enemy sprite" id="enemy-sprite-img">')
    } else {
      $("#enemy-sprite").html('<img src="img/skeleton-enemy.png" alt="Enemy sprite" id="enemy-sprite-img">')
    }
    startBattle(player.currentEnemy)
  });

  $("#attack").click(function() {
    runPlayerAttack(player.currentEnemy);
    playAttackSound();
    hideBattleMenu();
  });

  $("#spell").click(function() {
    runPlayerSpell(player.currentEnemy);
    playSpellSound();
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
    $("#enemy-sprite").html('<img src="" alt="Enemy sprite" id="enemy-sprite-img">')
    if (player.checkForLevel()) {
      player.startLevelUp();
    } else {
      loadRoomPostBattle();
      postBattleMsg();
    }
    playDungeonSong();
  });

  $(".room-load-buttons").click(function(){
    loadPlayer();
    runLoadGame();
    playDungeonSong();
  });

  $(".room-save-buttons").click(function(){
    saveGame(player);
    alertRoom("Game data for [ " + player.name + " ] saved!");
  });

  $(".start-over").click(function() {
    location.reload();
  });

  $("#respawn").click(function() {
    loadPlayer();
    runLoadGame();
    playDungeonSong();
  });
});
