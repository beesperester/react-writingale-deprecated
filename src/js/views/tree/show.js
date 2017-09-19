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
import { denormalize } from 'normalizr'

// Schema
import { tree as tree_schema } from 'schema'

// Utilities
import logging from 'utilities/logging'
import waitFor from 'utilities/waitfor'

// Branches
import BranchList from 'views/branch/list'

function mapStateToProps(state, props) {
    const id = parseInt(props.match.params.id)
    const tree_state = state.trees[id]
    
    if (!tree_state) return {} 

    const next_state = {
        ...props,
        ...denormalize(tree_state, tree_schema, state)
    }

    logging.info(tree_state)

    return next_state
}

const Show = (props) => (
    <div>
        <h1>{props.name}</h1>

        <BranchList branches={props.branches} {...props} />
        
    </div>
)

export default connect(mapStateToProps)(waitFor('id', Show))