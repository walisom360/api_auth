const routes = require('express').Router();

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middlewares/auth');



routes.post('/users',UserController.store)

routes.post('/sessions',SessionController.store)

routes.delete('/photocrlv/:id', PhotoCnhController.destroy);

routes.use(authMiddleware); //so passa caso autenticado

module.exports = routes;
