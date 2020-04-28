const guid = require('guid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SignUp = require('../models/signUp')
module.exports = {
  async create(req, res) {
    function generateAccessToken(email){
        return jwt.sign(
          { email:email },
           process.env.ACCESS_TOKEN_SECRET,
           {expiresIn: '30m' });
      }
    try {

      const { name, email, password,} = req.body;

      const saltRounds = 10;
      const hash = await bcrypt.hash(password,saltRounds)

      const dateNow = new Date();
      const jsonDate = dateNow.toJSON();

      let id = guid.raw().substring(0,6);

      let user = await SignUp.findOne({email})

      if(!user){
          user = await SignUp.create({
            id,
            name,
            email,
            password:hash,
            phone:req.body.phone
        })
        const accessToken = generateAccessToken(email)
        return res.status(200).json({
          user:email,
          id:id,
          createdAt:jsonDate,
          updateAt:jsonDate,
          lastLogin:jsonDate,
          token:accessToken,
        })
      }else{
          return res.status(400).json({Message
            :'E-mail já existente!'})
      }


    } catch (error) {
      return res.json({
        Message: `${error}`
      })
    }
  }
}
