import {Question} from "./question";

// entity, has behaviour
export class Questioner {
    private pop: Array<Question> = new Array<Question>()
    private science: Array<Question> = new Array<Question>()
    private sports: Array<Question> = new Array<Question>()
    private rock: Array<Question> = new Array<Question>()

    constructor() {
        for (let i = 0; i < 500; i++) {
            this.pop.push(new Question("Pop Question " + i));
            this.science.push(new Question("Science Question " + i));
            this.sports.push(new Question("Sports Question " + i));
            this.rock.push(new Question("Rock Question " + i));
        }
    }

    public displayQuestion(playerBoardPosition: number): string | undefined {
        if (playerBoardPosition % 4 === 0) {
            return this.pop.shift()?.message();
        }
        if (playerBoardPosition % 4 === 1) {
            return this.science.shift()?.message();
        }
        if (playerBoardPosition % 4 === 2) {
            return this.sports.shift()?.message();
        }
        if (playerBoardPosition % 4 === 3) {
            return this.rock.shift()?.message();
        }
    }

    public displayCategory(playerBoardPosition: number) {
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