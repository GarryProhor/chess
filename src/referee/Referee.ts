import {PieceType, TeamType} from "../components/Chessboard";

export const isValidMove = (px: number, py: number, x: number, y: number, type: PieceType, team: TeamType) =>{
    console.log("referee is checking the move...")
    console.log(`previos: (${px},${py}) `);
    console.log(`current: (${x},${y}) `);
    console.log(`type: (${type}) `);
    console.log(`team: (${team}) `);

    if(type === PieceType.PAWN){
        if(team === TeamType.OUR){
            if(py === 1){
                if(px === x && (y - py === 1 || y - py === 2)){
                    return true;
                }
            }else {
                if(px === x && y - py === 1){
                    return true;
                }
            }
        }
    }

    return false;
}