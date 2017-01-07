import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import pem from 'pem';
import fs from 'fs';
import cors from 'cors';
import typeahead from './api/typeahead';
import resolver from './api/resolver';
import path from 'path';

const app = express();
const port = process.env.PORT || 8080;

// Render static assets route
app.use(express.static(path.join(__dirname, '/public')));

const corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

pem.createCertificate({days: 1, selfSigned: true}, (err, keys) => {
  var app = express();

  // API ROUTES
  app.get('/typeahead', cors(corsOptions), typeahead);
  app.get('/resolver', cors(corsOptions), resolver);

  // create https service
  https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(443);
});