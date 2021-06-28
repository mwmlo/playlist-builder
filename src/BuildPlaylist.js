import axios from 'axios';

const rec_url = "https://api.spotify.com/v1/recommendations?"

export const BuildPlaylist = async (auth_token, artist_id) => {

    const build_obj = {
        params: {
            limit: 10,
            market: "US",
            seed_artists: artist_id
        },
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + auth_token
        }
    }

    try {
        const response = await axios.get(rec_url, build_obj);
        let playlist = []
        for (let track of response['data']['tracks']) {
            let recommendation = track['name'] + " by " + track['artists'][0]['name']
            playlist.push(recommendation)
        }
        return playlist

    } catch (error) {
        console.log(error);
    }

}