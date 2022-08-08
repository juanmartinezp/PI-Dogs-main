

export default function temperamentCard(temperaments) {
    if(typeof(temperaments) === 'string') {
        return temperaments;
    }
    if(Array.isArray(temperaments)) {
        let temps = temperaments.map(temp => temp.name)
        return temps.join(', ');
    }
}