const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let firstCard = null;

function createBoard() {
  const board = document.getElementById('board');
  shuffleArray(cards);

  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index = index;
    cardElement.textContent = '?';
    cardElement.addEventListener('click', flipCard);
    board.appendChild(cardElement);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function flipCard(event) {
  const cardIndex = event.target.dataset.index;
  event.target.textContent = cards[cardIndex];
  event.target.removeEventListener('click', flipCard);
  setTimeout(() => checkForMatch(cardIndex), 1000);
}

function checkForMatch(cardIndex) {
  if (firstCard === null) {
    firstCard = cardIndex;
  } else {
    if (cards[firstCard] === cards[cardIndex]) {
      alert('זוג זהה מצוין!');
      document.querySelector(`[data-index="${firstCard}"]`).style.visibility = 'hidden';
      document.querySelector(`[data-index="${cardIndex}"]`).style.visibility = 'hidden';
    } else {
      document.querySelector(`[data-index="${firstCard}"]`).textContent = '?';
      document.querySelector(`[data-index="${cardIndex}"]`).textContent = '?';
      document.querySelector(`[data-index="${firstCard}"]`).addEventListener('click', flipCard);
      document.querySelector(`[data-index="${cardIndex}"]`).addEventListener('click', flipCard);
    }
    firstCard = null;
  }
}

createBoard();
