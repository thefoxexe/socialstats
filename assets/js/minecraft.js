
var search = document.getElementById("search");
var skin = document.getElementById("skin");
var search_bar = document.getElementById("search");
var skin_name = document.getElementById("skin_name");

var name = "guiguitator";
skin.setAttribute('src', 'https://minotar.net/body/' + name);

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			console.log(this.status);
    }
};

request.open("GET", "https://minotar.net/body/" + name);
request.send();

function newRequest() {
	var name = search_bar.value;
	console.log("Votre recherche : " + name);
	request.open("GET", "https://minotar.net/body/" + name);
	request.send();
	skin.setAttribute('src', 'https://minotar.net/body/' + name);
	skin_name.innerText = name;
}