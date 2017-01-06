import searchController from '../controllers/searchController';
// API ROUTES
const apiRoutes = (app) => { app.get('/typeahead', searchController); };
const apiRoutes = (app) => { app.get('/resolver', searchController); };
export default apiRoutes;