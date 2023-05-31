import { Router } from 'express'
import routerPerformanceTest from './router.performance.test.js'
import ConfigMulter from '../../utils/multer/config.files.multer.js'
import { winstonLogger } from '../../middlewares/loggers/logger.js'

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

export default routerTest
