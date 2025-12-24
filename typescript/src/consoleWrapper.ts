export class ConsoleWrapper {
    private _existingMessages: string[];

    constructor(existingMessages = []) {
        this._existingMessages = existingMessages;
    }

    getMessages() {
        return this._existingMessages
    }

    log(message: string | undefined) {
        console.log(message)
        this._existingMessages.push(message || '');
    }
}