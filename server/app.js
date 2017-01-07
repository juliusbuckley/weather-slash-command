import express from 'express';
import bodyParser from 'body-parser';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
import typeahead from './api/typeahead';
import resolver from './api/resolver';

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

const options = {
  key: fs.readFileSync('../keys/key.pem'),
  cert: fs.readFileSync('../keys/cert.pem')
};

https.createServer((options, app)).listen(8080);

// API ROUTES
app.get('/typeahead', cors(corsOptions), typeahead);
app.get('/resolver', cors(corsOptions), resolver);

// app.listen(port, () => { console.log(`app.js has been served on port: ${port}`); });