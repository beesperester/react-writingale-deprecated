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
import Card from 'views/branch/card'

// Actions
import {
    createBranch
} from './actions'

/**
 * Flatten tree of branches to array of branches by plucking
 * child branches and pushing them to the carried array.
 * 
 * @param {Array} carry 
 * @param {Array} current
 * 
 * @return {Array} 
 */
function flattenBranches(carry, current) {
    const branches = [...current.branches]

    current.branches = branches.map(branch => branch.id)

    carry.push(current)

    carry = branches.reduce(flattenBranches, carry)

    return carry
}

/**
 * Sort by sorting and unique_sorting.
 * 
 * @param {Object} a 
 * @param {Object} b
 * 
 * @return {Integer} 
 */
function sortColumn(a, b) {
    const a_value = (a.sorting + a.unique_sorting)
    const b_value = (b.sorting + b.unique_sorting)

    return a_value - b_value
}

/**
 * Calculate overall sorting by accessing the parents sorting.
 * 
 * @param {Object} state 
 * @param {Object} branch
 * 
 * @return {Integer} 
 */
function calcSorting(state, branch) {
    let sorting = 0

    if (branch.parent_id != null && state.branches[branch.parent_id]) {
        sorting = sorting + (state.branches[branch.parent_id].sorting * 100)
    }

    return sorting
}

/**
 * Map state to props.
 * 
 * @param {Object} state 
 * @param {Object} props
 * 
 * @return {Object} 
 */
function mapStateToProps(state, props) {
    // console.info(state)
    const id = props.match.params.id
    
    const tree = selectTree(state, id)

    if (!tree.id) return {}

    const branches_flattened = tree.branches.reduce(flattenBranches, [])
    // gather column indices by calculating the maximum depth of all branches
    const column_indices = branches_flattened.reduce((carry, branch) => {
        const depth = branch.trail.split('/').length

        if (!carry.includes(depth)) carry.push(depth)

        return carry
    }, []).sort()
    // const columns = 

    // console.info(column_indices)

    // map branches to column by depth
    const columns = column_indices.map(depth => {
        return branches_flattened.filter(branch => {
            const branch_depth = branch.trail.split('/').length

            return branch_depth == depth
        })
    })

    // console.info(columns)

    const next_state = {
        ...props,
        app: state.app,
        tree: tree,
        columns: columns
    }

    // console.info(next_state)

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

/**
 * 
 */
function calcClasses(column, app) {
    let classes = [
        'o-column'
    ]

    if (column.map(branch => branch.id).includes(app.active_branch)) {
        classes.push('o-column--focus')
    }

    return classes.filter(Boolean)
}

const Show = ({
    app,
    tree,
    columns,
    onCreateBranchClick
}) => (
    <div>
        <h1>{tree.name}</h1>

        <Link
            to='#'
            onClick={(e) => {
                e.preventDefault()
                onCreateBranchClick(tree.id)
            }}
        >Create Branch</Link>

        <div className="o-grid" style={{gridTemplateColumns: `repeat(${columns.length}, 1fr)`}}>

            {columns.map((column, index) => (
                <div 
                    key={index}
                    className={calcClasses(column, app).join(' ')}
                >

                    {column.sort(sortColumn).map((branch, index) => (
                        <Card
                            branches={column.sort(sortColumn)}
                            key={branch.id} 
                            branch={branch}
                        />
                    ))}

                </div>
            ))}

        </div>

    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(waitFor('tree.id', Show))