/*
 * Create a list that holds all of your cards
 */

const deck = document.querySelector(".deck");
const restart = document.querySelector(".restart");
const reload = document.querySelector(".reload");
let openLists = [];
let matchedCard = 0;
let offClock = true;
let time = 0;
let clockDisplay;
let closeModals = document.querySelectorAll(".close");

let moves = 0;

//  variable cards declared

let cards = ["fa fa-facebook", "fa fa-medium", "fa fa-github", "fa fa-twitter", "fa fa-instagram", "fa fa-github", "fa fa-stack-overflow", "fa fa-google-plus",
    "fa fa-facebook", "fa fa-slack", "fa fa-stack-overflow", "fa fa-slack", "fa fa-twitter", "fa fa-google-plus", "fa fa-medium", "fa fa-instagram"];

// let shuffledCards = shuffle(cards);

//  function that shuffle cards and builds the cards on the deck

function theShuffledCards(){
    const shuffledCards = shuffle(cards);
    for (shuffledCard of shuffledCards) {
        const cardIcons = document.createElement('i');
        cardIcons.setAttribute("class", shuffledCard);
        const cardList = document.createElement('li');
        cardList.appendChild(cardIcons);
        cardList.setAttribute("class", "card");
        deck.appendChild(cardList);
    }
}

theShuffledCards();


let selectedCards = document.querySelectorAll(".card");

//  function that opens and displays card

function openCard(open){
    open.classList.toggle('open');
    open.classList.toggle('show');
}

//  function that adds the open card to the list of open cards

function openCardList(listOfCards){
    openLists.push(listOfCards);
}

//  function that confirms the card's status

function isSelectionTrue(cardStatus) {
    return (
        cardStatus.classList.contains("card") && !cardStatus.classList.contains("match") && openLists.length < 2 && !openLists.includes(cardStatus)
    );
}

//  function that checks whether the opened cards match

function cardMatch(){
    if (openLists[0].firstElementChild.className === openLists[1].firstElementChild.className){
        openLists[0].classList.toggle('match');
        openLists[1].classList.toggle('match');
        openLists = [];
        matchedCard++;
        const totalCardPairs = 8;
        if (matchedCard === totalCardPairs){
            endGame();
            toggleModal();
        }
    }else{
        setTimeout(function (){
            openCard(openLists[0]);
            openCard(openLists[1]);
            openLists = [];
        }, 500);
    }
}


//  function that checks for number of moves made

function displayMoves(){
    moves++;
    const numberOfMoves = document.querySelector(".moves");
    numberOfMoves.innerHTML = moves;
}

//  function that checks for the scores of to remove number of stars

function checkScore() {
    if (moves === 16 || moves === 24){
        removeStar();
    }
}

//  function that removes stars

function removeStar(){
    let stars = document.querySelectorAll(".stars li");
    for (star of stars) {
        if (star.style.display !== "none"){
            star.style.display = "none";
            break;
        }
    }
}

//  function that sets and returns the default number of moves

function setDefaultMoves() {
    moves = 0;
    document.querySelector(".moves").innerHTML = moves;
}

//  function that sets and returns the default number of stars

function setDefaultStars() {
    starvalue = 0;
    let stars = document.querySelectorAll(".stars li");
    for (star of stars) {
        star.style.display = "inline";
    }
}

//  Event listener that executes the above functions

for (selectedCard of selectedCards){
    selectedCard.addEventListener("click", function () {
        if (isSelectionTrue(this)){
            if (offClock) {
                startClock();
                offClock = false;
            }
            openCard(this);
            openCardList(this);
            if (openLists.length === 2){
                cardMatch();
                displayMoves();
                checkScore();
            }
        }
    });
}

// function to store timer


function displayClock() {
    const clockTime = document.querySelector(".timer");
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if (seconds < 10) {
        clockTime.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clockTime.innerHTML = `${minutes}:${seconds}`;
    }
}

// function to start time

function startClock() {
    time = 0;
    clockDisplay = setInterval(function () {
        time++;
        displayClock();
    }, 1000);
}

// function to clear Time Intervals

function stopWatch() {
    clearInterval(clockDisplay);
}

// function to reset time after game ends

function resetTime() {
    stopWatch();
    offClock = true;
    time = 0;
    displayClock();
}

// function to reset game


function resetGame(){
    resetTime();
    setDefaultMoves();
    setDefaultStars();
    deck.innerHTML = "";
    openLists = [];
    theShuffledCards();

}

//  function that restarts game

function restartGame() {
    resetGame();
    let selectedCards = document.querySelectorAll(".card");
    for (selectedCard of selectedCards) {
        selectedCard.addEventListener("click", function () {
            if (isSelectionTrue(this)) {
                if (offClock) {
                    startClock();
                    offClock = false;
                }
                openCard(this);
                openCardList(this);
                if (openLists.length === 2) {
                    cardMatch();
                    displayMoves();
                    checkScore();
                }
            }
        });
    }
}

//  Event Listener that resets Game

restart.addEventListener("click", function () {
    restartGame();
});

//  Event Listener that reload Game

reload.addEventListener("click", function () {
    toggleModal();
    restartGame();
    // const hideBackground = document.querySelector(".modal-background");
    // hideBackground.style.display = "none";

});

// function that determines the remaining stars

function countStars() {
    stars = document.querySelectorAll(".stars li");
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== "none") {
            starCount++;
        }
    }
    if (starCount === 3) {
        return `${starCount} stars`;
    } else if (starCount === 2) {
        return `${starCount} stars`;
    } else {
        return `${starCount} star`;
    }
}


//  modal toggle function

function toggleModal() {
    const modalBackground = document.querySelector(".modal-background");
    modalBackground.classList.toggle("hide-modal");
}
toggleModal();

//  function that displays results in modal


function displayModalResult() {
    const timeDisplay = document.querySelector(".game-time");
    const finalTime = document.querySelector(".timer").innerHTML;
    const finalStars = document.querySelector(".game-stars");
    const finalMoves = document.querySelector(".game-moves");
    const starsNumber = countStars();
    timeDisplay.innerHTML = `Record Time - ${finalTime}`;
    finalStars.innerHTML = `Record - ${starsNumber}`;
    finalMoves.innerHTML = `Number Of Moves - ${moves}`;
}

//  Event Listener loop that handles closing of modal

for (closeModal of closeModals){
    closeModal.addEventListener("click", function () {
        toggleModal();
    });
}


//  Function that determines if the game has ended


function endGame(){
    setTimeout(function (){
    displayModalResult();
    stopWatch();
    }, 500);
}







/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
