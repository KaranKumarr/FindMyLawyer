import axios from 'axios';

import Constants from "expo-constants";

const { manifest } = Constants;

const uri = manifest.debuggerHost.split(':').shift();

export default axios.create({
    baseURL: `http://${uri}:8000/api`
});