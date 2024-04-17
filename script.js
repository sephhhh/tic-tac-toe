//(function() {
    function Player(playerMark) {
        let win = null;
        function addMark(row, column) {
            if (Gameboard.gameboard[row][column] == null) {
                Gameboard.gameboard[row][column] = this.playerMark;
                Game.checkWin();
                Game.checkTie();
            } else {
                console.log('this spot is already taken');
            }
        };
        return {
            playerMark,
            addMark,
            win,
        }
    }

    const Gameboard = {
        gameboard: [[null, null, null], [null, null, null], [null, null, null]],

    }

    const Game = {
        player1: Player(0),
        player2: Player(1),
        tie: null,
        checkWin: function() {
            let board = Gameboard.gameboard;
            for (let i=0; i<3; i++) {
                if (board[0][i] != null) {
                    if (board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
                        if (board[0][i] == 0) {
                            this.player1.win = true;
                        } else {
                            this.player2.win = true;
                        }
                    }
                }
                if (board[i][0] != null) {
                    if (board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
                        if (board[i][0] == 0) {
                            this.player1.win = true;
                        } else {
                            this.player2.win = true;
                        }
                    }
                }
            }
            if (board[0][0] != null) {
                if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
                    if (board[0][0] == 0) {
                        this.player1.win = true;
                    } else {
                        this.player2.win = true;
                    }
                }
            } 
            if (board[2][0] != null) {
                if (board[2][0] == board[1][1] && board[2][0] == board[0][2]) {
                    if (board[2][0] == 0) {
                        this.player1.win = true;
                    } else {
                        this.player2.win = true;
                    }
                }
            }
        },
        checkTie: function() {
            let gameboardTie = Gameboard.gameboard.find(mark => mark == null);
             if (gameboardTie == undefined) {
                if (this.player1.win == null && this.player2.win == null) {
                    this.tie = true;
                } else {
                    console.log('game over')
                }
            }
        },
    };

    const Display = {
        counter: 0,
        click: function() {
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    if (button.textContent == "") {
                        if (this.counter % 2 == 0) {
                            button.textContent = "X";
                            console.log(button.className)
                        } else {
                            button.textContent = "O";
                            console.log(button.className)
                        }
                        this.counter++;
                    }
                })
            })
        }
    };
    Display.click();
//})();

