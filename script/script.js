document.addEventListener("DOMContentLoaded", init);
function init() {

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

/* getting user's name: */
	function getName() {
  		if (localStorage.getItem("name") === null) {
    		name.textContent = "[Enter Name]";
  		} 
  		else {
    		name.textContent = localStorage.getItem("name");
  		}
	}

	/*function cleanSpace() {
		name.innerText = "";
	}*/

/* setting user's name: */
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

/* getting user's focus for the day: */
	function getFocus() {
		if (localStorage.getItem("focus") === null) {
			focus.textContent = "[Enter focus]";
		}
		else {
			focus.textContent = localStorage.getItem("focus");
		}
	}

/* setting user's focus for the day: */
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


}







