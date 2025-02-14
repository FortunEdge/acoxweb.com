import Collection from '../dao/Collection'

/**
 * Decorator to be placed on entity getters to fetch and cache documents reverenced
 */
function lazy(collection: Collection) {
    // Decorator function
    return (value: Function, {kind, name}: ClassMethodDecoratorContext) => {
        // Replacement function
        return () => {
            
        }
    }
}