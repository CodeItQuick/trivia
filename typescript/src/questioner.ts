import {Question} from "./question";

export class Questioner {
    private popQuestion: Array<Question> = new Array<Question>()
    private scienceQuestion: Array<Question> = new Array<Question>()
    private sportsQuestion: Array<Question> = new Array<Question>()
    private rockQuestion: Array<Question> = new Array<Question>()

    constructor() {

        for (let i = 0; i < 50; i++) {
            this.popQuestion.push(new Question("Pop Question " + i));
            this.scienceQuestion.push(new Question("Science Question " + i));
            this.sportsQuestion.push(new Question("Sports Question " + i));
            this.rockQuestion.push(new Question("Rock Question " + i));
        }

    }

    public question(playerBoardPosition: number): string | undefined {
        if (playerBoardPosition % 4 === 0) {
            return this.popQuestion.shift()?.message();
        }
        if (playerBoardPosition % 4 === 1) {
            return this.scienceQuestion.shift()?.message();
        }
        if (playerBoardPosition % 4 === 2) {
            return this.sportsQuestion.shift()?.message();
        }
        if (playerBoardPosition % 4 === 3) {
            return this.rockQuestion.shift()?.message();
        }
    }

    category(playerBoardPosition: number) {
        if (playerBoardPosition % 4 === 0) {
            return "The category is Pop";
        }
        if (playerBoardPosition % 4 === 1) {
            return "The category is Science";
        }
        if (playerBoardPosition % 4 === 2) {
            return "The category is Sports";
        }
        if (playerBoardPosition % 4 === 3) {
            return "The category is Rock";
        }
        return "";
    }
}