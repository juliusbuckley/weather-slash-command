import axios from 'axios';
import qs from 'querystring';
import path from 'path';

export default function(req, res) {
  const term = req.query.text.trim();
  // CREATE QUERY STRING AND MAKE REQUEST TO OPEN WEATHER MAP API
  const searchUrl = 'http://api.openweathermap.org/data/2.5/weather?';
  const parameters = {
    q: term,
    units: 'imperial',
    appid: process.env.OPEN_WEATHER_MAP_KEY
  };
  const paramUrl = qs.stringify(parameters);
  const apiUrl = searchUrl + paramUrl;
  axios.get(apiUrl)
    .then((response) => {
      const data = response.data;
      const imagePath = path.join(__dirname, `../assets/resolver/${response.data.weather[0].icon}.png`);
      console.log('imagePath', imagePath);
      const html = [
        `<img src=${imagePath}>
        <span>Temp: ${data.main.temp}</span>
        <span>High: ${data.main.temp_max}</span>
        <span>Low: ${data.main.temp_min}</span>
        <span>Description: ${data.weather[0].description}</span>`
      ].join('');
      res.json({
        body: html
      });
    })
    .catch((err) => { console.log(`Error: ${err}`); });
}