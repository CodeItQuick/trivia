import {Player} from "./player";

import {DisplayMessages} from "./displayMessages";

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

    public putPlayerInBox() {
        this.players[this.currentPlayer].placeInBox();
    }

    public displayRewardPlayer() {
        const playerName = this.players[this.currentPlayer].name();
        const coins = this.players[this.currentPlayer].currentCoins();

        return this._displayMessages.displayRewardPlayer(playerName, coins);
    }

    public currentPlayerName() {
        return this.players[this.currentPlayer].name();
    }

    public displayRollPlayerMessage(roll: number) {
        return this._displayMessages.displayRollPlayerMessage(roll);
    }

    public numberOfPlayers() {
        return this.players.length;
    }

    isInPenaltyBox() {
        return this.players[this.currentPlayer].isInPenaltyBox();
    }

    currentPlayerCoins() {
        return this.players[this.currentPlayer].currentCoins();
    }
}