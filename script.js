var apiKey = "3d5a050005dc5cb9ca5349455c5dc325";

//current forecast
var dailyQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=brooklyn&appid=" + apiKey;


//extended forecast
var futureQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=";

$.ajax({
    url: dailyQueryURL,
    method: "GET"
}).then(function (response) {
    //   console.log(response);

 


    var lat = (response.coord.lat);
    console.log(lat);
    var lon = (response.coord.lon);
    console.log(lon);
    

    var temp = (response.main.temp);
    var tempF = (temp - 273.15) * 1.80 + 32;
    $(".city").text(response.name);
    $(".temp").text("Temperature: " + tempF);
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");



    

    //second ajax call still within the first 
   

    $.ajax({
        url: futureQueryURL + lat+ "&lon=" + lon + "&appid=" + apiKey,
        method: "GET"
    }).then(function (response) {
        console.log(response);


  })

})