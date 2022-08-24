import {Piece, PieceType, TeamType} from "../components/Chessboard";

export default class Referee {


    tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
        console.log('Checking if tile occupied');

        const piece = boardState.find((p) =>
            p.x === x && p.y === y);
        return !!piece;

    };

    tileIsOccupiesByOpponent(x: number, y: number, boardState: Piece[], team: TeamType): boolean {
        const piece = boardState.find((p) =>
            p.x === x &&
            p.y === y &&
            p.team !== team
        );
        return !!piece;
    }

    isEnPassantMove(
        px: number,
        py: number,
        x: number,
        y: number,
        type: PieceType,
        team: TeamType,
        boardState: Piece[]
    ) {
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        if (type === PieceType.PAWN) {
            if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
                const piece = boardState.find(
                    (p) => p.x === x && p.y === y - pawnDirection && p.enPassant
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


    isValidMove(px: number,
                py: number,
                x: number,
                y: number,
                type: PieceType,
                team: TeamType,
                boardState: Piece[]
    ) {
        console.log("referee is checking the move...")
        console.log(`previos: (${px},${py}) `);
        console.log(`current: (${x},${y}) `);
        console.log(`type: (${type}) `);
        console.log(`team: (${team}) `);


        if (type === PieceType.PAWN) {
            const specialRow = (team === TeamType.OUR) ? 1 : 6;
            const specialDirection = (team === TeamType.OUR) ? 1 : -1;

            //movement logic
            if (px === x && py === specialRow && y - py === 2 * specialDirection) {
                if (!this.tileIsOccupied(x, y, boardState) &&
                    !this.tileIsOccupied(x, y - specialDirection, boardState)
                ) {
                    return true;
                }
            } else if (px === x && y - py === specialDirection) {
                if (!this.tileIsOccupied(x, y, boardState)) {
                    return true;
                }
            }
            //attack logic
            else if (x - px === -1 && y - py === specialDirection) {
                //    attack in upper left corner
                if (this.tileIsOccupiesByOpponent(x, y, boardState, team)) {
                    return true;
                }
            } else if (x - px === 1 && y - py === specialDirection) {
                //    attack in upper right corner
                if (this.tileIsOccupiesByOpponent(x, y, boardState, team)) {
                    return true;
                }
            }
        }
        return false;
    }
}