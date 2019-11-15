const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../users/users-model.js')
const restricted = require('./authenticate-middleware.js')

router.post('/register', (req, res) => {
  let user = req.body

  const hash = bcrypt.hashSync(user.password, 14)
  user.password = hash

  Users.register(user)
    .then(saved =>{
      res.status(201).json(saved)
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.post('/login', (req, res) => {
  let {username, password} = req.body

  Users.findBy({username})
  .first()
  .then(user=>{
    if (user && bcrypt.compareSync(password, user.password)){
      const token = generateToken(user)
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      res.status(200).json({
        message: `Welcome, ${user.username}!`,
        token:token
      })
    } else{
      res.status(401).json({message: 'invalid credentiolios, sorry!'})
    }
  })
  .catch(error =>{
    res.status(500).json(error)
  })
});

function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  }
  
  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

router.get('/users', restricted, (req,res)=>{
  Users.find()
  .then(users=>{
    res.json({loggedInUser: req.username, users})
  })
  .catch(error => {
    res.send(error)
  })
})



module.exports = router;
