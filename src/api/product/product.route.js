const { Router } = require('express');
const express = require('express');
const { post } = require('../user/user.route.js');
const Products = require('./product.db.js');

const router = express.Router();
router.post('/productinfo', (req, res) => {
    const products = new Products({
        productname: req.body.productname,
        price: req.body.price,
        quility: req.body.quility,
        fat: req.body.fat,
        expiredate: req.body.expiredate,
        productdate: req.body.productdate,
        quantity: req.body.quantity,
        transection_id: req.body.transection,
        product_id: req.body.product_id


    })
    product.save().then(() => {
        res.status(201).send('you are register successfuly')
    })
        .catch((error) => {
            console.log(error)
            res.status(401).send('invalied')

        })

})
 module.exports=router