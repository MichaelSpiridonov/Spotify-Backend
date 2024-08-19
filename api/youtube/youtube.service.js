import axios from 'axios'
import 'dotenv/config'

const YT_API_KEY = process.env.YT_API_KEY

const gVideosAmount = 5

export const youtubeService = {
  getVideos
}

async function getVideos(searchVal) {

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${gVideosAmount}&videoEmbeddable=true&type=video&key=${YT_API_KEY}&q=${searchVal}`

  try {
    const response = await axios.get(url)
    let videos = response.data.items

    // Assuming getVideoDetails is an async function
    videos = await Promise.all(videos.map((video) => _getVideoDetails(video)))

    return videos
  } catch (error) {
    console.error('Error fetching videos:', error)
    throw error // re-throw the error after logging it
  }
}

async function _getVideoDetails(video) {
  const { id, snippet } = video
  const { title, thumbnails } = snippet
  const videoId = id.videoId
  const thumbnail = thumbnails.default.url
  return { videoId, title, thumbnail }
}