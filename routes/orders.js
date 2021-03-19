var express = require('express');

//estalblishing handshake with collection - contact
const Order = require('../models/order');

var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   //res.json(`{status : 'contacts success'}`);
//   Order.find({},(err, orderData)=>{
//       if(!err){
//           res.status(200).json(orderData);
//       }else{
//           res.json(err);
//       }
//   });
// });

router.get('/', function(req, res, next) {
    res.render('orders', { title: 'My data ' });
  });


router.post('/', function(req, res, next) {
    console.log(req.body);


    //0. configure mondoose - nom i mongoose 
    //1. construct the query 
    //2. save the data in mongodb

    const orderDao = new Order(req.body);
    orderDao.save((err, status)=>{
        if(!err){
            console.log('Your Data is saved');
            console.log(status);
            res.json(status);

        }else{
            res.json(err);
        }
    });
    let data={
        code: 201,
        info: 'Order submitted successfully!!'
    }
    res.render('order-confirmation', {status: data});

   // res.json(`{status : 'contacts created'}`);
  });



module.exports = router;
