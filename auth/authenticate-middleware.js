const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {

  const token = req.headers.authorization

  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err,decodedToken)=>{
      if(err)
      res.status(401).json({message: 'You are not real, robot!'})
      else {
        req.user = {
          username: decodedToken.username,
          department: decodedToken.department
        }
        next()
      }
    })
  }
    else { res.status(401).json({ you: 'You shall not pass!' });}

};
