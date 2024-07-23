import express from 'express'

import { log } from '../../middlewares/logger.middleware.js'

import { getAlbums, getAlbumById} from './station.controller.js'

const router = express.Router()

router.get('/', log, getAlbums)
router.get('/:id', log, getAlbumById)

export const authRoutes = router