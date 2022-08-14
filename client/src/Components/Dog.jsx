import React from "react";
import "./Dog.css";
import defaultImage from "../Detail/Style/defaultDog.jpg";

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
        <h1 id="cardTittle">{name}</h1>
        {image ? (
            <img id="cardImg" width={"200px"} src={image} alt="dogImg" />
        ) : (
            <img id="cardImg" src={defaultImage} alt="dogImg" />
        )}
        {temperament ? (
            <h4 id="h4">Temperament: {temperament}</h4>
        ) : (
            <h4>Not temperament found</h4>
        )}
        {weight ? (
        <h4 id="h4">
            weight: {weight}
        </h4>
        ) : (
        <h4>Weight Not found</h4>
        )}
        </div>
        
    );
}
