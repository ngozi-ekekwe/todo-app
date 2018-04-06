const userController = require('./controllers').userController;
const todoController = require('./controllers').todoController;

module.exports = (app) => {
    app.post('/api/user', userController.create);

    app.post('/api/todo/:userId', todoController.create);
    app.get('/api/todos', todoController.list);
    app.put('/api/:todoId/todo/:userId', todoController.update);
    app.delete('/api/:todoId/todo/:userId', todoController.destroy);
}