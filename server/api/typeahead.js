import axios from 'axios';
import qs from 'querystring';

export default function(req, res) {
  const term = req.query.text.trim();
  if (!term) {
    res.json([{
      title: '<i>(enter a city, country code)</i>',
      text: ''
    }]);
    return;
  }
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
      let results = [
        {
          title: `<img style=height:50px vertical-align=top src=http://openweathermap.org/img/w/${response.data.weather[0].icon}.png> <span style=height:50px>${response.data.name}, ${response.data.sys.country}</span>`,
          text: term
        }
      ];
      if (results.length === 0) {
        res.json([{
          title: '<i>(no results)</i>',
          text: ''
        }]);
      } else {
        res.json(results);
      }
    })
    .catch((err) => { console.log(`Error: ${err}`); });
}
