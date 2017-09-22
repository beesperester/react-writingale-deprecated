// React
import React from 'react'

// React Router
import { Route, Link, withRouter } from 'react-router-dom'

// Redux
import { connect } from 'react-redux'

// Moment
import moment from 'moment'

// Signals
import { relations } from 'signals'

// Actions
import {
    createSibling,
    createNextSibling,
    createAncestor,
    createDescendant,
    deleteBranch,
    selectBranch
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
    const app = state.app
    const branch = props.branch
    let relation = undefined

    if (app.active_branch_node) {
        if (app.active_branch_node.id == branch.id) {
            relation = relations.CURRENT
        } else {        
            const active_trail = app.active_branch_node.trail
            const active_parent_trail = active_trail.split('/').slice(0, -1).join('/')
            const branch_trail = branch.trail

            
            if (branch_trail.length == active_trail.length) {
                // branch is on same level as active branch
                if (branch_trail.startsWith(active_parent_trail) && branch.parent_id) {
                    relation = relations.SIBLING
                }
            } else if (branch_trail.length < active_trail.length) {
                // branch is on previous level of active branch
                if (active_trail.startsWith(branch_trail)) {
                    relation = relations.ASCENDANT
                }
            } else if (branch_trail.length > active_trail.length) {
                // branch is on later level of active branch
                if (branch_trail.startsWith(active_trail)) {
                    relation = relations.DESCENDANT
                }
            }        
        }
    }

    return {
        ...props,
        app,
        relation
    }
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
        onCreateSiblingClick: (branch) => {
            createSibling(branch).then(action => dispatch(action))
        },
        onCreateNextSiblingClick: (branch) => {
            createNextSibling(branch).then(action => dispatch(action))
        },
        onCreateDescendantClick: (branch) => {
            createDescendant(branch).then(action => dispatch(action))
        },
        onCreateAncestorClick: (branch) => {
            createAncestor(branch).then(action => dispatch(action))
        },
        onDeleteBranchClick: (branch) => {
            deleteBranch(branch).then(action => dispatch(action))
        },
        onSelectBranchClick: (branch) => {
            dispatch(selectBranch(branch))
        }
    }
}

function calcClasses(relation) {
    let classes = [
        'o-card',
        'c-card'
    ]

    if (relation == relations.CURRENT) {
        classes.push('c-card--current')
    } else if (relation == relations.ASCENDANT) {
        classes.push('c-card--ascendant')
    } else if (relation == relations.DESCENDANT) {
        classes.push('c-card--descendant')
    } else if (relation == relations.SIBLING) {
        classes.push('c-card--sibling')
    }

    return classes.filter(Boolean)
}

const Card = ({
    match,
    branch,
    relation,    
    onCreateAncestorClick,
    onCreateDescendantClick,
    onCreateSiblingClick,
    onCreateNextSiblingClick,
    onDeleteBranchClick,
    onSelectBranchClick
}) => (
    <div className={calcClasses(relation).join(' ')}>
        <Link 
            to='#'
            onClick={e => {
                e.preventDefault()
                onSelectBranchClick(branch)
            }}
        >{branch.id}</Link>

        <p>{moment(branch.created_at).format('LLL')}</p>

        {relation == relations.CURRENT ? (
            <ul className="c-card__controls reset">
            
                <li className="c-card__control c-card__control--create-before">
        
                    <Link
                        to={`${match.url}/branch/${branch.id}/create-before`}
                        onClick={(e) => {
                            e.preventDefault()
                            onCreateSiblingClick(branch)
                        }}
                        title="Create Before"
                    />
        
                </li>
        
                <li className="c-card__control c-card__control--create-after">
        
                    <Link
                        to={`${match.url}/branch/${branch.id}/create-after`}
                        onClick={(e) => {
                            e.preventDefault()
                            onCreateNextSiblingClick(branch)
                        }}
                        title="Create After"
                    />
        
                </li>
        
                <li className="c-card__control c-card__control--create-parent">
        
                    <Link
                        to={`${match.url}/branch/${branch.id}/create-parent`}
                        onClick={(e) => {
                            e.preventDefault()
                            onCreateAncestorClick(branch)
                        }}
                        title="Create Parent"
                    />
        
                </li>
        
                <li className="c-card__control c-card__control--create-child">
        
                    <Link
                        to={`${match.url}/branch/${branch.id}/create-child`}
                        onClick={(e) => {
                            e.preventDefault()
                            onCreateDescendantClick(branch)
                        }}
                        title="Create Child"
                    />
        
                </li>
        
                <li className="c-card__control c-card__control--delete">
        
                    <Link
                        to={`${match.url}/branch/${branch.id}/delete`}
                        onClick={(e) => {
                            e.preventDefault()
                            onDeleteBranchClick(branch)
                        }}
                        title="Delete"
                    />
        
                </li>
        
            </ul>
        ) : undefined}
    </div>
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Card))