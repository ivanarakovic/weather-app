const url = city =>
   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e34dbee62dd96c9921b82a749dc48d5e`;
main = document.getElementById("main");
search = document.getElementById("search");
form = document.getElementById("form");



async function getWeather(city) {
    let weatherEl = await fetch(url(city));
    let weatherCity = await weatherEl.json();

    console.log(weatherCity);

    showWeather(weatherCity);
}

function showWeather(weatherJson){
	main.innerHTML = "";
	let temp, description, cityname, picture;
	cityname = weatherJson.name;
	temp = toCelsius(weatherJson.main.temp);
	description = weatherJson.weather[0].main;
	picture = weatherJson.weather[0].icon;
	
	weatherDiv = document.createElement("div");
	weatherDiv.classList.add("weather");
	
	weatherDiv.innerHTML = `
	    <h2>${cityname}</h2>
		<h1><img src = http://openweathermap.org/img/w/${picture}.png /> ${temp} °C <img src = http://openweathermap.org/img/w/${picture}.png /></h1>
		 <h3>${description}</h3>
		
	`;
	main.appendChild(weatherDiv);
	
	console.log(cityname);
}


function toCelsius(kelvin){
	return Math.ceil(kelvin - 273.15);
}

form.addEventListener("submit", function(e){
	e.preventDefault();
	let val = search.value;
	if(val){
		getWeather(val);
	    search.value = "";
	}
});

