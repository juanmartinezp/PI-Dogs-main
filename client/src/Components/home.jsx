import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loadingImg from './Images/loading.gif';
import dog_not_found from './Images/dogNotFound.jpg';
import Dog from './Dog';
import SearchDog from './SearchBar';
import Paginado from './Paginado';


// ----------------------Actions----------------------
import {
    getAllDogs,
    getAllTemperament,
    getTemperamentFilter,
    filterDogsByOrigin,
    orderByAlphabet,
    sortByWeight,
} from '../redux/actions.js';

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)
    const allDogsLoaded = useSelector((state) => state.allDogs)
    const allTemperaments = useSelector((state) => state.allTemperaments)

    const [ order, setOrder ] = useState("")

//--------------------- Paginado -----------------------

const [page, setPage] = useState(1);
const [dogsxPage, setDogsxPage] = useState(8);
const indice = page * dogsxPage;

const indiceFinal = indice - dogsxPage;

const currentPage = allDogs.slice(indiceFinal, indice);

const pagina = (numPage) => {
        setPage(numPage);
};





//--------------------- HOOKS -----------------------

useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperament());
}, [dispatch]);

function handleTemperamentFilter(e) {
    e.preventDefault();
    dispatch(getTemperamentFilter(e.target.value))
    setPage(1);
    setOrder(e.target.value);
}

function handleAlphabetOrder(e) {
    e.preventDefault();
    dispatch(orderByAlphabet(e.target.value));
    setPage(1)
    setOrder(e.target.value)
}

function handleWeightOrder(e) {
    e.preventDefault()
    dispatch(sortByWeight(e.target.value));
    setPage(1)
    setOrder(e.target.value)
}

function handleOrderByCreation(e) {
    e.preventDefault();
    dispatch(filterDogsByOrigin(e.target.value))
    setPage(1)
    setOrder(e.target.value)
}

function handleClick(e) {
    e.preventDefault();
    dispatch(getAllDogs())
}

return (
    <div>
        {!allDogsLoaded  ?
        <div className= 'loading' > 
        <img className = 'loadingImg' src={loadingImg} alt= 'not found'/>
        </div>:
        <div>
            <nav id='nav'>
                <h1 id='tittleHome'>The Dogs World</h1>
                <ul>
                    <li>
                        <button className='btnDetail2' onClick = {e => { handleClick(e) }}>Refresh</button>
                    </li>
                    <li>
                        <Link to='dogs'>
                            <buton id='crear'>Create Dog</buton>
                        </Link>
                    </li>
                    <li>
                        <select 
                        onChange = {(e) => {handleTemperamentFilter(e)}} className = 'filNav'>
                        
                        <option value = {'all'}>All Temperaments</option>
                        {allTemperaments ?.map((e) => {
                            return <option value = {e.name}>{e.name}</option>
                        })}
                        </select>
                    </li>
                    <li>
                        <select
                        key='selectOrder'
                        onChange={(e) => handleAlphabetOrder(e)}
                        className='filNav'
                        >
                            <option value={'allApi'}>Order</option>
                            <option value={'des'}>Z-A</option>
                            <option value={'asc'}>A-Z</option>
                        </select>
                    </li>
                    <li>
                        <select onChange={(e) => handleWeightOrder(e)} className='filNav'>
                            <option value='selected' hidden>Weight</option>
                            <option value='desc'>Heavy</option>
                            <option value='asc'>Light</option>
                        </select>
                    </li>
                    <li>
                        <select onChange={(e) => handleOrderByCreation(e)} className='filNav'>
                            <option value='all'>Origin</option>
                            <option value='api'>DogsApi</option>
                            <option value='created'>DogsDb</option>
                        </select>
                    </li>
                    <li>
                        <SearchDog/>
                    </li>
                </ul>
                <div class='clearfix'></div>
            </nav>

            <Paginado
            dogsxPage={dogsxPage}
            allDogs={allDogs.length}
            pagina={pagina}
            />

            { currentPage.length?
            currentPage?.map((e) => {
                return (
                    <div>
                        <Link to={`/home/${e.id}`}>
                            <Dog
                            name={e.name}
                            image={e.image}
                            temperaments={e.temperaments}
                            id={e.id}
                            weightMax={e.weightMax}
                            weightMin={e.weightMin}
                            />
                        </Link>
                    </div>
                );
            }): <div>
                    <h1 className='dogNotFound'>Sorry, Dog not found</h1>
                    <img className='imgNotFound' src={dog_not_found} alt= 'dog_not_found'/>
                    <button className='btnDetail1' onClick={e => { handleClick(e) }}>Back</button>
                </div>
                }
        </div>
    } 
    </div>
);
}

