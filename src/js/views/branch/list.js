// React
import React from 'react'

// React Router
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

// Redux
import { connect } from 'react-redux'

// Utilities
import logging from 'utilities/logging'

// Actions
import actions from './actions'

function decrease(int) {
    return int - 1 >= 0 ? int - 1 : 0
}

function increase(int) {
    return int + 1
}

function mapStateToProps(state, props) {
    return {
        ...props
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onCreateSiblingClick: (parent_id, tree_id, sorting) => {
            // logging.info('create next sibling', parent_id, tree_id, sorting)
            actions.store(dispatch, {
                parent_id: parent_id,
                tree_id: tree_id,
                sorting: sorting
            })
        },
        onCreateBranchClick: (id) => {
            actions.store(dispatch, {
                parent_id: id
            })
        }
    }
}

const List = ({ 
    match, 
    branches, 
    onCreateBranchClick,
    onCreateSiblingClick 
}) => (
    <ul>
    
        {branches.sort((a, b) => a.sorting - b.sorting).map((branch, index) => (
            <li key={index}>

                {branch.id} {branch.content}

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

                </ul>

                {branch.branches.length ? <ConnectedList branches={branch.branches} onCreateSiblingClick={onCreateSiblingClick} /> : undefined}
                
            </li>
        ))}

    </ul>
)

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(List)

export default ConnectedList