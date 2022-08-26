import {Piece, Position, samePosition, TeamType} from "../../utils/Constants";

export const tileIsOccupied = (position: Position, boardState: Piece[]): boolean => {
    console.log('Checking if tile occupied');
    const piece = boardState.find((p) => samePosition(p.position, position));
    return !!piece;
};

export const tileIsOccupiesByOpponent = (position: Position, boardState: Piece[], team: TeamType): boolean => {
    const piece = boardState.find((p) =>
        samePosition(p.position, position) &&
        p.team !== team
    );
    return !!piece;
}

export const tileIsEmptyOrOccupiedByOpponent = (position: Position, boardState: Piece[], team: TeamType) => {
    return !tileIsOccupied(position, boardState) || tileIsOccupiesByOpponent(position, boardState, team);
}