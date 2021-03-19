var express = require('express');
var router = express.Router();
const Order = require('../models/order');
/* GET home page. */
router.get('/', function(req, res, next) {
    Order.find({}, (err,data)=>{
        if(err) res.status(500).send(err)
        else{
            //console.log("data ==> ", data)
            const now = Date.now();
            let status;
            let d0;
            let sec;
            const orders = data.map( order => {
                //console.log("order ****** ", order)
                d0 = Number(order.order_date);
                sec = (now - d0)/1000;
                if (sec<86400)        status = "In Progess";
                else if (sec>172800)  status = "Delivered";
                else                  status = "Dispatched";
                
                //console.log(d0)
                const d = new Date(d0).toLocaleDateString();
                console.log(d);
                order["order_date"] = d;
                order["order_status"] = status;
                return order;
            });
            console.log("orders ==> ", orders);
            
            //binding result to data to be used in OrderStatus.ejs
            res.render('OrderStatus', {data: orders});
        }
    });
});

module.exports = router;
