const chai = require('chai');
const supertest = require('supertest');
const app = require('../server');
const db = require('../server/models')

const request = supertest(app);
const expect = chai.expect;


describe('User Api', () => {
    before(() => {
        db.User.create({email: "test@gmail.com", password: "password"})
            .then((newUser) => {
                db.Todo.create({
                    title: "complete checkpoint",
                    complete: "true",
                    userId: newUser.id
                }).then((todo) => {
                })
            })
    });

    after(() => db.sequelize.sync({ force: true }));

    describe('User create endpoint', () => {
        it ('POST /api/user should create a user', (done) => {
            request
                .post('/api/user')
                .send({
                    email: "test2@gmail.com",
                    password: "password"
                })
                .end((err, res) => {
                    expect(res.body.message).to.equal('User successfully created');
                    expect(res.body.userId).to.be.a('number')
                    expect(res.status).to.equal(201);
                    done();
                })
        });
    });

    describe('Log in User', () => {
        it('should log a user in', (done) => {
            request
                .post('/api/login')
                .send({
                    email: "test2@gmail.com",
                    password: "password"
                })
                .end((err, res) => {
                    expect(res.body.userIdentity).to.be.a('number');
                    expect(res.body.expiresIn).to.equal('2 days');
                    expect(res.status).to.equal(200);
                    done();
                })
        })
    })


    describe('Todo create endpoint', () => {
        it ('POST /api/user should create a todo', (done) => {
            db.User.create({email: "test@gmail.com", password: "password"})
            .then((newUser) => {
                request
                .post(`/api/todo/${newUser.id}`)
                .send({
                    title: 'todo item',
                    complete: true
                })
                .end((err, res) => {
                    expect(res.body.message.title).to.equal('todo item');
                    expect(res.body.message.id).to.be.a('number')
                    expect(res.status).to.equal(201);
                    done();
                })
            })
            
        });
    });

    describe('List all Todos', () => {
        it('Should return all Todos', (done) => {
            request
                .get('/api/todos')
                .end((err, res) => {
                    expect(res.body.message.length).to.be.greaterThan(1);
                    expect(res.status).to.equal(201);
                    done();
                })
        })
    });
    
    describe('update Todo Api', () => {
        it('should update a todo', (done) => {
            db.User.create({email: "test@gmail.com", password: "password"})
                .then((newUser) => {
                    db.Todo.create({
                        title: "complete checkpoint",
                        complete: "true",
                        userId: newUser.id})
                    .then((todo) => {
                        request
                        .put(`/api/${todo.id}/todo/${newUser.id}`)
                        .send({
                            complete: false
                        })
                        .end((err, res) => {
                            expect(res.body.complete).to.equal(false);
                            expect(res.body.title).to.equal('complete checkpoint');
                            expect(res.body.id).to.be.a('number')
                            expect(res.status).to.equal(201);
                            done();
                        })
                    })
                    
                })
        });
    });


    describe('Delete Todo Api', () => {
        it('should delete a todo', (done) => {
            db.User.create({email: "test@gmail.com", password: "password"})
                .then((newUser) => {
                    db.Todo.create({
                        title: "complete checkpoint",
                        complete: "true",
                        userId: newUser.id})
                    .then((todo) => {
                        request
                        .delete(`/api/${todo.id}/todo/${newUser.id}`)
                        .end((err, res) => {
                            expect(res.body.message).to.equal('Todo deleted');
                            expect(res.status).to.equal(201);
                            done();
                        })
                    })
                    
                })
        })
    })
});