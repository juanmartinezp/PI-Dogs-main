import react from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className = 'LandingPAge'>
            <h1 className='tittle'>
                Weolcome to the Dogs Place
            </h1>
            <Link to = '/home'>
                <button className='btn'>Start</button>
            </Link>
        </div>
    );
}