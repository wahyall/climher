import {
   checkDayOrNight,
   changeThemeToLight,
   changeThemeToDark,
   getWeatherIcon,
   setLoadItem,
   setDate
} from './library.js'
import {
   configureInterface
} from './interface.js'

const timeData = {
   localOffsetTime: new Date().getTimezoneOffset() * 60000
}

export function getTimeData(data) {
   return timeData[data];
}

function configureTime() {
   // Mengambil Waktu UTC Sebagai Patokan Untuk Mengetahui Waktu Di Daerah Lain
   const utcYear = new Date().getUTCFullYear();
   const utcMonth = new Date().getUTCMonth();
   const utcDate = new Date().getUTCDate();
   const utcHour = new Date().getUTCHours();
   const utcMinute = new Date().getUTCMinutes();
   const utcSecond = new Date().getUTCSeconds();
   const utcMilisecond = new Date().getUTCMilliseconds();

   timeData.utcTime = new Date(`${utcMonth + 1} ${utcDate}, ${utcYear} ${utcHour}:${utcMinute}:${utcSecond}:${utcMilisecond}`).getTime();
   timeData.localTime = timeData.utcTime + timeData.offsetTime;
   timeData.fixedLocalTime = timeData.utcTime + timeData.offsetTime;
}

// Fetch API dari Current Weather dengan parameter nama kota yang telah diberikan
document.querySelector('.input-city').addEventListener('keydown', function (ev) {
   if (ev.key === 'Enter') {
      setCurrentWeather(this.value)
      saveCity(this.value)
   }
})

async function setCurrentWeather(city) {
   // Menghapus .error-alert
   document.querySelector('.error-alert').style.display = 'none'
   // Menjalankan animasi loading
   document.querySelector('main-loading').startLoading();
   setLoadItem('hourly-item>*')
   setLoadItem('daily-item>*')

   const dataCurrentWeather = await getCurrentWeather(city)

   // Inisialisasi variabel sunriseTime dan sunsetTime
   timeData.offsetTime = dataCurrentWeather.timezone * 1000;
   configureTime();
   timeData.sunriseTime = dataCurrentWeather.sys.sunrise * 1000 + timeData.localOffsetTime + timeData.offsetTime;
   timeData.sunsetTime = dataCurrentWeather.sys.sunset * 1000 + timeData.localOffsetTime + timeData.offsetTime;
   checkDayOrNight(changeThemeToLight, changeThemeToDark, timeData.fixedLocalTime);

   // Mengatur tanggal
   document.querySelector('.header-date .date').textContent = setDate(new Date(timeData.fixedLocalTime).getTime())

   // Mengatur icon cuaca saat ini
   const iconId = dataCurrentWeather.weather[0].id
   getWeatherIcon(iconId, timeData.fixedLocalTime).then(icon => document.querySelector('.header-weather-icon i').className = icon)

   // Mengatur suhu
   const temp = Math.round(dataCurrentWeather.main.temp)
   const feels = Math.round(dataCurrentWeather.main.feels_like)
   document.querySelector('.main-temperature .number').textContent = temp
   document.querySelector('.feels-like').textContent = `Feels like ${feels}°C`

   // Mengambil Koordinat Lat n Lon
   const lat = dataCurrentWeather.coord.lat
   const lon = dataCurrentWeather.coord.lon

   // Fetch One Call API
   oneCallApi(lat, lon)
   document.querySelector('forecast-detail').renderDetailItem(dataCurrentWeather)
   setSelectedCity(dataCurrentWeather.name, dataCurrentWeather.sys.country)
}

function setSelectedCity(city, country) {
   document.querySelector('.city-name').textContent = city
   document.querySelector('.country').textContent = country

   document.querySelector('.selected-city').classList.add('done')
   document.querySelector('.input-city').style.display = 'none'
}

function getCurrentWeather(kota) {
   return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${kota}&units=metric&appid=API_KEY`)
      .then(response => {
         if (!response.ok) {
            // Menghentikan animasi loading
            document.querySelector('main-loading').finishLoading();
            document.querySelector('.error-alert').style.display = 'block'
            throw new Error(response.statusText)
         }
         return response.json()
      })
      .then(data => data)
}

// Request One Call API yang merupakan API tempat menyimpan semua data cuaca termasuk haurly dan daily
function oneCallApi(lat, lon) {
   fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=API_KEY`)
      .then(response => response.json())
      .then(data => {
         const dataForecast = data;

         // Render Hourly Forecast
         const hourlyForecastData = dataForecast.hourly;
         hourlyForecastData.splice(1, 0, dataForecast.current);
         document.querySelector('hourly-data').forecastData = hourlyForecastData;

         // Render Daily Forecast
         const dailyForecastData = dataForecast.daily;
         document.querySelector('daily-data').forecastData = dailyForecastData;
      })
}

// Jika di dalam localStorage terdapat object CLIMHER (untuk menyimpan kota yang dicari sebelumnya), 
// maka jalankan function setCurrentWeather() dengan parameter kota tersebut
// jika tidak maka jalankan function setCurrentWeather() dengan parameter default (london)
window.addEventListener('DOMContentLoaded', function () {
   if (JSON.parse(localStorage.getItem('CLIMHER')) != null) {
      setCurrentWeather(JSON.parse(localStorage.getItem('CLIMHER')).name);
   } else {
      setCurrentWeather('london');
   }

   configureInterface();
})

function saveCity(city) {
   localStorage.setItem('CLIMHER', JSON.stringify({
      name: city
   }))
}
