import { ObjectId } from 'mongodb'

import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'

export const stationService = {
	remove,
	query,
	getById,
	add,
	update,
}

async function query() {
	try {
		const collection = await dbService.getCollection('station')
        var stationCursor = collection.find()

		const stations = stationCursor.toArray()
		return stations
	} catch (err) {
		logger.error('cannot find stations', err)
		throw err
	}
}

async function getById(stationId) {
	try {
        const criteria = { _id: ObjectId.createFromHexString(stationId)}

		const collection = await dbService.getCollection('station')
		const station = await collection.findOne(criteria)
        
		return station
	} catch (err) {
		logger.error(`while finding station ${stationId}`, err)
		throw err
	}
}

async function remove(stationId) {
	const { loggedinUser } = asyncLocalStorage.getStore()
    const { _id: ownerId} = loggedinUser

	try {
        const criteria = { _id: ObjectId.createFromHexString(stationId)}
		criteria['createdBy._id'] = ownerId
        
		const collection = await dbService.getCollection('station')
		const res = await collection.deleteOne(criteria)

        if(res.deletedCount === 0) throw('Not your station')
		return stationId
	} catch (err) {
		logger.error(`cannot remove station ${stationId}`, err)
		throw err
	}
}

async function add(station) {
	try {
		const collection = await dbService.getCollection('station')
		await collection.insertOne(station)

		return station
	} catch (err) {
		logger.error('cannot insert station', err)
		throw err
	}
}

async function update(station) {
    const stationToSave = { imgUrl: station.createdBy.imgUrl, title: station.title, songs: station.songs, description: station.description, name: station.name }
    try {
        const criteria = { _id: ObjectId.createFromHexString(station._id)}
		
		const collection = await dbService.getCollection('station')
		await collection.updateOne(criteria, { $set: stationToSave })

		return station
	} catch (err) {
		logger.error(`cannot update station ${station._id}`, err)
		throw err
	}
}
