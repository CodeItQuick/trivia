/**
 * The current Player, able to move itself on the board (? should it be able to?) and determine if he's won
 */
export class Player {
    public name: string;
    public purse: number = 0;
    public place: number = 0;
    public inPenaltyBox: boolean = false;

    constructor(name: string) {
        this.name = name;
    }

    public attemptEscapePenaltyBox(roll: number) {
        if (this.inPenaltyBox) {
            this.inPenaltyBox = roll % 2 === 1;
        }
    }

    public movePlayer(roll: number): void {
        this.place = this.place + roll;
        if (this.place > 12) {
            this.place = this.place - 12;
        }
    }

    public hasPlayerWon(): boolean {
        return this.purse === 6;
    }
}