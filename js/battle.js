function startBattle(enemy) {
  hideCurrentScreen();
  showBattleScreen();
  rollInitiative(enemy);
  firstTurn(enemy);
}

function rollInitiative(enemy) {
  var outcome = Math.floor((Math.random() * 2) + 1);
  console.log(outcome);
  // 1 = player, 2 = enemy
  if (outcome === 1) {
    enemy.goesFirst = false;
  } else {
    enemy.goesFirst = true;
  }
}

function firstTurn(enemy) {
  if (enemy.goesFirst) {
    runEnemyTurn(enemy);
    setTimeout(function() { runPlayerTurn(); }, 4000);
  } else {
    runPlayerTurn();
  }
}

function runEnemyTurn(enemy) {
  setTimeout(function() { battleAlert(enemy.name + "'s turn!"); }, 1000);
  setTimeout(function() { enemy.enemyAttack(); }, 2000);
  setTimeout(function() { checkPlayerDead(enemy); }, 4000);
}

function runPlayerTurn() {
  runMpCheck();
  battleAlert(player.name + "'s turn!");
}

function runPlayerAttack(enemy) {
  setTimeout(function() { player.playerAttack(enemy); }, 0);
}

function runMpCheck() {
  if (player.noMp()) {
    disableButton("#spell");
  }
}

function runPlayerSpell(enemy) {
  setTimeout(function() { player.playerCastSpell(enemy); }, 0);
}

function checkPlayerDead(enemy) {
  if (player.isDead()) {
    playerDied();
    console.log("You lost!");
  } else {
    console.log("Still fightin!");
    runPlayerTurn();
  }
}

function checkEnemyDead(enemy) {
  if (enemy.isDead()) {
    console.log("You won!");
  } else {
    console.log("Still fightin!");
    runEnemyTurn(enemy);
  }
}
