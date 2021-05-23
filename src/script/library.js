import {
   getTimeData
} from './main.js';

export function checkDayOrNight(changeToLight, changeToDark, time) {
   const sunriseHours = parseFloat(new Date(getTimeData('sunriseTime')).toLocaleTimeString())
   const sunsetHours = parseFloat(new Date(getTimeData('sunsetTime')).toLocaleTimeString())
   const currentTime = parseFloat(new Date(time).toLocaleTimeString())

   if (currentTime >= sunriseHours && currentTime < sunsetHours) {
      // Atur tema siang
      return changeToLight()
   } else {
      // Atur tema malam
      return changeToDark()
   }
}

export function changeThemeToLight() {
   document.querySelector('main-loading').style.backgroundColor = 'var(--dayBgLoader)'
   document.querySelector('.loader').style.border = '6px solid var(--dayBorderLoader)'
   document.querySelector('.loader').style.borderTopColor = 'var(--nightText)'

   document.body.style.backgroundImage = 'var(--dayBgImage)'
   document.body.style.backgroundColor = 'var(--nightText)'
   document.body.style.backgroundPosition = 'var(--dayBgPosition)'
   document.body.style.backgroundSize = 'var(--dayBgSize)'
   document.body.style.color = 'var(--dayText)'

   document.querySelector('.main-container').style.background = 'var(--dayBgColor)'
   document.querySelector('.main-wrapper').style.background = 'var(--dayBgColor)'
   document.querySelector('.forecast-wrapper').style.background = 'var(--dayBgColor)'

   document.querySelector('.city').style.borderBottom = '1px solid var(--dayText)'
   document.querySelector('.country').style.backgroundColor = 'var(--dayLabel)'
   document.querySelector('.icon-search').style.backgroundColor = 'var(--dayBgSearch)'
   document.querySelector('.input-city').style.color = 'var(--dayText)'

   document.querySelectorAll('.forecast-schedule h3')[0].style.borderBottom = '1px solid var(--dayText)'
   document.querySelectorAll('.forecast-schedule h3')[1].style.borderBottom = '1px solid var(--dayText)'
   document.querySelector('forecast-detail').style.borderTop = '1px solid var(--dayText)'

   document.querySelector('hourly-data').classList.add('day-scroll')
   document.querySelector('daily-data').classList.add('day-scroll')

   document.querySelector('hourly-data').classList.remove('night-scroll')
   document.querySelector('daily-data').classList.remove('night-scroll')

   document.querySelectorAll('hourly-item').forEach(hourly => {
      hourly.style.backgroundColor = 'var(--dayBgForecast)'
   })

   if (document.querySelector('hourly-item.now')) {
      document.querySelector('hourly-item.now').style.backgroundColor = 'var(--dayLabel)'
   }

   const dailyItems = [...document.querySelectorAll('daily-item')]
   dailyItems.slice(0, dailyItems.length - 1).forEach(daily => {
      daily.style.borderBottom = '1px solid var(--dayDailyBorder)'
   })

   document.querySelectorAll('i').forEach(icon => {
      icon.style.color = 'var(--dayText)'
   })
}

export function changeThemeToDark() {
   document.querySelector('main-loading').style.backgroundColor = 'var(--nightBgLoader)'
   document.querySelector('.loader').style.border = '6px solid var(--nightBorderLoader)'
   document.querySelector('.loader').style.borderTopColor = 'var(--dayText)'

   document.body.style.backgroundImage = 'var(--nightBgImage)'
   document.body.style.backgroundColor = 'var(--nightText)'
   document.body.style.backgroundPosition = 'var(--nightBgPosition)'
   document.body.style.backgroundSize = 'var(--nightBgSize)'
   document.body.style.color = 'var(--nightText)'

   document.querySelector('.main-container').style.background = 'var(--nightBgColor)'
   document.querySelector('.main-wrapper').style.background = 'var(--nightBgColor)'
   document.querySelector('.forecast-wrapper').style.background = 'var(--nightBgColor)'

   document.querySelector('.city').style.borderBottom = '1px solid var(--nightText)'
   document.querySelector('.country').style.backgroundColor = 'var(--nightLabel)'
   document.querySelector('.icon-search').style.backgroundColor = 'var(--nightBgSearch)'
   document.querySelector('.input-city').style.color = 'var(--nightText)'

   document.querySelectorAll('.forecast-schedule h3')[0].style.borderBottom = '1px solid var(--nightText)'
   document.querySelectorAll('.forecast-schedule h3')[1].style.borderBottom = '1px solid var(--nightText)'
   document.querySelector('forecast-detail').style.borderTop = '1px solid var(--nightText)'

   document.querySelector('hourly-data').classList.add('night-scroll')
   document.querySelector('daily-data').classList.add('night-scroll')

   document.querySelector('hourly-data').classList.remove('day-scroll')
   document.querySelector('daily-data').classList.remove('day-scroll')

   document.querySelectorAll('hourly-item').forEach(hourly => {
      hourly.style.backgroundColor = 'var(--nightBgForecast)'
   })

   if (document.querySelector('hourly-item.now')) {
      document.querySelector('hourly-item.now').style.backgroundColor = 'var(--nightLabel)'
   }

   const dailyItems = [...document.querySelectorAll('daily-item')]
   dailyItems.slice(0, dailyItems.length - 1).forEach(daily => {
      daily.style.borderBottom = '1px solid var(--nightDailyBorder)'
   })

   document.querySelectorAll('i').forEach(icon => {
      icon.style.color = 'var(--nightText)'
   })
}

export async function getWeatherIcon(code, time) {
   const iconName = await fetch('./src/script/icons.json')
      .then(response => response.json())
      .then(icons => {
         var prefix = 'wi wi-';
         var icon = icons[code].icon;
         if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            // Mengecek siang atau malam untuk menggunakan icon yang tepat sesuai waktu
            icon = checkDayOrNight(function () {
                  return 'day-' + icon
               },
               function () {
                  return 'night-' + icon
               }, time)
         }
         icon = prefix + icon;
         icon = icon.replace('night-sunny', 'night-clear')
         return icon
      })
   return iconName
}

export function setLoadItem(elem) {
   const loadedElem = document.querySelectorAll(elem)
   loadedElem.forEach(el => {
      el.style.visibility = 'hidden'
   })
}

export function finisihLoadItem(elem) {
   const loadedElem = document.querySelectorAll(elem)
   loadedElem.forEach(el => {
      el.style.visibility = 'visible'
   })
}

const daysName = ['Sun', 'Mon', 'Teu', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function setDate(time) {
   const day = daysName[new Date(time).getDay()]
   const date = new Date(time).getDate()
   const month = monthsName[new Date(time).getMonth()]

   return `${day}, ${date} ${month}`
}