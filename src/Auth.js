import axios from 'axios';
import qs from 'qs';

export const Auth = async () => {

    const clientId = process.env['REACT_APP_BASIC_CLIENT_ID'];
    const clientSecret = process.env['REACT_APP_BASIC_CLIENT_SECRET'];

    const headers = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            username: clientId,
            password: clientSecret,
        },
    };
    const data = {
        grant_type: 'client_credentials',
    };

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify(data),
            headers
        );
        return response.data.access_token;
    } catch (error) {
        console.log(error);
    }
};