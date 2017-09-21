// React
import React from 'react'

// React Router
import { Link } from 'react-router-dom'

// Redux
import { connect } from 'react-redux'

// Utilities
import waitFor from 'components/waitfor'

// Selectors
import { selectTree } from 'db/selectors'

// Branches
import BranchList from 'views/branch/list'

// Actions
import {
    createBranch
} from './actions'

/**
 * Map state to props.
 * 
 * @param {Object} state 
 * @param {Object} props
 * 
 * @return {Object} 
 */
function mapStateToProps(state, props) {
    const id = props.match.params.id
    
    const next_state = {
        ...props,
       ...selectTree(state, id)
    }

    return next_state
}

/**
 * Map dispatch to props.
 * 
 * @param {Function} dispatch
 * 
 * @return {Object}
 */
function mapDispatchToProps(dispatch) {
    return {
        onCreateBranchClick: (id) => {
            createBranch(id).then(action => dispatch(action))
        }
    }
}

const Show = (props) => (
    <div>
        <h1>{props.name}</h1>

        <Link
            to='#'
            onClick={(e) => {
                e.preventDefault()
                props.onCreateBranchClick(props.id)
            }}
        >Create Branch</Link>

        <BranchList {...props} branches={props.branches} />
        
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(waitFor('id', Show))