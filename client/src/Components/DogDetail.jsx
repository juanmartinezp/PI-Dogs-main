import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail } from "../redux/actions.js";
import { Link } from "react-router-dom";
import defaultImage from "./Images/dogDefault.jpg";
import loadingGif from "./Images/loading.gif";
//import dogTemp from "./Temp"


export default function Detail() {
  const dispatch = useDispatch();
  const dogDetails = useSelector(state => state.dogDetail);
  const loading = useSelector((state) => state.loading);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]);

  // console.log(dogDetail);

  // function handleDelete(element) {
  //   if (id.lenght > 5) {
  //     element.preventDefault();
  //     dispatch(deleteDog(id));
  //     alert("Dog deleted");
  //     history.push("/home");
  //   } else {
  //     alert("You can delete only your Dogs");
  //   }
  // }

return (
        <div>
        {loading ? (
            <div className="loading"> <img src={loadingGif} alt="loading" /></div>
        ) : (
            <div id="detailCard">
            <h1 id="tittle">{dogDetails.name}</h1>
            {dogDetails.image ? (
                <img src={dogDetails.image} alt="Dog img" id="imgDetail" />
            ) : (
                <img id="imgDetail" src={defaultImage} alt="dogImg" />
            )}
            <div>
                {dogDetails.temperament ? (
                <p>Temperaments: {dogDetails.temperament}</p>
                ) : (
                <p>Temperaments not found</p>
                )}
                <p>Weight in Kg: {dogDetails.weight}</p>

                <p>Height in Cm: {dogDetails.height}</p>

                <p>Life expectancy: {dogDetails.lifeSpan}</p>

            </div>
            <Link to="/home">
                {/* <button className="detailButton" onClick={(e) => handleDelete(e)}>
                Delete
                </button> */}
                <button className="detailButton">Back</button>
            </Link>
            </div>
        )}{" "}
        </div>
    );
}