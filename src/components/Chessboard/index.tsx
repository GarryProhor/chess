import React from 'react';
import './Chessboard.css';
import Tile from "../Tile";


const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
    image: string,
    x: number,
    y: number,
}

const pieces: Piece[] = [];

const Chessboard = () => {
    let board = [];

    for(let j=verticalAxis.length-1; j>=0; j--){
        for(let i=0; i<horizontalAxis.length; i++){
            const number = j + i + 2;
            const index = verticalAxis[j]+horizontalAxis[i];
            let image = '';
            board.push(<Tile key={index} number={number} image={image}/>);
        }
    }
    return (
        <div id='chessboard'>
            {board}
        </div>
    );
};

export default Chessboard;