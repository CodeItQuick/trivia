import {Player} from "./player";
import {DisplayMessages} from "./game";

// entity, has probably too much behaviour
export class Board {
    private players: Array<Player> = new Array<Player>();
    private currentPlayer: number = 0;
    private _displayMessages: DisplayMessages;

    constructor(displayMessages: DisplayMessages = new DisplayMessages()) {
        this._displayMessages = displayMessages;
    }

    public addPlayer(name: string): number {
        this.players.push(new Player(name))

        return this.players.length;
    }

    public currentPlayerLocation(): number {
        return this.players[this.currentPlayer].place;
    }

    public rotatePlayer() {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) {
            this.currentPlayer = 0;
        }
    }

    // code smell: middle man
    public hasPlayerWon() {
        return this.players[this.currentPlayer].playerWon();
    }
    public movePlayer(roll: number) {
        this.players[this.currentPlayer].movePlayer(roll);
    }

    public checkPenaltyBox(roll: number): boolean {
        if (this.players[this.currentPlayer].isInPenaltyBox()) {
            const exitPenaltyBox = roll % 2 === 1;
            this.players[this.currentPlayer].penaltyBox(exitPenaltyBox);

            return exitPenaltyBox;
        }

        return false;
    }

    public displayPlayerLocation() {
        const playerName = this.players[this.currentPlayer].name();

        return this._displayMessages.displayPlayerLocation(playerName, this.players[this.currentPlayer].place);
    }

    public displayPenaltyBoxMessage() {
        const playerName = this.players[this.currentPlayer].name();
        return this._displayMessages.displayPenaltyBoxMessage(playerName, this.players[this.currentPlayer].isInPenaltyBox());
    }

    public displayPutPlayerInBox() {
        this.players[this.currentPlayer].placeInBox();

        const playerName = this.players[this.currentPlayer].name();

        return this._displayMessages.displayPutPlayerInBox(playerName);
    }

    public displayRewardPlayer() {
        const playerName = this.players[this.currentPlayer].name();
        const coins = this.players[this.currentPlayer].currentCoins();

        return this._displayMessages.displayRewardPlayer(playerName, coins);
    }

    public displayBeginTurn() {
        const playerName = this.players[this.currentPlayer].name();

        return this._displayMessages.displayBeginTurn(playerName);
    }

    public displayRollPlayerMessage(roll: number) {
        return this._displayMessages.displayRollPlayerMessage(roll);
    }

    public displayPlayerNumber() {

        return this._displayMessages.displayPlayerNumber(this.players.length);
    }
}