$(document).ready(function () {
    var apiKey = "3d5a050005dc5cb9ca5349455c5dc325";

    $("button").on("click", function (event) {
        var citySearch = $(".searchInput").val();
        console.log(citySearch);
        daily(citySearch);

    })


    function daily(citySearch) {
        var dailyQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + apiKey;
        $.ajax({
            url: dailyQueryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var lat = (response.coord.lat);
            console.log(lat);
            var lon = (response.coord.lon);
            console.log(lon);

            //create HTML for current weather
            var tempC = (response.main.temp);
            var tempF = (tempC - 273.15) * 1.80 + 32;
            var temp = $("<p>").addClass("card-text").text("Temperature: " + tempF + "°F");
            var city = $("<h2>").addClass("card-title").text(response.name);
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " MPH");
            var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var iconCode = (response.weather[0].icon);
            var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            var icon = $("<img>").attr("src", iconurl);

            //add to page
            city.append(icon);
            cardBody.append(city, temp, wind, humidity);
            card.append(cardBody);
            $("#current").append(card);

            getUVI(lat, lon);
            fiveDay(lat, lon);

        })
    }

    // Ajax call to get UV by lat and lon
    function getUVI(lat, lon) {
        var futureQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        $.ajax({
            url: futureQueryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var uvi = $("<p>").addClass("card-body").text("UV Index: " + response.current.uvi);
            $("#current").append(uvi);

        })
    }

    //5 day forecast loop with Ajax call to get UV by lat and lon
    function fiveDay(lat, lon) {
        var futureQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        for (var i = 0; i < 6; i++) {
        $.ajax({
            url: futureQueryURL,
            method: "GET"
        }).then(function (response5day) {
            

        })
    }





  













    //dont delete this closing tag it wraps around everything
})