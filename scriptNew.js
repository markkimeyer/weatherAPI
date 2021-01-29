$(document).ready(function () {
    var apiKey = "3d5a050005dc5cb9ca5349455c5dc325";


    function getHistory() {
        var location = localStorage.getItem("searchedCity");
     $("#search1").text(location);

    
        
    }
   getHistory();

    $("button").on("click", function (event) {
        var citySearch = $(".searchInput").val();
        daily(citySearch);
 localStorage.setItem("searchedCity", citySearch);
 console.log(citySearch);
 getHistory();
            

    })


    function daily(citySearch) {
        var dailyQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + apiKey;
        $.ajax({
            url: dailyQueryURL,
            method: "GET"
        }).then(function (response) {
            var lat = (response.coord.lat);
            var lon = (response.coord.lon);

            //create HTML for current weather
            var tempC = (response.main.temp);
            var tempF = (tempC - 273.15) * 1.80 + 32;
            var temp = $("<p>").addClass("card-text").text("Temperature: " + tempF.toFixed(0) + "°F");
            var city = $("<h2>").addClass("card-title").text("Today's Weather in " + response.name);
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " MPH");
            var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var iconCode = (response.weather[0].icon);
            var iconurl = "https://openweathermap.org/img/w/" + iconCode + ".png";
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
            var uvi = $("<p>").text("UV Index: ");
            var badge = $("<span>").addClass("badge").text(response.current.uvi);
            //change color for UV
            if (response.current.uvi < 3) {
                badge.addClass("bg-success");
            }
            else if (response.current.uvi < 7) {
                badge.addClass("bg-warning");
            }
            else {
                badge.addClass("bg-danger");
            }


            $(".card-body").append(uvi.append(badge));

        })
    }

    //5 day forecast loop with Ajax call to get UV by lat and lon
    function fiveDay(lat, lon) {
        var futureQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

        $.ajax({
            url: futureQueryURL,
            method: "GET"
        }).then(function (responseForecast) {
            console.log(responseForecast);
            for (var i = 1; i < 6; i++) {

                var newCard = $("<div>").addClass("card text-white bg-primary");
                $("#forecast").append(newCard);
                var bodyDiv = $("<div>").addClass("card-body");
                newCard.append(bodyDiv);

                var humidityLoop = $("<p>").addClass("card-text").text("Humidity: " + responseForecast.daily[i].humidity + "%");

                var tempC = (responseForecast.daily[i].temp.day);
                var tempF = (tempC - 273.15) * 1.80 + 32;
                var tempLoop = $("<p>").addClass("card-text").text("Temperature: " + tempF.toFixed(0) + "°F");

                var iconLoopCode = (responseForecast.daily[i].weather[0].icon);
                var iconLoopurl = "https://openweathermap.org/img/w/" + iconLoopCode + ".png";
                var iconLoop = $("<img>").attr("src", iconLoopurl);

                var epoch = moment.unix(responseForecast.daily[i].dt);
                var date = $("<h3>").text(epoch.format("(M/DD/YY)"));
                bodyDiv.append(date, iconLoop, tempLoop, humidityLoop);

            }
        })
    }

    //dont delete this closing tag it wraps around everything
})