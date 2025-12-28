import {ConsoleWrapper} from "./consoleWrapper";
import {Board} from "./Board";

export class Player {
    private _name: string;
    private purse: number = 0;
    private inPenaltyBox: boolean = false;
    private isGettingOutOfPenaltyBox: boolean = false;

    constructor(name: string) {
        this._name = name;
    }

    public attemptGetOutOfPenaltyBox(roll: number) {
        if (roll % 2 == 0) {
            this.isGettingOutOfPenaltyBox = false;
            return this.isGettingOutOfPenaltyBox;
        }

        this.isGettingOutOfPenaltyBox = true;
        return this.isGettingOutOfPenaltyBox;
    }

    isInPenaltyBox() {
        return this.inPenaltyBox;
    }

    name() {
        return this._name;
    }
}

export class Game {

    // board
    private board: Board = new Board();

    // player
    private players: Array<Player> = new Array<Player>();
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
        this.players.push(new Player(name));
        this.purses[this.players.length - 1] = 0;
        this.inPenaltyBox[this.players.length - 1] = false;

        this.console.log(name + " was added");
        this.console.log("They are player number " + this.players.length);

        return true;
    }
    public roll(roll: number) {
        this.console.log(this.board.currentPlayerName() + " is the current player");
        this.console.log("They have rolled a " + roll);

        const message = this.board.displayPenaltyBoxMessage(roll);
        if (message) {
            console.log(message)
        }

        this.console.log(this.board.displayPlayerLocation(roll));

    }

    public askQuestion(): void {
        const playerBoardPosition = this.board.currentPlayerLocation();
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
