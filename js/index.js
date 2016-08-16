$(document).ready(function () {

  // load in celsius
  var units = 'c';

  // Geolocation

  // check if using https
  navigator.geolocation.getCurrentPosition(function (success) {

      // load weather using lat / lng coords
      navigator.geolocation.getCurrentPosition(function (position) {
        loadWeather(position.coords.latitude + ',' + position.coords.longitude);

        // change units when button clicked
        $('#switch').click(function (weather) {
          if (units == 'c') {
            units = 'f';
            $('#switch').html('&deg;C');
          } else if (units == 'f') {
            units = 'c';
            $('#switch').html('&deg;F');
          }

          loadWeather(position.coords.latitude + ',' + position.coords.longitude);
        });
      });

      // Docs at http://simpleweatherjs.com
      function loadWeather(location, woeid) {
        $.simpleWeather({
          location: location,
          woeid: woeid,
          unit: units,
          success: function (weather) {

            // change background colour according to temperature
            if (units === 'c') {
              if (weather.temp < 10) {
                $('body').css('background', '#90CAF9');
              } else if (weather.temp < 20) {
                $('body').css('background', '#0288D1');
              } else if (weather.temp < 30) {
                $('body').css('background', '#FF9800');
              } else {
                $('body').css('background', '#F57C00');
              }
            } else {
              if (weather.temp < 50) {
                $('body').css('background', '#90CAF9');
              } else if (weather.temp < 68) {
                $('body').css('background', '#0288D1');
              } else if (weather.temp < 86) {
                $('body').css('background', '#FF9800');
              } else {
                $('body').css('background', '#F57C00');
              }
            }

            // current location & weather
            html = '<h3>' + weather.city + ', ' + weather.country + '</h3>';
            html += '<h1><img src="' + weather.thumbnail + '">' + weather.temp + '&deg;</h1>';
            html += '<h2>' + weather.currently + '</h2>';
            html += '<div><ul>';

            // 5-day forecast
            for (var i = 0; i < 5; i++) {
              html += '<li><p id="day">' + weather.forecast[i].day + '</p>';
              html += '<div><img src="' + weather.forecast[i].thumbnail + '"></div>';
              html += '<div>' + weather.forecast[i].text + '</div>';
              html += '<div id="forecast-temp">' + weather.forecast[i].high + '&deg; / ' + weather.forecast[i].low + '&deg;</div></li>';

            }

            html += '</ul></div>';

            $('#weather').html(html);

          },

          error: function (error) {
            $('#weather').html('<p>' + error + '</p>');
          },
        });
      }
    },

    // show redirect on insecure pages
    function (failure) {
      if (failure.message.indexOf('Only secure origins are allowed') == 0) {
        $('#weather').html('<p>Geolocation requires HTTPS</p><p><a href=" https://codepen.io/d33con/pen/gaapXZ" target="_blank"> Click here</a></p>');
      }
    });
});