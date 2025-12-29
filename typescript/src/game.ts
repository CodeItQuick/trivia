import {ConsoleWrapper} from "./consoleWrapper";
import {Board} from "./Board";
import {Questioner} from "./questioner";
import {DisplayMessages} from "./displayMessages";

export class Game {
    private board: Board = new Board();
    private questioner: Questioner = new Questioner();

    private console: ConsoleWrapper | typeof console;
    private _displayMessages: DisplayMessages;

    constructor(consoleWrapper: ConsoleWrapper | typeof console = console, displayMessages: DisplayMessages = new DisplayMessages()) {
        this.console = consoleWrapper;
        this._displayMessages = displayMessages;
    }

    public add(name: string): void {
        this.board.addPlayer(name);

        this.console.log(name + " was added");
        this.console.log(this._displayMessages.displayPlayerNumber(this.board.numberOfPlayers()));
    }

    public checkPenaltyBox(roll: number) {
        const currentPlayer = this.board.retrieveCurrentPlayer();
        this.console.log(this._displayMessages.displayBeginTurn(currentPlayer.name));

        if (this.board.checkPenaltyBox(roll)) {
            const inPenaltyBox = this.board.retrieveCurrentPlayer().inPenaltyBox;
            this.console.log(this._displayMessages.displayPenaltyBoxMessage(currentPlayer.name, inPenaltyBox));

            return true;
        }

        return false;
    }

    public movePlayer(roll: number): void {
        this.console.log(this._displayMessages.displayRollPlayerMessage(roll));
        const currentPlayer = this.board.retrieveCurrentPlayer();

        currentPlayer.movePlayer(roll);

        this.console.log(this._displayMessages.displayPlayerLocation(currentPlayer.name, currentPlayer.place));
    }

    public askQuestion(): boolean {
        const playerBoardPosition = this.board.retrieveCurrentPlayer().place;
        this.console.log(this.questioner.displayCategory(playerBoardPosition));
        this.console.log(this.questioner.displayQuestion(playerBoardPosition));

        return Math.floor(Math.random() * 10) === 7; // has to be moved
    }

    public wrongAnswer(): void {
        this.console.log('Question was incorrectly answered');
        const currentPlayer = this.board.retrieveCurrentPlayer();
        currentPlayer.inPenaltyBox = true;

        this.console.log(this._displayMessages.displayPutPlayerInBox(currentPlayer.name));
    }

    public wasCorrectlyAnswered(): void {
        this.console.log("Answer was correct!!!!");
        const currentPlayer = this.board.retrieveCurrentPlayer();
        currentPlayer.purse++;

        this.console.log(this._displayMessages.displayRewardPlayer(currentPlayer.name, currentPlayer.purse));
    }

    // code smell: middle man
    public currentPlayerWon() {
        const currentPlayer = this.board.retrieveCurrentPlayer();

        return currentPlayer.hasPlayerWon();
    }

    public rotatePlayer() {
        this.board.rotatePlayer();
    }

}
