// entity
export class Player {
    public name: string;
    public purse: number = 0;
    public place: number = 0;
    public inPenaltyBox: boolean = false;

    constructor(name: string) {
        this.name = name;
    }

    movePlayer(roll: number): void {
        this.place = this.place + roll;
        if (this.place > 12) {
            this.place = this.place - 12;
        }
    }

    hasPlayerWon(): boolean {
        return this.purse === 6;
    }
}