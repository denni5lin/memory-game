const allCards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 
			   'fa-cube', 'fa-cube', 'fa-bomb', 'fa-bomb', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle'];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function displayCards() {
	const deck = document.querySelector('.deck');
	let cardHTML = shuffle(allCards).map(function(card) {
		return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
	});
	deck.innerHTML = cardHTML.join('');
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

// Timer
let timer = new Timer;
let finalTime = '';

// EasyTimer.js -- source: https://github.com/albert-gonzalez/easytimer.js
function startTimer() {
  timer.start();
  timer.addEventListener('secondsUpdated', function (e) {
      $('#timer').html(timer.getTimeValues().toString());
  });
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

 // Display shuffled cards when page loads
displayCards();
displayStars(5);

const cards = document.querySelectorAll('.card');
const moves = document.querySelector('.moves');
const restart = document.querySelector('.restart');
let openCards = [];
let matchedCards = [];

// Display stars for rating 
function displayStars(n) {
	const stars = document.querySelector('.stars');
	let starsHTML = '';
	for(let i = 0; i < n; i++) {
		starsHTML += `<li><i class="fa fa-star"></i></li>`;
	}
	stars.innerHTML = starsHTML;
}

// Count number of moves
let moveCount = 0;
displayCount();
function displayCount() {
	moves.textContent = moveCount;
}

// Refresh when click restart
restart.addEventListener('click', function() {
	location.reload(true);
});

// Star rating
let starCount;
function starRating(n) {
	if(n >= 30) {
		displayStars(1);
		starCount = 1;
	} else if (n >= 25) {
		displayStars(2);
		starCount = 2;
	} else if (n >= 20) {
		displayStars(3);
		starCount = 3;
	} else if (n >= 15){
		displayStars(4);
		starCount = 4;
	} else {
		displayStars(5);
		starCount = 5;
	}
}

// Get final time
function gameOver() {
  timer.stop();
  finalTime = $('#timer').html().toString();
}

// Get modal element
const modal = document.getElementById('simpleModal');
const modalContent = document.getElementById('modal-content');
// const modalBtn = document.getElementById('modalBtn');
const result = document.getElementById('result');

// Get close button
const closeBtn = document.getElementById('closeBtn');

// Modal hide background
const modalHide = document.getElementById('modalHide');

// modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

// Click to close modal
window.addEventListener('click', outsideClick);

function openModal() {
	modal.style.display = 'block';
	result.insertAdjacentHTML('beforeend',`<p>Your time was: ${finalTime}</p>`);	
	result.insertAdjacentHTML('beforeend',`<p>With ${moveCount} Moves and ${starCount} Stars.</p>`);
	result.insertAdjacentHTML('beforeend',`<p>Wooooooo!</p>`);
	modalHide.style.display = 'none';
}

function closeModal() {
	modal.style.display = 'none';
	location.reload(true);
}

function outsideClick(e) {
	if(e.target == modal) {
		modal.style.display = 'none';
		location.reload(true);
	}
}

// Flip card when clicked
cards.forEach(function(card) {
	card.addEventListener('click', function(e) {
		startTimer();
		if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
			openCards.push(card);
			card.classList.add('open', 'show');
			if(openCards.length === 2) {
				// If cards match
				if(openCards[0].dataset.card === openCards[1].dataset.card) {
					openCards.forEach(function(card) {
						card.classList.add('match', 'open', 'show', 'animated', 'rubberBand');
			            matchedCards.push(card);
			            // console.log(matchedCards.length);
			            // WHEN ALL CARDS MATCHED!
			            if(matchedCards.length === 16) {
			            	gameOver();
			            	openModal();
			            }
					});
					moveCount += 1;			
					starRating(moveCount);
					displayCount();
					openCards = [];
				} else {
					// Shake if not match
			      	openCards.forEach(function(card) {
			        	card.classList.add('animated', 'shake');
				      })
				      // Hide cards and remove animation if not match
					setTimeout(function() {
						openCards.forEach(function(card) {
							card.classList.remove('open', 'show', 'animated', 'shake');
						});
						openCards = [];
					}, 500);
					moveCount += 1;
					starRating(moveCount);
					displayCount();
				}
			}
		}
	})
})