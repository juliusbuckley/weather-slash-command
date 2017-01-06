import express from 'express';
import apiRoutes from './routes/apiRoutes';

const app = express();
const port = process.env.PORT || 8080;

apiRoutes(app);

app.listen(port, () => { console.log(`app.js has been served on port: ${port}`); });