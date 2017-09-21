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
// import { denormalize } from 'normalizr';

// Schema
// import { tree, trees } from 'schema'

// Selectors
import { selectTrees } from 'db/selectors'

// Tree
import Show from './show';

/**
 * Map state to props.
 * 
 * @param {Object} state 
 * @param {Object} props
 * 
 * @return {Object} 
 */
function mapStateToProps(state, props) {
    const next_state = {
        ...props,
        trees: selectTrees(state)
    }

    return next_state
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