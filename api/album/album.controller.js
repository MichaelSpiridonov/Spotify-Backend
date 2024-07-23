import { logger } from '../../services/logger.service.js'
import { albumService } from './album.service.js'

export async function getAlbums(req, res) {
	try {
		const albums = await albumService.query()
		res.json(albums)
	} catch (err) {
		logger.error('Failed to get albums', err)
		res.status(400).send({ err: 'Failed to get albums' })
	}
}

export async function getAlbumById(req, res) {
	try {
		const albumId = req.params.id
		const album = await albumService.getById(albumId)
		res.json(album)
	} catch (err) {
		logger.error('Failed to get album', err)
		res.status(400).send({ err: 'Failed to get album' })
	}
}


