import { Router } from 'express'
import routerPerformanceTest from './router.performance.test.js'
import ConfigMulter from '../../utils/multer/config.files.multer.js'
import { winstonLogger } from '../../middlewares/loggers/logger.js'
import emailService from '../../services/emails.service.js'
import templatesForEmails from '../../utils/templates/templates.send.email.js'

const routerTest = Router()

const configMulter = new ConfigMulter('./public/uploads')
const upload = configMulter.configUpload()

routerTest.use('/performance', routerPerformanceTest)

routerTest.get('/loggerTest', (req, res) => {
    req.logger.fatal('Testing FATAL errors')
    req.logger.error('Testing ERROR errors')
    req.logger.warn('Testing WARN errors')
    req.logger.info('Testing INFO errors')
    req.logger.http('Testing HTTP errors')
    req.logger.debug('Testing DEBUG errors')
    res.sendOk({ message: 'Logger Test', object: {} })
})

routerTest.post('/upload', upload.single('image'), (req, res) => {
    winstonLogger.debug(req.file)
    res.sendOk({ message: 'Upload by Multer proof', object: req.file })
})

routerTest.post('/sendAnEmail', async (req, res, next) => {
    try {
        const url = 'http://localhost:8080/web/session'
        const message = templatesForEmails.templateEmailResetPass(url, 'Zoe Giargei')
        // email hardcodeado || real case: user.email
        const response = await emailService.send('zoegiargei00@gmail.com', message)
        res.sendOk({ message: 'proof of send an email', object: response })
    } catch (error) {
        next(error)
    }
})

export default routerTest
