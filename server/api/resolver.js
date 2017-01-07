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
      const icon = response.data.weather[0].icon + 'png';
      const imageUrl = 'https://192.241.218.147/images/01d.png';
      const width = 600;
      const test1 = `<img style="max-width:100%;" src="${imageUrl}" width="${width}"/>`;
      const html1 = [
        `<img src=/images/${icon}>
        <span>Temp: ${data.main.temp}</span>
        <span>High: ${data.main.temp_max}</span>
        <span>Low: ${data.main.temp_min}</span>
        <span>Description: ${data.weather[0].description}</span>`
      ].join('');
      const html = '<img style="max-width:100%;" src="https://www.rover.com/blog/wp-content/uploads/2015/05/dog-candy-junk-food-599x340.jpg" width="' + width + '"/>';
      res.json({
        body: html
      });
    })
    .catch((err) => { console.log(`Error: ${err}`); });
}