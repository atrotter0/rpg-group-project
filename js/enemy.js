// Enemy
console.log("enemy.js loaded!");

function Enemy(id, name, hp, dmg, xp, loot) {
  this.id = id;
  this.name = name;
  this.hp = hp;
  this.dmg = dmg;
  this.xp = xp;
  this.loot = [];
  this.gp = 1;
  this.goesFirst = true;
}

Enemy.prototype.enemyAttack = function() {
  player.hp -= this.damage;
  battleAlert(enemy.name + " hits you for " + this.dmg + " damage!");
}


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
  if (outcome === 1) enemy.goesFirst = false;
}

function firstTurn(enemy) {
  if (enemy.goesFirst) {
    runEnemyTurn(enemy);
    runPlayerTurn();
  } else {
    runPlayerTurn();
  }
}

function runEnemyTurn(enemy) {
  battleAlert(enemy.name + "'s turn!");
  setTimeout(function() {
    enemy.enemyAttack();
  }, 2000);
}

function runPlayerTurn() {
  // alertSuccess(player.name + "'s turn!");


  //runEnemyTurn(enemy);
}

function playerAttacks() {

}
