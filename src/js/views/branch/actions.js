// Fetch
import _fetch from 'utilities/fetch'

// Normalizr
import { normalize } from 'normalizr'

// Utilities
import logging from 'utilities/logging'

// Schema
import { trees } from 'schema'

// Reducers
import { actions } from 'reducers'

export function store(dispatch, data) {
    const url = new URL('branch', _fetch.config.base_url)
    const serialized_data = JSON.stringify(data)
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': serialized_data.length.toString()
    })

    const request = new Request(url, {
        method: 'POST',
        body: serialized_data,
        headers: headers,
    })

    const promise = fetch(request)

    promise.then((response) => response.json())
    .then((data) => {
        dispatch({
            type: actions.UPDATE_ALL,
            data: normalize(data, trees).entities
        })
    })
}

export default {
    store
}