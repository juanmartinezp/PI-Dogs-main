import React from "react"
import { Link } from "react-router-dom"
import './styles/LandingPage.css'



export default function LandingPage() {
    return (
        <div className="landing">
            <h3 className="tittleLanding" >Welcome to the Dog´s World</h3>
            <Link to="/home">
                <button className="btnLanding">Start</button>
            </Link>
        </div>
    )
}