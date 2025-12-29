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

    // code smell: exposing the player object so that it can be interacted with directly.
    // however, I wish there was a way to enforce the rule that only the public fields are allowed to be accessed.
    // and I'm not sure about when these methods are accessed should that behaviour exist on player
    public retrieveCurrentPlayer(): Player {
        return this.players[this.currentPlayer];
    }

    public numberOfPlayers(): number {
        return this.players.length;
    }
}