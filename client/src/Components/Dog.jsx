import React from 'react';


export default function temperamentCard(temperaments) {
    if(typeof(temperaments) === 'string') {
        return temperaments;
    }
    if(Array.isArray(temperaments)) {
        let temps = temperaments.map(temp => temp.name)
        return temps.join(', ');
    }
}

export default function Dog({name, image, temperaments, weightMin, weightMax}) {
    return (

        <div id='card'>
            
            <h1 id='tittleCard'>{name}</h1>

            {image ? <img id='imgCard' src={image} alt='dogImg'/> : 
            <img id='imgCard' src={imagDogDefault} alt='dogImg'/>}

            {temperaments ? <h4 id='h4'>Temperaments: {functionTemp(temperaments)}</h4> : 
            <h4>No temperaments found</h4>}

            <h4 id='h4'>Peso Min: {weightMin} - Peso Max: {weightMax}</h4>

        </div>
    )
}