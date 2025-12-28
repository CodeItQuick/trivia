import {ConsoleWrapper} from "./consoleWrapper";

export class Board {
    private players: Array<string> = [];
    private places: Array<number> = [];
    private currentPlayer: number = 0;

    public addPlayer(name: string): number {
        this.players.push(name);
        this.places[this.players.length - 1] = 0;

        return this.players.length;
    }
    public movePlayer(roll: number) {
        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
        if (this.places[this.currentPlayer] > 12) {
            this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }

        return this.places[this.currentPlayer];
    }
    public rotatePlayer() {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) {
            this.currentPlayer = 0;
        }
    }
    public currentPlayerLocation(): number {
        return this.places[this.currentPlayer];
    }
    public currentPlayerName(): string {
        return this.players[this.currentPlayer];
    }
    public currentPlayerIdx(): number {
        return this.currentPlayer;
    }
}

export class Game {

    // board
    private board: Board = new Board();
    private players: Array<string> = [];
    private places: Array<number> = [];
    private currentPlayer: number = 0;

    // player
    private purses: Array<number> = [];
    private inPenaltyBox: Array<boolean> = [];
    private isGettingOutOfPenaltyBox: boolean = false;

    // questioner
    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];

    private console: ConsoleWrapper | typeof console;

    constructor(consoleWrapper: ConsoleWrapper | typeof console = console) {

        this.console = consoleWrapper;

        for (let i = 0; i < 50; i++) {
            this.popQuestions.push("Pop Question " + i);
            this.scienceQuestions.push("Science Question " + i);
            this.sportsQuestions.push("Sports Question " + i);
            this.rockQuestions.push("Rock Question " + i);
          }
    }
    public add(name: string): boolean {
        this.board.addPlayer(name);
        this.players.push(name);
        this.purses[this.players.length - 1] = 0;
        this.inPenaltyBox[this.players.length - 1] = false;

        this.console.log(name + " was added");
        this.console.log("They are player number " + this.players.length);

        return true;
    }
    public roll(roll: number) {
        this.console.log(this.board.currentPlayerName() + " is the current player");
        this.console.log("They have rolled a " + roll);

        if (this.inPenaltyBox[this.board.currentPlayerIdx()]) {
            if (roll % 2 == 0) {
                this.console.log(this.board.currentPlayerName() + " is not getting out of the penalty box");
                this.isGettingOutOfPenaltyBox = false;
                return;
            }

            this.isGettingOutOfPenaltyBox = true;

            this.console.log(this.board.currentPlayerName() + " is getting out of the penalty box");
        }

        const currentPlayerPlace = this.board.movePlayer(roll);

        this.console.log(this.board.currentPlayerName() + "'s new location is " + currentPlayerPlace);

    }

    public askQuestion(): void {
        let playerBoardPosition = this.board.currentPlayerLocation();
        if (playerBoardPosition % 4 === 0) {
            this.console.log("The category is Pop");
            this.console.log(this.popQuestions.shift());
        }
        if (playerBoardPosition % 4 === 1) {
            this.console.log("The category is Science");
            this.console.log(this.scienceQuestions.shift());
        }
        if (playerBoardPosition % 4 === 2) {
            this.console.log("The category is Sports");
            this.console.log(this.sportsQuestions.shift());
        }
        if (playerBoardPosition % 4 === 3) {
            this.console.log("The category is Rock");
            this.console.log(this.rockQuestions.shift());
        }
    }
    public wrongAnswer(): void {
        this.inPenaltyBox[this.board.currentPlayerIdx()] = true;
        this.console.log('Question was incorrectly answered');
        this.console.log(this.board.currentPlayerName() + " was sent to the penalty box");
    }

    public wasCorrectlyAnswered(): void {
        if (this.inPenaltyBox[this.board.currentPlayerIdx()] && !this.isGettingOutOfPenaltyBox) {
            return;
        }
      
        this.purses[this.board.currentPlayerIdx()] += 1;

        this.console.log("Answer was correct!!!!");
        this.console.log(this.board.currentPlayerName() + " now has " +
            this.purses[this.board.currentPlayerIdx()] + " Gold Coins.");
    }

    public currentPlayerWon() {
        return this.purses[this.board.currentPlayerIdx()] === 6;
    }

    public rotatePlayer() {
        this.board.rotatePlayer();
    }

}
