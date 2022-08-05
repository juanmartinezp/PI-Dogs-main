import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../redux/actions.js';


export default function SearchDog() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleOnChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        dispatch(searchByName(name));
    }

    return (
        <div className='search'>
            <input className='input' type='text' placeholder='Find your Dog' onChange={(e) => handleOnChange(e)}/>
            <button className='button' type='submit' onClick={(e) => onSubmit(e)}>Search</button>
        </div>
    );
}