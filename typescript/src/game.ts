import {ConsoleWrapper} from "./consoleWrapper";
import {Board} from "./Board";
import {Questioner} from "./questioner";
import {DisplayMessages} from "./displayMessages";

/**
 * Responsibility: Keeps track of the current game state
 */
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

    public movePlayer(roll: number): void {
        this.console.log(this._displayMessages.displayRollPlayerMessage(roll));
        const currentPlayer = this.board.retrieveCurrentPlayer();

        currentPlayer.movePlayer(roll);

        this.console.log(this._displayMessages.displayPlayerLocation(currentPlayer.name, currentPlayer.place));
    }

    public wrongAnswer(): void {
        this.console.log('Question was incorrectly answered');
        // it seems confusing to make this a method on Player class?
        const currentPlayer = this.board.retrieveCurrentPlayer();
        currentPlayer.inPenaltyBox = true;

        this.console.log(this._displayMessages.displayPutPlayerInBox(currentPlayer.name));
    }

    public correctAnswer(): void {
        this.console.log("Answer was correct!!!!");
        // it seems confusing to make this a method on Player class?
        const currentPlayer = this.board.retrieveCurrentPlayer();
        currentPlayer.purse++;

        this.console.log(this._displayMessages.displayRewardPlayer(currentPlayer.name, currentPlayer.purse));
    }

    // Code Smell: middleman - but moving it would be worse
    public rotatePlayer(): void {
        this.board.rotatePlayer();
    }

    public askQuestion(): boolean {
        const playerBoardPosition = this.board.retrieveCurrentPlayer().place;
        this.console.log(this.questioner.displayCategory(playerBoardPosition));
        this.console.log(this.questioner.displayQuestion(playerBoardPosition));

        return Math.floor(Math.random() * 10) === 7; // has to be moved
    }

    public checkPenaltyBox(roll: number): boolean {
        const currentPlayer = this.board.retrieveCurrentPlayer();
        this.console.log(this._displayMessages.displayBeginTurn(currentPlayer.name));

        if (this.board.checkPenaltyBox(roll)) {
            const inPenaltyBox = this.board.retrieveCurrentPlayer().inPenaltyBox;
            this.console.log(this._displayMessages.displayPenaltyBoxMessage(currentPlayer.name, inPenaltyBox));

            return true;
        }

        return false;
    }

    public currentPlayerWon(): boolean {
        const currentPlayer = this.board.retrieveCurrentPlayer();

        return currentPlayer.hasPlayerWon();
    }

}
