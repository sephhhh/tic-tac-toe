//(function() {
    function Player(playerMark) {
        function addMark(row, column) {
            if (Gameboard.gameboard[row][column] == null) {
                Gameboard.gameboard[row][column] = this.playerMark;
                Game.checkWin();
            } else {
                console.log('this spot is already taken');
            }
        };
        return {
            playerMark,
            addMark,
        }
    }

    const Gameboard = {
        gameboard: [[null, null, null], [null, null, null], [null, null, null]],
    }

    const Game = {
        player1: Player(0),
        player2: Player(1),
        checkWin: function() {
            let board = Gameboard.gameboard;
            for (let i=0; i<3; i++) {
                if (board[0][i] != null) {
                    if (board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
                        if (board[0][i] == 0) {
                            console.log("player1 wins!");
                        } else {
                            console.log("player2 wins!");
                        }
                    }
                }
                if (board[i][0] != null) {
                    if (board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
                        if (board[i][0] == 0) {
                            console.log("player1 wins!");
                        } else {
                            console.log("player2 wins!");
                        }
                    }
                }
            }
            if (board[0][0] != null) {
                if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
                    if (board[0][0] == 0) {
                        console.log("player1 wins!");
                    } else {
                        console.log("player2 wins!");
                    }
                }
            } 
            if (board[2][0] != null) {
                if (board[2][0] == board[1][1] && board[2][0] == board[0][2]) {
                    if (board[2][0] == 0) {
                        console.log("player1 wins!");
                    } else {
                        console.log("player2 wins!");
                    }
                }
            }
        }
    }
//})();

