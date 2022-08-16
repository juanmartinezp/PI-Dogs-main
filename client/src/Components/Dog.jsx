import React from "react";
import defaultImage from "./Images/dogDefault.jpg";
import './styles/Dog.css';

// function dogTemperament(temperaments) {
//     if (typeof temperaments === "string") {
//     return temperaments;
//     }
//     if (Array.isArray(temperaments)) {
//     let temps = temperaments.map((e) => e.name);
//     return temps.join(", ");
//     }
// }

export default function Dog({
    name,
    image,
    temperament,
    weight
}) {
    return (
        <div id="card">
        <h1 id="cardTittle" className="styleName">{name}</h1>
        {image ? (
            <img id="cardImg" width={"300px"}  src={image} alt="dogImg" />
        ) : (
            <img id="cardImg" src={defaultImage} alt="dogImg" />
        )}
        {temperament ? (
            <h4 id="h4" className="styleDogData">Temperament: {temperament}</h4>
        ) : (
            <h4 className="styleDogData">Not temperament found</h4>
        )}
        {weight ? (
        <h4 id="h4" className="styleDogData">
            weight: {weight}
        </h4>
        ) : (
        <h4 className="styleDogData">Weight Not found</h4>
        )}
        </div>
        
    );
}
