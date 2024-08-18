import { logger } from '../../services/logger.service.js'
import { spotifyService } from './spotify.service.js'

export async function getPlaylists(req, res) {
	try {
		const playlists = await spotifyService.getPlaylists()
		res.json(playlists)
	} catch (err) {
		logger.error('Failed to get playlists', err)
		res.status(400).send({ err: 'Failed to get playlists' })
	}
}

export async function searchTracks(req, res) {
	try {
        const query = req.params.query
		const tracks = await spotifyService.searchTracks(query)
		res.json(tracks)
	} catch (err) {
		logger.error('Failed to get tracks', err)
		res.status(400).send({ err: 'Failed to get tracks' })
	}
}

export async function getArtist(req, res) {
	try {
        const artistId = req.params.id
		const artist = await spotifyService.getArtist(artistId)
		res.json(artist)
	} catch (err) {
		logger.error('Failed to get artist', err)
		res.status(400).send({ err: 'Failed to get artist' })
	}
}

export async function getArtistAlbums(req, res) {
	try {
        const artistId = req.params.id
		const artist = await spotifyService.getArtist(artistId)
		res.json(artist)
	} catch (err) {
		logger.error('Failed to get artist albums', err)
		res.status(400).send({ err: 'Failed to get artist albums' })
	}
}

export async function getArtists(req, res) {
	try {
        const artistsId = req.params.id
		const artists = await spotifyService.getArtists(artistsId)
		res.json(artists)
	} catch (err) {
		logger.error('Failed to get artists', err)
		res.status(400).send({ err: 'Failed to get artists' })
	}
}

export async function getTracks(req, res) {
	try {
        const playlistId = req.params.id
		const tracks = await spotifyService.getTracks(playlistId)
		res.json(tracks)
	} catch (err) {
		logger.error('Failed to get tracks', err)
		res.status(400).send({ err: 'Failed to get tracks' })
	}
}

export async function getAlbum(req, res) {
	try {
        const albumId = req.params.id
		const album = await spotifyService.getAlbum(albumId)
		res.json(album)
	} catch (err) {
		logger.error('Failed to get tracks', err)
		res.status(400).send({ err: 'Failed to get tracks' })
	}
}

