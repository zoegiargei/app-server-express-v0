import { writeFile, readFile, unlink } from 'fs/promises'
import { errorsModel } from '../../models/Errors.js'
import Product from '../../models/Product.js'

class DAO_FS {
    constructor (path) {
        this.path = path
        this.elements = []
    }

    async read () {
        const asJson = JSON.parse(await readFile(this.path, 'utf-8'))
        return asJson
    }

    async write () {
        const asStringify = await writeFile(this.path, JSON.stringify(this.elements, null, '\t'))
        return asStringify
    }

    async createElement (element) {
        const newElement = new Product(element)

        this.elements = await this.read()

        if (this.elements.some(prod => prod.code === newElement.code)) {
            errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, 'REPETED CODE')
        } else {
            this.elements.push(newElement)
            await this.write()
        }

        return newElement
    }

    async findElements ({ field, value } = {}) {
        const allElements = await this.read()

        if (!field) {
            return allElements
        } else {
            allElements.filter(elem => {
                return elem[field] === value
            })
        }
    }

    async findElementById (id) {
        const asJson = await this.read()
        return asJson.find(prod => prod.id === id)
    }

    async updateElement (id, data) {
        const allElements = await this.read()
        const index = allElements.findIndex(prod => prod.id === id)
        allElements[index] = {
            ...allElements[index],
            ...data,
            id
        }

        this.elements = allElements
        await this.write()
    }

    async replaceElement (id, newElement) {
        this.elements = await this.read()
        const index = this.elements.findIndex(elem => elem.id === id)

        if (index === -1) errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, `Invalid argument to replace an element:${id}`)

        this.elements[index] = newElement
        await this.write()
    }

    async deleteElement (id) {
        const allElements = await this.read()
        const currentLength = allElements.length
        const newArray = allElements.filter(prod => prod.id !== id)

        if (newArray.length === currentLength) {
            errorsModel.throwOneError(errorsModel.ERROR_INVALID_ARGUMENT, `Invalid product id: ${id}`)
        }

        this.elements = newArray
        await this.write()
    }

    async reset () {
        return await unlink(this.path)
    }
}
export default DAO_FS
