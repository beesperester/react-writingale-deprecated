// React
import React from 'react'

// React Router
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const Index = ({ match }) => (
    <div>
        <h1>Dashboard</h1>

        <Link to={`${match.url}`}>Trees</Link>
    </div>
)

export default Index