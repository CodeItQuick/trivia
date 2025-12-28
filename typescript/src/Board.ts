import {Player} from "./player";

// entity, has probably too much behaviour
export class Board {
    private players: Array<Player> = new Array<Player>();
    private currentPlayer: number = 0;

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

    public movePlayer(roll: number) {
        this.players[this.currentPlayer].movePlayer(roll);
    }

    public displayPlayerLocation() {
        const playerName = this.players[this.currentPlayer].name();
        return playerName + "'s new location is " + this.players[this.currentPlayer].place;
    }

    public checkPenaltyBox(roll: number): boolean {
        if (this.players[this.currentPlayer].isInPenaltyBox()) {
            const penaltyRoll = roll % 2 === 1;
            this.players[this.currentPlayer].penaltyBox(penaltyRoll);
            return true;
        }

        return false;
    }

    public displayPenaltyBoxMessage() {
        if (this.players[this.currentPlayer].isInPenaltyBox()) {
            const playerName = this.players[this.currentPlayer].name();
            return this.players[this.currentPlayer].isInPenaltyBox() ?
                playerName + " is not getting out of the penalty box" :
                playerName + " is getting out of the penalty box";
        }
    }

    public displayPutPlayerInBox() {
        this.players[this.currentPlayer].placeInBox();
        const playerName = this.players[this.currentPlayer].name();

        return playerName + " was sent to the penalty box";
    }

    public displayRewardPlayer() {
        const playerName = this.players[this.currentPlayer].name();
        const coins = this.players[this.currentPlayer].currentCoins();

        return playerName + " now has " + coins + " Gold Coins."
    }

    public displayBeginTurn() {
        const playerName = this.players[this.currentPlayer].name();

        return playerName + " is the current player";
    }

    public displayRollPlayerMessage(roll: number) {
        return "They have rolled a " + roll;
    }
}