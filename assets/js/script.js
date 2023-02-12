$( document ).ready(function() {
    var apiKey = "8ee58983891c8d838cf3c783bc5409f7";
    var lat = "";
    var lon = "";
    var city = "london";
    var historyNames = [];
    displayWeather(city);
    displayHistory();


$("#search-button").on("click", function(event) {
        event.preventDefault();
        city='';
        city = $('#search-input').val();
        displayWeather(city);
    
})


$(".list-group").on("click", function(event) {
    event.preventDefault();
    city='';
    city = $(event.target).text();
    // console.log($(event.target).text());
    displayWeather(city);

})

// display stored city names

function displayHistory() {
    var history = JSON.parse(localStorage.getItem("history"));
    console.log("H: "+history);
    $('#history').empty();        
    if(history){
        var ulEl = $('<ul>').addClass('list-group');
        for (let i = 0; i < history.length; i++) {
            var liEl = $('<li>').addClass('list-group-item');
            var aTag = $('<a>').attr('href','#').text(history[i]);
            liEl.append(aTag);
            ulEl.append(liEl);
        }
        $('#history').append(ulEl);        

    }
}



function displayWeather(city) {

    var apiURL = "https://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=1&appid="+ apiKey;
    $.ajax({
        url: apiURL,
        method: "GET"
      }).then(function(response) {
        console.log(response[0].name)
        lat= response[0].lat;
        lon= response[0].lon;
        apiURL="";
        var apiURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&cnt=7&appid="+apiKey+"&units=metric";
    
        $.ajax({
          url: apiURL,
          method: "GET"
        }).then(function(response) {
        //   console.log(response)
        var res = response.list;
        console.log(response);
        console.log(res);
        $('#today').empty();
        $('#forecast').empty();
        historyNames.push(response.city.name);
        localStorage.setItem("history", JSON.stringify(historyNames));
        var formatedDate = moment(res[0].dt_txt).format('DD-MM-YYYY');
        var cityName = $('<h3>').text(response.city.name+" ("+formatedDate+") ");
        var icon = $('<img>').attr('src','http://openweathermap.org/img/w/'+res[0].weather[0].icon+'.png');
        cityName.append(icon);
        var temp = $('<p>').text("Temp: "+res[0].main.temp+" C");
        var wind = $('<p>').text("Wind: "+res[0].wind.speed+" KPH");
        var humidity = $('<p>').text("Humidity: "+res[0].main.humidity+"%");
        $('#today').append(cityName,temp,wind,humidity);
        var h3heading = $('<h3>').attr("class","col-12").text("5-Day Forecast:");
        $('#forecast').append(h3heading);

        for (let i = 1; i < 6; i++) {
            formatedDate = '';
            formatedDate = moment(res[i].dt_txt).format('DD-MM-YYYY');
            var colDiv = $('<div>').attr("class","col-md-2");
            var h4Date = $('<h4>').text(formatedDate);
            var imgIcon = $('<img>').attr('src','http://openweathermap.org/img/w/'+res[i].weather[0].icon+'.png');
            var pTemp = $('<p>').text("Temp: "+res[i].main.temp+" C");
            var pWind = $('<p>').text("Wind: "+res[i].wind.speed+" KPH");
            var pHumidity = $('<p>').text("Humidity: "+res[i].main.humidity+"%");
            colDiv.append(h4Date,imgIcon,pTemp,pWind,pHumidity); 
            $('#forecast').append(colDiv);

        } 
        displayHistory();
        });

      });

    
}
   

})