import {Piece, Position, TeamType} from "../../utils/Constants";
import {tileIsOccupied, tileIsOccupiesByOpponent} from "./General";

export const pawnMove = (
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
): boolean =>{

    const specialRow = (team === TeamType.OUR) ? 1 : 6;
    const specialDirection = (team === TeamType.OUR) ? 1 : -1;

    //movement logic
    if (initialPosition.x === desiredPosition.x && initialPosition.y === specialRow && desiredPosition.y - initialPosition.y === 2 * specialDirection) {
        if (!tileIsOccupied(desiredPosition, boardState) &&
            !tileIsOccupied({x: desiredPosition.x, y: desiredPosition.y - specialDirection}, boardState)
        ) {
            return true;
        }
    } else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === specialDirection) {
        if (!tileIsOccupied(desiredPosition, boardState)) {
            return true;
        }
    }
    //attack logic
    else if (desiredPosition.x - initialPosition.x === -1 && desiredPosition.y - initialPosition.y === specialDirection) {
        //    attack in upper left corner
        if (tileIsOccupiesByOpponent(desiredPosition, boardState, team)) {
            return true;
        }
    } else if (desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === specialDirection) {
        //    attack in upper right corner
        if (tileIsOccupiesByOpponent(desiredPosition, boardState, team)) {
            return true;
        }
    }
    return false;
}

export const GetPossiblePawnMoves = (pawn: Piece, boardState: Piece[]) : Position[] => {
    const possibleMoves: Position[] = [];

    const pawnDirection = pawn.team === TeamType.OUR ? 1 : -1;
    if(!tileIsOccupied(
        {x: pawn.position.x, y: pawn.position.y + pawnDirection},
        boardState))
        possibleMoves.push({x: pawn.position.x, y: pawn.position.y + pawnDirection})

    return possibleMoves;
}