import {Piece, Position, samePosition, TeamType} from "../../utils/Constants";
import {tileIsEmptyOrOccupiedByOpponent, tileIsOccupied} from "./General";

export const bishopMove = (
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
): boolean => {
    //up right
    for (let i = 1; i < 8; i++) {
        if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
            let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y + i};
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

        //bottom right
        if (desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
            let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y - i};
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

        //bottom left
        if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
            let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y - i};
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
        //up left
        if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
            let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y + i};
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
    }
    return false;
}