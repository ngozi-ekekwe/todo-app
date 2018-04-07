const db = require('../models');

module.exports = {
    create(req, res) {
        db.Todo
            .create({
                title: req.body.title,
                userId: req.params.userId,
                complete: req.body.complete
            })
            .then((todo) => {
                res.status(201).send({
                    message: todo
                })
            })
            .catch((err) => {
                res.status(401).send({
                    message: err
                })
            })
    },

    list(req, res) {
        return db.Todo
            .all()
            .then((todos) => {
                res.status(201).send({
                    message: todos
                })
            })
            .catch((err) => {
                res.status(401).send(err);
            })

    },

    update(req, res) {
        return db.Todo
            .find({
                where: {
                    id: req.params.todoId,
                    userId: req.params.userId
                }
            })
            .then((todo) => {
                if (!todo) {
                    return res.status(404).send({
                        message: "Todoitem not found"
                    })
                }

                return todo
                    .update(req.body)
                    .then(() => {
                        res.status(201).send(todo)
                    })
                    .catch((err) => {
                        res.status(401).send(err)
                    })
            })
    },

    destroy(req, res) {
        return db.Todo
        .find({
            where: {
                id: req.params.todoId,
                userId: req.params.userId
            }
        })
        .then((todo) => {
            if (!todo) {
                return res.status(404).send({
                    message: "Todo not found"
                })
            }
            return todo
                .destroy()
                .then(() => {
                    return res.status(201).send({
                        message: "Todo deleted"
                    })
                })
                .catch((err) => {
                    res.status(401).send(err)
                })
        })
    },


    retrieve(req, res) {
        return db.Todo
            .find({
                where: {
                    id: req.params.todoId,
                    userId: req.params.userId
                }
            })
            .then((todo) => {
                if (!todo) {
                    return res.status(404).send({
                        message: "Todo not found"
                    })
                }

                return res.status(201).send({
                    todo
                })
            })
            .catch((err) => {
                res.status(401).send(err)
            });
    },
}