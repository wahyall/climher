import {
   getWeatherIcon,
   setDate
} from './../../script/library.js';

class DailyItem extends HTMLElement {
   renderItemData(data) {
      return new Promise(async resolve => {
         // Konfigurasi data-data yang diperlukan
         const {
            weather,
            dt,
            temp
         } = data
         const icon = await getWeatherIcon(weather[0].id, dt * 1000).then(icon => icon);
         const date = setDate(dt * 1000)
         const minTemp = Math.round(temp.min)
         const maxTemp = Math.round(temp.max)

         this.innerHTML = `
            <div class="daily-date">${date}</div>
            <i class="daily-icon ${icon}"></i>
            <div class="daily-temperature">${minTemp}~${maxTemp}°C</div>
         `;

         // Mengembalikan element hourly-item
         resolve(this)
      })
   }
}

customElements.define('daily-item', DailyItem);