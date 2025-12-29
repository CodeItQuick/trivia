import {Player} from "./player";

export class Board {
    private players: Array<Player> = new Array<Player>();
    private currentPlayer: number = 0;

    constructor() {
    }

    public addPlayer(name: string): void {
        this.players.push(new Player(name))
    }

    public rotatePlayer(): void {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) {
            this.currentPlayer = 0;
        }
    }

    public checkPenaltyBox(roll: number): boolean {
        if (this.players[this.currentPlayer].inPenaltyBox) {
            const exitPenaltyBox = roll % 2 === 1;
            this.players[this.currentPlayer].inPenaltyBox = exitPenaltyBox;

            return exitPenaltyBox;
        }

        return false;
    }

    public retrieveCurrentPlayer(): Player {
        return this.players[this.currentPlayer];
    }

    public numberOfPlayers(): number {
        return this.players.length;
    }
}