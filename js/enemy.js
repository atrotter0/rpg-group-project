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

function startBattle(enemy) {
  hideCurrentScreen();
  showBattleScreen();
  rollInitiative(enemy);
  firstTurn(enemy);
}

function rollInitiative(enemy) {
  var outcome = Math.floor((Math.random() * 2) + 1);
  console.log(outcome);
  if (outcome === 1) enemy.goesFirst = false;
}

function firstTurn(enemy) {
  if (enemy.goesFirst) {
    runTurn(enemy);
  } else {
    runTurn(player);
  }
}

function runTurn(object) {
  alertSuccess(object.name + " goes first!");
}
