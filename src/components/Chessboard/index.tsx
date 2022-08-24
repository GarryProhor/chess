import React, {useRef, useState} from 'react';
import './Chessboard.css';
import Tile from "../Tile";
import '../../referee/Referee';
import Referee from "../../referee/Referee";


const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece {
    image: string;
    x: number;
    y: number;
    type: PieceType;
    team: TeamType;
    enPassant?: boolean;
}

export enum TeamType {
    OCCUPANT = 'OCCUPANT',
    OUR = 'OUR'
}

export enum PieceType {
    PAWN = 'PAWN',
    BISHOP = 'BISHOP',
    KNIGHT = 'KNIGHT',
    ROOK = 'ROOK',
    QUEEN = 'QUEEN',
    KING = 'KING'
}

const initialPieces: Piece[] = [];

for (let p = 0; p < 2; p++) {
    const team = (p === 0) ? TeamType.OCCUPANT : TeamType.OUR;
    const type = (team === TeamType.OCCUPANT) ? 'b' : 'w';
    const y = (team === TeamType.OCCUPANT) ? 7 : 0;

    initialPieces.push({image: `assets/images/rook_${type}.png`, x: 0, y, type: PieceType.ROOK, team})
    initialPieces.push({image: `assets/images/rook_${type}.png`, x: 7, y, type: PieceType.ROOK, team},)
    initialPieces.push({image: `assets/images/bishop_${type}.png`, x: 2, y, type: PieceType.BISHOP, team})
    initialPieces.push({image: `assets/images/bishop_${type}.png`, x: 5, y, type: PieceType.BISHOP, team})
    initialPieces.push({image: `assets/images/knight_${type}.png`, x: 1, y, type: PieceType.KNIGHT, team})
    initialPieces.push({image: `assets/images/knight_${type}.png`, x: 6, y, type: PieceType.KNIGHT, team})
    initialPieces.push({image: `assets/images/queen_${type}.png`, x: 3, y, type: PieceType.QUEEN, team})
    initialPieces.push({image: `assets/images/king_${type}.png`, x: 4, y, type: PieceType.KING, team})
}

for (let i = 0; i < 8; i++) {
    initialPieces.push({image: 'assets/images/pawn_b.png', x: i, y: 6, type: PieceType.PAWN, team: TeamType.OCCUPANT})
}
for (let i = 0; i < 8; i++) {
    initialPieces.push({image: 'assets/images/pawn_w.png', x: i, y: 1, type: PieceType.PAWN, team: TeamType.OUR})
}

const Chessboard = () => {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState<Piece[]>(initialPieces);
    const chessboardRef = useRef<HTMLDivElement>(null);
    const referee = new Referee();


    const grabPiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;
        if (element.classList.contains('chess-piece') && chessboard) {
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

    const moviePiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            const minX = chessboard.offsetLeft - 20;
            const minY = chessboard.offsetTop - 10;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 87;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 90;
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = 'absolute';

            //if x is smaller than minimum amount
            if (x < minX) {
                activePiece.style.left = `${minX}px`;
            }
            //if x is bigger than minimum amount
            else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
            }
            //if x is in the constraints
            else {
                activePiece.style.left = `${x}px`;
            }

            //if y is smaller than minimum amount
            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            } else if (y > maxY) {//if y is bigger than minimum amount
                activePiece.style.top = `${maxY}px`;
            } else {//if y is in the constraints
                activePiece.style.top = `${y}px`;
            }

        }
    }
    const dropPiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));

            const currentPiece = pieces.find((p) => p.x === gridX && p.y === gridY);
            const attackedPiece = pieces.find((p) => p.x === x && p.y === y);

            if (currentPiece) {
                const validMove = referee.isValidMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces);
                const isEnPassantMove = referee.isEnPassantMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces);

                if (validMove) {
                    const updatePieces = pieces.reduce((result, piece) => {
                        if (piece.x === gridX && piece.y === gridY) {
                            piece.x = x;
                            piece.y = y;
                            result.push(piece);
                        } else if (!(piece.x === x && piece.y === y)) {
                            result.push(piece);
                        }

                        return result;
                    }, [] as Piece[])

                    setPieces(updatePieces);
                } else {
                    //resets the piece position
                    activePiece.style.position = 'relative';
                    activePiece.style.removeProperty('top');
                    activePiece.style.removeProperty('left');
                }
            }
            setActivePiece(null)
        }
    }

    let board = [];

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const number = j + i + 2;
            const index = verticalAxis[j] + horizontalAxis[i];
            let image = '';
            pieces.forEach((p) => {
                if (p.x === i && p.y === j) {
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