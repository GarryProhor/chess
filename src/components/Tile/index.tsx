
import './Tile.css';
import React from "react";



interface ITile {
    number: number,
    colorTile?: string,
    image?: string,
}

const Tile = ({number, colorTile, image}: ITile) => {
    if(number % 2 ===0){
        colorTile = 'black-tile'
    }else{
        colorTile = 'white-tile'
    }
    return (
        <div  className={`tile ${colorTile}`}>
            {image && <div style={{backgroundImage: `url(${image})`}} className='chess-piece'></div>}
        </div>
    );
};

export default Tile;