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

// Utilities
import etherio from 'libraries/etherio'

import { signals } from 'signals'

import { digestState } from 'digest'

// override base url
etherio.config.base_url = 'http://ubuntu.local/api/v1.0/'

etherio.get(etherio.prefixUrl('state')).then(data => {
    store.dispatch({
        type: signals.STATE_UPSERT,
        data: digestState(data)
    })
})

ReactDOM.render(
    <Provider store={store}>
        
        <Router />
        
    </Provider>, 
    document.getElementById('mountpoint')
)