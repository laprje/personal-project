require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const ctrl = require('./controller')
const checkForSession = require('../server/middleware/checkForSession')

const app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10
    }
}))

//Auth endpoints
app.post('/auth/register', ctrl.register)
app.post('/auth/login', checkForSession, ctrl.login)
app.post('/auth/logout', ctrl.logout)
app.get('/auth/getSession', ctrl.getSession)
app.get('/api/auth/me', ctrl.getUser)