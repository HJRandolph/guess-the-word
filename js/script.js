const guessed = document.querySelector(".guessed-letters");
const btn = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const appear = document.querySelector(".remaining > span");
const messages = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const guessInput = document.querySelector(".guess-form > label");
let word = '';
let guessedLetters = [];
let remainingGuesses = 0;

const getWord = async function(){
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random()* wordArray.length);
    word = wordArray[randomIndex].trim();
    // console.log(word);
    wordInProgress(word);
    remainingGuesses = word.length;
    appear.innerText = `${remainingGuesses} guesses`;
};

const wordInProgress = function(word){
    const pieces = [];
    for(const letter of word){
        
        pieces.push("●");
    }
    progress.innerText = pieces.join("");   
};

getWord(word);

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
       countGuesses(l);
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
    
    playerWon();
    }
// console.log(wordArray);
};

// gets called in the makeGuess function
const countGuesses = function(guess){
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(guess)){
        // if the guess is incorrect, lets user know and subtracts one from remaining guesses
        messages.innerText = `Sorry, the word doesn't contain ${guess}.`;
        remainingGuesses -= 1;
        // appear.innerText = `${remainingGuesses}`;
        // console.log(remainingGuesses);
    } else {
        messages.innerText = `Good job! The word contains ${guess}.`;
    }

    if(remainingGuesses === 0){
        messages.innerText = `Sorry, but the game is over. Play again? The word was ${word.toUpperCase()}.`;
        
        
        startOver();
    } else if (remainingGuesses === 1) {
        messages.innerText = 'You have one guess left. Use it wisely.'
        appear.innerText = `${remainingGuesses} guesses`;
    } else {
        appear.innerText = `${remainingGuesses} guesses`;
    }
    
};

const playerWon = function(){
    if (word.toUpperCase() === progress.innerText){
        messages.classList.add("win");
        messages.innerHTML = `<p class="highlight">You correctly guessed the word! Congratulations!</p>`;
        // console.log("you've won!");
        startOver();
    } 
};

updatePage(guessedLetters);

const startOver = function(){
    btn.classList.add("hide");
    letter.classList.add("hide");
    guessInput.classList.add("hide");
    remaining.classList.add("hide");
    guessed.classList.add("hide");
    playAgain.classList.remove("hide");
    
};

playAgain.addEventListener("click", function(){
    messages.classList.remove("win");
    messages.innerText = "";
    
    guessedLetters = [];
 
    guessed.innerHTML = "";
    getWord();
    btn.classList.remove("hide");
    letter.classList.remove("hide");
    guessInput.classList.remove("hide");
    remaining.classList.remove("hide");
    guessed.classList.remove("hide");
    playAgain.classList.add("hide");
});