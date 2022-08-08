import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getDogDetail, deleteDog } from '../redux/actions';
import temperamentCard from './Dog';


export default function Detail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDogDetail(id));
    }, [dispatch, id]);

    const allDogDetail = useSelector((state) => state.dogDetail);

    function handleDelete(e) {
        if(id.length > 5) {
            e.preventDefault()
            dispatch(deleteDog(id))
            alert('Dog breed deleted')
            history.push('/home')
        }
        else{
            alert('You can not delete this dog')
        }
    }
    console.log(allDogDetail);

    return (
        <div id='cardDetail'>
            <h1 id='mainTittle'>{allDogDetai.namel}</h1>

            {allDogDetail.image ? <img src={dogAllDetail.image} alt= 'dogImg' id='imgDetail'/> : 
            <img id= 'imgDetail' src={imagDogDefault} alt='dogImg'/>}

            <div>
                {dogAllDetail.temperaments ? <p>Temperaments: {temperamentCard(allDogDetail.temperaments)}</p>:
                <p>No temperaments found</p>}
                <p>Height Max: {allDogDetail.heightMax}</p>
                <p>Height Min: {allDogDetail.heightMin}</p>
                <p>Weight Max: {allDogDetail.weightMax}</p>
                <p>Weight Min: {allDogDetail.weightMin}</p>
                <p>Life expectancy in years: {allDogDetail.life_span_min} - {allDogDetail.life_span_max}</p>
            </div>

            <Link to='/home'>
                <button className='btnDetail' onClick={(e) => handleDelete(e)}>Delete</button>
                <button className='btnDetail'>GoBack</button>
            </Link>

        </div>
    );
}
