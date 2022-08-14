import React from "react"
import "./Pagination.css"

export default function Pagination ({ dogsPerPage, allDogs, page }) {
    const pageNumbers = []

    for( let i=0; i < Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i+1)
    }
    return (
        <div id="pagination">
            <br />
            { pageNumbers && pageNumbers.map(number => (
                <button onClick={() => page(number)} id="buttonPage">{number}</button>
            ))}
        </div>
    )
}