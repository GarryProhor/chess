import React, {useRef, useState} from 'react';
import './Chessboard.css';
import Tile from "../Tile";
import '../../referee/Referee';
import Referee from "../../referee/Referee";
import {
    HORIZONTAL_AXIS,
    initialBoardState,
    Piece,
    PieceType,
    TeamType,
    VERTICAL_AXIS,
    Position,
    GRID_SIZE,
    samePosition,
} from "../../utils/Constants";


const Chessboard = () => {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [grabPosition, setGrabPosition] = useState<Position>({x: -1, y: -1});
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const chessboardRef = useRef<HTMLDivElement>(null);
    const referee = new Referee();


    const grabPiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;
        if (element.classList.contains('chess-piece') && chessboard) {
            const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE));
            setGrabPosition({x: grabX, y: grabY});

            const x = e.clientX - GRID_SIZE / 2;
            const y = e.clientY - GRID_SIZE / 2;

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
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE));

            const currentPiece = pieces.find((p) => samePosition(p.position, grabPosition));

            if (currentPiece) {
                const validMove = referee.isValidMove(
                    grabPosition,
                    {x,y},
                    currentPiece.type,
                    currentPiece.team,
                    pieces
                );
                const isEnPassantMove = referee.isEnPassantMove(
                    grabPosition,
                    {x,y},
                    currentPiece.type,
                    currentPiece.team,
                    pieces,
                );

                const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;

                if(isEnPassantMove) {
                    const updatedPieces = pieces.reduce((results, piece) => {
                        if(samePosition(piece.position, grabPosition)) {
                            piece.enPassant = false;
                            piece.position.x = x;
                            piece.position.y = y;
                            results.push(piece);
                        } else if(!samePosition(piece.position, {x, y: y - pawnDirection})) {
                            if(piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece);
                        }

                        return results;
                    },[] as Piece[])

                    setPieces(updatedPieces);
                } else if (validMove) {
                    //UPDATES THE PIECE POSITION
                    //AND IF A PIECE IS ATTACKED, REMOVES IT
                    const updatedPieces = pieces.reduce((results, piece) => {
                        if (samePosition(piece.position, grabPosition)) {
                            //special move
                            piece.enPassant = Math.abs(grabPosition.y - y) === 2 && piece.type === PieceType.PAWN;
                            piece.position.x = x;
                            piece.position.y = y;
                            results.push(piece);
                        } else if (!samePosition(piece.position, {x, y})) {
                            if(piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece);
                        }

                        return results;
                    }, [] as Piece[]);

                    setPieces(updatedPieces);
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

    for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
        for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
            const number = j + i + 2;
            const index = VERTICAL_AXIS[j] + HORIZONTAL_AXIS[i];
            const piece = pieces.find(p=>samePosition(p.position, {x: i, y: j}));
            let image = piece ? piece.image : '';
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