// Utilities
import cache from './cache'
import logging from './logging'

class Fetch
{
    constructor(config = {}) {
        const default_config = {
            cache: cache,
            base_url: ''
        }

        this.config = Object.assign({}, default_config, config)
    }

    fetchCached(url) {
        return new Promise((resolve, reject) => {
            let response = this.config.cache.retrieve(url)

            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        }).catch((error) => {
            logging.warn(error)

            let request = new Request(url)

            return fetch(request)
                .then((response) => response.json())
                .catch((data) => {
                    logging.log(data)

                    this.config.cache.store(url, data)

                    return data
                })
        })
    }

    fetchAll(endpoint, callback) {
        logging.info(this.config.base_url)
        let url = new URL(endpoint, this.config.base_url)

        // logging.info('libraries/fetch.fetchAll', url.href)

        return this.fetchCached(url.href).then((data) => {
            // logging.log('fetchAll', data)

            callback(data)
        })
    }

    fetchOne(endpoint, id, callback) {
        let url = new URL([endpoint, id].join('/'), this.config.base_url)
    
        return this.fetchCached(url.href).then((data) => {
            // logging.log('fetchOne', data)
    
            callback(data)
        })
    }
}

const _fetch = new Fetch({
    cache: cache
})

export default _fetch

export function fetchEndpoint(endpoint) {
    return {
        fetchAll: (callback) => {
            _fetch.fetchAll(endpoint, callback)
        },
        fetchOne: (id, callback) => {
            _fetch.fetchOne(endpoint, id, callback)
        }
    }
}