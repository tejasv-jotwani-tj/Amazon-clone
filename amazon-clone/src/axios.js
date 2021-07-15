import axios from 'axios'

const instance= axios.create({
    baseURL:'http://localhost:5001/challenge-2021-f5f36/us-central1/api',
});

export default instance;