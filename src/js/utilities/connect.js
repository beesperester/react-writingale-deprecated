// Normalizr
import { normalize } from 'normalizr';

// Utilities
import { fetchEndpoint } from 'utilities/fetch'
import logging from 'utilities/logging'

export default function connect(endpoint_name, schema = {}) {
    const endpoint = fetchEndpoint(endpoint_name)

    return {
        fetchAll: (dispatch) => {
            return endpoint.fetchAll((data) => {
                dispatch({
                    type: 'update_all',
                    data: normalize(data, schema.list).entities
                })
            })
        },
        fetchOne: (dispatch, id) => {
            return endpoint.fetchOne(id, (data) => {
                dispatch({
                    type: 'update_all',
                    data: normalize(data, schema.item).entities
                })
            })
        }
    }
}