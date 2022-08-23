import React, {useRef, useState} from 'react';
import './Chessboard.css';
import Tile from "../Tile";


const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
    image: string,
    x: number,
    y: number,
}

const initialPieces: Piece[] = [];

for(let p = 0; p<2; p++){
    const type = (p === 0 ? 'b' : 'w');
    const y = (p === 0 ? 7 : 0);

    initialPieces.push({image: `assets/images/rook_${type}.png`, x: 0, y})
    initialPieces.push({image: `assets/images/rook_${type}.png`, x: 7, y})
    initialPieces.push({image: `assets/images/bishop_${type}.png`, x: 2, y})
    initialPieces.push({image: `assets/images/bishop_${type}.png`, x: 5, y})
    initialPieces.push({image: `assets/images/knight_${type}.png`, x: 1, y})
    initialPieces.push({image: `assets/images/knight_${type}.png`, x: 6, y})
    initialPieces.push({image: `assets/images/queen_${type}.png`, x: 3, y})
    initialPieces.push({image: `assets/images/king_${type}.png`, x: 4, y})
}

for (let i = 0; i<8; i++){
    initialPieces.push({image: 'assets/images/pawn_b.png', x: i, y: 6})
}
for (let i = 0; i<8; i++) {
    initialPieces.push({image: 'assets/images/pawn_w.png', x: i, y: 1})
}

const Chessboard = () => {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState<Piece[]>(initialPieces);
    const chessboardRef = useRef<HTMLDivElement>(null);


    const grabPiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;
        if(element.classList.contains('chess-piece') && chessboard){
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
            setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)));
            const x = e.clientX - 50;
            const y = e.clientY - 50;

            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            setActivePiece(element);
        }
    }
    const moviePiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard){
            const minX =chessboard.offsetLeft - 20;
            const minY = chessboard.offsetTop - 10;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 87;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 90;
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = 'absolute';

            //if x is smaller than minimum amount
            if(x < minX){
                activePiece.style.left = `${minX}px`;
            }
            //if x is bigger than minimum amount
            else if(x > maxX){
                activePiece.style.left = `${maxX}px`;
            }
            //if x is in the constraints
            else{
                activePiece.style.left = `${x}px`;
            }

            //if y is smaller than minimum amount
            if(y < minY){
                activePiece.style.top = `${minY}px`;
            }else if(y > maxY){//if y is bigger than minimum amount
                activePiece.style.top = `${maxY}px`;
            }else{//if y is in the constraints
                activePiece.style.top = `${y}px`;
            }

        }
    }
    const dropPiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard){
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));

            console.log(x,y)

            setPieces((value) =>{
                const pieces = value.map((p) =>{
                    if(p.x===gridX && p.y===gridY){
                        p.x = x;
                        p.y = y;
                    }
                    return p;
                });
                return pieces;
            })
            setActivePiece(null)
        }
    }

    let board = [];

    for(let j=verticalAxis.length-1; j>=0; j--){
        for(let i=0; i<horizontalAxis.length; i++){
            const number = j + i + 2;
            const index = verticalAxis[j]+horizontalAxis[i];
            let image = '';
            pieces.forEach((p) =>{
                if(p.x === i && p.y === j){
                    image = p.image;
                }
            })
            board.push(<Tile key={index} number={number} image={image}/>);
        }
    }
    return (
        <div
            onMouseMove={event => moviePiece(event)}
            onMouseDown={event => grabPiece(event)}
            onMouseUp={event => dropPiece(event)}
            id='chessboard'
            ref={chessboardRef}
        >
            {board}
        </div>
    );
};

export default Chessboard;