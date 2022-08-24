
import {Piece, PieceType, Position, TeamType} from "../utils/Constants";

export default class Referee {


    tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
        console.log('Checking if tile occupied');

        const piece = boardState.find((p) =>
            p.position.x === x && p.position.y === y);
        return !!piece;

    };

    tileIsOccupiesByOpponent(x: number, y: number, boardState: Piece[], team: TeamType): boolean {
        const piece = boardState.find((p) =>
            p.position.x === x &&
            p.position.y === y &&
            p.team !== team
        );
        return !!piece;
    }

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
                if(piece) {
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


        if (type === PieceType.PAWN) {
            const specialRow = (team === TeamType.OUR) ? 1 : 6;
            const specialDirection = (team === TeamType.OUR) ? 1 : -1;

            //movement logic
            if (initialPosition.x === desiredPosition.x && initialPosition.y === specialRow && desiredPosition.y - initialPosition.y === 2 * specialDirection) {
                if (!this.tileIsOccupied(desiredPosition.x, desiredPosition.y, boardState) &&
                    !this.tileIsOccupied(desiredPosition.x, desiredPosition.y - specialDirection, boardState)
                ) {
                    return true;
                }
            } else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === specialDirection) {
                if (!this.tileIsOccupied(desiredPosition.x, desiredPosition.y, boardState)) {
                    return true;
                }
            }
            //attack logic
            else if (desiredPosition.x - initialPosition.x === -1 && desiredPosition.y - initialPosition.y === specialDirection) {
                //    attack in upper left corner
                if (this.tileIsOccupiesByOpponent(desiredPosition.x, desiredPosition.y, boardState, team)) {
                    return true;
                }
            } else if (desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === specialDirection) {
                //    attack in upper right corner
                if (this.tileIsOccupiesByOpponent(desiredPosition.x, desiredPosition.y, boardState, team)) {
                    return true;
                }
            }
        }
        return false;
    }
}