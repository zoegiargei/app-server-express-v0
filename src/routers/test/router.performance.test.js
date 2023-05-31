import { Router } from 'express'

const routerPerformanceTest = Router()

routerPerformanceTest.get('/simpleOperation', (req, res) => {
    let sum = 0
    for (let i = 0; i < 1000000; i++) {
        sum += 1
    }
    res.sendOk({ message: 'Performance test simple operation', object: sum })
})

routerPerformanceTest.get('/complexOperation', (req, res) => {
    let sum = 0
    for (let i = 0; i < 5e8; i++) {
        sum += 1
    }
    res.sendOk({ message: 'Performance test complex operation', object: sum })
})

export default routerPerformanceTest
