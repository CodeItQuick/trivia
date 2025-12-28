import {ConsoleWrapper} from "./consoleWrapper";
import {Board} from "./Board";
import {Player} from "./player";

export class Game {

    // board
    private board: Board = new Board();

    // player
    private players: Array<Player> = new Array<Player>();

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

        this.console.log(name + " was added");
        this.console.log("They are player number " + this.players.length);

        return true;
    }
    public roll(roll: number) {
        this.console.log(this.board.beginTurn());
        this.console.log(this.board.rollPlayerMessage(roll));

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
        const message = this.board.putPlayerInBox();

        this.console.log('Question was incorrectly answered');
        this.console.log(message);
    }

    public isCurrentPlayerFree(roll: number): boolean {
        return this.board.isCurrentPlayerFree(roll);
    }

    public wasCorrectlyAnswered(): void {
        const message = this.board.rewardPlayer();

        this.console.log("Answer was correct!!!!");
        this.console.log(message);
    }

    public currentPlayerWon() {
        return this.board.hasPlayerWon();
    }

    public rotatePlayer() {
        this.board.rotatePlayer();
    }

}
