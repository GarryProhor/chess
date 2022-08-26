import {Piece, Position, samePosition, TeamType} from "../../utils/Constants";
import {tileIsEmptyOrOccupiedByOpponent, tileIsOccupied} from "./General";

export const kingMove = (
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
): boolean => {
    for (let i = 1; i < 2; i++) {
        //diagonal
        let multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : (desiredPosition.x > initialPosition.x) ? 1 : 0;
        let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0;

        let passedPosition: Position = {
            x: initialPosition.x + (i * multiplierX),
            y: initialPosition.y + (i * multiplierY)
        };
        //check if the tile is the destination tile
        if (samePosition(passedPosition, desiredPosition)) {
            //    dealing with destination tile
            if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                return true;
            }
        } else {
            //    dealing with passing tile
            if (tileIsOccupied(passedPosition, boardState)) {
                break;
            }
        }
    }
    return false;
}