const gameBoard = document.getElementById('gameBoard');
const images = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let firstTile, secondTile;
let isProcessing = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createTiles() {
    const shuffledImages = shuffle(images);
    shuffledImages.forEach(image => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.textContent = image;
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
    tile.style.color = 'white';

    if (!firstTile) {
        firstTile = tile;
    } else {
        secondTile = tile;

        if (firstTile.textContent === secondTile.textContent) {
            firstTile = null;
            secondTile = null;
        } else {
            isProcessing = true;
            disableBoard();
            setTimeout(() => {
                firstTile.classList.remove('revealed');
                firstTile.style.color = 'transparent';
                secondTile.classList.remove('revealed');
                secondTile.style.color = 'transparent';
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

createTiles();
