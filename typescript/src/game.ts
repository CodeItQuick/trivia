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
    public currentPlayerWon() {
        return this.board.hasPlayerWon();
    }

    public rotatePlayer() {
        this.board.rotatePlayer();
    }

}
