import React from "react";
import "./SearchBar.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../../redux/actions"

export default function SearchDog() {
    const dispatch = useDispatch();
    const [ name, setName ] = useState("");

    function handleOnChange(e) {
        e.preventDefault();
        setName(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault();
        dispatch(getDogByName(name))
        setName("")
    }

    return (
        <div className="search">
            <div>
                <input className="input" type="text" placeholder="Find a Dog" onChange={(e) => handleOnChange(e)} />
                <button className="button" type="submit" onClick={(e) => onSubmit(e)}>Search</button>
            </div>
        </div>
    )
}