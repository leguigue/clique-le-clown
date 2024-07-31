const scoreDisplay = document.getElementById('score');
const menuContainer = document.getElementById('menu-container');
const gameContainer = document.getElementById('gameContainer');
const clownImage = document.getElementById('clown');
let timerInterval;
let secondsLeft = 30;
let score = 0;
let difficulty = 'facile';
let intervalId = null;
const sonResult = new Audio('./assets/son/zombie.mp3');
let isMuted = false;
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function moveClown() { // deplacement du clown
    let clown = document.querySelector("#clown");
    let randomY = random(0,gameContainer.clientHeight - clown.clientHeight)
    let randomX = random(0,gameContainer.clientWidth - clown.clientWidth)
    clownImage.style.top =  randomY + "px"
    clownImage.style.left = randomX + "px"
}
function clickClown() { //click sur le clown = point+deplacement
    score++;
    scoreDisplay.textContent = "Puntos: "+score;
    moveClown();
    sonResult.play()
    clearInterval(intervalId);
    intervalId = setInterval(moveClown, getInterval());
  }
  function startGame() { // commencement du jeu au click sur le clown + initialisation du score a 0
    score=0
    menuContainer.style.display = 'none';
    gameContainer.style.display = 'block';
    moveClown();
    clownImage.addEventListener('click', clickClown);
    intervalId = setInterval(moveClown, getInterval());

  }
function stopGame() { // stop du jeu +affichage du score obtenue
  clearInterval(intervalId);
  scoreDisplay.textContent = "Finito pipo! "+score; 
  console.log(score)
  score=0
  console.log(score)
}
function getInterval() { // interval de deplacement du clown en fonction duu niveau de difficulté
  switch (difficulty) {
    case 'moyen':
      return 1000;
    case 'difficile':
      return 500;
    default:
      return 1500;
  }
}
function updateDifficulty(newDifficulty) { // bouton qui change la difficulté du jeu
    difficulty = newDifficulty;
    clearInterval(intervalId);
    intervalId = setInterval(moveClown, getInterval());
}
document.getElementById('facile').addEventListener('click', () => updateDifficulty('facile'));
document.getElementById('moyen').addEventListener('click', () => updateDifficulty('moyen'));
document.getElementById('difficile').addEventListener('click', () => updateDifficulty('difficile'));
const menu = document.querySelector(".menu");
const burger = document.querySelector(".burger");
const menuIcon = document.querySelector(".menuIcon");
const closeIcon = document.querySelector(".closeIcon");
burger.addEventListener("click", toggleMenu);
function toggleMenu() { // burger menu
    const menu = document.querySelector(".menu");
  const menubtn = document.querySelector("#menuclosed");
  menu.classList.toggle('hidden');
if(menubtn.className==="closed"){
    menubtn.src="./assets/image/menuopened.svg"
    menubtn.classList.remove("closed")
  menu.style.display="block"
}
else{
    menubtn.src="./assets/image/menuclosed.svg"
    menubtn.classList.add("closed")
    menu.style.display="none"
}
}
document.addEventListener('DOMContentLoaded', () => {
  const videoLight = document.getElementById('background-video-light');
  const videoDark = document.getElementById('background-video-dark');
  const lightModeButton = document.getElementById('lightmode');
    const darkModeButton = document.getElementById('darkmode');
  if (localStorage.getItem('darkMode') === 'enabled') {
      videoLight.style.display = 'none'; 
      videoDark.style.display = 'block'; 
  } else {
      videoLight.style.display = 'block'; 
      videoDark.style.display = 'none'; 
  }

  lightModeButton.addEventListener('click', () => {
      videoLight.style.display = 'block'; 
      videoDark.style.display = 'none'; 
      localStorage.setItem('darkMode', 'disabled');
  });

  darkModeButton.addEventListener('click', () => {
      videoLight.style.display = 'none';
      videoDark.style.display = 'block'; 
      localStorage.setItem('darkMode', 'enabled');
  });
});
document.getElementById('mute').addEventListener('click', () => { // bouton mute
  isMuted = !isMuted;
  sonResult.muted = isMuted;
});
document.getElementById('volume-slider').addEventListener('input', (event) => { // bouton slider son
  const volume = event.target.value;
  sonResult.volume = volume / 100; 
 
});
