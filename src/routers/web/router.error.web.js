import { Router } from 'express'

const routerErrorWeb = Router()

routerErrorWeb.get('/', (req, res) => {
    res.render('error', { title: 'Error' })
})
export default routerErrorWeb
