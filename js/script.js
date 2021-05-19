const guessed = document.querySelector(".guessed-letters");
const btn = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const appear = document.querySelector(".remaining > span");
const messages = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const word = 'magnolia';

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
    console.log(guess);
    letter.value = "";
});

wordsInProgress(word);