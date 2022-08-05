import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// ----------------------Actions----------------------
import {
    getAllDogs,
    searchByName,
    createDog,
    getAllTemperament,
    getDogDetail,
    getTemperamentFilter,
    getRaceFilter,
    getAlphabetOrder,
    getweightOrder
} from '../redux/actions.js';

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allDogsLoad = useSelector((state) => state.allDogs);
    const allTemperaments = useSelector((state) => state.allTemperament);

    const [order, serOrder] = useState('');
}

//--------------------- Paginado -----------------------






//--------------------- Paginado -----------------------

useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperament());
}, [dispatch]);

function handleFilterTypes(e) {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
    setPage(1);
    setOrder(e.target.value);
}

function handleFilterOrigin(e) {
    e.preventDefault();
    dispatch(filterDogsByOrigin(e.target.value));
    setPage(1);
    setOrder(e.target.value);
}

function handleSortByWight(e) {
    e.preventDefault();
    dispatch(sortByWeight(e.target.value));
    setPage(1);
    setOrder(e.target.value);
}

function handleOrder(e) {
    e.preventDefault();
    dispatch(orderByAlphabet(e.target.value));
    setPage(1);
    setOrder(e.target.value);
}

function handleClick(e) {
    e.preventDefault();
    dispatch(getAllDogs());
}

return (
    <div>
        {!allDogsLoad.length ?
        <div className= 'loading' > 
        <img className = 'loadingImg' src={gif_loading} alt= 'not found'/>
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
                        onChange = {(e) => {handleFilterTypes(e)}} className = 'filNav'>
                        
                        <option value = {'all'}>All Temperaments</option>
                        {allTemperaments ?.map((e) => {
                            return <option value = {e.name}>{e.name}</option>
                        })}
                        </select>
                    </li>
                    <li>
                        <select
                        key='selectOrder'
                        onChange={(e) => handleOrder(e)}
                        className='filNav'
                        >
                            <option value={'allApi'}>Order</option>
                            <option value={'des'}>Z-A</option>
                            <option value={'asc'}>A-Z</option>
                        </select>
                    </li>
                    <li>
                        <select onChange={(e) => handleSortByWeight(e)} className='filNav'>
                            <option value='selected' hidden>Weight</option>
                            <option value='desc'>Heavy</option>
                            <option value='asc'>Light</option>
                        </select>
                    </li>
                    <li>
                        <select onChange={(e) => handleFilterOrigin(e)} className='filNav'>
                            <option value='all'>Origin</option>
                            <option value='api'>DogsApi</option>
                            <option value='created'>DogsDb</option>
                        </select>
                    </li>
                    <li>
                        <SearchBar/>
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
            currenntPage.map((e) => {
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


