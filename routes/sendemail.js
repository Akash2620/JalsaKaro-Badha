var express = require('express');
var router = express.Router();
require('dotenv').config()
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
    const email = req.params.email
    console.log("email ==> ", email)
    Order.find({email}, (err,data)=>{
        if(err) res.status(500).send(err)
        else{
            console.log("data ==> ", data)
            const now = Date.now()
            let status
            let d0
            let sec
            const orders = data.map( order => {
                //console.log("order ****** ", order)
                d0 = Number(order.order_date)
                sec = (now - d0)/1000
                if (sec<86400)        status = "In Progess"
                else if (sec>172800)  status = "Delivered"
                else                  status = "Dispatched"
                
                //console.log(d0)
                const d = new Date(d0).toLocaleDateString()
                //console.log(d)
                order["order_date"] = d
                order["order_status"] = status
                return order
            
            })
            console.log("orders ==> ", orders)
            const contentText = JSON.stringify(orders, null, 4)
            const contentHtml = "<div><h3>" + contentText + "</h3></div>"
            const msg = {
                to: email,
                from: 'ap@tcs.com',
                subject: 'Your Order Status',
                text: contentText,
                html: contentHtml,
            };
            sgMail.send(msg);
            //console.log("msg ==> ", msg)
            res.send("Email sent to " + email)
        }
    })

});

module.exports = router;
