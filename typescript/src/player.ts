
// entity, there are if statements in here, but should probably be a value type
export class Player {
    private _name: string;
    private purse: number = 0;
    private inPenaltyBox: boolean = false;
    private isGettingOutOfPenaltyBox: boolean = false;

    constructor(name: string) {
        this._name = name;
    }

    public attemptGetOutOfPenaltyBox(gettingOut: boolean) {
        this.isGettingOutOfPenaltyBox = gettingOut;
        return this.isGettingOutOfPenaltyBox;
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

    inPenalty() {
        return this.inPenaltyBox && !this.isGettingOutOfPenaltyBox;
    }

    currentCoins() {
        return ++this.purse;
    }

    playerWon() {
        return this.purse === 6;
    }
}