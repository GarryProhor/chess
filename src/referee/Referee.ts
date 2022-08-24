import {Piece, PieceType, TeamType} from "../components/Chessboard";

export default class Referee {


    tileIsOccupied  (x: number, y: number, boardState: Piece[]): boolean  {
       console.log('Checking if tile occupied');

        const  piece = boardState.find((p) =>
       p.x === x && p.y === y);
       if(piece){
           return true;
       }else{
           return false;
       }

    };

    tileIsOccupiesByOpponent(x: number, y: number, boardState: Piece[], team: TeamType):boolean{
        const piece = boardState.find((p)=>
            p.x===x &&
            p.y === y &&
            p.team !== team
        );
        if(piece){
            return true;
        }else{
            return false;
        }
    }


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


        if(type === PieceType.PAWN){
            const specialRow = (team === TeamType.OUR) ? 1 : 6;
            const specialDirection = (team === TeamType.OUR) ? 1 : -1;

            //movement logic
            if(px === x && py === specialRow && y - py === 2*specialDirection){
                if (!this.tileIsOccupied(x, y, boardState) &&
                    !this.tileIsOccupied(x, y - specialDirection, boardState)
                ) {
                    return true;
                }
            }else if(px === x && y - py === specialDirection){
                if (!this.tileIsOccupied(x, y, boardState)) {
                    return true;
                }
            }
            //attack logic
            else if(x - px === -1 && y - py === specialDirection){
                //    attack in upper left corner
                if(this.tileIsOccupiesByOpponent(x, y, boardState, team)){
                    return true;
                }
            }else if(x - px === 1 && y - py === specialDirection){
                //    attack in upper right corner
                if(this.tileIsOccupiesByOpponent(x, y, boardState, team)){
                    return true;
                }
            }
        }
        return false;
    }
}