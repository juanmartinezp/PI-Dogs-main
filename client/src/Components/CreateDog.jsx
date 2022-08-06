import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createDogs, getAllTemperament } from '../redux/actions.js';



function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Dog Race is required';
    }

    else if (!input.heightMin) {
        errors.heightMin = 'Minimun Height is required';
    }

    else if (isNaN(parseInt(input.heightMin)) || input.heightMin <= 0) {
        errors.heightMin = 'Value must be a positive number';
    }

    else if (!inputHeightMax) {
        errors.heightMax = 'Maximum Height is required';
    }

    else if (isNaN(parseInt(input.heightMax)) || input.heightMax > 150) {
        errors.heightMax = 'Value must be a number between 0 and 150';
    }

    else if (parseInt(input.heightMin) >= parseInt(input.heightMax)) {
        errors.heightMin = 'Minimum Height must be lesser than Maximum Height';
    }

    else if (!input.weightMin) {
        errors.weightMin = 'Minimun Weight is required';
    }

    else if (isNaN(parseInt(input.weightMin)) || input.weightMin <= 0) {
        errors.weightMin = 'Value must be a number higher than 0';
    }

    else if (!input.weightMax) {
        errors.weightMax = 'Maximum Weight is required';
    }

    else if (isNaN(parseInt(input.weightMax)) || input.weightMax > 90) {
        errors.weightMax = 'Value must be a number between 0 and 90';
    }

    else if (parseInt(input.weightMin) >= parseInt(input.weightMax)) {
        errors.weightMin = 'Minimum Weight must be lesser than Maximum Weight';
    }

    else if (!input.life_span_min) {
        errors.life_span_min = 'Minimun Life Span is required';
    }

    else if (!input.life_span_max) {
        errors.life_span_max = 'Maximum Life Span is required';
    }

    else if (parseInt(input.life_span_min) >= parseInt(input.life_span_max)) {
        errors.life_span_min = 'Minimum Life Span must be lesser than Maximum Life Span';
    }

    return errors;
}

export default function CreateDog() {

    const dispatch = useDispatch();
    const history = useHistory();
    const allTemp = useSelector((state) => state.allTemperament);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_span_min: '',
        life_span_max: '',
        image: '',
        temperaments: [],
    })

    useEffect(() => {
        dispatch(getAllTemperament());
    } , [dispatch]);

    function handleChange(e) {

        setInput({ ...input, [e.target.name] : e.target.value });
        setErrors(validate({...input, [e.target.name] : e.target.value,}))
    }

    function handleSelect(e) {

        setInput({ ...input, temperaments: [...input.temperaments, e.target.value] });
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!Object.getOwnPropertyNames(errors).length
            &&input.name
            &&input.heightMin
            &&input.heightMax
            &&input.weightMin
            &&input.weightMax
            &&input.life_span_min
            &&input.life_span_max) 
            {
            if (!input.image) {input.image = 'img'}

            dispatch(createDogs(input))
            alert('Dog Race created successfully')
            setInput({
                name:'',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                life_span_min: '',
                life_span_max: '',
                image: '',
                temperaments: [],
            })
            history.push('/home')
        }

        else {
            alert('Your Dog has not been created, please fill all the fields')
        }
    }
    function handleDelete (event) {
        setInput({ ...input, temperaments: input.temperaments.filter(temp => temp !== event)
        })
    }
    return(
        <div className='createDog'>
            <h1 className ='title'>Create your Dog</h1>
            <form onSubmit= {e => handleSubmit(e)} id='form'>
                <ul>
                    <li>
                        <label>Race: </label>
                        <input type='text' value={input.name} name='name' onChange={e => handleChange(e)}/>
                        {errors.name && (
                            <p className='error'>{errors.name}</p>)}
                    </li>

                    <li>
                        <label>Height min (cm): </label>
                        <input type='text' value={input.heightMin} name='heightMin' onChange={e => handleChange(e)}/>
                        {errors.heightMin && (
                            <p className='error'>{errors.heightMin}</p>
                        )}
                    </li>

                    <li>
                        <label>Heinght max (cm): </label>
                        <input type='text' value={input.heightMax} name='heightMax' onChange={e => handleChange(e)}/>
                        {errors.heightMax && (
                            <p className='error'>{errors.heightMax}</p>
                        )}
                    </li>

                    <li>
                        <label>Weight min (kg): </label>
                        <input type='text' value={input.weightMin} name='weightMin' onChange={e => handleChange(e)}/>
                        {errors.weightMin && (
                            <p className='error'>{errors.weightMin}</p>
                        )}
                    </li>

                    <li>
                        <label>Weight max (kg): </label>
                        <input type='text' value={input.weightMax} name='weightMax' onChange={e => handleChange(e)}/>
                        {errors.weightMax && (
                            <p className='error'>{errors.weightMax}</p>
                        )}
                    </li>

                    <li>
                        <label>Minimum life expectancy (years): </label>
                        <input type='text' value={input.life_span_min} name='life_span_min' onChange={e => handleChange(e)}/>
                        {errors.life_span_min && (
                            <p className='error'>{errors.life_span_min}</p>
                        )}
                    </li>

                    <li>
                        <label>Maximum life expectancy (years): </label>
                        <input type='text' value={input.life_span_max} name='life_span_max' onChange={e => handleChange(e)}/>
                        {errors.life_span_max && (
                            <p className='error'>{errors.life_span_max}</p>
                        )}
                    </li>

                    <li>
                        <select onChange={e => handleSelect(e)} id='temp'>
                            <option value='selected' hidden >Temperaments</option>
                            {allTemp?.sort( function (a, b) {
                                if (a.name < b.name) return -1;
                                if (a.name > b.name) return 1;
                                return 0;
                            }).map(temp => {
                                return (
                                    <option value={temp.name} key={temp.id}>{temp.name}</option>
                                )
                            })}
                        </select>
                    </li>

                    <li>
                        {input.temperaments.map(e =>
                            <div>
                                <h5>{e}
                                    <button onClick={() => handleDelete(e)} className='btn3'>X</button>
                                </h5>
                            </div>
                            )}
                    </li>
                </ul>
                <div className='containerButton'>
                    <Link to='/home'>
                        <button className='btn1'>Back</button>
                    </Link>
                    <button type='submit' className='btn1' id='btnCrear'>
                        <strong>Crear</strong>
                    </button>
                </div>
            </form>
        </div>        
    )
}

