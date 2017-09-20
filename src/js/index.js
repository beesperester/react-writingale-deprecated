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
// import orm from 'db/orm'
import store from 'db/store'

import Tree from 'models/tree'

// Utilities
// import cache from 'utilities/cache'
// import fetch from 'utilities/fetch'
import logging from 'utilities/logging'
import etherio from 'utilities/etherio'

import { signals } from 'signals'


// override base url
etherio.config.base_url = 'http://ubuntu.local/api/v1.0/'

etherio.get(etherio.prefixUrl('tree')).then(data => {
    const data_normalized = normalize(data, trees)

    // console.log(data_normalized.entities)

    store.dispatch({
        type: signals.UPSERT,
        data: data_normalized.entities
    })

    // console.log(orm.session().Tree.all().toRefArray())

    // console.log(store.getState())
})

// disable cache
// cache.config.enabled = false

ReactDOM.render(
    <Provider store={store}>
        
        <Router />
        
    </Provider>, 
    document.getElementById('mountpoint')
)