// React
import React from 'react'

// React Router
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const Show = ({ match }) => (
    <div>
        <h1>Tree {match.params.id} </h1>
    </div>
)

export default Show