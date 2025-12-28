import {ConsoleWrapper} from "./consoleWrapper";
import {Board} from "./Board";
import {Player} from "./player";
import {Questioner} from "./questioner";

export class Game {
    private board: Board = new Board();
    private players: Array<Player> = new Array<Player>();
    private questioner: Questioner = new Questioner();

    private console: ConsoleWrapper | typeof console;

    constructor(consoleWrapper: ConsoleWrapper | typeof console = console) {
        this.console = consoleWrapper;
    }
    public add(name: string): boolean {
        this.board.addPlayer(name);
        this.players.push(new Player(name));

        this.console.log(name + " was added");
        this.console.log("They are player number " + this.players.length);

        return true;
    }
    public roll(roll: number) {
        this.console.log(this.board.displayBeginTurn());
        this.console.log(this.board.displayRollPlayerMessage(roll));

        this.board.checkPenaltyBox(roll);

        const message = this.board.displayPenaltyBoxMessage();
        if (message) {
            console.log(message)
        }
        this.board.movePlayer(roll);

        this.console.log(this.board.displayPlayerLocation());
    }
    public askQuestion(): void {
        this.console.log(this.questioner.displayCategory(this.board.currentPlayerLocation()));
        this.console.log(this.questioner.displayQuestion(this.board.currentPlayerLocation()));
    }
    public wrongAnswer(): void {
        this.console.log('Question was incorrectly answered');
        this.console.log(this.board.displayPutPlayerInBox());
    }
    public isCurrentPlayerFree(roll: number): boolean {
        return this.board.isCurrentPlayerFree(roll);
    }
    public wasCorrectlyAnswered(): void {
        this.console.log("Answer was correct!!!!");
        this.console.log(this.board.displayRewardPlayer());
    }
    public currentPlayerWon() {
        return this.board.hasPlayerWon();
    }

    public rotatePlayer() {
        this.board.rotatePlayer();
    }

}
