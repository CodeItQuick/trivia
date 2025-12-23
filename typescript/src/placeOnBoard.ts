export class PlaceOnBoard {
    private _place = 0;

    constructor(place) {
        this._place = place;
    }

    place() {
        return this._place
    }

    updated(roll: number) {
        this._place = this._place + roll;
        if (this._place > 11) {
            this._place = this._place - 12;
        }
    }

    createNewPlace(roll: number) {
        this._place = this._place + roll;
        if (this._place > 11) {
            this._place = this._place - 12;
        }
        return this;
    }

}