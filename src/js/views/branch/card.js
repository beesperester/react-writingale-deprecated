// React
import React from 'react'

// React Router
import { Route, Link, withRouter } from 'react-router-dom'

// Redux
import { connect } from 'react-redux'

// Actions
import {
    createSibling,
    createAncestor,
    createDescendant,
    deleteBranch
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
    return props
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
        onCreateSiblingClick: (parent_id, tree_id, sorting) => {
            createSibling(parent_id, tree_id, sorting).then(action => dispatch(action))
        },
        onCreateDescendantClick: (id) => {
            createDescendant(id).then(action => dispatch(action))
        },
        onCreateAncestorClick: (id, parent_id, tree_id) => {
            createAncestor(id, parent_id, tree_id).then(action => dispatch(action))
        },
        onDeleteBranchClick: (id) => {
            deleteBranch(id).then(action => dispatch(action))
        }
    }
}

const CardControls = ({
    match,
    branch,
    onCreateAncestorClick,
    onCreateDescendantClick,
    onCreateSiblingClick,
    onDeleteBranchClick
}) => {
    if (match.params.card_hash == branch.hash) return (
        <ul>
        
            <li>
    
                <Link
                to='#'
                onClick={(e) => {
                    e.preventDefault()
                    onCreateSiblingClick(parseInt(branch.parent_id), parseInt(branch.tree_id), parseInt(branch.sorting))
                }}
            >Create Previous</Link>
    
            </li>
    
            <li>
    
                <Link
                to='#'
                onClick={(e) => {
                    e.preventDefault()
                    onCreateSiblingClick(parseInt(branch.parent_id), parseInt(branch.tree_id), parseInt(branch.sorting) + 1)
                }}
            >Create Next</Link>
    
            </li>
    
            <li>
    
                <Link
                to='#'
                onClick={(e) => {
                    e.preventDefault()
                    onCreateAncestorClick(branch.id, branch.parent_id, branch.tree_id)
                }}
            >Create Ancestor</Link>
    
            </li>
    
            <li>
    
                <Link
                to='#'
                onClick={(e) => {
                    e.preventDefault()
                    onCreateDescendantClick(branch.id)
                }}
            >Create Descendant</Link>
    
            </li>
    
            <li>
    
                <Link
                to='#'
                onClick={(e) => {
                    e.preventDefault()
                    onDeleteBranchClick(branch.id)
                }}
            >Delete Branch</Link>
    
            </li>
    
        </ul>
    )

    return null
}

const RouterCardControls = withRouter(CardControls)

const Card = ({
    match,
    branch,
    onCreateAncestorClick,
    onCreateDescendantClick,
    onCreateSiblingClick,
    onDeleteBranchClick
}) => (
    <div>
        <Link to={`${match.url}/branch/${branch.branch_hash}/card/${branch.hash}`}>{branch.parent_id}.{branch.sorting}.{branch.depth}.{branch.id}</Link>

        <Route path={`${match.url}/branch/:branch_hash/card/:card_hash`}>

            <RouterCardControls
                branch={branch} 
                onCreateAncestorClick={onCreateAncestorClick}
                onCreateDescendantClick={onCreateDescendantClick}
                onCreateSiblingClick={onCreateSiblingClick}
                onDeleteBranchClick={onDeleteBranchClick}
            />

        </Route>
    </div>
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Card))