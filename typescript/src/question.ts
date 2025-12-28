// value type
export class Question {
    private _message: string;

    constructor(message: string) {
        this._message = message;
    }

    message() {
        return this._message;
    }

}