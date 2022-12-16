import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "https://mapi.paycode.com.mx/api/challenge/";

const userReport = () => {
    return axios
        .get(API_URL + "report",
        {
            headers: authHeader()
        }
    )
    .then((response) => {
        return response.data;
    })

}

// eslint-disable-next-line
export default {
    userReport
};
