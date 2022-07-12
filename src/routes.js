import { Router } from 'express'

import CarsController from './app/controllers/CarsController'

import multerConfig from './config/multer'
import multer from 'multer'

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/cars', upload.single('file'), CarsController.store)

routes.get('/cars', CarsController.index)

routes.put('/cars/:id', upload.single('file'), CarsController.update)

routes.delete('/cars/:id', CarsController.delete)

export default routes
