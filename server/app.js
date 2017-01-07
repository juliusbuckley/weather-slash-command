import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import pem from 'pem';
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

// create http service
// http.createServer(app).listen(port, () => console.log(`app.js has been served on port: ${port}`));
// https.createServer((options, app)).listen(443, () => console.log(`app.js has been served on port: 443`));

pem.createCertificate({days: 1, selfSigned: true}, (err, keys) => {
  var app = express();

  // API ROUTES
  app.get('/typeahead', cors(corsOptions), typeahead);
  app.get('/resolver', cors(corsOptions), resolver);

  // create https service
  https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(443);
});