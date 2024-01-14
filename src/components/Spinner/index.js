import React from 'react'
import "./style.scss"

const Spinner = ({ id }) => {
    return (
        <div className="spinner-wrapper" id={id}>
            <div className="loader">Loading...</div>
        </div>
    )
}

export default Spinner