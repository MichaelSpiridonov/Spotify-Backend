import express from 'express'

import { log } from '../../middlewares/logger.middleware.js'

import { getVideos } from './youtube.controller.js'

const router = express.Router()

router.get('/:query', log, getVideos)



export const youtubeRoutes = router