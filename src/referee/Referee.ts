import {Piece, PieceType, Position, samePosition, TeamType} from "../utils/Constants";

export default class Referee {

    tileIsEmptyOrOccupiedByOpponent(position: Position, boardState: Piece[], team: TeamType) {
        return !this.tileIsOccupied(position, boardState) || this.tileIsOccupiesByOpponent(position, boardState, team);
    }

    tileIsOccupied(position: Position, boardState: Piece[]): boolean {
        console.log('Checking if tile occupied');
        const piece = boardState.find((p) => samePosition(p.position, position));
        return !!piece;
    };

    tileIsOccupiesByOpponent(position: Position, boardState: Piece[], team: TeamType): boolean {
        const piece = boardState.find((p) =>
            samePosition(p.position, position) &&
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
                if (piece) {
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

    pawnMove(
        initialPosition: Position,
        desiredPosition: Position,
        team: TeamType,
        boardState: Piece[]
    ): boolean {

        const specialRow = (team === TeamType.OUR) ? 1 : 6;
        const specialDirection = (team === TeamType.OUR) ? 1 : -1;

        //movement logic
        if (initialPosition.x === desiredPosition.x && initialPosition.y === specialRow && desiredPosition.y - initialPosition.y === 2 * specialDirection) {
            if (!this.tileIsOccupied(desiredPosition, boardState) &&
                !this.tileIsOccupied({x: desiredPosition.x, y: desiredPosition.y - specialDirection}, boardState)
            ) {
                return true;
            }
        } else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === specialDirection) {
            if (!this.tileIsOccupied(desiredPosition, boardState)) {
                return true;
            }
        }
        //attack logic
        else if (desiredPosition.x - initialPosition.x === -1 && desiredPosition.y - initialPosition.y === specialDirection) {
            //    attack in upper left corner
            if (this.tileIsOccupiesByOpponent(desiredPosition, boardState, team)) {
                return true;
            }
        } else if (desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === specialDirection) {
            //    attack in upper right corner
            if (this.tileIsOccupiesByOpponent(desiredPosition, boardState, team)) {
                return true;
            }
        }
        return false;
    }

    knightMove(
        initialPosition: Position,
        desiredPosition: Position,
        team: TeamType,
        boardState: Piece[]
    ): boolean {
        for (let i = -1; i < 2; i += 2) {
            for (let j = -1; j < 2; j += 2) {
                //    top/bottom line
                if (desiredPosition.y - initialPosition.y === 2 * i) {
                    if (desiredPosition.x - initialPosition.x === j) {
                        if (this.tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                            return true;
                        }
                    }
                }
                //    right/left line
                if (desiredPosition.x - initialPosition.x === 2 * i) {
                    if (desiredPosition.y - initialPosition.y === j) {
                        if (this.tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    bishopMove(
        initialPosition: Position,
        desiredPosition: Position,
        team: TeamType,
        boardState: Piece[]
    ): boolean {
        //up right
        for (let i = 1; i < 8; i++) {
            if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
                let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y + i};
                //check if the tile is the destination tile
                if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                    //    dealing with destination tile
                    if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                        return true;
                    }
                } else {
                    //    dealing with passing tile
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }

            //bottom right
            if (desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
                let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y - i};
                //check if the tile is the destination tile
                if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                    //    dealing with destination tile
                    if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                        return true;
                    }
                } else {
                    //    dealing with passing tile
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }

            //bottom left
            if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
                let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y - i};
                //check if the tile is the destination tile
                if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                    //    dealing with destination tile
                    if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                        return true;
                    }
                } else {
                    //    dealing with passing tile
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }
            //up left
            if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
                let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y + i};
                if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                    //    dealing with destination tile
                    if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                        return true;
                    }
                } else {
                    //    dealing with passing tile
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }
        }
        return false;
    }

    rookMove(
        initialPosition: Position,
        desiredPosition: Position,
        team: TeamType,
        boardState: Piece[]
    ): boolean {
        //horizontal
        if (initialPosition.y === desiredPosition.y) {
            for (let i = 1; i < 8; i++) {
                let multiplier = (desiredPosition.x < initialPosition.x) ? -1 : 1;

                let passedPosition: Position = {x: initialPosition.x + (i * multiplier), y: initialPosition.y};
                if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                    if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                        return true;
                    }
                } else {
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }
        }
        //vertical
        if (initialPosition.x === desiredPosition.x) {
            for (let i = 1; i < 8; i++) {
                let multiplier = (desiredPosition.y < initialPosition.y) ? -1 : 1;

                let passedPosition: Position = {x: initialPosition.x, y: initialPosition.y + (i * multiplier)};
                if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                    if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                        return true;
                    }
                } else {
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }
        }
        return false;
    }

    queenMove(
        initialPosition: Position,
        desiredPosition: Position,
        team: TeamType,
        boardState: Piece[]
    ): boolean {
        for (let i = 1; i < 8; i++) {
            //top/bottom
            if (desiredPosition.x === initialPosition.x) {
                let multiplier = (desiredPosition.y < initialPosition.y) ? -1 : 1;
                let passedPosition: Position = {x: initialPosition.x, y: initialPosition.y + (i * multiplier)};
                if (samePosition(passedPosition, desiredPosition)) {
                    if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                        return true;
                    }
                } else {
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }
            //right/left
            if (desiredPosition.y === initialPosition.y) {
                let multiplier = (desiredPosition.x < initialPosition.x) ? -1 : 1;
                let passedPosition: Position = {x: initialPosition.x + (i * multiplier), y: initialPosition.y};
                if (samePosition(passedPosition, desiredPosition)) {
                    if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                        return true;
                    }
                } else {
                    if (this.tileIsOccupied(passedPosition, boardState)) {
                        break;
                    }
                }
            }


            //diagonal
            let multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : 1;
            let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : 1;
            let passedPosition: Position = {
                x: initialPosition.x + (i * multiplierX),
                y: initialPosition.y + (i * multiplierY)
            };
            //check if the tile is the destination tile
            if (samePosition(passedPosition, desiredPosition)) {
                //    dealing with destination tile
                if (this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                    return true;
                }
            } else {
                //    dealing with passing tile
                if (this.tileIsOccupied(passedPosition, boardState)) {
                    break;
                }
            }
        }
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

        let validMove = false;
        switch (type) {
            case PieceType.PAWN:
                validMove = this.pawnMove(initialPosition, desiredPosition, team, boardState);
                break;
            case PieceType.KNIGHT:
                validMove = this.knightMove(initialPosition, desiredPosition, team, boardState);
                break;
            case PieceType.BISHOP:
                validMove = this.bishopMove(initialPosition, desiredPosition, team, boardState);
                break;
            case PieceType.ROOK:
                validMove = this.rookMove(initialPosition, desiredPosition, team, boardState);
                break;
            case PieceType.QUEEN:
                validMove = this.queenMove(initialPosition, desiredPosition, team, boardState);
                break;
        }
        return validMove;
    }
}