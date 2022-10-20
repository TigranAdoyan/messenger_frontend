import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const instance = axios.create({
    baseURL : 'http://localhost:3335',
    headers: {
        ['authorization']: localStorage.getItem('token') || '',
        ['Content-Type']: "application/json",
        ['timeout'] : 1000,
    },
});

export default instance;