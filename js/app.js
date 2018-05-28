/*
 * Create a list that holds all of your cards
 */
const allCards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 
			   'fa-cube', 'fa-cube', 'fa-anchor', 'fa-anchor', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle'];

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

const cards = document.querySelectorAll('.card');
const moves = document.querySelector('.moves');
const restart = document.querySelector('.restart');
let openCards = [];

// Count number of moves
let moveCount = 0;
displayCount();
function displayCount() {
	moves.textContent = moveCount;
}

// Refresh when click restart
restart.addEventListener('click', function() {
	moveCount = 0;
	displayCount();
	displayCards();
})

// Flip card when clicked
cards.forEach(function(card) {
	card.addEventListener('click', function(e) {

		if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
			openCards.push(card);
			card.classList.add('open', 'show');

			if(openCards.length === 2) {
				// If cards match
				if(openCards[0].dataset.card === openCards[1].dataset.card) {
					openCards[0].classList.add('match');
					openCards[0].classList.add('open');
					openCards[0].classList.add('show');
					openCards[1].classList.add('match');
					openCards[1].classList.add('open');
					openCards[1].classList.add('show');
					moveCount += 1;
					displayCount();
					openCards = [];
				} else {
					// Hide cards if not match
					setTimeout(function() {
						openCards.forEach(function(card) {
						card.classList.remove('open', 'show');
						});
						openCards = [];
					}, 1000);
					moveCount += 1;
					displayCount();
				}
			}
		}
	})
})