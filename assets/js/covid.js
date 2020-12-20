var stats_confirmed = document.getElementById('stats_confirmed');
var stats_deaths = document.getElementById('stats_deaths');
var stats_recovered = document.getElementById('stats_recovered');

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

        var response = JSON.parse(this.responseText);
        
        console.log(this.status);
        
        stats_confirmed.innerText = response.TotalConfirmed;
        stats_deaths.innerText = response.TotalDeaths;
        stats_recovered.innerText = response.TotalRecovered;

    }
};

request.open("GET", "https://api.covid19api.com/world/total");
request.send();

// En cours de développement
