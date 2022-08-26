import {Piece, PieceType, Position, TeamType} from "../utils/Constants";
import {pawnMove, kingMove, knightMove, queenMove, rookMove, bishopMove} from "./rules";

export default class Referee {
    isEnPassantMove(
        initialPosition: Position,
        desiredPosition: Position,
        type: PieceType,
        team: TeamType,
        boardState: Piece[]
    ) {
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        if (type === PieceType.PAWN) {
            if ((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && desiredPosition.y - initialPosition.y === pawnDirection) {
                const piece = boardState.find(
                    (p) => p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - pawnDirection && p.enPassant
                );
                if (piece) {
                    return true;
                }
            }
        }

        //if the attacking piece is a pawn DONE
        //upper left / upper right || bottom left / bottom right DONE
        //if a piece is under / above the attacked tile DONE
        //if the attacked piece has made an en passant move in the previous turn DONE

        //Put piece in correct position
        //Remove en passanted piece

        return false;
    }

    isValidMove(
        initialPosition: Position,
        desiredPosition: Position,
        type: PieceType,
        team: TeamType,
        boardState: Piece[]
    ) {
        console.log("referee is checking the move...")
        console.log(`previos: (${initialPosition.x},${initialPosition.y}) `);
        console.log(`current: (${desiredPosition.x},${desiredPosition.y}) `);
        console.log(`type: (${type}) `);
        console.log(`team: (${team}) `);

        let validMove = false;
        switch (type) {
            case PieceType.PAWN:
                validMove = pawnMove(initialPosition, desiredPosition, team, boardState);
                break;
            case PieceType.KNIGHT:
                validMove = knightMove(initialPosition, desiredPosition, team, boardState);
                break;
            case PieceType.BISHOP:
                validMove = bishopMove(initialPosition, desiredPosition, team, boardState);
                break;
            case PieceType.ROOK:
                validMove = rookMove(initialPosition, desiredPosition, team, boardState);
                break;
            case PieceType.QUEEN:
                validMove = queenMove(initialPosition, desiredPosition, team, boardState);
                break;
            case PieceType.KING:
                validMove = kingMove(initialPosition, desiredPosition, team, boardState);

        }
        return validMove;
    }
}