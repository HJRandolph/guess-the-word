const guessed = document.querySelector(".guessed-letters");
const btn = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const appear = document.querySelector(".remaining > span");
const messages = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const word = 'MAGNOLIA';
const guessedLetters = [];

const wordsInProgress = function(word){
    const pieces = [];
    for(const letter of word){
        // console.log(letter);
        pieces.push("●");
    }
    progress.innerText = pieces.join("");   
};

btn.addEventListener("click", function(e){
    e.preventDefault();
    let guess = letter.value;
    messages.innerText = 
    letter.value = "";
    acceptGuess(guess);
    console.log(guess);
});

const acceptGuess = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        messages.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        messages.innerText = "You have entered too many letters.";
    } else if (!input.match(acceptedLetter)){
        messages.innerText = "You have entered a non-alphabetic character. Please try again.";
    } else {
        messages.innerText = "Well done, you!";
        makeGuess(input);
    }
    
};

const makeGuess = function(l){
    l = l.toUpperCase();
    if (guessedLetters.length === 0){
        guessedLetters.push(l);
    }
    if (!l.match(guessedLetters)){
        guessedLetters.push(l);
    } else {
        messages.innerText = "You have already guessed that letter. Try again.";
    }
    
    console.log(guessedLetters);
};

wordsInProgress(word);