const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get("db");
        const { email, password } = req.body;
        const found = await db.find_user([email])
        if (+found[0].count !== 0) {
          return res.status(409).send({ message: "Email already registered" });
        }
        const user_id = await db.add_user({
          email,
          profile_img: `https://robohash.org/${email}`
        })
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        db.add_hash({ user_id: user_id[0].user_id, hash });
        req.session.user = {
          user_id: user_id[0].user_id,
          email,
          profile_img: `https://robohash.org/${email}`
        }
        res.status(201).send({ message: "Logged In", user: req.session.user });
      },

      login: async (req, res) => {
        const db = req.app.get("db");
        const { email, password } = req.body;
        const found = await db.find_user([email]);
        if (+found[0].count === 0) {
          return res
            .status(401)
            .send({ message: "An account with that email does not exist" });
        }
        const foundUser = await db.find_hash([email]);
        const { hash, user_id, profile_img } = foundUser[0];
        const result = bcrypt.compareSync(password, hash);
        if (!result) {
          return res.status(401).send({ message: "Password incorrect" });
        }
        req.session.user = { user_id, email, profile_img };
        res.status(200).send({ message: "Logged In", user: req.session.user });
      },

      logout: (req, res) => {
          req.session.destroy();
          res.status(200).send({Message: "Logged Out."})
      },

      getSession: (req, res) => {
        if (req.session.user) {
          res.status(200).send(req.session.user)
        }
      },

      getUser(req, res){
        if (req.session.user) {
          res.status(200).send(req.session.user)
          console.log(req.session.user)
        }
      },

      getOne(req, res) {
        const db = req.app.get('db')
        const {make, model, year} = req.body
        
        db.get_one([make, model, +year])
          .then(car => {
            console.log(car)
            res.status(200).send(car)
          })
          .catch(err => {
            res.status(500).send("Something went wrong.")
            console.log(err)
          })
      },

      changeEmail(req, res) {
        const db = req.app.get('db')
        const {user_id} = req.params;
        const {email} = req.body;
        
        db.edit_user([+user_id, email])
          .then(result => {
            res.status(200).send(result)
          })
          .catch(err => {
            res.status(500).send('something went wrong.')
            console.log(err)
          })
          req.session.user = { user_id, email }
      },

      deleteUser(req, res) {
        const db = req.app.get('db')
        const {user_id} = req.params;

        db.delete_user(user_id)
          .then(() => {
            res.sendStatus(200)
          })
          .catch(err => console.log(err))
      }
    }