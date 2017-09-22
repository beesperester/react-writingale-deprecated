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
import Card from 'views/branch/card'

// Actions
import {
    createBranch
} from './actions'

function flattenBranches(carry, current) {
    const branches = [...current.branches]

    current.branches = branches.map(branch => branch.id)

    carry.push(current)

    carry = branches.reduce(flattenBranches, carry)

    return carry
}

function sortColumn(a, b) {
    const a_value = (a.sorting + a.parent_sorting)
    const b_value = (b.sorting + b.parent_sorting)

    return a_value - b_value
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
    const id = props.match.params.id
    
    const tree = selectTree(state, id)

    if (!tree.id) return {}

    const branches_flattened = tree.branches.reduce(flattenBranches, [])
    const column_indices = branches_flattened.reduce((carry, branch) => {
        if (!carry.includes(branch.depth)) carry.push(branch.depth)

        return carry
    }, []).sort()
    // const columns = 

    // console.info(column_indices)

    const columns = column_indices.map(depth => {
        return branches_flattened.filter(branch => {
            return branch.depth == depth
        }).map(branch => {
            const parent_sorting = branch.parent_id ? parseInt(state.branches[branch.parent_id].sorting) : 0

            return Object.assign(branch, {
                sorting: parseInt(branch.sorting),
                parent_sorting: ((parent_sorting + 1) * 100)
            })
        })
    })

    console.info(columns)

    const next_state = {
        ...props,
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

const Show = ({ 
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
                <div key={index}>

                    {column.sort(sortColumn).map((branch, index) => (
                        <Card key={branch.id} branch={branch} />
                    ))}

                </div>
            ))}

        </div>

    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(waitFor('tree.id', Show))