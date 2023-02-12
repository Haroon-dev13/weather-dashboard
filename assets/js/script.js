$( document ).ready(function() {
    var apiKey = "8ee58983891c8d838cf3c783bc5409f7";
    var lat = "";
    var lon = "";
    $("#search-button").on("click", function(event) {
        event.preventDefault();
        var city = $('#search-input').val();
        var apiURL = "https://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=1&appid="+ apiKey;
        $.ajax({
            url: apiURL,
            method: "GET"
          }).then(function(response) {
            // var res = response.results;
            console.log(response[0].name)
            lat= response[0].lat;
            lon= response[0].lon;
            apiURL="";
            // console.log(response[0].lat)
            // console.log(response[0].lon)
            var apiURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+apiKey;
        
            $.ajax({
              url: apiURL,
              method: "GET"
            }).then(function(response) {
            //   console.log(response)
            var res = response.list;
            console.log(res);
            for (let i = 0; i < 5; i++) {
                var formatedDate = moment(res[i].dt_txt).format('DD-MM-YYYY');
                var colDiv = $('<div>').attr("class","col-md-2");
                var h4Date = $('<h4>').text(formatedDate);
                var imgIcon = $('<img>').attr('src','http://openweathermap.org/img/w/'+res[i].weather[0].icon+'.png');
                var pTemp = $('<p>').text(res[i].main.temp);
                var tempHeading = $('<span>').text('Temp: ');
                pTemp.prepend(tempHeading);
                var pWind = $('<p>').text(res[i].wind.speed);
                var windHeading = $('<span>').text('Wind: ');
                pWind.prepend(windHeading);
                var pHumidity = $('<p>').text(res[i].main.humidity);
                var humidityHeading = $('<span>').text('Humidity: ');
                pHumidity.prepend(humidityHeading);
                colDiv.append(h4Date,imgIcon,pTemp,pWind,pHumidity); 
                $('#forecast').append(colDiv);
            } 
            });
  
          });

         
    })








    

})