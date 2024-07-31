import { ObjectId } from 'mongodb'

import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'

export const albumService = {
	query,
	getById,
}

async function query() {
	try {

		const collection = await dbService.getCollection('album')
		var albumCursor = collection.find()

		const albums = albumCursor.toArray()
		return albums
	} catch (err) {
		logger.error('cannot find albums', err)
		throw err
	}
}

async function getById(albumId) {
	try {
		console.log('album')
		const criteria = { _id: ObjectId.createFromHexString(albumId)}

		const collection = await dbService.getCollection('album')
	
		const album = await collection.findOne(criteria)
		album.createdAt = album._id.getTimestamp()
		return album
	} catch (err) {
		logger.error(`while finding album ${albumId}`, err)
		throw err
	}
}
