const express = require('express');
const mongoose = require('./user.db.js');
const UserModel = require('./user.model');
const userAuth = require('./user.auth');
const forgetpas=require('./user.nodemiler')
const { JsonWebTokenError, verify } = require('jsonwebtoken');
const router = express.Router();
router.post('/register', (req, res) => {
    const user = new UserModel({
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password
    })

    user.save().then(() => {
        res.status(201).send('you are register successfuly')
    })
        .catch((error) => {
            console.log(error)
            res.status(401).send('invalied')

        })

})



router.get('/login', (req, res) => {
    UserModel.findOne({ email: req.body.email, password: req.body.password }).then((user) => {
        if (!user) {
            res.send('User not found');
        } else {
            userAuth.jetToken(user, (err, token) => {
                res.json({
                    user: user,
                    token: token
                });
            });
        }


    });
});

router.get('/userinfo', userAuth.extractToken, userAuth.verifyToken, (req, res, next) => {
    // req.auth // scheme, token, user
    res.json(req.auth.user);
})
router.post('/forgetpassword',forgetpas.forgetpassword,(req,res)=>{
    res.json("password reset")
})

     


module.exports = router;