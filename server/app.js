import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
import typeahead from './api/typeahead';
import resolver from './api/resolver';

const app = express();
const port = process.env.PORT || 8080;

const options = {
  key: fs.readFileSync('../keys/key.pem'),
  cert: fs.readFileSync('../keys/cert.pem')
};

const corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

// API ROUTES
app.get('/typeahead', cors(corsOptions), typeahead);
app.get('/resolver', cors(corsOptions), resolver);

// create http service
http.createServer(app).listen(port, () => console.log(`app.js has been served on port: ${port}`));
// create https service
https.createServer((options, app)).listen(443, () => console.log(`app.js has been served on port: 443`));