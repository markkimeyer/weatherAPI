var apiKey = "3d5a050005dc5cb9ca5349455c5dc325";

var citySearch = $(".searchInput");
//current forecast
var dailyQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "Hudson" + "&appid=" + apiKey;


//extended forecast
var futureQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=";



//save input to local storage
$("button").on("click", function (event) {
    event.preventDefault();
    $(citySearch).each(function() {
    
    localStorage.setItem("searchedCity", ($(this).val()));
    
    })

$(citySearch).each(function() {

    //get input from local storage
var saveInput = localStorage.getItem("searchedCity");
$(this).val(saveInput); 
   $("#search1").html(saveInput);
    })







$.ajax({
    url: dailyQueryURL,
    method: "GET"
}).then(function (response) {
    //   console.log(response);

 


    var lat = (response.coord.lat);
    console.log(lat);
    var lon = (response.coord.lon);
    console.log(lon);
    console.log(response);
    

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
        $(".uv").text("UV Index: " + response.current.uvi)
        var temp1 = (response.daily[0].temp.day);
    var tempF1 = (temp1 - 273.15) * 1.80 + 32;
        $("#temp1").text(tempF1);
       $("#humidity1").text("Humidity: " + response.daily[0].humidity + "%");
       var iconcode = (response.daily[0].weather[0].icon);
       var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
       $("#iconOne").attr('src', iconurl);


  })

 

})

})