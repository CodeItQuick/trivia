import {Places} from "./places";
import {ConsoleWrapper} from "./consoleWrapper";

export class Game {

    private players: Array<string> = [];
    private places: Places = new Places([]);
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
        this.places.addPlayer(this.howManyPlayers());
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
          if (roll % 2 !== 0) {
            this.isGettingOutOfPenaltyBox = true;
    
            this.console.log(this.players[this.currentPlayer] + " is getting out of the penalty box");
            this.places.updatePlayer(this.currentPlayer, roll);

            this.console.log(this.players[this.currentPlayer] + "'s new location is " + this.places.playerLocation(this.currentPlayer));
            this.console.log("The category is " + this.places.currentCategory(this.currentPlayer));
            this.askQuestion();
          } else {
            this.console.log(this.players[this.currentPlayer] + " is not getting out of the penalty box");
            this.isGettingOutOfPenaltyBox = false;
          }
        } else {

          this.places.updatePlayer(this.currentPlayer, roll);
          this.places.createNewPlace(this.currentPlayer, roll);

          const playerLocation = this.places?.playerLocation(this.currentPlayer);
          this.console.log(this.players[this.currentPlayer] + "'s new location is " + playerLocation);
          this.console.log("The category is " + this.places.currentCategory(this.currentPlayer));
          this.askQuestion();
        }
    }

    askQuestion(): void {
        const currentPlayerCategory = this.places.currentCategory(this.currentPlayer);

        if (currentPlayerCategory === 'Pop')
            this.console.log(this.popQuestions.shift());
        if (currentPlayerCategory === 'Science')
            this.console.log(this.scienceQuestions.shift());
        if (currentPlayerCategory === 'Sports')
            this.console.log(this.sportsQuestions.shift());
        if (currentPlayerCategory === 'Rock')
            this.console.log(this.rockQuestions.shift());
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
