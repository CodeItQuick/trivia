import {describe, expect, it} from 'vitest';
import {GameRunner} from '../src/game-runner';
import {Game} from "../src/game";
import {ConsoleWrapper} from "../src/consoleWrapper";

describe('The test environment', () => {
    it('should pass', () => {
        expect(true).to.be.true;
    });

    it("should access game", function () {
        expect(GameRunner).to.not.be.undefined;
    });

    it("should run a successful game", () => {
        const consoleWrapper = new ConsoleWrapper()

        GameRunner.main(consoleWrapper)

        const messages = consoleWrapper.getMessages()
        expect(consoleWrapper.getMessages()[messages.length - 1]).to.include("now has 6 Gold Coins.")
    })

    it('when player added game should record player number', () => {
        const consoleWrapper = new ConsoleWrapper();
        const game = new Game(consoleWrapper);

        game.add("Chet");

        expect(consoleWrapper.getMessages()[0]).to.be.eq("Chet was added");
        expect(consoleWrapper.getMessages()[1]).to.be.eq("They are player number 1");
    });

    for (const rollNumber of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
        const categories = ["Pop", "Science", "Sports", "Rock"]
        it(`when one player game rolled a ${rollNumber} should return new location is ${rollNumber} with ${categories[rollNumber % 4]} Question`, () => {
            const consoleWrapper = new ConsoleWrapper();
            const game = new Game(consoleWrapper);
            game.add("Chet")

            game.roll(rollNumber);
            game.askQuestion()

            expect(consoleWrapper.getMessages()[0]).to.be.eq("Chet was added");
            expect(consoleWrapper.getMessages()[1]).to.be.eq("They are player number 1");
            expect(consoleWrapper.getMessages()[2]).to.be.eq("Chet is the current player");
            expect(consoleWrapper.getMessages()[3]).to.be.eq(`They have rolled a ${rollNumber}`);
            expect(consoleWrapper.getMessages()[4]).to.be.eq(`Chet's new location is ${rollNumber}`);
            expect(consoleWrapper.getMessages()[5]).to.be.eq(`The category is ${categories[rollNumber % 4]}`);
            expect(consoleWrapper.getMessages()[6]).to.be.eq(`${categories[rollNumber % 4]} Question 0`);
        });
    }

    for (const rollNumber of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
        it(`when two player game rolled a ${rollNumber} should change player category give second player gold coins`, () => {
            const consoleWrapper = new ConsoleWrapper();
            const game = new Game(consoleWrapper);
            game.add("Chet")
            game.add("Pat")
            game.roll(rollNumber);
            game.askQuestion()
            game.wasCorrectlyAnswered()
            game.finishTurn()

            game.roll(rollNumber);
            game.askQuestion()
            game.wasCorrectlyAnswered()
            game.finishTurn()

            const categories = ["Rock", "Science", "Sports", "Rock", "Pop", "Science", "Sports", "Rock", "Pop", "Science", "Sports", "Rock", "Pop"]
            expect(consoleWrapper.getMessages()[12]).to.be.eq(`They have rolled a ${rollNumber}`);
            expect(consoleWrapper.getMessages()[13]).to.be.eq(`Pat's new location is ${rollNumber % 13}`);
            expect(consoleWrapper.getMessages()[14]).to.be.eq(`The category is ${categories[rollNumber]}`);
            expect(consoleWrapper.getMessages()[15]).to.be.eq(`${categories[rollNumber]} Question 1`);
            expect(consoleWrapper.getMessages()[16]).to.be.eq("Answer was correct!!!!");
            expect(consoleWrapper.getMessages()[17]).to.be.eq("Pat now has 1 Gold Coins.");
        });
    }

    it('when one player game after game roll wrongAnswer should put player in jail and not move them', () => {
        const consoleWrapper = new ConsoleWrapper();
        const game = new Game(consoleWrapper);
        game.add("Chet")
        game.roll(7);
        game.askQuestion()
        game.wrongAnswer();

        const winner = game.finishTurn()

        expect(consoleWrapper.getMessages()[7]).to.be.eq("Question was incorrectly answered");
        expect(consoleWrapper.getMessages()[8]).to.be.eq("Chet was sent to the penalty box");
        expect(winner).to.eq(false);
    });


    it('when two player game after game roll wrongAnswer should put player in jail and not move them', () => {
        const consoleWrapper = new ConsoleWrapper();
        const game = new Game(consoleWrapper);
        game.add("Chet")
        game.add("Pat")
        game.roll(7);
        game.askQuestion();
        game.wrongAnswer();
        game.finishTurn();
        game.roll(7);
        game.askQuestion();
        game.wrongAnswer();

        const winner = game.finishTurn();

        expect(consoleWrapper.getMessages()[16]).to.be.eq("Question was incorrectly answered");
        expect(consoleWrapper.getMessages()[17]).to.be.eq("Pat was sent to the penalty box");
        expect(winner).to.eq(false);
    });

    it('when one player game after game roll wasCorrectlyAnswered should give player Gold Coins', () => {
        const consoleWrapper = new ConsoleWrapper();
        const game = new Game(consoleWrapper);
        game.add("Chet")
        game.roll(7);
        game.askQuestion();

        game.wasCorrectlyAnswered();
        const winner = game.finishTurn()

        expect(consoleWrapper.getMessages()[7]).to.be.eq("Answer was correct!!!!");
        expect(consoleWrapper.getMessages()[8]).to.be.eq("Chet now has 1 Gold Coins.");
        expect(winner).to.eq(false);
    });
    it('when two player game after game roll wasCorrectlyAnswered should give player Gold Coins', () => {
        const consoleWrapper = new ConsoleWrapper();
        const game = new Game(consoleWrapper);
        game.add("Chet")
        game.add("Pat")
        game.wrongAnswer();
        game.finishTurn();

        game.wasCorrectlyAnswered();
        const winner = game.finishTurn()

        expect(consoleWrapper.getMessages()[6]).to.be.eq("Answer was correct!!!!");
        expect(consoleWrapper.getMessages()[7]).to.be.eq("Pat now has 1 Gold Coins.");
        expect(winner).to.eq(false);
    });

    it('when two player game after enough correct answers should end game', () => {
        const consoleWrapper = new ConsoleWrapper();
        const game = new Game(consoleWrapper);
        game.add("Chet")
        game.add("Pat")
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.finishTurn();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.finishTurn();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.finishTurn();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.finishTurn();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.finishTurn();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.finishTurn();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.finishTurn();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.finishTurn();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.finishTurn();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.finishTurn();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.finishTurn();

        game.wasCorrectlyAnswered();
        const winner = game.finishTurn();

        expect(winner).to.eq(true);
    });
});
