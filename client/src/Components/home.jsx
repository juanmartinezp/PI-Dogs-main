import React from "react";
import loadingGif from './Images/loading.gif';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import Dogs from "./Dogs.jsx";
import './styles/home.css';



//-------------------------- ACTIONS/IMPORT -----------------------------

import {
    getAllDogs,
    getAllTemperament,
    getTemperamentFilter,
    getABCOrder,
    getCBAOrder,
    orderByWeight,
    // getWeightMinOrder,
    // getWeightMaxOrder,
    getOrderByCreation,
} from "../redux/actions.js";

//------------------------------ REACT/REDUX ----------------------------

export default function Home() {
    const dispatch = useDispatch();
    //const allDogs = useSelector((state) => state.dogs);
    const dogAllTemperaments = useSelector((state) => state.allTemperaments);
    const loading = useSelector((state) => state.loading);

  //---------------------------- REACT/HOOKS -------------------------------

useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperament());
}, [dispatch]);

const [order, setOrder] = useState('')
const [page, setPage] = useState(1);


function handleTemperamentFilter(e) {
    e.preventDefault();
    dispatch(getTemperamentFilter(e.target.value));
    setPage(1);
    setOrder(e.target.value);
}

function handleAlphabetOrder(e){ 
    if(e.target.value === "Asc"){
        e.preventDefault ();
        dispatch(getABCOrder(e.target.value));
        setPage (1);
        setOrder (e.target.value)
    }else if(e.target.value === "Desc"){
        e.preventDefault ();
        dispatch(getCBAOrder(e.target.value));
        setPage (1);
        setOrder (e.target.value)       
    }
}

function handleOrderByWeight(e) {
e.preventDefault();
dispatch(orderByWeight(e.target.value));
setOrder(e.target.value);
setPage (1);
};

  // function handleWeightOrder(e) {
  //     e.preventDefault()
  //     dispatch(getWeightOrder(e.target.value));
  //     setPage(1)
  //     setOrder(e.target.value)
  // }

  // function handleWeightOrder(e) {
  //   if (e.target.value === "Min") {
  //     e.preventDefault();
  //     dispatch(getWeightMinOrder(e.target.value));
  //     setPage(1);
  //     setOrder(e.target.value);
  //   } else if (e.target.value === "Max") {
  //     e.preventDefault();
  //     dispatch(getWeightMaxOrder(e.target.value));
  //     setPage(1);
  //     setOrder(e.target.value);
  // }

function handleOrderByCreation(e) {
    e.preventDefault();
    dispatch(getOrderByCreation(e.target.value));
    setPage(1);
    setOrder(e.target.value);
}

function handleClick(e) {
    e.preventDefault();
    dispatch(getAllDogs());
}

  //------------------------------ RENDER/HOME -----------------------------


return (
        <div>
        {loading ? (
            <div className="loading">
            <img className="loadingImg" src={loadingGif} alt="not found" />
            </div>
        ) : (
            <div>
            <nav id="nav">
                <SearchBar/>
                <ul >
                <li>
                    <button
                    className="btnRefresh"
                    onClick={(e) => {
                        handleClick(e);
                    }}
                    >
                    Refresh
                    </button>
                </li>
                <li>
                    <Link to="/create">
                    <button id="create" className="formbutton">Create a new Dog</button>
                    </Link>
                </li>
                <li>
                    <select onChange={(e) => {handleTemperamentFilter(e)}} className="formbutton">
                        <option value="all">Temperament filter</option>
                            {dogAllTemperaments?.map((e) => (
                        <option value={e.name} key={e.id}>{e.name}</option> 
                        ))}
                    </select>
                </li>
                <li>
                    <select
                    key="alphaOrder"
                    onChange={(e) => handleAlphabetOrder(e)} className="formbutton">
                    <option value={"allApi"}>Alphabet order</option>
                    <option value={"Asc"}>A to Z</option>
                    <option value={"Desc"}>Z to A</option>
                    </select>
                </li>
                <li>
                    <select
                    onChange={(e) => handleOrderByWeight(e)} className="formbutton">
                    <option value="selected" hidden>Weight filter</option>
                    <option value="Asc">Heavy-Light</option>
                    <option value="Desc">Light-Heavy</option>
                    </select>
                </li>
                <li>
                    <select
                    onChange={(e) => handleOrderByCreation(e)} className="formbutton">
                    <option value={"all"}>All Dogs</option>
                    <option value={"api"}>DogsFromApi</option>
                    <option value="created">DogsFromDb</option>
                    </select>
                </li>
                <li>
                </li>
                </ul>
                <div className="clear"></div>
            </nav>










            {/* {allDogs?.length ? (
                allDogs?.map((e) => {
                return (
                    <div>
                    <Link to={`/dogs/${e.id}`}>
                        <Dog
                        name={e.name}
                        image={e.image}
                        temperament={e.temperament}
                        id={e.id}
                        weight={e.weight}
                        />
                    </Link>
                    </div>
                );
                })
            ) : (
                <div className="noFoundError">
                <h1 className="dogNotFound">The Dog has not been found</h1>
                <img className="notFound" src={notfound} alt="notfound" />
                <button
                    className="btnStyle2"
                    onClick={(e) => {
                    handleClick(e);
                    }}
                >
                    Back
                </button>
                </div>
            )} */}
            </div>
        
        
        
        
        
        
        )}





        <div className="Dogs">
            <Dogs/>
            </div>
        </div>

    );
}