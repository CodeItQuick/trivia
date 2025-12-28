import {Game} from './game';
import * as console from "node:console";
import {ConsoleWrapper} from "./consoleWrapper";

export class GameRunner {
    public static main(consoleWrapper: ConsoleWrapper | typeof console = console): void {
        const game = new Game(consoleWrapper);
        game.add("Chet");
        game.add("Pat");
        game.add("Sue");

        let winner;
        do {
            // checking to determine if they should or should not be removed from penalty box, more than just a bool check
            if (!game.checkPenaltyBox(Math.floor(Math.random() * 10))) {
                // asking the question, and then also determining if they answered correctly or not
                // also violates SRP
                if (game.askQuestion()) {
                    game.wasCorrectlyAnswered()
                    game.movePlayer(Math.floor(Math.random() * 10))
                } else {
                    game.wrongAnswer();
                }
            }
            winner = game.currentPlayerWon();
            game.rotatePlayer()
        } while (!winner);
    }
}

GameRunner.main();

  