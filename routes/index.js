var express = require('express');
var router = express.Router();
var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/about',function(req,res,next){
    var randomFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about',{fortune:randomFortune});
});

// 404 catch-all handler (middleware)
router.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
// 500 error handler (middleware)
router.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

module.exports = router;
