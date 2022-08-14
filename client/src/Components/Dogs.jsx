import React from "react";
import "./Detail.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail, deleteDog } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import defaultImage from "./Style/defaultDog.jpg";
import loadingGif from "../Home/Styles/loadingGif.gif";
import Paginated from "../Paginated/Paginated";
import Dog from "../Dog/Dog"

// function dogTemperament(temperaments) {
//   if (typeof temperaments === "string") {
//     return temperaments;
//   }
//   if (Array.isArray(temperaments)) {
//     let temps = temperaments.map((e) => e.name);
//     return temps.join(", ");
//   }
// }

export default function Detail() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { id } = useParams();

    const cardState = useSelector((state) => state.dogs);
    const loading = useSelector((state) => state.loading);


    //paginado
    const [currentPage, setCurrentPage] = useState(1);
    const[cardsPerPage, setCardsPerPag ] = useState (8);
    const indexOfLastCards = currentPage * cardsPerPage;
    const indexOfFirstCards = indexOfLastCards - cardsPerPage;
    const currentDetails = cardState.slice(indexOfFirstCards,indexOfLastCards)
    
    const pagination = (pagNumber) => {
        setCurrentPage(pagNumber)
    }
    
    
    function handleDelete(element) {
        if (id.lenght > 5) {
        element.preventDefault();
        dispatch(deleteDog(id));
        alert("Dog deleted");
        history.push("/home");
        } else {
        alert("You can delete only your Dogs");
        }
    }  

    useEffect(() => {
        dispatch(getDogDetail());
    }, [dispatch]);


    return (
        <div>
        {/* {loading ? (
            <div className="loading"> <img src={loadingGif} alt="loading" /></div>
        ) : ( */}

            
            <div id="detailCard">
            
            <div className="paginaterOrder">
            <Paginated  cardsPerPage={cardsPerPage} cardState= {cardState.length} pagination ={pagination} />
            </div>


            <div className="detailOrder">
                {allDogs.map( (dogs) => {
                    return (
                        <div key={dogs.id} >
                            <Link to={`/dogs/${e.id}`} className="detail">
                                <Dog 
                                name={dogs.name} 
                                image={dogs.image} 
                                temperament={dogs.temperament} 
                                id={dogs.id}
                                weight={dogs.weight} /> 
                            </Link>
                        </div>
                    )}               
                )}           
                </div>



            {/* <h1 id="tittle">{dogDetail.name}</h1>
            {dogDetail.image ? (
                <img src={dogDetail.image} alt="Dog image" id="imgDetail" />
            ) : (
                <img id="imgDetail" src={defaultImage} alt="dogImg" />
            )}
            <div>
                {dogDetail.temperaments ? (
                <p>Temperaments: {dogTemperament(dogDetail.temperaments)}</p>
                ) : (
                <p>Temperaments not found</p>
                )}
                <p>Max Weight: {dogDetail.weightMax}</p>
                <p>Min Weight: {dogDetail.weightMin}</p>
                <p>Max Height: {dogDetail.heightMax}</p>
                <p>Min height: {dogDetail.heightMin}</p>
                <p>Max life expectancy: {dogDetail.lifeSpanMax}</p>
                <p>Min life expectancy: {dogDetail.lifeSpanMin}</p>
            </div> */}
            <Link to="/home">
                <button className="detailButton" onClick={(e) => handleDelete(e)}>
                Delete
                </button>
                <button className="detailButton">Back</button>
            </Link>
            </div>
        {/* )}{" "} */}
        </div>
    );
}