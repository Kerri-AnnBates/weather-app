import axios from "axios";

export const getInitialLocation = () => {
    return axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPDATA_KEY}`)
        .then(res => {
            // console.log(res.data);
            return res.data.location;
        })
        .catch(err => {
            return err;
        })
}

export const getWeahter = (city) => {
    const url = `https://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_KEY}&query=${city}`;
    // const old = `https://api.weatherbit.io/v2.0/current?city=${result.city},${result.region_code}&key=${process.env.REACT_APP_WEATHER_KEY}`;
    return axios.get(url)
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        });
}