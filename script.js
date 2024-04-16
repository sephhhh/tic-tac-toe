//(function() {
    function Player(playerMark) {
        function addMark(row, column) {
            Gameboard.gameboard[row][column] = this.playerMark;
            Game.checkWin();
        };
        return {
            playerMark,
            addMark,
        }
    }

    const Gameboard = {
        gameboard: [[null, null, null], [null, null, null], [, null, null]],
    }

    const Game = {
        player1: Player(0),
        player2: Player(1),
        checkWin: function() {
            let board = Gameboard.gameboard;
            for (let i=0; i<3; i++) {
                if (board[0][i] != null) {
                    if (board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
                        console.log('true');
                    }
                }
                if (board[i][0] != null) {
                    if (board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
                        console.log('true');
                    }
                }
            }
            if (board[0][0] != null) {
                if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
                    console.log('true');
                }
            } 
            if (board[2][0] != null) {
                if (board[2][0] == board[1][1] && board[2][0] == board[0][2]) {
                    console.log('true');
                }
            }
        }
    }
//})();

