export const entityList: Function[] = []

function Entity(): ClassDecorator {
    return function (target: Function) {
        entityList.push(target)
    }
}

export default Entity
