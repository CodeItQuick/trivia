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
            game.roll(Math.floor(Math.random() * 6) + 1);
            game.askQuestion();
            if (!game.isCurrentPlayerFree(Math.floor(Math.random() * 10))) {
                game.wrongAnswer();
            } else {
                game.wasCorrectlyAnswered();
            }
            winner = game.currentPlayerWon();
            game.rotatePlayer()
        } while (!winner);
    }
}

GameRunner.main();

  