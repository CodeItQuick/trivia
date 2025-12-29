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
        const currentPlayerName = this.board.currentPlayerName();
        this.console.log(this._displayMessages.displayBeginTurn(currentPlayerName));

        if (this.board.checkPenaltyBox(roll)) {
            const inPenaltyBox = this.board.isInPenaltyBox();
            this.console.log(this._displayMessages.displayPenaltyBoxMessage(currentPlayerName, inPenaltyBox));

            return true;
        }

        return false;
    }

    public movePlayer(roll: number): void {
        this.console.log(this._displayMessages.displayRollPlayerMessage(roll));
        this.board.movePlayer(roll);

        const playerName = this.board.currentPlayerName();
        const playerPlace = this.board.currentPlayerLocation();
        this.console.log(this._displayMessages.displayPlayerLocation(playerName, playerPlace));
    }

    public askQuestion(): boolean {
        const playerBoardPosition = this.board.currentPlayerLocation();
        this.console.log(this.questioner.displayCategory(playerBoardPosition));
        this.console.log(this.questioner.displayQuestion(playerBoardPosition));

        return Math.floor(Math.random() * 10) === 7; // has to be moved
    }

    public wrongAnswer(): void {
        this.console.log('Question was incorrectly answered');
        this.board.putPlayerInBox();
        const playerName = this.board.currentPlayerName();
        this.console.log(this._displayMessages.displayPutPlayerInBox(playerName));
    }

    public wasCorrectlyAnswered(): void {
        this.console.log("Answer was correct!!!!");
        this.console.log(this._displayMessages.displayRewardPlayer(this.board.currentPlayerName(), this.board.currentPlayerCoins()));
    }

    // code smell: middle man
    public currentPlayerWon() {
        return this.board.hasPlayerWon();
    }

    public rotatePlayer() {
        this.board.rotatePlayer();
    }

}
