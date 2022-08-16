import React, { useEffect, useState} from "react";
import { createDog, getAllTemperament } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


function validation(input) {
    let errors = {}

    if(!input.name) {
        errors.name = "Race of the dog is obligatory"
    }

    else if(!isNaN(input.name)) {
        errors.name = "Race of the dog must be in letters"
    } 

    else if(!input.weightMax) {
        errors.weightMax = "Max weight of the dog is a must"
    }

    else if(isNaN(parseInt(input.weightMax))) {
        errors.weightMax = "Max weight of a dog must be a number"
    }

    else if(input.weightMax > 111) {
        errors.weightMax = "Your dog cant beat the world guiness record of 111 kg"
    }

    else if(!input.weightMin) {
        errors.weightMin = "Min weight of the dog is a must"
    }

    else if(input.weightMin <= 0) {
        errors.weightMin = "Your dog cant be less than 0 Kg"
    }

    else if(isNaN(parseInt(input.weightMin))) {
        errors.weightMin = "Min weight of a dog must be a number"
    }

    else if(input.weightMin > input.weightMax) {
        errors.weightMin = "Min weight cant be greater than Max weight"
    }

    else if(!input.heightMax) {
        errors.heightMax = "Max height of the dog is a must"
    }

    else if(isNaN(parseInt(input.heightMax))) {
        errors.heightMax = "Max height of a dog must be a number"
    }

    else if(input.heightMax > 2) {
        errors.heightMax = "Your dog cant be taller than 2 meters"
    }

    else if(!input.heightMin) {
        errors.heightMin = "Min height of the dog is a must"
    }

    else if(isNaN(parseInt(input.heightMin))) {
        errors.heightMin = "Min height of a dog must be a number"
    }

    // else if(input.heightMin > 0) {
    //     errors.heightMin = "Your dog is not a worm"
    // }

    else if(input.heightMin > input.heightMax) {
        errors.heightMin = "Min height cant be greater than Max height"
    }

    else if(!input.lifeSpanMax) {
        errors.lifeSpan = "Max life span of the dog is a must"
    }

    else if(isNaN(parseInt(input.lifeSpanMax))) {
        errors.lifeSpanMax = "Max span life of a dog must be a number"
    }

    else if(input.lifeSpanMax <= 0) {
        errors.lifeSpanMax = "Your dog has more life span than 0 years"
    }

    else if(input.lifeSpanMax > 22) {
        errors.lifeSpanMax = "Your dog cant have more life span than Pebbles"
    }

    else if(!input.lifeSpanMin) {
        errors.lifeSpanMin = "Min life span of the dog is a must"
    }

    else if(input.lifeSpanMin > input.lifeSpanMax) {
        errors.lifeSpanMin = "Min life span cant be greater than Max life span"
    }

    else if(!input.lifeSpanMin) {
        errors.lifeSpanMin = "Life span of the dog is a must"
    }

    else if(isNaN(parseInt(input.lifeSpanMin))) {
        errors.lifeSpanMin = "Min span life of a dog must be a number"
    }

    else if(input.lifeSpanMin <= 0) {
        errors.lifeSpanMin = "Your dog has more life span"
    }

    else if(!/(https?:\/\/.*\.(?:png))/i.test(input.image)){
        errors.image = 'El formato debe ser ".png".'
    }

    return errors
}

export default function CreateDog() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const allTemperament = useSelector((state) => state.allTemperaments)
    const [ errors, setErrors ] = useState({})
    const [ input, setInput ] = useState({
        name: "",
        weightMax: "",
        weightMin: "",
        heightMax: "",
        heightMin: "",
        lifeSpanMax: "",
        lifeSpanMin: "",
        image: "",
        temperament: []
    })

    useEffect(() => {
        dispatch(getAllTemperament())
    }, [dispatch])

    function handleChange(e) {
        e.preventDefault ();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(validation({
            ...input,
            [e.target.name]:e.target.value,
        }))
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }

    function handleSubmit(e)  {
        e.preventDefault() 
        if(Object.values(errors).length >0) {
            alert("Please may you fill the form correctly")
        } else if(
            input.name === "",
            input.weightMax === "",
            input.weightMin === "",
            input.heightMax === "",
            input.heightMin === "",
            input.lifeSpanMax === "",
            input.lifeSpanMin === "",
            input.temperament.length === 0
        ) {
            alert("Please complete correctly the form")
        } else if(!input.image) {
            input.image = "img"
        } 
            dispatch(createDog(input))
            alert("Your dog has been created")
        setInput({
            name: "", 
            weightMax: "", 
            weightMin: "",
            heightMax: "",
            heightMin: "",
            lifeSpanMax: "",
            lifeSpanMin: "",
            image: "",
            temperament: []
        })
        navigate("/home")
        }

        function handleDelete(event) {
            setInput({
                ...input,
                temperament: input.temperament.filter(e => e !== event)
            })
        }

        return (

            <div className="createDog">
                <h1 className="tittle">Create your own Dog</h1>
                    <form onSubmit={e => handleSubmit(e)} id="form">
            <ul>
                <li>
                    <label>The name of your dog is...</label>
                    <input type="text" value={input.name} name="name" onChange={e => handleChange(e)} />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </li>
                <li>
                    <label>The Max Weight of your dog in Kg is...</label>
                    <input type="text" value={input.weightMax} name="weightMax" onChange={e => handleChange(e)} />
                    {errors.weightMax && (
                        <p className="error">{errors.weightMax}</p>
                    )}
                </li>
                <li>
                    <label>The Min Weight of your dog in Kg is...</label>
                    <input type="text" value={input.weightMin} name="weightMin" onChange={e => handleChange(e)} />
                    {errors.weightMin && (
                        <p className="error">{errors.weightMin}</p>
                    )}
                </li>
                <li>
                    <label>The Max Height of your dog in Cm is...</label>
                    <input type="text" value={input.heightMax} name="heightMax" onChange={e => handleChange(e)} />
                    {errors.heightMax && (
                        <p className="error">{errors.heightMax}</p>
                    )}
                </li>
                <li>
                    <label>The Min Height of your dog in Cm is...</label>
                    <input type="text" value={input.heightMin} name="heightMin" onChange={e => handleChange(e)} />
                    {errors.heightMin && (
                        <p className="error">{errors.heightMin}</p>
                    )}
                </li>
                <li>
                    <label>The Max life expectancy of your Dog is...</label>
                    <input type="text" value={input.lifeSpanMax} name="lifeSpanMax" onChange={e => handleChange(e)} />
                    {errors.lifeSpanMax && (
                        <p className="error">{errors.lifeSpanMax}</p>
                    )}
                </li>
                <li>
                    <label>The Min life expectancy of your Dog is...</label>
                    <input type="text" value={input.lifeSpanMin} name="lifeSpanMin" onChange={e => handleChange(e)} />
                    {errors.lifeSpanMin && (
                        <p className="error">{errors.lifeSpanMin}</p>
                    )}
                </li>
                <li>
                    <label>Upload an image for your Dog</label>
                    <input type="text" value={input.image} name="image" onChange={e => handleChange(e)} />
                    {errors.image && (
                        <p className="error">{errors.image}</p>
                    )}
                </li>
                <li>
                    <select onChange={e => handleSelect(e)} id="temp">
                        <option value="selected" hidden>Temperaments</option>
                        {allTemperament?.sort(function(a, b){
                            if(a.name < b.name) return -1
                            if(a.name > b.name) return 1
                            return 0
                        }).map(temp => {
                            return (
                                <option value={temp.name} key={temp.id}>{temp.name}</option>
                            )
                        })}
                    </select>
                </li>
                <li>
                    {input.temperament.map(element =>
                    <div>
                        <h5>
                            {element}
                            <button onClick={() => handleDelete(element)} className="deleteButtton">X</button>
                        </h5>
                    </div>
                    )}
                </li>
            </ul>

            <div className="buttonC">
                <Link to="/home"><button className="buttonH">Back</button></Link>
                <button type="submit" className="buttonS" id="buttonCreate"><strong>Create</strong></button>
            </div>
            </form>
            </div>
        )
    }