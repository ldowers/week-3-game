// Variables

var wins = 0;
var wordOptions = ['PRINCESS LEIA', 'LUKE SKYWALKER', 'HAN SOLO', 'YODA', 'CHEWBACCA', 'DEATH STAR', 'DARTH VADER', 'STORMTROOPER'];
var imgOptions = ['assets/images/leia.jpg',
					'assets/images/luke.jpg',
					'assets/images/han_solo.jpg',
					'assets/images/yoda.jpg',
					'assets/images/chewbacca.jpg',
					'assets/images/death_star.jpg',
					'assets/images/darth_vader.jpg',
					'assets/images/stormtrooper.jpg'];
var soundOptions = ['http://www.thesoundarchive.com/starwars/empire/nerfherder.mp3',
					'http://www.thesoundarchive.com/starwars/swluke01.mp3',
					'http://www.thesoundarchive.com/starwars/empire/laughfuzzball.mp3',
					'http://www.thesoundarchive.com/starwars/return/900yearsold.mp3',
					'http://www.thesoundarchive.com/starwars/chewy_roar.mp3',
					'http://www.thesoundarchive.com/starwars/force.mp3',
					'http://www.thesoundarchive.com/starwars/swvader02.mp3',
					'http://www.thesoundarchive.com/starwars/imperial_march.mp3'];
var randomNumber = 0;
var randomWord = "";
var guesses = 0;
var incorrectLetters = [];
var currentWord = [];
var gameAudio = null;

// Functions

function chooseRandomWord() {
	randomNumber = Math.floor(Math.random() * wordOptions.length);
	randomWord = wordOptions[randomNumber];
}

function replaceLettersWithBlanks() {
	for (var i = 0; i < randomWord.length; i++) {
		if (randomWord[i] === " ") {
			currentWord.push("&nbsp;");
		}
		else  {
			currentWord.push("_");
		}
	}
}

function replaceBlankWithLetter(userGuess) {
	for (var i = 0; i < randomWord.length; i++) {
		if (randomWord[i] === userGuess) {
			currentWord[i] = userGuess;
		}
	}
}

function printHTML() {
	if (wins > 0) {
		document.querySelector("#numWins").innerHTML = wins;		
	}
	document.querySelector("#currentWord").innerHTML = currentWord.join(" ");
	document.querySelector("#numGuessesRemaining").innerHTML = guesses;
	document.querySelector("#lettersAlreadyGuessed").innerHTML = incorrectLetters.join(", ");
}

function printGameHTML(gameHeader, gameImage) {
	document.querySelector("#gameHeader").innerHTML = gameHeader;
	document.querySelector("#gameImage").src = gameImage;
}

function playSound(gameSound) {
	if (gameAudio !== null) {
			gameAudio.pause();
		}

		gameAudio = new Audio(gameSound);
		gameAudio.play();
}

function resetVariables() {
	guesses = 10;
	incorrectLetters = [];
	currentWord = [];
	chooseRandomWord();
	replaceLettersWithBlanks();	
}

// Play Game

printGameHTML("", "assets/images/starwars-old.jpg");
playSound("http://www.thesoundarchive.com/starwars/star-wars-theme-song.mp3");
resetVariables();
printHTML();

document.onkeyup = function(event) {
	var userGuess = String.fromCharCode(event.keyCode).toUpperCase();

	if (randomWord.indexOf(userGuess) >= 0) {
		replaceBlankWithLetter(userGuess);
	}
	else if (incorrectLetters.indexOf(userGuess) < 0) {
		guesses--;
		incorrectLetters.push(userGuess);
	}

	if (currentWord.indexOf("_") < 0) {
		printGameHTML(randomWord, imgOptions[randomNumber]);
		playSound(soundOptions[randomNumber]);
		wins++;
		resetVariables();
	}
	else if (guesses === 0) {
		printGameHTML("", "assets/images/starwars-new.jpg");
		playSound("http://www.thesoundarchive.com/starwars/star-wars-theme-song.mp3");
		resetVariables();
	}

	printHTML();
}