require('dotenv').load();
const  express = require('express'),
       request = require('request'),
       bodyParser = require('body-parser'),
       app = express(),
       port = process.env.PORT || 3000;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/', function(req,res) {
  res.render('index', {weather: null, error: null});
});
app.post('/', function(req,res) {
  let city = req.body.city;
  let apiEnv = process.env.apiKeyHeroku;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiEnvHeroku}`;
  request(url, function(err,response,body) {
    if(err) {
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body);
      console.log(weather);
      if(weather.main === undefined) {
        res.render('index', {weather:null, error: 'Error, please try again'});
      }else {
        let roundedTemp = Math.round(weather.main.temp);
        let weatherdescription = weather.weather[0].description;
        let weatherText = `Today in ${weather.name}, there is ${weatherdescription}, with a temperature of ${roundedTemp} degrees, and ${weather.main.humidity}% humidity`;
        console.log(weatherText);
        res.render('index', {weather: weatherText, error:null});
      }
    }
  });
});

app.listen(port);
console.log("Listening on port " + port);


