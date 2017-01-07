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



const corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

pem.createCertificate({days: 1, selfSigned: true}, (err, keys) => {
  const app = express();

  // Render static assets route
  app.use(express.static(__dirname + '/public'));
  // API ROUTES
  app.get('/typeahead', cors(corsOptions), typeahead);
  app.get('/resolver', cors(corsOptions), resolver);

  // create https service
  https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(443);
});