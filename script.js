const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const images = [
  'image1.png', 'image2.png', 'image3.png', 'image4.png',
  'image5.png', 'image6.png', 'image7.png', 'image8.png',
  'image1.png', 'image2.png', 'image3.png', 'image4.png',
  'image5.png', 'image6.png', 'image7.png', 'image8.png'
];
let firstTile, secondTile;
let isProcessing = false;

shuffle(images);
createTiles();

resetButton.addEventListener('click', resetGame);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createTiles() {
  const shuffledImages = shuffle(images);
  shuffledImages.forEach((image, index) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.style.backgroundImage = `url('${image}')`;
    tile.dataset.image = image;
    tile.addEventListener('click', handleTileClick);
    gameBoard.appendChild(tile);
  });
}

function handleTileClick(event) {
  if (isProcessing) return;

  const tile = event.target;

  if (tile.classList.contains('revealed') || firstTile === tile) {
    return;
  }

  tile.classList.add('revealed');

  if (!firstTile) {
    firstTile = tile;
  } else {
    secondTile = tile;

    if (firstTile.dataset.image === secondTile.dataset.image) {
      firstTile = null;
      secondTile = null;
    } else {
      isProcessing = true;
      disableBoard();
      setTimeout(() => {
        firstTile.classList.remove('revealed');
        secondTile.classList.remove('revealed');
        firstTile = null;
        secondTile = null;
        enableBoard();
        isProcessing = false;
      }, 1000);
    }
  }
}

function disableBoard() {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.style.pointerEvents = 'none';
  });
}

function enableBoard() {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    if (!tile.classList.contains('revealed')) {
      tile.style.pointerEvents = 'auto';
    }
  });
}

function resetGame() {
  gameBoard.innerHTML = '';
  shuffle(images);
  createTiles();
  firstTile = null;
  secondTile = null;
  isProcessing = false;
}
