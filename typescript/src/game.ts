import {ConsoleWrapper} from "./consoleWrapper";
import {Turn} from "./turn";
import {Questioner} from "./questioner";
import {DisplayMessages} from "./displayMessages";

/**
 * Responsibility: Keeps track of the current game state
 */
export class Game {
    private turn: Turn = new Turn();
    private questioner: Questioner = new Questioner();

    private console: ConsoleWrapper | typeof console;
    private _displayMessages: DisplayMessages;

    constructor(consoleWrapper: ConsoleWrapper | typeof console = console, displayMessages: DisplayMessages = new DisplayMessages()) {
        this.console = consoleWrapper;
        this._displayMessages = displayMessages;
    }

    public add(name: string): void {
        this.turn.addPlayer(name);

        this.console.log(name + " was added");
        this.console.log(this._displayMessages.displayPlayerNumber(this.turn.numberOfPlayers()));
    }

    public movePlayer(roll: number): void {
        this.console.log(this._displayMessages.displayRollPlayerMessage(roll));
        const currentPlayer = this.turn.retrieveCurrentPlayer();

        currentPlayer.movePlayer(roll);

        this.console.log(this._displayMessages.displayPlayerLocation(currentPlayer.name, currentPlayer.place));
    }

    public wrongAnswer(): void {
        this.console.log('Question was incorrectly answered');
        // it seems confusing to make this a method on Player class?
        const currentPlayer = this.turn.retrieveCurrentPlayer();
        currentPlayer.inPenaltyBox = true;

        this.console.log(this._displayMessages.displayPutPlayerInBox(currentPlayer.name));
    }

    public correctAnswer(): void {
        this.console.log("Answer was correct!!!!");
        // it seems confusing to make this a method on Player class?
        const currentPlayer = this.turn.retrieveCurrentPlayer();
        currentPlayer.purse++;

        this.console.log(this._displayMessages.displayRewardPlayer(currentPlayer.name, currentPlayer.purse));
    }


    public askQuestion(): boolean {
        const playerBoardPosition = this.turn.retrieveCurrentPlayer().place;
        this.console.log(this.questioner.displayCategory(playerBoardPosition));
        this.console.log(this.questioner.displayQuestion(playerBoardPosition));

        const correctlyAnsweredQuestion = Math.floor(Math.random() * 10) === 7;

        return correctlyAnsweredQuestion; // has to be moved
    }

    public checkPenaltyBox(roll: number): boolean {
        const currentPlayer = this.turn.retrieveCurrentPlayer();
        this.console.log(this._displayMessages.displayBeginTurn(currentPlayer.name));

        const startedInPenaltyBox = currentPlayer.inPenaltyBox;
        if (startedInPenaltyBox) {
            currentPlayer.attemptEscapePenaltyBox(roll)
            this.console.log(this._displayMessages.displayPenaltyBoxMessage(currentPlayer.name, currentPlayer.inPenaltyBox));

            return true;
        }

        return false;
    }

    // Code Smell: middleman - but moving it would be worse
    public rotatePlayer(): void {
        this.turn.rotatePlayer();
    }

    // Code Smell: middleman - but moving it would be worse
    public currentPlayerWon(): boolean {
        const currentPlayer = this.turn.retrieveCurrentPlayer();

        return currentPlayer.hasPlayerWon();
    }

}
