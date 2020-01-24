document.addEventListener("DOMContentLoaded", init);

function init() {

/* GREETING AND SHOWING THE TIME */
	const time = document.getElementById("time"),
	greeting = document.getElementById("greeting"),
	name = document.getElementById("name"),
	focus = document.getElementById("focus");

/* showing the time: */
	function showTime() {
		let today = new Date(),
		hour = today.getHours(),
		minute = today.getMinutes(),
		second = today.getSeconds();

	/* checking time of the day: */
		const amPm = hour > 12 ? "PM" : "AM";

	/* 12-hour format of the time: */
		if (hour >= 13) {
			hour = hour - 12
		}

	/* displaying the time: */
		time.innerHTML = `${hour}<span>:</span>${addZero(minute)}<span>:</span>${addZero(second)} ${amPm}`;
		setTimeout(showTime, 1000);
	}

/* modifying minutes and seconds to have 01, 02, 03... displayed insted of 1, 2, 3 */
	function addZero(number) {
		return (parseInt(number, 10) < 10 ? "0" : "") + number;
	}

/* setting pictures for background and greeting depending on the time of the day: */
	(function setBackgroundAndGreeting() {
			let today = new Date(),
			hour = today.getHours();
	
			if (hour <= 12) {
				document.body.style.backgroundImage = "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
				greeting.textContent = "Good Morning,";
			}
			else if (hour < 19) {
				document.body.style.backgroundImage = "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
				greeting.textContent = "Good Afternoon,";
			}
			else {
				document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
				greeting.textContent = "Good Evening,";
				document.body. style.color = "white";
			}
	})(); 

/* LOCAL STORAGE - getting user's name: */
	function getName() {
  		if (localStorage.getItem("name") === null) {
    		name.textContent = "[Enter Name]";
  		} 
  		else {
    		name.textContent = localStorage.getItem("name");
  		}
	}

/* - setting user's name: */
	function setName(e) {
		if (e.type === "keypress") {
			if (e.keyCode === 13) {
				localStorage.setItem("name", e.target.innerText);
				name.blur();
			}
		}
		else {
			localStorage.setItem("name", e.target.innerText);
		}
	}

/* - getting user's focus for the day: */
	function getFocus() {
		if (localStorage.getItem("focus") === null) {
			focus.textContent = "[Enter focus]";
		}
		else {
			focus.textContent = localStorage.getItem("focus");
		}
	}

/* - setting user's focus for the day: */
	function setFocus(e) {
		if (e.type === 'keypress') {
    		if (e.keyCode == 13) {
      			localStorage.setItem('focus', e.target.innerText);
      			focus.blur();
    		}
 		} 
 		else {
    		localStorage.setItem('focus', e.target.innerText);
  		}
	}

/* running the functions */
	name.addEventListener("keypress", setName);
	name.addEventListener("blur", setName);
	focus.addEventListener('keypress', setFocus);
	focus.addEventListener('blur', setFocus);

	showTime();
	getName();
	getFocus();

/* WEATHER CONDITIONS */
	function getWeatherCondition() {

		let long;
		let lat;

		let temperatureDescription = document.querySelector(".temperature-description");
		let temperatureDegree = document.querySelector(".temperature-degree");
		let temperatureSection = document.querySelector(".temperature");
		const temperatureSpan = document.querySelector(".degree-section span");

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				long = position.coords.longitude;
				lat = position.coords.latitude;
			/* to avoid CORS policy consequences, we use 'cors-anywhere' */
				const proxy = "https://cors-anywhere.herokuapp.com/";
				const api = `${proxy}https://api.darksky.net/forecast/e25dfc79138af46ff1990edafb63c5fe/${lat},${long}`;
				fetch(api)
					.then(response => {
						return response.json();
					})
					.then(data => {
					/* destructuring allow us to use selected elements */
						const {temperature, summary, icon} = data.currently;
					/* DOM elements build with API */
					/* temperature is in 'F', so we re-calculate it to get celcius */
						temperatureDegree.textContent = `${((temperature - 32) * (5 / 9)).toFixed(1)} ºC`;

						temperatureDescription.textContent = summary;

					/* setting icon for current weather: */
						setIcons(icon, document.querySelector(".icon"));
						/* the second argument is icon ID */

					/* setting alternative temperatures F to C and back: */
						temperatureSection.addEventListener("click", () => {
							if (temperatureDegree.textContent.includes("ºC")) {
								temperatureDegree.textContent = `${temperature.toFixed(1)} F`;
							}
							else {
								temperatureDegree.textContent = `${((temperature - 32) * (5 / 9)).toFixed(1)} ºC`;
							}
						})
					})
			});
		}

		function setIcons(icon, iconID) {
			/* new instance of the Skycons: */
			const skycons = new Skycons({color: "#000"});
			/* to adjust notation to the 'skycons' requirements, we replace '-' with '_' and make the name uppercased: */
			const currentIcon = icon.replace(/-/g, "_").toUpperCase();

			skycons.play();

			return skycons.set(iconID, Skycons[currentIcon]);
		}
	}

	getWeatherCondition();

}
