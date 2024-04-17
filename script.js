(function() {
    function Player(playerMark) {
        let win = null;

        return {
            playerMark,
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
            let gameboardTie = Gameboard.gameboard.every(row => row.every(mark => mark !== null));
             if (gameboardTie == true) {
                if (this.player1.win == null && this.player2.win == null) {
                    this.tie = true;
                }
            }
        },
        restart: function() {
            Gameboard.gameboard = [[null, null, null], [null, null, null], [null, null, null]];
            this.player1.win = null;
            this.player2.win = null;
            this.tie = null;
        }
    };

    const Display = {
        counter: 0,
        row: null,
        column: null,
        mark: null,
        result: result = document.querySelector('.result'),
        click: function() {
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    if (button.textContent == "") {
                        if (this.counter % 2 == 0) {
                            this.mark = 0;
                            button.textContent = "X";
                            this.row = button.className.split(" ")[0];
                            this.column = button.className.split(" ")[1];
                            this.addToArray();
                        } else {
                            this.mark = 1;
                            button.textContent = "O";
                            this.row = button.className.split(" ")[0];
                            this.column = button.className.split(" ")[1];
                            this.addToArray();
                        }
                        this.counter++;
                    }
                })
            });
        },
        addToArray: function() {
            switch (this.row) {
                case "rowOne":
                    if (this.column == "one") {
                        Gameboard.gameboard[0][0] = this.mark;
                    } else if (this.column == "two") {
                        Gameboard.gameboard[0][1] = this.mark;
                    } else {
                        Gameboard.gameboard[0][2] = this.mark;
                    }
                    break;
                case "rowTwo":
                    if (this.column == "one") {
                        Gameboard.gameboard[1][0] = this.mark;
                    } else if (this.column == "two") {
                        Gameboard.gameboard[1][1] = this.mark;
                    } else {
                        Gameboard.gameboard[1][2] = this.mark;
                    }
                    break;
                case "rowThree":
                    if (this.column == "one") {
                        Gameboard.gameboard[2][0] = this.mark;
                    } else if (this.column == "two") {
                        Gameboard.gameboard[2][1] = this.mark;
                    } else {
                        Gameboard.gameboard[2][2] = this.mark;
                    }
                    break; 
            };
            Game.checkWin();
            Game.checkTie();
            this.displayWinner();
        },
        displayWinner: function() {
            if (Game.player1.win == true) {
                this.result.textContent = "Player1 Wins!";
            } else if (Game.player2.win == true) {
                this.result.textContent = "Player2 Wins!";
            } else if (Game.tie == true) {
                this.result.textContent = "Tie Game!"
            }
        },
        restart: function() {
            const restartButton = document.querySelector('.restart');
            restartButton.addEventListener('click', () => {
                Game.restart()
                this.result.textContent = "";
                const buttons = document.querySelectorAll('.box button');
                buttons.forEach(button => {
                    button.textContent = "";
                });
            });

        }
    };
    Display.click();
    Display.restart();
})();


