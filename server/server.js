require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const ctrl = require('./controller')
const checkForSession = require('../server/middleware/checkForSession')
const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT, STRIPE_SECRET} = process.env
const stripeLoader = require('stripe')

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
app.get('/api/user/:email', ctrl.findUser)


//endpoints
app.post('/api/car', ctrl.getOne)
app.put('/api/user/:user_id', ctrl.changeEmail)
app.delete('/api/user/:user_id', ctrl.deleteUser)

//STRIPE ENDPOINTS
const stripe = new stripeLoader(STRIPE_SECRET);

const charge = (token, amt) => {
    return stripe.charges.create({
        amount: +(amt * 100),
        currency: 'usd',
        source: token,
        description: "Statement Description"
    })
}

app.post('/auth/payment', async (req, res, next) => {
    console.log(req.body)
    try {
        let data = await charge(req.body.token.id, req.body.amount);
        console.log(data);
        res.send("Charged");
    } catch(e) {
        console.log(e)
        res.status(500)
    }
})

massive(CONNECTION_STRING).then(db => {
    console.log('Database Connected.')
    app.set('db', db)
    app.listen(SERVER_PORT, () => {
        console.log(`Listening on port ${SERVER_PORT}.`)
    })
})