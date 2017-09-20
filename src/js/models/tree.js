// Redux-Orm
import { fk, many, attr, Model } from 'redux-orm'

// Constants
import { signals } from 'signals'

export class Tree extends Model {
    toString() {
        return `Tree: ${this.name}`
    }

    static get fields() {
        return {
            id: attr(),
            name: attr(),
            // branches: many('Branch')
        }
    }

    static reducer(action, Tree, session) {
        console.log(action)

        switch (action.type) {
            case signals.UPSERT:
                if (action.data.trees) {
                    Object.keys(action.data.trees).map(id => Tree.upsert(action.data.trees[id]))
                }
                break
        }
    }
}
Tree.modelName = 'Tree'

export default Tree