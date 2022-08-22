
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
            <img src={image} alt={image}/>
        </div>
    );
};

export default Tile;