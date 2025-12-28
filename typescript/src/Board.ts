export class Board {
    private players: Array<string> = [];
    private places: Array<number> = [];
    private currentPlayer: number = 0;

    public addPlayer(name: string): number {
        this.players.push(name);
        this.places[this.players.length - 1] = 0;

        return this.players.length;
    }

    public movePlayer(roll: number) {
        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
        if (this.places[this.currentPlayer] > 12) {
            this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }

        return this.places[this.currentPlayer];
    }

    public rotatePlayer() {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) {
            this.currentPlayer = 0;
        }
    }

    public buildPenaltyMessage(isGettingOut) {
        return isGettingOut === false ? this.currentPlayerName() + " is not getting out of the penalty box" :
            this.currentPlayerName() + " is getting out of the penalty box";
    }

    public currentPlayerLocation(): number {
        return this.places[this.currentPlayer];
    }

    public currentPlayerName(): string {
        return this.players[this.currentPlayer];
    }

    public currentPlayerIdx(): number {
        return this.currentPlayer;
    }
}