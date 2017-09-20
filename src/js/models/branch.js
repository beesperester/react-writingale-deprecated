// Redux-Orm
import { fk, many, attr, Model } from 'redux-orm'

// Constants
import { signals } from 'signals'

export class Branch extends Model {
    toString() {
        return `Branch: ${this.id}`
    }

    static get fields() {
        return {
            id: attr(),
            content: attr(),
            tree: fk('Tree', 'branches'),
            parent: fk('Branch', 'branches'),
            // branches: many('Branch')
        }
    }

    static reducer(action, Branch, session) {
        switch (action.type) {
            case signals.UPSERT:
                if (action.data.branches) {
                    Object.keys(action.data.branches).map(id => Branch.upsert(action.data.branches[id]))
                }
                break
        }
    }
}
Branch.modelName = 'Branch'

export default Branch