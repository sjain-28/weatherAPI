const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");


});
console.log(process.env);

app.post("/", function (req, res) {

  const query = req.body.cityName;

  const apiKey = process.env.WEATHER_API_KEY;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The Weather in " + req.body.cityName + " is currently " + `<b style="color:red;">` + weatherDescription + "</b>" + "." + "<p>");
      res.write("<h1>The temeperature in " + req.body.cityName + " is " + `<span style="color:red;">` + temp + "</span>" + " degree Celsius.</h1>");
      res.write(`<img src="${imageURL}" width="200" height="200" style="border:2px solid blue;background-color:lightblue;">`);
      res.send();
    })

  })

})





app.listen(process.env.PORT||3000, function () {
  console.log("Server is running on port 3000.");
});
