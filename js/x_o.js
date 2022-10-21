$(document).ready(function(){

    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const againButton = document.querySelector('#again');
    const announcer = document.querySelector('.announcer');
    const numx = document.querySelector('.numx');
    const numo = document.querySelector('.numo');

    var numX =0;
    var numO =0;

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;
    
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === "" || b === "" || c === "") {
            continue;
            }
            if (a === b && b === c) {
            roundWon = true;
            break;
            }
        }
        
        if (roundWon) {
            announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }
    
        if (!board.includes("")) announce(TIE);
        }

        const announce = (type) => {
            switch(type){
                case PLAYERO_WON:
                    announcer.innerHTML = 'Player <span class="playerO">2</span> Won';
                    numO++;
                    numo.innerHTML = `${numO}`;
                    break;
                case PLAYERX_WON:
                    announcer.innerHTML = 'Player <span class="playerX">1</span> Won';
                    numX++;
                    numx.innerHTML = `${numX}`;
                    break;
                case TIE:
                    announcer.innerText = 'Tie';
                }
            announcer.classList.remove('hide');
        };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
    
        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }
    
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if(currentPlayer === 'X'){
            playerDisplay.innerText = "1";
        }
        if(currentPlayer === 'O'){
            playerDisplay.innerText = "2";
        }
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');
    
        if (currentPlayer === 'O') {
            changePlayer();
        }
    
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    const againBoard = () => {
        numX =0;
        numO =0;

        numo.innerHTML = `${numO}`;
        numx.innerHTML = `${numX}`;

        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');
    
        if (currentPlayer === 'O') {
            changePlayer();
        }
    
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
    againButton.addEventListener('click', againBoard);
});
