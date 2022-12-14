import {Piece, Position, TeamType} from "../../utils/Constants";
import {tileIsEmptyOrOccupiedByOpponent} from "./General";

export const knightMove = (
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
): boolean => {
    for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
            //    top/bottom line
            if (desiredPosition.y - initialPosition.y === 2 * i) {
                if (desiredPosition.x - initialPosition.x === j) {
                    if (tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                        return true;
                    }
                }
            }
            //    right/left line
            if (desiredPosition.x - initialPosition.x === 2 * i) {
                if (desiredPosition.y - initialPosition.y === j) {
                    if (tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}