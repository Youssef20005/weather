let searchInput=document.getElementById("search");
let btnFind=document.getElementById("btnFind");
let todayDay=document.getElementById("today-day");
let todayMonth=document.getElementById("today-month");
let todayNumber=document.getElementById("today-num");
let cityName=document.getElementById("cityName");
let todayTemp=document.getElementById("today-temp");
let todayImg=document.getElementById("today-img");
let todayStatus=document.getElementById("today-status");
let humditiy=document.getElementById("humditiy");
let wind=document.getElementById("wind");
let windDirection=document.getElementById("wind-direction");
let nextDay=document.getElementsByClassName("next-day");
let nextConditionImage=document.getElementsByClassName("next-condition-image");
let nextMaxtemp=document.getElementsByClassName("next-max-temp");
let nextMintemp=document.getElementsByClassName("next-min-temp");
let tomorrowStatus=document.getElementsByClassName("tomorrow-status");


searchInput.addEventListener("input",function(){
  App(searchInput.value)
  
})


function displayTodaydata(data){
  let date=new Date()
  todayDay.innerHTML=date.toLocaleDateString("en-US",{weekday:"long"})
  todayNumber.innerHTML=date.getDate()
  todayMonth.innerHTML=date.toLocaleDateString("en-US", { month:"long"})
    cityName.innerHTML=data.location.name
    todayTemp.innerHTML=data.current.temp_c
    todayImg.setAttribute("src",data.current.condition.icon)
    todayStatus.innerHTML=data.current.condition.text
    humditiy.innerHTML=data.current.humidity+"%"
    wind.innerHTML=+data.current.wind_kph+ " km/"
    windDirection.innerHTML=data.current.wind_dir
}
function displayNextdata(data){
  let forecast_data=data.forecast.forecastday

  for (let i = 0; i < 2; i++) 
  {
    let next_Date=new Date(forecast_data[i+1].date)
    nextDay[i].innerHTML = next_Date.toLocaleDateString("en-US",{weekday:"long"})
    nextMaxtemp[i].innerHTML=forecast_data[i+1].day.maxtemp_c
    nextMintemp[i].innerHTML=forecast_data[i+1].day.mintemp_c
    nextConditionImage[i].setAttribute("src",forecast_data[i+1].day.condition.icon)
    tomorrowStatus[i].innerHTML=forecast_data[i+1].day.condition.text

    
  }
}
async function App(city="cairo") {
   
      let weatherData = await getWeather(city)
      displayTodaydata(weatherData)
       displayNextdata(weatherData)
  }
  
  App()
  
async function getWeather(city) {
    /* let apiKey = 'f4f61d2801f34791bb4232310241501';
    let city = 'benha'; */
  
    let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=f4f61d2801f34791bb4232310241501&q=${city}&days=3`;
  
    try {
      let response = await fetch(apiUrl);
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  
  
