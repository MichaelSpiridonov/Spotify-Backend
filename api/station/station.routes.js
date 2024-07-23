import express from 'express'

import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'

import { getStations, getStationById, addStation, updateStation, removeStation } from './station.controller.js'

const router = express.Router()

router.get('/', log, getStations)
router.get('/:id', log, getStationById)
router.post('/', log, requireAuth, addStation)
router.put('/:id', requireAuth, updateStation)
router.delete('/:id', requireAuth, removeStation)

export const stationRoutes = router