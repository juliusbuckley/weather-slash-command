import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import typeahead from './api/typeahead';
import resolver from './api/resolver';

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

// API ROUTES
app.get('/typeahead', cors(corsOptions), typeahead);
app.get('/resolver', cors(corsOptions), resolver);

app.listen(port, () => { console.log(`app.js has been served on port: ${port}`); });