const bcryptjs = require("bcryptjs")

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const { username, password } = req.body
      const triedpassword = password

      for (let i = 0; i < users.length; i++) {

        const passwordboolean = bcryptjs.compareSync(triedpassword, users[i].password)
        console.log(`password boolean is ${passwordboolean}`)
        if (users[i].username === username && passwordboolean) {
          res.status(200).send(users[i])
        } else if(users[i].username !== username) {
          console.log("user not found")
          res.status(400).send("User not found.")
        } else if (!passwordboolean){
          console.log("password is incorrect")
          res.status(400).send("User not found.")
        } 
      
      }
      
    },
    register: (req, res) => {
        console.log('Registering User')
        const {password} = req.body;
        console.log(`this is the password ${password}`)

        const salt = bcryptjs.genSaltSync(5);
        const passwordhash = bcryptjs.hashSync(password, salt);

        console.log(`this is the hashed password ${passwordhash}`)
        req.body.password = passwordhash
        users.push(req.body)
        delete req.body.password
        res.status(200).send(req.body)
    }
}
