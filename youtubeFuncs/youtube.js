const YT_API_KEY = 'AIzaSyDEe56vgEU2DSR-3gVEVK0xsA3octKQFI4';
const axios = require('axios');


async function searchOnYoutube(song, artist){
  try{

    let YT_API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${song}%20${artist}&type=video&key=${YT_API_KEY}`;
    const response = await axios.get(YT_API_URL);
    
    // console.log(YT_API_URL); //this gives us the link to a page of information and i assume we only want the url of this part
    // console.log(`${song} ${artist}`);

    const videoID = response.data.items[0].id.videoId;
    console.log(`https://www.youtube.com/watch?v=${videoID}`);
    return {
      videoID,
      videoUrl:`https://www.youtube.com/watch?v=${videoID}`,
    };

  }
  catch(err){
    console.error(`Error searching ${song} on Youtube: ${err}`);
    return null;
  }
}


async function addToPlaylist(url){
  const PLAYLIST_POST_URL = 'https://www.googleapis.com/youtube/v3/playlists?part=';
}

module.exports = searchOnYoutube;

