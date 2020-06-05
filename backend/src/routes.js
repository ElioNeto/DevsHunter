const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require ('./controllers/SearchControllers');
const UserController = require ('./controllers/userController')

const routes = Router();

routes.get('/devs', DevController.index)
routes.post('/dev', DevController.store) 

routes.get('/search', SearchController.index)

routes.get('/users', UserController.index)
routes.get('/login', UserController.login)
routes.post('/newuser', UserController.store)

module.exports = routes;