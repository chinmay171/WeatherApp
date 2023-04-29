const tempDisplay = document.querySelector('.temp');
const placeDisplay = document.querySelector('.place');
const timeDayDateDisplay = document.querySelector('.time-day-date');
const typeDisplay = document.querySelector('.type');
const searchLocation = document.querySelector('.search-area');
const form = document.querySelector('form');

form.addEventListener('submit', searchForLocation);

let target = 'New Delhi';
let fetchResult = async (targetLocation) => {
	let url = `http://api.weatherapi.com/v1/current.json?key=37a8067d7d114fd29ba123735232904&q=${targetLocation}&aqi=no`;
	const res = await fetch(url);
	const resJSON = await res.json();
	console.log(resJSON);

	let temp = resJSON.current.temp_c;
	let location = resJSON.location.name;
	let time = resJSON.location.localtime;
	let condition = resJSON.current.condition.text;
	console.log(temp + ' ' + location + ' ' + time + ' ' + condition);
	updateHTML(temp, location, time, condition);
};

function updateHTML(temp, location, time, condition) {
	let onlyDate = time.split(' ')[0];
	let onlyTime = time.split(' ')[1];
	let onlyDay = getDayName(new Date(onlyDate).getDay());

	tempDisplay.innerHTML = temp;
	placeDisplay.innerHTML = location;
	timeDayDateDisplay.innerHTML = `${onlyDate} ${onlyDay} ${onlyTime}`;
	typeDisplay.innerHTML = condition;
}

function getDayName(number) {
	switch (number) {
		case 0:
			return 'Sunday';
		case 1:
			return 'Monday';
		case 2:
			return 'Tuesday';
		case 3:
			return 'Wednesday';
		case 4:
			return 'Thursday';
		case 5:
			return 'Friday';
		case 6:
			return 'Saturday';
	}
}

function searchForLocation(e) {
	e.preventDefault();
	target = searchLocation.value;
	fetchResult(target);
}
