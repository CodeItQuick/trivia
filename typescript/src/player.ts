// entity, too much behaviour, some of it is essential (eg: are they in or out of penalty box)
export class Player {
    private _name: string;
    private purse: number = 0;
    public place: number = 0;
    private inPenaltyBox: boolean = false;

    constructor(name: string) {
        this._name = name;
    }

    isInPenaltyBox() {
        return this.inPenaltyBox;
    }

    name() {
        return this._name;
    }

    placeInBox() {
        this.inPenaltyBox = true;
    }

    currentCoins() {
        return ++this.purse;
    }

    playerWon() {
        return this.purse === 6;
    }

    penaltyBox(penaltyRollResult: boolean) {
        this.inPenaltyBox = penaltyRollResult;
    }

    movePlayer(roll: number) {
        this.place = this.place + roll;
        if (this.place > 12) {
            this.place = this.place - 12;
        }
    }
}