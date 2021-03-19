var express = require('express');
var router = express.Router();

/* GET tickets page. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'My data ' });
});

router.post('/', function(req,res,next){
    console.log(req.body);
    //save above data by self for assignment
 
    let data={
        code: 201,
        info: 'Data submitted successfully!!'
    }
    res.render('user-confirmation', {status: data});
});

module.exports = router;
