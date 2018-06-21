// New Stats - player progression tracker
console.log("newstats.js loaded!");

var newStats = {};

function NewStats() {
  this.newHp = 0;
  this.newMp = 0;
  this.newAp = 0;
  this.newSp = 0;
  this.availablePoints = 3;
}

function buildStats() {
  newStats = new NewStats();
}
