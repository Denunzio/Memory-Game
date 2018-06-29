/*
 * Create a list that holds all of your cards in a array
 */
let partial = [
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bug"
  ];  
let pieces = partial.concat(partial);
let openedCards = [];
let matCards = [];
const cardsContainer = document.querySelector('.deck');
const endModal = document.getElementById("Modal");
const menuRestartBut = document.querySelector('.menuRestart');
const modalRestartBut = document.querySelector('.modalRestart');  // Restart the Game
let moveCounter = document.querySelector('.moves'); // keep score of moves
let moves = 0;
let stars = document.querySelector('.stars');
let one = document.querySelector('.one');
let two = document.querySelector('.two');
let starRating = document.querySelector('.starRating');

// function starts game for the first time
function initGame() {
    $('#timer').append('<div class="timer"></div>');
    $('.timer').countimer();

    // shuffle the deck     // display the cards on the page
    let deck = shuffle(pieces);

    for(let i = 0; i < deck.length; i++) {
      const card = document.createElement("li");
      card.classList.add("card");
      
      // add image loop over card and pick one at a time es6
      card.innerHTML = `<i class="${deck[i]}"></i>`;
      cardsContainer.appendChild(card);
      
      // add click event
      clickEventBinder(card);
    }
}

// Game starts for the first time
document.onreadystatechange = function() {
    if (document.readyState === "interactive") {
      initGame();
    }
  }
// set up the event listener for a card. If a card is clicked:
function clickEventBinder(card) {
    card.addEventListener("click", function() {

    let curCard = this;  
    let prevCard = openedCards[0];

    if($(curCard).hasClass("disabled")){
        return;
    }

    if(openedCards.length === 1) {
    // flip card shows when clicked

        if($(curCard).hasClass("selected-card")){
            return;
        }

        card.classList.add("open", "show", "disabled");
        openedCards.push(this);

    // compare open 2 cards
        compare(curCard, prevCard);
        isOver();

    } else {
    // flip card shows when clicked
        card.classList.add("open", "show", "disabled", "selected-card");
        openedCards.push(this);
        }  
    });
}

// function compare 2 cards
function compare(curCard, prevCard) {
    if(curCard.innerHTML === prevCard.innerHTML) {
    
      curCard.classList.add("match");
      prevCard.classList.add("match");

      matCards.push(curCard, prevCard);

      openedCards = [];
    } else {
      setTimeout(function() {
        curCard.classList.remove("open", "show", "disabled");
        prevCard.classList.remove("open", "show", "disabled");
        openedCards = [];
      }, 100);
    }
    addMove();

  }

// function add one to moves
function addMove() {
  moves++;
  moveCounter.innerHTML = moves;
// removing stars on move count  
  if (moves > 12 && moves < 15) {  // 2 stars
    one.style.visibility = 'hidden';
  }
  else if (moves > 16) {  // 1 star
    two.style.visibility = 'hidden';
  } 
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
// function check if game is over

function isOver() {
    if(matCards.length === pieces.length) {
        $('.timer').countimer('stop');
        showModal();{
            document.getElementById("finalMove").innerHTML = moves;
            document.getElementById("finalTime").innerHTML = $('.timer').text();
            starRating.innerHTML = stars.innerHTML;
            endModal.style.display = "block";
        }
    }
}
// End Game Modal Show Modal
function showModal() {
    endModal.style.display = "block";
    }

// End of Game Hide modal
function hideModal() {
    endModal.style.display = "none";
    }

// Restart the Game
    menuRestartBut.addEventListener("click", function() {
        resetGame ();
    });

    modalRestartBut.addEventListener("click", function() {
        resetGame ();
    });


function resetGame () {
    cardsContainer.innerHTML = "";
    matCards = [];
    moves = 0;
    moveCounter.innerHTML = moves;
    starRating.innerHTML = stars.innerHTML;
    $('.timer').remove();
    one.style.visibility = 'visible';
    two.style.visibility = 'visible';
    hideModal();
    initGame();
}