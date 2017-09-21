// React
import React from 'react'

// React Router
import { Link } from 'react-router-dom'

// Redux
import { connect } from 'react-redux'

// Actions
import {
    createSibling,
    createBranch,
    deleteBranch
} from './actions'

function decrease(int) {
    return int - 1 >= 0 ? int - 1 : 0
}

function increase(int) {
    return int + 1
}

function mapStateToProps(state, props) {
    const next_state = {
        ...props
    }

    return next_state
}

function mapDispatchToProps(dispatch) {
    return {
        onCreateSiblingClick: (parent_id, tree_id, sorting) => {
            createSibling(parent_id, tree_id, sorting).then(action => dispatch(action))
        },
        onCreateBranchClick: (id) => {
            createBranch(id).then(action => dispatch(action))
        },
        onDeleteBranchClick: (id) => {
            deleteBranch(id).then(action => dispatch(action))
        }
    }
}

const List = ({ 
    match, 
    branches, 
    onCreateBranchClick,
    onCreateSiblingClick,
    onDeleteBranchClick
}) => (
    <ul>
    
        {branches.sort((a, b) => a.sorting - b.sorting).map((branch, index) => (
            <li key={index}>

                {branch.sorting}

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
                            onCreateSiblingClick(parseInt(branch.parent_id), parseInt(branch.tree_id), increase(parseInt(branch.sorting)))
                        }}
                    >Create Next</Link>

                    </li>

                    <li>

                        <Link
                        to='#'
                        onClick={(e) => {
                            e.preventDefault()
                            onCreateBranchClick(branch.id)
                        }}
                    >Create Branch</Link>

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
        ))}

    </ul>
)

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(List)

export default ConnectedList