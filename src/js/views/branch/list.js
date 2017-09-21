// React
import React from 'react'

// React Router
import { Link } from 'react-router-dom'

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
    const next_state = {
        ...props
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

const List = ({ 
    match, 
    branches,
    onCreateAncestorClick,
    onCreateDescendantClick,
    onCreateSiblingClick,
    onDeleteBranchClick
}) => (
    <ul>
    
        {branches.sort((a, b) => a.sorting - b.sorting).map((branch, index) => {
            return (
                <li key={index}>

                    {branch.sorting}.{branch.depth}.{branch.id}

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

                    {branch.branches.length ? <ConnectedList branches={branch.branches} onCreateSiblingClick={onCreateSiblingClick} /> : undefined}
                    
                </li>
            )
        })}

    </ul>
)

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(List)

export default ConnectedList