import React from 'react';
import temperamentCard  from './temperamentCard';
import dogImg from './Images/dogDefault.jpg';

export default function Dog({name, image, temperaments, weightMin, weightMax}) {
    return (

        <div id='card'>

            <h1 id='tittleCard'>{name}</h1>

            {image ? <img id='imgCard' src={image} alt='dogImg'/> : 
            <img id='imgCard' src={dogImg} alt='dogImg'/>}

            {temperaments ? <h4 id='h4'>Temperaments: {temperamentCard(temperaments)}</h4> : 
            <h4>No temperaments found</h4>}

            <h4 id='h4'>Peso Min: {weightMin} - Peso Max: {weightMax}</h4>

        </div>
    )
}