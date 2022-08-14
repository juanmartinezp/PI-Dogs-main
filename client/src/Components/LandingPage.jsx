import React from "react"
import { Link } from "react-router-dom"
import "./LandingPage.css"


export default function LandingPage() {
    return (
        <div className="landing">
            <h3 className="tittle" >Welcome to the Dog APP</h3>
            <Link to="/home">
                <button className="btn">Start APP</button>
            </Link>
        </div>
    )
}