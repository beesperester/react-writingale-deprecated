// React
import React from 'react'

// React Router
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

// Redux
import { connect } from 'react-redux'

// Normalizr
import { denormalize } from 'normalizr';

// Schema
import { tree, trees } from 'schema'

// Utilities
import logging from 'utilities/logging'

// Tree
import Show from './show';

function mapStateToProps(state, props) {
    return {
        trees: denormalize(Object.keys(state.trees), trees, state)
    }
}

const List = ({ trees, match }) => (
    <ul>

        {trees.map((tree, index) => (
            <li key={index}>

                <Link to={`${match.url}/${tree.id}`}>{tree.name}</Link>

            </li>
        ))}

    </ul>
)

const ConnectedList = connect(mapStateToProps)(List)

const Index = ({ trees, match }) => (
    <div>
        <h1>Tree</h1>

        <Route exact path={`${match.url}`} component={ConnectedList} />

        <Route path={`${match.url}/:id`} component={Show} />
    </div>
)

export default Index