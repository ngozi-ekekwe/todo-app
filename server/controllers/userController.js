const db = require('../models');

module.exports = {
    create(req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
        .then((newUser) => {
            res.status(201).send(newUser)
        })
        .catch((err) => {
            console.log(err.message)
            res.status(401).send(err)
        })
    }
}