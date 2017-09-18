// React
import React from 'react'

// React Router
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

// Tree
import Show from './show';

const Index = ({ match }) => (
    <div>
        <h1>Tree</h1>

        <Link to={`${match.url}/1`}>Tree 1</Link>  

        <Route path={`${match.url}/:id`} component={Show} />
    </div>
)

export default Index