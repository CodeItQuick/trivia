/**
 * Responsibility: Given domain information, turns these into display information
 */
export class DisplayMessages {

    public displayPlayerLocation(playerName: string, playerPlace: number) {
        return playerName + "'s new location is " + playerPlace;
    }

    public displayPenaltyBoxMessage(playerName: string, isInPenaltyBox: boolean) {
        return isInPenaltyBox ?
            playerName + " is not getting out of the penalty box" :
            playerName + " is getting out of the penalty box";
    }

    public displayPutPlayerInBox(playerName: string) {
        return playerName + " was sent to the penalty box";
    }

    public displayRewardPlayer(playerName: string, coins: number) {
        return playerName + " now has " + coins + " Gold Coins."
    }

    public displayBeginTurn(playerName: string) {
        return playerName + " is the current player";
    }

    public displayRollPlayerMessage(roll: number) {
        return "They have rolled a " + roll;
    }

    public displayPlayerNumber(playerNumber: number) {
        return "They are player number " + playerNumber;
    }
}