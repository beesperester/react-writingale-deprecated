// Utilities
import logging from './logging'

class Cache
{
    constructor(config = {}) {
        const default_config = {
            enabled: true
        }

        this.config = Object.assign({}, default_config, config)

        if (localStorage) {
            if (!localStorage.getItem('cache')) {
                this.clear()
            }
        }
    }

    clear() {
        localStorage.setItem('cache', JSON.stringify({}))
    }

    getCache() {
        if (this.config.enabled && localStorage.getItem('cache')) return JSON.parse(localStorage.getItem('cache'))

        throw 'Missing storage'
    }

    setCache(key, value) {
        localStorage.setItem('cache', JSON.stringify({
            ...this.getCache(),
            [key]: value
        }))
    }

    retrieve(url) {
        let index = Object.keys(this.getCache()).indexOf(url)

        if (index >= 0) {
            logging.log('cache hit', url)

            return this.getCache()[url]
        }

        throw 'Url not in storage: ' + url
    } 

    store(url, response) {
        //logging.log('store', url, response)
        this.setCache(url, response)
    }
}

export default new Cache()