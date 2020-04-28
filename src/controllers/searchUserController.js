const jwt = require('jsonwebtoken')
const User = require('../models/signUp')
module.exports = {
  async authenticateToken(req,res,next){
    try{
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(token == null) return res.sendStatus(401).json({message:'Não autorizado!'})

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err) return res.sendStatus(403).json({message:'Sessão inválida!'})
    req.user = user
    res.json({User:user.email})
    // next()
  })
} catch(err){
  return res.json({Error:err})
}
  }
}
