require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const ctrl = require('./controller')
const checkForSession = require('../server/middleware/checkForSession')
const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env

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

//endpoints
app.get('/api/car', ctrl.getOne)

massive(CONNECTION_STRING).then(db => {
    console.log('Database Connected.')
    app.set('db', db)
    app.listen(SERVER_PORT, () => {
        console.log(`Listening on port ${SERVER_PORT}.`)
    })
})