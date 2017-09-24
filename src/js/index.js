// React
import React from 'react'
import ReactDOM from 'react-dom'

// Redux
import { Provider } from 'react-redux'

// Normalizr
import { normalize } from 'normalizr'
import { trees } from 'db/schema'

// Router
import Router from 'router'

// Store
import store from 'db/store'
import { digestState } from 'db/digest'

// Utilities
import etherio from 'libraries/etherio'

// Signals
import { signals } from 'signals'

// override base url
etherio.config.base_url = 'http://localhost:3000/api/v1.0/'

etherio.get(etherio.prefixUrl('state')).then(data => {
    const data_digested = digestState(data)

    // set up initial state
    store.dispatch({
        type: signals.STATE_UPSERT,
        data: data_digested
    })

    // select first card
    if (data_digested.normalized.branches) {
        const first_branch = Object.values(data_digested.normalized.branches).sort((a, b) => {
            return (a.trail.length + a.sorting) - (b.trail.length + b.sorting) 
        }).shift()

        store.dispatch({
            type: signals.SELECT_BRANCH,
            data: first_branch.id
        })
    }
})

ReactDOM.render(
    <Provider store={store}>
        
        <Router />
        
    </Provider>, 
    document.getElementById('mountpoint')
)