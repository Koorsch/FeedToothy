/*
ÆNDRINGER EFTER DATAINDSAMLING I SURVEY OG FRA FEEDBACK 

PROBLEM: SVÆRT AT KLIKKE EFTERHAND NÅR SPEED GÅR OP I SAMBAND MED POINTS
LØSNING: Speed i samband med points ændret så det ikke blir en så drastisk øgning.

PROBLEM: SVÆRT AT KLIKKE
LØSNING: click skiftet til mousedown i addEventListener på alle good/bad-container.

PROBLEM: TING FÅR SAMME POS OG KOMMER IND OVER HVERANDEN
LØSNING: tilføjer posArray med tilhørende funktioner så hvert eneste element ikke kan bli på samme pos.
*/

//deklarere  points, liv, speed og en array til mine positioner
let points = 0;
let life = 3;
let speed = 1;
let posArray = ["pos1", "pos2", "pos3", "pos4", "pos5", "pos6"];

//containers og sprites
const timeContainer = document.querySelector("#time_container");
const timeSprite = document.querySelector("#time_sprite");

const goodContainer1 = document.querySelector("#good_container1");
const goodContainer2 = document.querySelector("#good_container2");
const goodContainer3 = document.querySelector("#good_container3");

const badContainer1 = document.querySelector("#bad_container1");
const badContainer2 = document.querySelector("#bad_container2");

//menuer
const startMenu = document.querySelector("#start");
const tutorialMenu = document.querySelector("#tutorial");

//knapper
const startButton = document.querySelector("#play_button");
const tutorialButton = document.querySelector("#howto_button");
const backButton = document.querySelector("#back_button");
// const playAgainButton = document.querySelector(".playAgain_button");
const goBackButton1 = document.querySelector("#back_button1");
const goBackButton2 = document.querySelector("#back_button2");
const goBackButton3 = document.querySelector("#back_button3");

//eventListener når siden loades
window.addEventListener("load", pageLoad);

function pageLoad() {
  //Åbn startmenu
  console.log(this);
  //Åbn startMenu
  toggleMenu();
  //playknap CTA
  document.querySelector("#tutorial").classList.add("hide");
  startButton.classList.add("cta");
  //Tjek vad der klikkes på
  startButton.addEventListener("click", gamePlay);
  tutorialButton.addEventListener("click", tutorial);
}
function tutorial() {
  tutorialButton.removeEventListener("click", tutorial);
  goBackButton3.addEventListener("click", pageLoad);
  toggleMenu();
  document.querySelector("#tutorial").classList.remove("hide");
  document.querySelector("nav").classList.add("hide");
  document.querySelector("footer").classList.add("hide");
  goBackButton3.classList.add("cta");
}
function gamePlay() {
  document.querySelector("#game_win").volume = 0.03;
  document.querySelector("#game_win").play();
  //Gem startMenu og remove på eventListeners
  toggleMenu();
  //gem nav og footer
  document.querySelector("nav").classList.add("hide");
  document.querySelector("footer").classList.add("hide");
  document.querySelector("#game_midground").classList.add("bg_move");
  startButton.removeEventListener("click", gamePlay);
  tutorialButton.removeEventListener("click", tutorial);
  document.querySelector("#good_sprite1").classList = "";
  document.querySelector("#good_sprite2").classList = "";
  document.querySelector("#bad_sprite1").classList = "";
  document.querySelector("#bad_sprite2").classList = "";
  //gemde ting vises
  toggleUI();

  //så går spillet igang! Timer går igang
  timeSprite.classList.add("timer");
  timeSprite.addEventListener("animationend", gameStop);

  //deklarerer lokalt
  posArray = ["pos1", "pos2", "pos3", "pos4", "pos5", "pos6"];
  //kalder shuffle-function for at blande mine positioner
  shuffle(posArray);
  //goodContainer får tilføjet klasser og tilfældige nummer.
  goodContainer1.classList.add(posArray.shift(), "delay" + randomizer(4), "fall" + randomizer(3), "speed" + speed);
  goodContainer2.classList.add(posArray.shift(), "delay" + randomizer(4), "fall" + randomizer(3), "speed" + speed);
  goodContainer3.classList.add(posArray.shift(), "delay" + randomizer(4), "fall" + randomizer(3), "speed" + speed);
  //badContainer får tilføjet klasser og tilfældige nummer.
  badContainer1.classList.add(posArray.shift(), "delay" + randomizer(4), "fall" + randomizer(3), "speed" + speed);
  badContainer2.classList.add(posArray.shift(), "delay" + randomizer(4), "fall" + randomizer(3), "speed" + speed);

  //eventListener som kør reset hver gang den gode rammer bunden.
  goodContainer1.addEventListener("animationiteration", goodReset);
  goodContainer2.addEventListener("animationiteration", goodReset);
  goodContainer3.addEventListener("animationiteration", goodReset);

  //eventListener som kør reset hver gang den dårlige rammer bunden.
  badContainer1.addEventListener("animationiteration", badReset);
  badContainer2.addEventListener("animationiteration", badReset);

  //eventListener på containers for at se hvis man klikker på dem.
  badContainer1.addEventListener("mousedown", clickBad);
  badContainer2.addEventListener("mousedown", clickBad);
  goodContainer1.addEventListener("mousedown", clickGood);
  goodContainer2.addEventListener("mousedown", clickGood);
  goodContainer3.addEventListener("mousedown", clickGood);
}
function clickGood() {
  console.log(this);
  playGoodSound();
  this.removeEventListener("mousedown", clickGood);
  points++;
  document.querySelector("#score").textContent = points;
  this.classList.add("freeze");
  this.firstElementChild.classList.add("goodEffect" + randomizer(2));
  this.addEventListener("animationend", goodReset);
}
function goodReset() {
  console.log(this);
  this.removeEventListener("animationend", goodReset);
  // this.removeEventListener("animationiteration", goodReset);

  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;

  if (points >= 14) {
    speed = 4;
  } else if (points >= 12) {
    speed = 3;
  } else if (points >= 6) {
    speed = 2;
  }
  //deklarerer lokalt
  posArray = ["pos1", "pos2", "pos3", "pos4", "pos5", "pos6"];
  shuffle(posArray);
  this.addEventListener("mousedown", clickGood);
  this.classList.add(posArray.shift(), "delay" + randomizer(4), "fall" + randomizer(3), "speed" + speed);
}
function clickBad() {
  playBadSound();
  this.removeEventListener("mousedown", clickGood);
  this.classList.add("freeze");
  this.firstElementChild.classList.add("badEffect" + randomizer(2));
  life--;
  document.querySelector("#life").textContent = life;
  this.addEventListener("animationend", badReset);
}
function badReset() {
  console.log(this);
  this.removeEventListener("animationend", badReset);
  // this.removeEventListener("animationiteration", badReset);
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;
  if (points >= 14) {
    speed = 4;
  } else if (points >= 12) {
    speed = 3;
  } else if (points >= 6) {
    speed = 2;
  }
  if (life <= 0) {
    gameStop();
  }
  //deklarerer lokalt
  posArray = ["pos1", "pos2", "pos3", "pos4", "pos5", "pos6"];
  shuffle(posArray);

  this.addEventListener("mousedown", clickBad);
  this.classList.add(posArray.shift(), "delay" + randomizer(4), "fall" + randomizer(3), "speed" + speed);
}
function gameStop() {
  console.log("Game Stopped!");

  //fjern alle eventListener
  timeSprite.removeEventListener("animationend", gameStop);

  goodContainer1.removeEventListener("mousedown", clickGood);
  goodContainer2.removeEventListener("mousedown", clickGood);
  goodContainer3.removeEventListener("mousedown", clickGood);
  badContainer1.removeEventListener("mousedown", clickBad);
  badContainer2.removeEventListener("mousedown", clickBad);

  goodContainer1.removeEventListener("animationend", goodReset);
  goodContainer1.removeEventListener("animationiteration", goodReset);
  goodContainer2.removeEventListener("animationend", goodReset);
  goodContainer2.removeEventListener("animationiteration", goodReset);
  goodContainer3.removeEventListener("animationend", goodReset);
  goodContainer3.removeEventListener("animationiteration", goodReset);

  badContainer1.removeEventListener("animationiteration", badReset);
  badContainer1.removeEventListener("animationend", badReset);
  badContainer2.removeEventListener("animationiteration", badReset);
  badContainer2.removeEventListener("animationend", badReset);

  goodContainer1.classList = "";
  goodContainer2.classList = "";
  goodContainer3.classList = "";
  badContainer1.classList = "";
  badContainer2.classList = "";
  document.querySelector("#game_midground").classList = "";
  goodContainer1.firstElementChild.classList = "";
  goodContainer2.firstElementChild.classList = "";
  goodContainer3.firstElementChild.classList = "";
  badContainer1.firstElementChild.classList = "";
  badContainer2.firstElementChild.classList = "";
  this.offsetLeft;
  document.querySelector("#game_elements").classList.toggle("hide");
  document.querySelector("#game_ui").classList.toggle("hide");
  stopAllSounds();
  if (life <= 0) {
    gameOver();
  } else if (points >= 10) {
    gameComplete();
  } else {
    gameOver();
  }
}
function gameOver() {
  console.log("gameOver");
  document.querySelector("#game_lose").volume = 0.3;
  document.querySelector("#game_lose").play();
  document.querySelector("#game_over").classList.toggle("hide");
  document.querySelector("#go_points").textContent = "You got " + points + " points";
  goBackButton2.classList.add("cta");
  goBackButton2.addEventListener("click", playAgain);
}
function gameComplete() {
  console.log("gameComplete");
  document.querySelector("#game_win").volume = 0.3;
  document.querySelector("#game_win").play();
  document.querySelector("#game_complete").classList.toggle("hide");
  document.querySelector("#gc_points").textContent = "You got " + points + " points";
  goBackButton1.classList.add("cta");
  goBackButton1.addEventListener("click", playAgain);
}
function playAgain() {
  this.removeEventListener("click", playAgain);
  //vis nav og footer
  document.querySelector("nav").classList.remove("hide");
  document.querySelector("footer").classList.remove("hide");
  //gem screens
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#game_complete").classList.add("hide");
  goBackButton2.classList.remove("cta");
  goBackButton2.classList.remove("cta");
  //opdatere liv og points, speed = 1
  life = 3;
  points = 0;
  speed = 1;
  document.querySelector("#life").textContent = life;
  document.querySelector("#score").textContent = points;
  //kør om spillet igen
  pageLoad();
}
//Vise eller gemme StartMenu
function toggleMenu() {
  document.querySelector("#start").classList.toggle("hide");
}
function toggleTutorial() {
  document.querySelector("#tutorial").classList.toggle("hide");
}
//Vise eller gemme UI
function toggleUI() {
  document.querySelector("#game_elements").classList.toggle("hide");
  document.querySelector("#game_ui").classList.toggle("hide");
}
//Hjælper-function for at give tilfældige nummer.
function randomizer(n) {
  return Math.floor(Math.random() * n) + 1;
}
function playGoodSound() {
  let randomNumber = Math.random();
  if (randomNumber < 0.8) {
    document.querySelector("#good1_1").volume = 0.15;
    document.querySelector("#good1_1").currentTime = 0;
    document.querySelector("#good1_1").play();
  } else if (randomNumber < 0.6) {
    document.querySelector("#good1_2").volume = 0.15;
    document.querySelector("#good1_2").currentTime = 0;
    document.querySelector("#good1_2").play();
  } else if (randomNumber < 0.4) {
    document.querySelector("#good1_3").volume = 0.15;
    document.querySelector("#good1_3").currentTime = 0;
    document.querySelector("#good1_3").play();
  } else {
    document.querySelector("#good2").volume = 0.075;
    document.querySelector("#good2").currentTime = 0;
    document.querySelector("#good2").play();
  }
}
function playBadSound() {
  let randomNumber = Math.random();
  if (randomNumber < 0.7) {
    document.querySelector("#bad").volume = 0.15;
    document.querySelector("#bad").currentTime = 0;
    document.querySelector("#bad").play();
  } else {
    document.querySelector("#game_lose").volume = 0.1;
    document.querySelector("#game_lose").currentTime = 0;
    document.querySelector("#game_lose").play();
  }
}
function stopAllSounds() {
  //laver en constant på alle audio-elementer i HTML'en
  const audioElements = document.querySelectorAll("audio");
  //loop gennem alle audio og sætter pause og reset på hver eneste.
  audioElements.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}
//logik så min array virker rigtigt
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
