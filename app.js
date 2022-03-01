//Get relevant varaibles from html document
let city = document.getElementsByClassName("sfw-normal")
let ctemp = document.getElementById("ctemp")
let flike = document.getElementById("flike")
let maxTemp = document.getElementById("maxTemp")
let minTemp = document.getElementById("minTemp")
let heading = document.getElementById("heading")
let input = document.getElementById("input")
let check = document.getElementById("search-addon")

//Get User Device Location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  } else {
    heading.innerHTML = "Brower doesn't support"
  }
  
}
getLocation()

  //Callback Function to get the user position and make request to api based on specified location
  function getPosition(position){
    const longitude =Math.floor(position.coords.longitude) 
    const latitude = Math.floor(position.coords.latitude)
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
      minTemp.innerHTML = data.main.temp_min
    })
  
  }
  

//Add Event-Listner to the Search Button to get data by specififying city name and searching
check.addEventListener("click",getDataByCity)

//Call back function to get the City name and make request to api based on specified City Name
function getDataByCity(){
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=1cfa3771828a36e5c37d7ffcdfb6d554`)
  .then(response => response.json())
  .then(data => 
    {console.log(data)
      city[0].innerHTML = data.name
      ctemp.innerHTML = data.main.temp
      flike.innerHTML = data.main.feels_like
      maxTemp.innerHTML = data.main.temp_max
      minTemp.innerHTML = data.main.temp_min
    })
    .catch(err => {
      city[0].innerHTML = "No such city name"
      ctemp.innerHTML = " "
      flike.innerHTML = " "
      maxTemp.innerHTML = " "
      minTemp.innerHTML = " "
    })
}
