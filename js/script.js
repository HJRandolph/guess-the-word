const guessed = document.querySelector(".guessed-letters");
const btn = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const appear = document.querySelector(".remaining > span");
const messages = document.querySelector(".message");
const test = document.querySelector(".test");
const playAgain = document.querySelector(".play-again");
const word = 'magnolia';
const guessedLetters = [];

const wordInProgress = function(word){
    const pieces = [];
    for(const letter of word){
        
        pieces.push("●");
    }
    progress.innerText = pieces.join("");   
};

wordInProgress(word);

btn.addEventListener("click", function(e){
    e.preventDefault();
    const guess = letter.value;
    acceptGuess(guess);
    console.log(guess);
    letter.value = "";
});

console.log(guessedLetters);

const acceptGuess = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        messages.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        messages.innerText = "You have entered too many letters.";
    } else if (!input.match(acceptedLetter)){
        messages.innerText = "You have entered a non-alphabetic character. Please try again.";
    } else {
        makeGuess(input);
        return input;
    }
    
};

const makeGuess = function(l){
    l = l.toUpperCase();
   if(guessedLetters.includes(l)){
       messages.innerText = "You have already guessed that letter. Try again.";
   } else{
       guessedLetters.push(l);
       showGuessedLetters();
       updatePage(guessedLetters);
   }
    console.log(guessedLetters);
};

const showGuessedLetters = function(){
    guessed.innerHTML = "";
    for (const letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessed.append(li);
    }
};

const updatePage = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showWord = [];
    for (const letter of wordArray){
    if (guessedLetters.includes(letter)){
        showWord.push(letter.toUpperCase());
    } else {
        showWord.push("●");
    }
    progress.innerText = showWord.join("");
}
// console.log(wordArray);

};


updatePage(guessedLetters);
