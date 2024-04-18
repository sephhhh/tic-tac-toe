(function() {
    function Player(playerMark) {
        let win = null;
        let count = 0;

        return {
            playerMark,
            win,
            count,
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
                            this.player1.count++;
                            this.player1.win = true;
                            this.disableAfterRound();
                            Display.updateScore();
                        } else {
                            this.player2.win = true;
                            this.player2.count++;
                            this.disableAfterRound();
                            Display.updateScore();
                        }
                    }
                }
                if (board[i][0] != null) {
                    if (board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
                        if (board[i][0] == 0) {
                            this.player1.win = true;
                            this.player1.count++;
                            this.disableAfterRound();
                            Display.updateScore();
                        } else {
                            this.player2.win = true;
                            this.player2.count++;
                            this.disableAfterRound();
                            Display.updateScore();
                        }
                    }
                }
            }
            if (board[0][0] != null) {
                if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
                    if (board[0][0] == 0) {
                        this.player1.win = true;
                        this.player1.count++;
                        this.disableAfterRound();
                        Display.updateScore();
                    } else {
                        this.player2.win = true;
                        this.player2.count++;
                        this.disableAfterRound();
                        Display.updateScore();
                    }
                }
            } 
            if (board[2][0] != null) {
                if (board[2][0] == board[1][1] && board[2][0] == board[0][2]) {
                    if (board[2][0] == 0) {
                        this.player1.win = true;
                        this.player1.count++;
                        this.disableAfterRound();
                        Display.updateScore();
                    } else {
                        this.player2.win = true;
                        this.player2.count++;
                        this.disableAfterRound();
                        Display.updateScore();
                    }
                }
            }
        },
        checkTie: function() {
            let gameboardTie = Gameboard.gameboard.every(row => row.every(mark => mark !== null));
             if (gameboardTie == true) {
                if (this.player1.win == null && this.player2.win == null) {
                    this.tie = true;
                    this.disableAfterRound();
                }
            }
        },
        disableAfterRound: function() {
            const buttons = document.querySelectorAll('.box button');
            buttons.forEach(button => {
                button.disabled = true;
            });
        },
        restart: function() {
            Gameboard.gameboard = [[null, null, null], [null, null, null], [null, null, null]];
            this.player1.win = null;
            this.player2.win = null;
            this.tie = null;
            this.player1Results = 0;
            this.player2Results = 0;
        }
    };

    const Display = {
        player1Name: null,
        player2Name: null,
        counter: 0,
        row: null,
        column: null,
        mark: null,
        result: result = document.querySelector('.result'),
        play: function() {
            const playButton = document.querySelector('.play');
            const form = document.querySelector('form');
            playButton.addEventListener('click', () => {
                form.style.display = "flex";
                playButton.style.display = "none";
            })
        },
        submit: function() {
            const submit = document.querySelector('.submit');
            const theGame = document.querySelector('.game');
            const form = document.querySelector('form');
            let names = document.querySelector('.names');
            submit.addEventListener('click', (event) => {
                event.preventDefault();
                if (!this.invalidInput()) {
                    this.player1Name = document.querySelector('[name="player1"]').value;
                    this.player2Name = document.querySelector('[name="player2"]').value;
                    theGame.style.visibility = "visible";
                    form.style.display = "none";
                    names.textContent = `${this.player1Name} vs ${this.player2Name}`;
                } else {
                    alert('Invalid input.')
                }
            })
        },
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
        },
        updateScore: function() {
            const player1CurrentScore = document.querySelector('.player1result');
            const player2CurrentScore = document.querySelector('.player2result');
            player1CurrentScore.textContent = `${Game.player1.count}`;
            player2CurrentScore.textContent = `${Game.player2.count}`;
        },
        displayWinner: function() {
            const resultButton = document.querySelector('.winner');
            resultButton.addEventListener('click', () => {
                if (Game.player1.count > Game.player2.count) {
                    this.result.textContent = `${this.player1Name} won!`;
                } else if (Game.player2.count > Game.player1.count) {
                    this.result.textContent = `${this.player2Name} won!`;
                } else {
                    this.result.textContent = 'Tie Game';
                }
            })
        },
        invalidInput: function() {
            const name1 = document.querySelector('[name="player1"]').value;
            const name2 = document.querySelector('[name="player2"]').value;
            if (name1 == "" || name2 == "") {
                return true;
            };
        },
        restart: function() {
            const restartButton = document.querySelector('.restart');
            restartButton.addEventListener('click', () => {
                Game.restart()
                this.result.textContent = "";
                const buttons = document.querySelectorAll('.box button');
                buttons.forEach(button => {
                    button.textContent = "";
                    button.disabled = false;
                });
            });

        }
    };
    Display.play();
    Display.submit();
    Display.click();
    Display.restart();
    Display.displayWinner();
})();