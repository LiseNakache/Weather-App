var source = $('#weather-template').html();
var template = Handlebars.compile(source)

var citiesInfos = [];

var fetch = function () {
    var cityValue = $('.get-city').val();

    $.ajax({
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&APPID=d703871f861842b79c60988ccf3b17ec",

        success: function (data) {
            console.log(data)

            var name = data.name;
            var tempC = (data.main.temp) - 273.15;
            var C = tempC.toFixed(0);
            var tempF = (data.main.temp) * 9 / 5 - 459.67;
            var F = tempF.toFixed(0);

            var fullDate = new Date();
            var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
            var date = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

            var dt = new Date();
            var time = dt.getHours() + ":" + dt.getMinutes();

            addInfo(name, C, F, date, time)

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

var addInfo = function (cityName, celsius, farenheit, currentDate, currentTime, comments) {
    var cityObj = {
        name: cityName,
        C: celsius,
        F: farenheit,
        date: currentDate,
        time: currentTime,
        comments: []
    }
    $('.get-city').val('')
    // add to the array
    citiesInfos.push(cityObj);
    // render to page
    // $('.results').empty();
    var newHTML = template(cityObj);
    $('.results').append(newHTML);
}


var addComments = function (btn) {
//add comment to the array
    var commentVal = $(btn).siblings('input').val();
    var city = $(btn).closest('.result')
    var postComment = city.find('.comment-HTML')
    var cityIndex = city.index();
    citiesInfos[cityIndex].comments.push(commentVal);
//render comments
    
    $(postComment).append(commentVal);
}





$('#weather_form').submit(fetch);
$('.results').on("click",".comment-btn",function() {
    addComments(this);
});