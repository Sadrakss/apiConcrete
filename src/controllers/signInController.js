const bcrypt = require('bcrypt')
const SignUp = require('../models/signUp')
const jwt = require('jsonwebtoken')

module.exports = {
  async create(req, res) {
   function generateAccessToken(email){
        return jwt.sign(
          { email: email },
           process.env.ACCESS_TOKEN_SECRET,
           {expiresIn: '30m' });
      }
    try {
      const { email, password } = req.body;

      let user = await SignUp.findOne({ email })
      if(user){
        await bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) return console.log(err);
          if(result == true){
            const accessToken = generateAccessToken(email)
            return res.json({user:user.email,
                             id:user.id,
                             createdAt:user.createDate,
                             updateAt: user.lastUpdate,
                             lastLogin:user.lastLogin,
                             token:accessToken,
                           })
          }
          if(result == false) return res.status(401).json({message:`Usuário e/ou senha inválidos`})
        });
      }
      else{
        return res.status(400).json({message:`Usuário e/ou senha inválidos`})
      }


    } catch (error) {
      return res.json({
        message: `${error}`
      })
    }

  }
}
