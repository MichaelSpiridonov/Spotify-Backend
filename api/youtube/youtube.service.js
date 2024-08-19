import axios from 'axios'

const YT_API_KEY = process.env.YT_API_KEY


const gVideosAmount = 5

export const youtubeService = {
  getVideos,
  getValidFormatWord,
  clearHistory,
  getKeywords,
}


export async function getVideos(searchVal) {

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${gVideosAmount}&videoEmbeddable=true&type=video&key=${YT_API_KEY}&q=${searchVal}`

  try {
    const response = await axios.get(url)
    let videos = response.data.items

    // Assuming getVideoDetails is an async function
    videos = await Promise.all(videos.map((video) => getVideoDetails(video)))

    return videos
  } catch (error) {
    console.error('Error fetching videos:', error)
    throw error // re-throw the error after logging it
  }
}

function getVideoDetails(video) {
  const { id, snippet } = video
  const { title, thumbnails } = snippet
  const videoId = id.videoId
  const thumbnail = thumbnails.default.url
  return { videoId, title, thumbnail }
}

function getValidFormatWord(str) {
  let strArr = str.split('')
  let formatedArr = strArr.map((letter) => {
    return letter === ' ' ? '_' : letter
  })
  return formatedArr.join('')
}

function clearHistory() {
  gYoutubeCache = {}
}

function getKeywords() {
  return Object.keys(gYoutubeCache)
}
