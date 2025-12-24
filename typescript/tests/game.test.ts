import {describe, expect, it} from 'vitest';
import {GameRunner} from '../src/game-runner';
import {ConsoleWrapper, Game} from "../src/game";

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
        it(`when one player game rolled a ${rollNumber} should return new location is NaN with Rock Question`, () => {
            const consoleWrapper = new ConsoleWrapper();
            const game = new Game(consoleWrapper);
            game.add("Chet")

            game.roll(rollNumber);

            expect(consoleWrapper.getMessages()[0]).to.be.eq("Chet was added");
            expect(consoleWrapper.getMessages()[1]).to.be.eq("They are player number 1");
            expect(consoleWrapper.getMessages()[2]).to.be.eq("Chet is the current player");
            expect(consoleWrapper.getMessages()[3]).to.be.eq(`They have rolled a ${rollNumber}`);
            expect(consoleWrapper.getMessages()[4]).to.be.eq("Chet's new location is NaN");
            expect(consoleWrapper.getMessages()[5]).to.be.eq("The category is Rock");
            expect(consoleWrapper.getMessages()[6]).to.be.eq("Rock Question 0");
        });
    }

    for (const rollNumber of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
        it(`when two player game rolled a ${rollNumber} should change player category give second player gold coins`, () => {
            const consoleWrapper = new ConsoleWrapper();
            const game = new Game(consoleWrapper);
            game.add("Chet")
            game.add("Pat")
            game.roll(rollNumber);
            game.wasCorrectlyAnswered()

            game.roll(rollNumber);
            game.wasCorrectlyAnswered()

            const categories = ["Rock", "Science", "Sports", "Rock", "Pop", "Science", "Sports", "Rock", "Pop", "Science", "Sports", "Rock", "Pop"]
            const categoryQuestionNumber = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]
            expect(consoleWrapper.getMessages()[12]).to.be.eq(`They have rolled a ${rollNumber}`);
            expect(consoleWrapper.getMessages()[13]).to.be.eq(`Pat's new location is ${rollNumber % 12}`);
            expect(consoleWrapper.getMessages()[14]).to.be.eq(`The category is ${categories[rollNumber]}`);
            expect(consoleWrapper.getMessages()[15]).to.be.eq(`${categories[rollNumber]} Question ${categoryQuestionNumber[rollNumber]}`);
            expect(consoleWrapper.getMessages()[16]).to.be.eq("Answer was corrent!!!!");
            expect(consoleWrapper.getMessages()[17]).to.be.eq("Pat now has 1 Gold Coins.");
        });
    }

    it('when one player game after game roll wrongAnswer should put player in jail and not move them', () => {
        const consoleWrapper = new ConsoleWrapper();
        const game = new Game(consoleWrapper);
        game.add("Chet")
        game.roll(7);

        const notAWinner = game.wrongAnswer();

        expect(consoleWrapper.getMessages()[7]).to.be.eq("Question was incorrectly answered");
        expect(consoleWrapper.getMessages()[8]).to.be.eq("Chet was sent to the penalty box");
        expect(notAWinner).to.eq(true);
    });


    it('when two player game after game roll wrongAnswer should put player in jail and not move them', () => {
        const consoleWrapper = new ConsoleWrapper();
        const game = new Game(consoleWrapper);
        game.add("Chet")
        game.add("Pat")
        game.roll(7);
        game.wrongAnswer();

        const notAWinner = game.wrongAnswer();

        expect(consoleWrapper.getMessages()[11]).to.be.eq("Question was incorrectly answered");
        expect(consoleWrapper.getMessages()[12]).to.be.eq("Pat was sent to the penalty box");
        expect(notAWinner).to.eq(true);
    });

    it('when one player game after game roll wasCorrectlyAnswered should give player Gold Coins', () => {
        const consoleWrapper = new ConsoleWrapper();
        const game = new Game(consoleWrapper);
        game.add("Chet")
        game.roll(7);

        const notAWinner = game.wasCorrectlyAnswered();

        expect(consoleWrapper.getMessages()[7]).to.be.eq("Answer was corrent!!!!");
        expect(consoleWrapper.getMessages()[8]).to.be.eq("Chet now has NaN Gold Coins.");
        expect(notAWinner).to.eq(true);
    });
    it('when two player game after game roll wasCorrectlyAnswered should give player Gold Coins', () => {
        const consoleWrapper = new ConsoleWrapper();
        const game = new Game(consoleWrapper);
        game.add("Chet")
        game.add("Pat")
        game.wrongAnswer();

        const notAWinner = game.wasCorrectlyAnswered();

        expect(consoleWrapper.getMessages()[6]).to.be.eq("Answer was corrent!!!!");
        expect(consoleWrapper.getMessages()[7]).to.be.eq("Pat now has 1 Gold Coins.");
        expect(notAWinner).to.eq(true);
    });

    it('when two player game after enough correct answers should end game', () => {
        const consoleWrapper = new ConsoleWrapper();
        const game = new Game(consoleWrapper);
        game.add("Chet")
        game.add("Pat")
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.roll(7);
        game.wasCorrectlyAnswered();
        game.roll(7);
        game.wasCorrectlyAnswered();

        const notAWinner = game.wasCorrectlyAnswered();

        expect(notAWinner).to.eq(false);
    });
});
