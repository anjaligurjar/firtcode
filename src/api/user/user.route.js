const express = require('express');
const mongoose = require('./user.db.js');
const UserModel = require('./user.model');
const userAuth = require('./user.auth');
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
router.post('/forgetpass', (req, res, next) => {
    const {email}=req.body
    UserModel.findOne({email},(error,user)=>{
        if(error||!user){
            res.json({
                status:400 ,
                message:'user does not exist'
            })

        }
        else{
            res.json({
                status:400 ,
                message:'user does not exist'
            })
        }
    })
       
    })

     


module.exports = router;