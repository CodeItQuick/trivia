import {Player} from "./player";

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
            return currentlyInPenalty === false ? this.players[this.currentPlayer].name() + " is not getting out of the penalty box" :
                this.players[this.currentPlayer].name() + " is getting out of the penalty box";
        }
    }
    public currentPlayerLocation(): number {
        return this.places[this.currentPlayer];
    }

    putPlayerInBox() {
        this.players[this.currentPlayer].placeInBox();
        return this.players[this.currentPlayer].name() + " was sent to the penalty box";
    }

    isCurrentPlayerFree(roll: number) {
        let skipTurn = roll === 7;
        if (skipTurn) {
            return false;
        }
        return !this.players[this.currentPlayer].inPenalty();
    }

    rewardPlayer() {
        const coins = this.players[this.currentPlayer].currentCoins();

        return this.players[this.currentPlayer].name() + " now has " +
            coins + " Gold Coins."
    }

    hasPlayerWon() {
        return this.players[this.currentPlayer].playerWon();
    }

    beginTurn() {
        return this.players[this.currentPlayer].name() + " is the current player";
    }

    rollPlayerMessage(roll: number) {
        return "They have rolled a " + roll;
    }
}