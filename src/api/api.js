import axios from "axios";

export const getInitialLocation = () => {
    return axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPDATA_KEY}`)
        .then(res => {
            return res.data.location;
        })
        .catch(err => {
            return err;
        })
}

export const getWeahter = (city, state) => {
    // const url = `https://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_KEY}&query=${city}`;
    const url = `https://api.weatherbit.io/v2.0/current?city=${city},${state}&key=${process.env.REACT_APP_WEATHER_KEY}`;
    return axios.get(url)
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        });
}