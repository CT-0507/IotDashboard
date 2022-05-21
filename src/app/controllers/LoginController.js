const mongoose = require('mongoose');
const User = require('../../models/user.js');
class LoginController {
    // POST led 1
    index(req, res, next) {
        if (req.body.led1 === 'on') {
            res.send({ status: 'Ok', led1: 'on' });
        } else {
            res.send({ status: 'Ok', led1: 'off' });
        }
    }
    login(req, res, next) {
        // User.findOne({ username: req.body.username })
        //     .then((err, user) => {
        //         user.comparePassword(req.body.password, function(err, isMatch) {
        //             if (err) throw err;
        //             console.log(user)
        //             console.log(req.body.password, isMatch); // -&gt; Password123: true
        //             res.send("Ok")
        //         });
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         res.send('incorrect')
        //     })
        User.findOne({ username: req.body.username }, function(err, user) {
            if (err) {throw 'wrong';}
            try {
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (err) {res.send(err);throw err; }
                    console.log(req.body.password, isMatch);
                    if(isMatch)  {
                        res.send(user)
                    }
                    else {
                        res.send("incorrect")
                    }
                     // -&gt; Password123: true
                });
            } catch {}
            // test a matching password
            
             
            // test a failing password
        })
            .then(() => {
                
            })
            .catch(() => {
                res.send('wrong username')
            });
    }
        // User.findOne({ username: req.body.username }, function(err, user) {
        //     if (err) throw err;
             
        //     // test a matching password
        //     user.comparePassword(req.body.password, function(err, isMatch) {
        //         if (err) throw err;
        //         console.log(req.body.password, isMatch); // -&gt; Password123: true
        //         res.
        //     });
             
        //     // test a failing password
        //     user.comparePassword(req.body.password, function(err, isMatch) {
        //         if (err) throw err;
        //         console.log(req.body.password, isMatch); // -&gt; 123Password: false
        //     });
        // })
}
module.exports = new LoginController();
