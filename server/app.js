import express from 'express';
import bodyParser from 'body-parser';
import https from 'https';
import pem from 'pem';
import cors from 'cors';
import typeahead from './api/typeahead';
import resolver from './api/resolver';

const corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

const app = express();
app.disable('x-powered-by');
// Render static assets route
app.use(express.static(__dirname + '/public'));
// API ROUTES
app.get('/typeahead', cors(corsOptions), typeahead);
app.get('/resolver', cors(corsOptions), resolver);

pem.createCertificate({days: 1, selfSigned: true}, (err, keys) => {
  // create https service
  https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(process.env.PORT);
});

export default app;