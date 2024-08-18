import axios from 'axios';
import 'dotenv/config'

const CLIENT_ID = process.env.SPOTIFY_API_CLIENTID;
const CLIENT_SECRET = process.env.SPOTIFY_API_SECRET;
const AUTH_URL = 'https://accounts.spotify.com/api/token';
const BASE_URL = 'https://api.spotify.com/v1';

export const spotifyService = {
  getPlaylists,
  searchTracks,
  getArtist,
  getArtistAlbums,
  getArtists,
  getTracks,
  getAlbum
}

async function getToken() {
  const response = await axios.post(AUTH_URL, null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    },
    params: {
      grant_type: 'client_credentials'
    }
  });
  return response.data.access_token;
}

async function getPlaylists() {
  const token = await getToken();
  const featuredPlaylistsPromise = axios.get(`${BASE_URL}/browse/featured-playlists`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });



  const rapPromise = axios.get(`${BASE_URL}/browse/categories/hiphop/playlists`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });


  const [featuredPlaylistsResponse, rapResponse] = await Promise.all([
    featuredPlaylistsPromise,
    rapPromise,
  ]);

  const playlists = {
    featured: featuredPlaylistsResponse.data.playlists.items,
    rap: rapResponse.data.playlists.items,
  };
  return playlists;
}

async function searchTracks(query) {
  const token = await getToken();

  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }

  })
  const data = await response.json();

  return data.tracks.items;
}

async function getArtist(artistId) {
  const token = await getToken();
  const response = await axios.get(`${BASE_URL}/artists/${artistId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}

async function getArtists(artistIds) {
  const limitedArtistIds = artistIds.slice(0, 20).join(',');
  const token = await getToken();
  const response = await axios.get(`${BASE_URL}/artists`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      ids: limitedArtistIds
    }
  });
  return response.data.artists;
}

async function getTracks(playlistId) {
  const token = await getToken();
  const response = await axios.get(`${BASE_URL}/playlists/${playlistId}/tracks`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.items.map(item => item.track);
}

async function getArtistAlbums(artistId) {
  const token = await getToken()
  const response = await axios.get(`${BASE_URL}/artists/${artistId}/albums`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data.items;
}

async function getAlbum(albumId) {
    const token = await getToken();
    const url = `${BASE_URL}/albums/${albumId}`;
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  
    return response.data;
  }