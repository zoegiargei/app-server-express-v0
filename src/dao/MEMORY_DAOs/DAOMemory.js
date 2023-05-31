class DAOMemory {
    constructor () {
        this.memory = []
    }

    creaeteElement (element) {
        return this.memory.push(element)
    }

    findElements () {
        return this.memory
    }

    findIndex (id) {
        return this.memory.findIndex(element => element.id === id)
    }

    findElementById (id) {
        return this.memory.find(element => element.id === id)
    }

    findTheLastOne () {
        const lastIndex = this.memory.length - 1
        return this.memory[lastIndex]
    }

    findElementsByQuery (_query) {
        if (!_query) {
            return this.memory
        } else {
            const newArray = this.memory.filter(_query)
            return newArray
        }
    }

    async findElementByProjection () {
        return this.memory
    }

    async replaceElement (id, newValues) {
        const index = this.findIndex(id)
        this.memory[index] = newValues
    }

    async updateElement (id, newValues) {
        const index = this.findIndex(id)
        this.memory[index] = { ...this.memory[index], ...newValues }
    }

    async sortElements (value) {
        this.memory.sort((a, b) => a[value] - b[value])
    }

    async deleteElement (id) {
        const index = this.findIndex(id)
        return this.memory.splice(index, 1)
    }

    async reset () {
        this.memory = []
        return this.memory
    }
}
export default DAOMemory
