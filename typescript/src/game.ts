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

export class PlaceOnBoard {
    private _place = 0;
    constructor(place) {
        this._place = place;
    }
    place() {
        return this._place
    }
}


export class Game {

    private players: Array<string> = [];
    private placesOnBoard: Array<PlaceOnBoard> = [];
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
            this.rockQuestions.push(this.createRockQuestion(i));
          }
    }

    private createRockQuestion(index: number): string {
        return "Rock Question " + index;
    }

    public add(name: string): boolean {
        this.players.push(name);
        this.placesOnBoard[this.howManyPlayers()] = new PlaceOnBoard(0);
        this.purses[this.howManyPlayers()] = 0;
        this.inPenaltyBox[this.howManyPlayers()] = false;

        this.console.log(name + " was added");
        this.console.log("They are player number " + this.players.length);

        return true;
    }

    private howManyPlayers(): number {
        return this.players.length;
    }

    public roll(roll: number) {
        this.console.log(this.players[this.currentPlayer] + " is the current player");
        this.console.log("They have rolled a " + roll);
    
        if (this.inPenaltyBox[this.currentPlayer]) {
          if (roll % 2 != 0) {
            this.isGettingOutOfPenaltyBox = true;
    
            this.console.log(this.players[this.currentPlayer] + " is getting out of the penalty box");
            this.placesOnBoard[this.currentPlayer] = new PlaceOnBoard(this.placesOnBoard[this.currentPlayer].place() + roll);
            if (this.placesOnBoard[this.currentPlayer].place() > 11) {
              this.placesOnBoard[this.currentPlayer] = new PlaceOnBoard(this.placesOnBoard[this.currentPlayer].place() - 12);
            }

            this.console.log(this.players[this.currentPlayer] + "'s new location is " + this.placesOnBoard[this.currentPlayer].place());
            this.console.log("The category is " + this.currentCategory());
            this.askQuestion();
          } else {
            this.console.log(this.players[this.currentPlayer] + " is not getting out of the penalty box");
            this.isGettingOutOfPenaltyBox = false;
          }
        } else {

          // TODO: causes bug needs (place() || 0)
          const currentPlayerPlace = this.placesOnBoard[this.currentPlayer]?.place();
          this.placesOnBoard[this.currentPlayer] = new PlaceOnBoard((currentPlayerPlace || 0) + roll);
          if (this.placesOnBoard[this.currentPlayer].place() > 11) {
            this.placesOnBoard[this.currentPlayer] = new PlaceOnBoard((this.placesOnBoard[this.currentPlayer].place() || 0) - 12);
          }

          this.console.log(this.players[this.currentPlayer] + "'s new location is " + this.placesOnBoard[this.currentPlayer].place());
          this.console.log("The category is " + this.currentCategory());
          this.askQuestion();
        }
    }

    private askQuestion(): void {
        if (this.currentCategory() == 'Pop')
            this.console.log(this.popQuestions.shift());
        if (this.currentCategory() == 'Science')
            this.console.log(this.scienceQuestions.shift());
        if (this.currentCategory() == 'Sports')
            this.console.log(this.sportsQuestions.shift());
        if (this.currentCategory() == 'Rock')
            this.console.log(this.rockQuestions.shift());
    }

    private currentCategory(): string {
        if (this.placesOnBoard[this.currentPlayer]?.place() === 0)
            return 'Pop';
        if (this.placesOnBoard[this.currentPlayer].place() === 4)
            return 'Pop';
        if (this.placesOnBoard[this.currentPlayer].place() === 8)
            return 'Pop';
        if (this.placesOnBoard[this.currentPlayer].place() === 1)
            return 'Science';
        if (this.placesOnBoard[this.currentPlayer].place() === 5)
            return 'Science';
        if (this.placesOnBoard[this.currentPlayer].place() === 9)
            return 'Science';
        if (this.placesOnBoard[this.currentPlayer].place() === 2)
            return 'Sports';
        if (this.placesOnBoard[this.currentPlayer].place() === 6)
            return 'Sports';
        if (this.placesOnBoard[this.currentPlayer].place() === 10)
            return 'Sports';
        return 'Rock';
    }

    private didPlayerWin(): boolean {
        return !(this.purses[this.currentPlayer] == 6)
    }

    public wrongAnswer(): boolean {
        this.console.log('Question was incorrectly answered');
        this.console.log(this.players[this.currentPlayer] + " was sent to the penalty box");
        this.inPenaltyBox[this.currentPlayer] = true;
    
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
        if (this.inPenaltyBox[this.currentPlayer]) {
            if (this.isGettingOutOfPenaltyBox) {
              this.console.log('Answer was correct!!!!');
              this.purses[this.currentPlayer] += 1;
              this.console.log(this.players[this.currentPlayer] + " now has " +
              this.purses[this.currentPlayer] + " Gold Coins.");
      
              var winner = this.didPlayerWin();
              this.currentPlayer += 1;
              if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;
      
              return winner;
            } else {
              this.currentPlayer += 1;
              if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;
              return true;
            }
      
      
          } else {
      
            this.console.log("Answer was corrent!!!!");
      
            this.purses[this.currentPlayer] += 1;
            this.console.log(this.players[this.currentPlayer] + " now has " +
                this.purses[this.currentPlayer] + " Gold Coins.");
      
            var winner = this.didPlayerWin();
      
            this.currentPlayer += 1;
            if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;
      
            return winner;
          }
    }

}
