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
      const icon = data.weather[0].icon + 'png';
      const width = 600;
      const imageUrl = '<img style="max-width:100%;" src="http://192.241.218.147:8080/images/' + icon + '" width="' + width + '"/>';
      const html = `<img style=max-width:100%; src=https://192.241.218.147/images/${icon} width="${width}"/> <span>Temp: ${data.main.temp}</span><span> High: ${data.main.temp_max}</span><span> Low: ${data.main.temp_min}</span><span> Description: ${data.weather[0].description}</span>`;
      res.json({
        body: imageUrl
      });
    })
    .catch((err) => { console.log(`Error: ${err}`); });
}