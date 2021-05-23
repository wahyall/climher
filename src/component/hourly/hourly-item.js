import {
   getWeatherIcon
} from './../../script/library.js';

class HourlyItem extends HTMLElement {
   renderItemData(data, i, localTime) {
      return new Promise(async resolve => {
         // Konfigurasi data-data yang diperlukan
         const {
            weather,
            temp
         } = data

         const icon = await getWeatherIcon(weather[0].id, localTime).then(icon => icon);
         let time = new Date(localTime).getHours() <= 12 ? `${new Date(localTime).getHours()}am` : `${(new Date(localTime).getHours()) - 12}pm`;
         // Mengecek apakah data yang akan dirender adalah waktu sekarang, memiliki index 1
         if (i === 1) {
            this.className = 'now';
            time = 'now';
         }

         this.innerHTML = `
            <h5 class="hourly-time">${time}</h5>
            <i class="hourly-icon ${icon}"></i>
            <h2 class="hourly-temperature">${Math.round(temp)}<span style="font-size: .8rem;">°C</span></h2>
         `;

         // Mengembalikan element hourly-item
         resolve(this)
      })
   }
}

customElements.define('hourly-item', HourlyItem);