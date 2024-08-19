import { logger } from '../../services/logger.service.js'
import { youtubeService } from './youtube.service.js'

export async function getVideos(req, res) {
	try {
        const query = req.params.query
		const videos = await youtubeService.getVideos(query)
		res.json(videos)
	} catch (err) {
		logger.error('Failed to get videos', err)
		res.status(400).send({ err: 'Failed to get videos' })
	}
}