import express from 'express'

import { log } from '../../middlewares/logger.middleware.js'

import { getPlaylists, searchTracks, getArtist, getArtistAlbums, getArtists, getTracks, getAlbum } from './spotify.controller.js'

const router = express.Router()

router.get('/playlist', log, getPlaylists)
router.get('/track/:query', log, searchTracks)
router.get('/artist/:id', log, getArtist)
router.get('/artist/album/:id', log, getArtistAlbums)
router.get('/artists/:id', log, getArtists)
router.get('/track/:id', log, getTracks)
router.get('/album/:id', log, getAlbum)


export const spotifyRoutes = router