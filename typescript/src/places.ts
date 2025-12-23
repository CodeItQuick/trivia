import {PlaceOnBoard} from "./placeOnBoard";

export class Places {
    private placesOnBoard: Array<PlaceOnBoard> = [];

    constructor(placesOnBoard) {
        this.placesOnBoard = placesOnBoard;
    }

    addPlayer(playerNumber: number) {
        this.placesOnBoard[playerNumber] = new PlaceOnBoard(0);
    }

    updatePlayer(currentPlayer: number, roll: number) {
        this.placesOnBoard[currentPlayer] = new PlaceOnBoard(0);
        this.placesOnBoard[currentPlayer].updated(roll);
    }

    playerLocation(currentPlayer: number) {
        return this.placesOnBoard[currentPlayer].place();
    }

    currentCategory(currentPlayer: number): string {
        if (this.placesOnBoard[currentPlayer]?.place() === 0)
            return 'Pop';
        if (this.placesOnBoard[currentPlayer].place() === 4)
            return 'Pop';
        if (this.placesOnBoard[currentPlayer].place() === 8)
            return 'Pop';
        if (this.placesOnBoard[currentPlayer].place() === 1)
            return 'Science';
        if (this.placesOnBoard[currentPlayer].place() === 5)
            return 'Science';
        if (this.placesOnBoard[currentPlayer].place() === 9)
            return 'Science';
        if (this.placesOnBoard[currentPlayer].place() === 2)
            return 'Sports';
        if (this.placesOnBoard[currentPlayer].place() === 6)
            return 'Sports';
        if (this.placesOnBoard[currentPlayer].place() === 10)
            return 'Sports';
        return 'Rock';
    }

    createNewPlace(currentPlayer: number, roll: number) {
        this.placesOnBoard[currentPlayer] = new PlaceOnBoard(0).createNewPlace(roll);
    }
}