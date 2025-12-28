import {Player} from "./player";

// entity, has probably too much behaviour
export class Board {
    private players: Array<Player> = new Array<Player>();
    private places: Array<number> = [];
    private currentPlayer: number = 0;

    public addPlayer(name: string): number {
        this.players.push(new Player(name))
        this.places[this.players.length - 1] = 0;

        return this.players.length;
    }

    public currentPlayerLocation(): number {
        return this.places[this.currentPlayer];
    }

    public rotatePlayer() {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) {
            this.currentPlayer = 0;
        }
    }

    public isCurrentPlayerFree(roll: number) {
        let skipTurn = roll === 7;
        if (skipTurn) {
            return false;
        }
        return !this.players[this.currentPlayer].isInPenaltyBox();
    }

    public hasPlayerWon() {
        return this.players[this.currentPlayer].playerWon();
    }

    public displayPlayerLocation(roll: number) {
        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
        if (this.places[this.currentPlayer] > 12) {
            this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }

        return this.players[this.currentPlayer].name() + "'s new location is " + this.places[this.currentPlayer];
    }

    public displayPenaltyBoxMessage(roll: number) {
        if (this.players[this.currentPlayer].isInPenaltyBox()) {
            const penaltyRoll = roll % 2 === 1;
            this.players[this.currentPlayer].penaltyBox(penaltyRoll);
            return this.players[this.currentPlayer].isInPenaltyBox() ? this.players[this.currentPlayer].name() + " is not getting out of the penalty box" :
                this.players[this.currentPlayer].name() + " is getting out of the penalty box";
        }
    }

    public displayPutPlayerInBox() {
        this.players[this.currentPlayer].placeInBox();
        return this.players[this.currentPlayer].name() + " was sent to the penalty box";
    }

    public displayRewardPlayer() {
        const coins = this.players[this.currentPlayer].currentCoins();

        return this.players[this.currentPlayer].name() + " now has " +
            coins + " Gold Coins."
    }

    public displayBeginTurn() {
        return this.players[this.currentPlayer].name() + " is the current player";
    }

    public displayRollPlayerMessage(roll: number) {
        return "They have rolled a " + roll;
    }
}