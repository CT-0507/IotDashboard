const mongoose = require('mongoose');
const User = require('../../models/user.js');
class SignUpController {
    // POST led 1
    index(req, res, next) {
        res.render('/sign-up')
    }
    signUp(req, res, next) {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
        })
        newUser.save()
            .then(() => {
                console.log(newUser)
                console.log("Create new user successfully")
                res.send('OK')
            })
            .catch((err) => {
                console.log(err)
                res.send('failed to create new user')
            })
    }
}

module.exports = new SignUpController();
