import axios from 'axios';

const search_url = "https://api.spotify.com/v1/search"

export const Search = async (auth_token, artist_name) => {

    const search_obj = {
        params: {
            q: artist_name,
            type: "artist"
        },
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + auth_token
        }
    }

    try {
        const response = await axios.get(search_url, search_obj);
        const artist_id = response["data"]["artists"]["items"][0]["id"]
        const artist_name = response["data"]["artists"]["items"][0]["name"]
        return [artist_name, artist_id];
    } catch (error) {
        console.log(error);
    }

}