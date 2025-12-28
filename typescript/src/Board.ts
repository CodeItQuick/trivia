import {Player} from "./game";

export class Board {
    private players: Array<Player> = new Array<Player>();
    private places: Array<number> = [];
    private currentPlayer: number = 0;

    public addPlayer(name: string): number {
        this.players.push(new Player(name))
        this.places[this.players.length - 1] = 0;

        return this.players.length;
    }

    public displayPlayerLocation(roll: number) {
        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
        if (this.places[this.currentPlayer] > 12) {
            this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }

        return this.players[this.currentPlayer].name() + "'s new location is " + this.places[this.currentPlayer];
    }

    public rotatePlayer() {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) {
            this.currentPlayer = 0;
        }
    }

    public displayPenaltyBoxMessage(roll: number) {
        if (this.players[this.currentPlayer].isInPenaltyBox()) {
            let currentlyInPenalty = this.players[this.currentPlayer].attemptGetOutOfPenaltyBox(roll);
            return this.buildPenaltyMessage(currentlyInPenalty);
        }
    }
    public buildPenaltyMessage(isGettingOut: boolean) {
        return isGettingOut === false ? this.currentPlayerName() + " is not getting out of the penalty box" :
            this.currentPlayerName() + " is getting out of the penalty box";
    }

    public currentPlayerLocation(): number {
        return this.places[this.currentPlayer];
    }

    public currentPlayerName(): string {
        return this.players[this.currentPlayer].name();
    }

    putPlayerInBox() {
        this.players[this.currentPlayer].placeInBox();
        return this.players[this.currentPlayer].name() + " was sent to the penalty box";
    }

    isCurrentPlayerInBox() {
        return this.players[this.currentPlayer].PenaltyBeingServed();
    }

    rewardPlayer() {
        const coins = this.players[this.currentPlayer].currentCoins();

        return this.players[this.currentPlayer].name() + " now has " +
            coins + " Gold Coins."
    }

    hasPlayerWon() {
        return this.players[this.currentPlayer].playerWon();
    }

    rollPlayer(roll: number) {
        return [this.players[this.currentPlayer].name() + " is the current player", "They have rolled a " + roll];
    }
}