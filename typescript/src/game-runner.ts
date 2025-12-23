import {ConsoleWrapper, Game} from './game';
import * as console from "node:console";

export class GameRunner {
    public static main(consoleWrapper: ConsoleWrapper | typeof console = console): void {
        const game = new Game(consoleWrapper);
        game.add("Chet");
        game.add("Pat");
        game.add("Sue");

        let notAWinner;
        do {

            game.roll(Math.floor(Math.random() * 6) + 1);
        
            if (Math.floor(Math.random() * 10) === 7) {
                notAWinner = game.wrongAnswer();
            } else {
                notAWinner = game.wasCorrectlyAnswered();
            }
        
        } while (notAWinner);
    }
}

GameRunner.main();

  