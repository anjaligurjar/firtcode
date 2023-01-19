const adminAuth = require('./admin.auth');
const AdminModel = require('./admin.model')
const express=require('express')
const router = express.Router();

const { JsonWebTokenError, verify } = require('jsonwebtoken');
const { removeListener } = require('./admin.model');

router.post('/signup', (req, res) => {
    const admin = new AdminModel({
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password,
        role:req.body.role
    })

    admin.save().then(() => {
        res.status(201).send('your are register admin successfuly')
        console.log(admin)
    })
        .catch((error) => {
            console.log(error)
            res.status(401).send('invalied')

        })

})



router.get('/login', (req, res) => {
    AdminModel.findOne({ email: req.body.email, password: req.body.password }).then((admin) => {
        if (!admin) {
            res.send('Adminnot found');
        } else {
            adminAuth.jetToken(admin, (err, token) => {
                res.json({
                    admin: admin,
                    token: token
                });
            });
        }

    }
    )
})
module.exports = router;