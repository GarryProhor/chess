import {PieceType, TeamType} from "../components/Chessboard";

export const isValidMove = (px: number, py: number, x: number, y: number, type: PieceType, team: TeamType) =>{
    console.log("referee is checking the move...")
    console.log(`previos: (${px},${py}) `);
    console.log(`current: (${x},${y}) `);
    console.log(`type: (${type}) `);
    console.log(`team: (${team}) `);
    return true;
}