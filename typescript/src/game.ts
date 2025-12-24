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


export class Game {

    private players: Array<string> = [];
    private places: Array<number> = [];
    private purses: Array<number> = [];
    private inPenaltyBox: Array<boolean> = [];
    private currentPlayer: number = 0;
    private isGettingOutOfPenaltyBox: boolean = false;

    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];
    private console: ConsoleWrapper | typeof console;

    constructor(consoleWrapper: ConsoleWrapper | typeof console = console) {

        this.console = consoleWrapper;

        for (let i = 0; i < 50; i++) {
            this.popQuestions.push("Pop Question " + i);
            this.scienceQuestions.push("Science Question " + i);
            this.sportsQuestions.push("Sports Question " + i);
            this.rockQuestions.push("Rock Question " + i);
          }
    }
    public add(name: string): boolean {
        this.players.push(name);
        this.places[this.players.length] = 0;
        this.purses[this.players.length] = 0;
        this.inPenaltyBox[this.players.length] = false;

        this.console.log(name + " was added");
        this.console.log("They are player number " + this.players.length);

        return true;
    }
    public roll(roll: number) {
        this.console.log(this.players[this.currentPlayer] + " is the current player");
        this.console.log("They have rolled a " + roll);

        if (this.inPenaltyBox[this.currentPlayer]) {
            if (roll % 2 == 0) {
                this.console.log(this.players[this.currentPlayer] + " is not getting out of the penalty box");
                this.isGettingOutOfPenaltyBox = false;
                return;
            }

            this.isGettingOutOfPenaltyBox = true;

            this.console.log(this.players[this.currentPlayer] + " is getting out of the penalty box");
        }
    
        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
        if (this.places[this.currentPlayer] > 11) {
          this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }

        this.console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);

    }

    public askQuestion(): void {
        let category = "Rock"
        let playerBoardPosition = this.places[this.currentPlayer];
        if (playerBoardPosition % 4 === 0) {
            category = 'Pop';
        }
        if (playerBoardPosition % 4 === 1) {
            category = 'Science';
        }
        if (playerBoardPosition % 4 === 2) {
            category = 'Sports';
        }

        this.console.log("The category is " + category);

        if (category == 'Pop')
            this.console.log(this.popQuestions.shift());
        if (category == 'Science')
            this.console.log(this.scienceQuestions.shift());
        if (category == 'Sports')
            this.console.log(this.sportsQuestions.shift());
        if (category == 'Rock')
            this.console.log(this.rockQuestions.shift());
    }
    public wrongAnswer(): void {
        this.console.log('Question was incorrectly answered');
        this.console.log(this.players[this.currentPlayer] + " was sent to the penalty box");
        this.inPenaltyBox[this.currentPlayer] = true;
    }

    public wasCorrectlyAnswered(): void {
        if (this.inPenaltyBox[this.currentPlayer] && !this.isGettingOutOfPenaltyBox) {
            return;
        }
      
        this.purses[this.currentPlayer] += 1;

        this.console.log("Answer was correct!!!!");
        this.console.log(this.players[this.currentPlayer] + " now has " +
            this.purses[this.currentPlayer] + " Gold Coins.");
    }

    public finishTurn() {
        const winner = this.purses[this.currentPlayer] === 6;

        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;

        return winner;
    }

}
