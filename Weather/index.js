const defaultCity="Chennai";
class Weather{
    constructor(cityname){
        this.city=cityname;
        this.country="";
        this.date="";
        this.temperature="";
        this.forecaste="";
        this.minTemp="";
        this.maxTemp="";
        this.feelsLike="";
        this.fetchWeather(false,defaultCity);
    }
     fetchWeather = (refresh,city) => {
        if (refresh == true){
            this.assignEmpty(city);
        }
        const url ={
            base: "http://api.openweathermap.org/data/2.5/weather",
            cityN: `q=${city}`,
            units: "units=metric",
            apikey: "appid=7e3f21edee540e6110af347b55eb1ab2"
        }
        let buildUrl=`${url.base}?${url.cityN}&${url.units}&${url.apikey}`;
        fetch(buildUrl)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            this.parseWeather(data);
        }).catch(error => {
            this.handleError("City Details Not found");
        });
    }
    parseWeather = (weatherData) =>{
        if (weatherData.name != undefined){
            this.city=weatherData.name;
            this.country=weatherData.sys.country;
            this.date = this.getDate();
            this.temperature = Math.floor(Math.round(weatherData.main.temp)) + "°c " ;
            this.forecaste = weatherData.weather[0].main;
            this.minTemp=Math.floor(Math.round(weatherData.main.temp_min));
            this.maxTemp=Math.floor(Math.round(weatherData.main.temp_max));
            this.feelsLike=Math.floor(Math.round(weatherData.main.feels_like));
            this.displayWeather();
        }else{
            this.handleError("City Details Not found");
        }
        
    }
    displayWeather = () => {
        let cityD = document.querySelector('.city');
        let dateD = document.querySelector('.date');
        let tempD = document.querySelector('.temp');
        let weatherD = document.querySelector('.forecaste');
        let minD = document.querySelector('#min');
        let maxD = document.querySelector('#max');
        let minmaxL = document.querySelector('.label');
        let feelsLike = document.querySelector('.feels-like');

        cityD.innerHTML=((this.temperature.length>0) ? (this.city + " , " + this.country) : this.city) ;
        dateD.innerHTML=this.date;
        tempD.innerHTML=this.temperature;
        weatherD.innerHTML=this.forecaste;
        minD.innerHTML=((this.minTemp.toString.length>0) ? (this.minTemp + "°c") : "");
        maxD.innerHTML=((this.maxTemp.toString.length>0) ? (this.maxTemp + "°c") : "");
        feelsLike.innerHTML=((this.minTemp.toString.length>0) ? (`Feels Like ${this.feelsLike}°c`) : "");
        if (this.minTemp.toString.length>0){
            document.getElementById("label1").style.display="block";
            document.getElementById("label2").style.display="block";
        }else{
            document.getElementById("label1").style.display="none";
            document.getElementById("label2").style.display="none";
        }
    }
    assignEmpty = (city) => {
        this.city=city;
        this.country="";
        this.date="";
        this.temperature="";
        this.forecaste="";
        this.minTemp="";
        this.maxTemp="";
        this.feelsLike="";
    }

    handleError= (invalidCity) =>{
        this.assignEmpty(invalidCity);
        this.displayWeather();
    }
    getDate = () => {
        let now = new Date();
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        let day = days[now.getDay()];
        let date = now.getDate();
        let month = months[now.getMonth()];
        let year = now.getFullYear();
    
        return `${day} ${date} ${month} ${year}`;
      }
}
const cityname = document.querySelector('#city-input');
let currentWeather=new Weather(defaultCity);

cityname.addEventListener('input',() => {
    currentWeather.fetchWeather (true,cityname.value);
    });


