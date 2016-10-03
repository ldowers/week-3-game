var wins = 0;
var wordOptions = ['LEIA', 'LUKE', 'HAN SOLO', 'YODA', 'CHEWBACCA', 'DEATH STAR', 'DARTH VADER'];
var imgOptions = ['assets/images/leia.jpg', 'assets/images/luke.jpg', 'assets/images/han_solo.jpg', 'assets/images/yoda.jpg', 'assets/images/chewbacca.jpg', 'assets/images/death_star.jpg', 'assets/images/darth_vader.jpg'];
var randomNumber = Math.floor(Math.random() * wordOptions.length);
var randomWord = wordOptions[randomNumber];
var guesses = 10;
var incorrectLetters = [];
var currentWord = [];

for (var i = 0; i < randomWord.length; i++) {
	if (randomWord[i] === " ") {
		currentWord.push("&nbsp;");
	}
	else  {
		currentWord.push("_");
	}
}

console.log("randomWord: " + randomWord);
console.log("currentWord: " + currentWord);

currentWordHTML = currentWord.join(" ");
document.querySelector("#currentWord").innerHTML = currentWordHTML;

document.querySelector("#numGuessesRemaining").innerHTML = guesses;

document.onkeyup = function(event) {
	var userGuess = String.fromCharCode(event.keyCode).toUpperCase();

	console.log("userGuess: " + userGuess);
	console.log("randomWord: " + randomWord);

	if (randomWord.indexOf(userGuess) >= 0) {
		console.log("Correct");

		for (var i = 0; i < randomWord.length; i++) {
			if (randomWord[i] === userGuess) {
				currentWord[i] = userGuess;
			}
		}

		console.log(currentWord);

		currentWordHTML = currentWord.join(" ");
		document.querySelector("#currentWord").innerHTML = currentWordHTML;		
	}
	else if (incorrectLetters.indexOf(userGuess) < 0) {
		console.log("Wrong");

		guesses--;
		document.querySelector("#numGuessesRemaining").innerHTML = guesses;

		incorrectLetters.push(userGuess);
		incorrectLettersHTML = incorrectLetters.join(", ");
		document.querySelector("#lettersAlreadyGuessed").innerHTML = incorrectLettersHTML;

		console.log(incorrectLetters);
	}
	if (currentWord.indexOf("_") < 0) {
		console.log("You win!");
		document.querySelector("#gameHeader").innerHTML = randomWord;
		document.querySelector("#gameImage").src = imgOptions[randomNumber];
		wins++;
		randomNumber = Math.floor(Math.random() * wordOptions.length);
		randomWord = wordOptions[randomNumber];
		guesses = 10;
		incorrectLetters = [];
		currentWord = [];

		for (var i = 0; i < randomWord.length; i++) {
			if (randomWord[i] === " ") {
				currentWord.push("&nbsp;");
			}
			else  {
				currentWord.push("_");
			}
		}

		console.log(randomWord);
		console.log(currentWord);

		document.querySelector("#numWins").innerHTML = wins;

		currentWordHTML = currentWord.join(" ");
		document.querySelector("#currentWord").innerHTML = currentWordHTML;
		document.querySelector("#numGuessesRemaining").innerHTML = guesses;
		document.querySelector("#lettersAlreadyGuessed").innerHTML = incorrectLetters;
	}
	else if (guesses === 0) {
		console.log("You lose!");
		document.querySelector("#gameHeader").innerHTML = "";
		document.querySelector("#gameImage").src = "assets/images/starwars.jpg";
		
		randomNumber = Math.floor(Math.random() * wordOptions.length);
		randomWord = wordOptions[randomNumber];
		guesses = 10;
		incorrectLetters = [];
		currentWord = [];

		for (var i = 0; i < randomWord.length; i++) {
			if (randomWord[i] === " ") {
				currentWord.push("&nbsp;");
			}
			else  {
				currentWord.push("_");
			}
		}

		console.log(randomWord);
		console.log(currentWord);

		currentWordHTML = currentWord.join(" ");
		document.querySelector("#currentWord").innerHTML = currentWordHTML;
		document.querySelector("#numGuessesRemaining").innerHTML = guesses;
		document.querySelector("#lettersAlreadyGuessed").innerHTML = incorrectLetters;		
	}
}