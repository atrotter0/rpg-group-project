// Story
console.log("story.js loaded!");

storyMap = {};

function Chapter(title) {
  this.title = title;
  this.text = [];
}

// text should be limited to 1 - 2 sentences.
// Each section of display text is separated by continue button until the end of the array.
// Once at the end of the array, a new button replaces continue and will load the next room of the game.
function buildStory() {
  var textArray = [];
  var title = [];
  var text0 = "";
  var text1 = "";
  var text2 = "";
  var text3 = "";
  var text4 = "";
  var text5 = "";
  var text6 = "";
  var text7 = "";
  var text8 = "";
  var text9 = "";

  // Chapter 1
  textArray = [];
  title = "Into the Deeps";
  text1 = "Some text";
  text2 = "Some more text";
  text3 = "Even more text";
  textArray.push(display1, display2, display3);
  var chapter1 = new Chapter(title, textArray);

  // Chapter 2
  textArray = [];

  // add chapters to storyMap after creation.
  storyMap.chapter1 = chapter1;
}
