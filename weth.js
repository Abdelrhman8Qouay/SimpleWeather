document.querySelector(".info-btn").onclick = () => {
	window.alert("NOTE: this Weather App Only the English language is accepted, next weather project will accepted more languages. there are countries not added yet");
}

let btn = document.getElementById("send");
let input = document.getElementById("input");
let out = document.querySelector(".show-screen");
let container = document.querySelector(".contain-weather");

btn.onclick = () => {
	const apiKey = "d824c3f930d8e31130898a92e91c5d59";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}`)
	.then(response => response.json())
	.then(data => {
		console.log(data);
		const temp = Ktoc(data.main.temp);
		out.innerHTML = `
		<h3>the weather of ${input.value}</h3>
		<h4><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" style="height: 3em" /> ${temp}°C</h4>
		<h4><img src="./assets/wind.png" style="width: 4.3em; height: 2.2em" /> ${data.wind.speed}km/h</h4>
		<h5>${data.weather[0].main}</h5>
		`;
		fetch("./sample.json").then(res => res.json())
		.then(imgsData => {
			const inputVa = document.getElementById("input").value;


			Object.keys(imgsData[0]).forEach((ind) => {
				if (ind === inputVa) {
					console.log(ind);

					document.querySelector(".contain-weather").style.backgroundImage = `url(${imgsData[0][ind]})`;
					// document.querySelector(".contain-weather").style.borderRadius = "50%";
					document.querySelector(".input-choice label").style.display = "none";
					document.querySelector(".contain-weather").style.padding = `35px`;
					// document.querySelector(".contain-weather").style.height = `40%`;
					document.querySelector(".input-choice .btn").style.background = "transparent";
				} else {
					return false;
				}
			})
		})
		.catch(err => console.log(err))

	})
	.catch(err => {
		console.error(err);
		out.innerHTML =  `<p class="text-center"><q>this is not found</q></p>`
	});

	function Ktoc(K){
		return Math.floor(K - 273.15);
	}
}
