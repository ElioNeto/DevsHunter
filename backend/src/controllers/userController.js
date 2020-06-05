const User = require('../models/User');

module.exports = {
  async index (req, res) {
    const users = await User.find()
    return res.json(users)
  },
  async store (req, res) {
    const { user, email, password } = req.body

    let theUser = await User.findOne({ user })
    
    if(!theUser){
      theUser = await User.create({
        user,
        email,
        password
      })
    }
    return res.json(theUser)
  },
  async login(req, res){
    const { user, password } = req.query

    let theUser = await User.findOne({ user })
    if(!theUser){
      return res.json('404')
    }
    if(theUser){
      if(theUser.password === password){
        return res.json('200')
      }else{
        return res.json('300')
      }
    }
  }
}