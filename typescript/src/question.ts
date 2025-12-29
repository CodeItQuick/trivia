// value type
export class Question {
    private _message: string;

    constructor(message: string) {
        this._message = message;
    }

    public message() {
        return this._message;
    }

}