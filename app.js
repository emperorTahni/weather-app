let city = document.getElementsByClassName("sfw-normal")
let ctemp = document.getElementById("ctemp")
let flike = document.getElementById("flike")
let maxTemp = document.getElementById("maxTemp")
let minTemp = document.getElementById("minTemp")


function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.")
      break;
  }
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition,showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  
}

getLocation()
function getPosition(position){
  const longitude = position.coords.longitude
  const latitude = position.coords.latitude
  const api_key = "1cfa3771828a36e5c37d7ffcdfb6d554"
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`

  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    city[0].innerHTML = data.name
    ctemp.innerHTML = data.main.temp
    flike.innerHTML = data.main.feels_like
    maxTemp.innerHTML = data.main.temp_max
    minTemp = data.main.temp_min

  })

}
