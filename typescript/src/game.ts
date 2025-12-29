import {ConsoleWrapper} from "./consoleWrapper";
import {Board} from "./Board";
import {Questioner} from "./questioner";

export class DisplayMessages {

    public displayPlayerLocation(playerName: string, playerPlace: number) {
        return playerName + "'s new location is " + playerPlace;
    }

    public displayPenaltyBoxMessage(playerName: string, isInPenaltyBox: boolean) {
        return isInPenaltyBox ?
            playerName + " is not getting out of the penalty box" :
            playerName + " is getting out of the penalty box";
    }

    public displayPutPlayerInBox(playerName: string) {

        return playerName + " was sent to the penalty box";
    }

    public displayRewardPlayer(playerName: string, coins: number) {
        return playerName + " now has " + coins + " Gold Coins."
    }

    public displayBeginTurn(playerName: string) {
        return playerName + " is the current player";
    }

    public displayRollPlayerMessage(roll: number) {
        return "They have rolled a " + roll;
    }

    public displayPlayerNumber(playerNumber: number) {
        return "They are player number " + playerNumber;
    }
}

export class Game {
    private board: Board = new Board();
    private questioner: Questioner = new Questioner();

    private console: ConsoleWrapper | typeof console;

    constructor(consoleWrapper: ConsoleWrapper | typeof console = console) {
        this.console = consoleWrapper;
    }

    public add(name: string): void {
        this.board.addPlayer(name);

        this.console.log(name + " was added");
        this.console.log(this.board.displayPlayerNumber());
    }

    public checkPenaltyBox(roll: number) {
        this.console.log(this.board.displayBeginTurn());

        if (this.board.checkPenaltyBox(roll)) {
            this.console.log(this.board.displayPenaltyBoxMessage());

            return true;
        }

        return false;
    }

    public movePlayer(roll: number): void {
        this.console.log(this.board.displayRollPlayerMessage(roll));
        this.board.movePlayer(roll);

        this.console.log(this.board.displayPlayerLocation());
    }

    public askQuestion(): boolean {
        const playerBoardPosition = this.board.currentPlayerLocation();
        this.console.log(this.questioner.displayCategory(playerBoardPosition));
        this.console.log(this.questioner.displayQuestion(playerBoardPosition));

        return Math.floor(Math.random() * 10) === 7; // has to be moved
    }

    public wrongAnswer(): void {
        this.console.log('Question was incorrectly answered');
        this.console.log(this.board.displayPutPlayerInBox());
    }

    public wasCorrectlyAnswered(): void {
        this.console.log("Answer was correct!!!!");
        this.console.log(this.board.displayRewardPlayer());
    }

    // code smell: middle man
    public currentPlayerWon() {
        return this.board.hasPlayerWon();
    }

    public rotatePlayer() {
        this.board.rotatePlayer();
    }

}
