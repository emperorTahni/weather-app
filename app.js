//Get relevant varaibles from html document
const city = document.getElementsByClassName("sfw-normal")
const ctemp = document.getElementById("ctemp")
const flike = document.getElementById("flike")
const maxTemp = document.getElementById("maxTemp")
const minTemp = document.getElementById("minTemp")
const heading = document.getElementById("heading")
const input = document.getElementById("input")
const check = document.getElementById("search-addon")
const radioButtons = document.querySelectorAll('input[name="inlineRadioOptions"]');

//create a class to getdata
class Getdata{
  constructor(){
    this.getPosition = (position) =>{
    this.latitude = position.coords.latitude
    this.longitude =position.coords.longitude
    this.api_key = "1cfa3771828a36e5c37d7ffcdfb6d554"
    this.url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.api_key}`
    //make request to api
    fetch(this.url)
    .then(response => response.json())
    .then((data =>{
      //loop to filter and convert data from celsius to fahrenheit and vice versa
      for(let i = 0; i< radioButtons.length; i++){
        radioButtons[i].addEventListener("change",()=>{
          if(radioButtons[i].value == "option2"){
            radioButtons[i].checked = true
            city[0].innerHTML = data.name 
            ctemp.innerHTML = Math.round((((data.main.temp - 273.15) * 9/5 + 32) + Number.EPSILON)* 100) / 100 + "°F"
            flike.innerHTML = Math.round((((data.main.feels_like - 273.15) * 9/5 + 32) + Number.EPSILON)* 100) / 100 + "°F"
            maxTemp.innerHTML = Math.round((((data.main.temp_max - 273.15) * 9/5 + 32) + Number.EPSILON)* 100) / 100 + "°F"
            minTemp.innerHTML = Math.round((((data.main.temp_min - 273.15) * 9/5 + 32) + Number.EPSILON)* 100) / 100 + "°F"
          }
          else{
          city[0].innerHTML = data.name
          ctemp.innerHTML = Math.round((data.main.temp - 273.15 + Number.EPSILON) * 100) / 100 + "°C"
          flike.innerHTML  = Math.round((data.main.feels_like - 273.15 + Number.EPSILON) * 100) / 100 + "°C"
          maxTemp.innerHTML = Math.round((data.main.temp_max - 273.15 + Number.EPSILON) * 100) / 100 + "°C"
          minTemp.innerHTML = Math.round((data.main.temp_min - 273.15 + Number.EPSILON) * 100) / 100 + "°C" 
          }
        })
        
      }
      
    }))

  }
}
}

//create an instance of the getdata class
let getData = new Getdata()

//Get User Device Location and check browser support 
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getData.getPosition);
  } else {
    heading.innerHTML = "Brower doesn't support"
  }
  
}
getLocation()

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
