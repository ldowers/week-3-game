// Variables

var wins = 0;
var wordOptions = ['PRINCESS LEIA', 'LUKE SKYWALKER', 'HAN SOLO', 'YODA', 'CHEWBACCA', 'DEATH STAR', 'DARTH VADER'];
var imgOptions = ['assets/images/leia.jpg', 'assets/images/luke.jpg', 'assets/images/han_solo.jpg', 'assets/images/yoda.jpg', 'assets/images/chewbacca.jpg', 'assets/images/death_star.jpg', 'assets/images/darth_vader.jpg'];
var randomNumber = 0;
var randomWord = "";
var guesses = 0;
var incorrectLetters = [];
var currentWord = [];

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

function resetVariables() {
	guesses = 10;
	incorrectLetters = [];
	currentWord = [];
	chooseRandomWord();
	replaceLettersWithBlanks();	
}

// Play Game

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
		wins++;
		resetVariables();
	}
	else if (guesses === 0) {
		printGameHTML("", "assets/images/starwars-new.jpg");
		resetVariables();
	}

	printHTML();
}