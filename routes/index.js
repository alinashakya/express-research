var express = require('express');
var router = express.Router();
var fortune = require('../lib/fortune.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/about', function(req, res) {
    res.render('about', { fortune: fortune.getFortune()} );
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

function getWeatherData(){
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)',
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0 F (12.8 C)',
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.0 F (12.8 C)',
            },
        ],
    };
}

router.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = getWeatherData();
    next();
});
router.get('/nursery-rhyme', function(req, res){
    res.render('nursery-rhyme');
});
router.get('/data/nursery-rhyme', function(req, res){
    res.json({
        animal: 'squirrel',
        bodyPart: 'tail',
        adjective: 'bushy',
        noun: 'heck',
    });
});

module.exports = router;
