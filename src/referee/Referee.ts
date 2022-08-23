import {PieceType, TeamType, Piece} from "../components/Chessboard";

export default class Referee {


    tileIsOccupied  (x: number, y: number, boardState: Piece[]): boolean  {
       const  piece = boardState.find((p) =>
       p.x === x && p.y === y);
       if(piece){
           return true;
       }else{
           return false;
       }

    };



    isValidMove (px: number,
                   py: number,
                   x: number,
                   y: number,
                   type: PieceType,
                   team: TeamType,
                   boardState: Piece[]
    )  {
        console.log("referee is checking the move...")
        console.log(`previos: (${px},${py}) `);
        console.log(`current: (${x},${y}) `);
        console.log(`type: (${type}) `);
        console.log(`team: (${team}) `);

        if (type === PieceType.PAWN) {
            if (team === TeamType.OUR) {
                if (py === 1) {
                    if (px === x && y - py === 1) {
                        if (!this.tileIsOccupied(x, y, boardState)) {
                            return true;
                        }
                    }else if(px === x && y - py === 2){
                        if (!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y-1, boardState)) {
                            return true;
                        }
                    }
                } else {
                    if (px === x && y - py === 1) {
                        if (!this.tileIsOccupied(x, y, boardState)) {
                            return true;
                        }
                    }
                }
            } else {
                if (py === 6) {
                    if (px === x && y - py === -1) {
                        if (!this.tileIsOccupied(x, y, boardState)) {
                            return true;
                        }
                    }else if(px === x && y - py === -2){
                        if (!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y+1, boardState)) {
                            return true;
                        }
                    }
                } else {
                    if (px === x && y - py === -1) {
                        if (!this.tileIsOccupied(x, y, boardState)) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }
}