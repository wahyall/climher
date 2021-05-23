import {
   getTimeData
} from './../../script/main.js';
import {
   finisihLoadItem,
   checkDayOrNight,
   changeThemeToLight,
   changeThemeToDark
} from './../../script/library.js';


class HourlyData extends HTMLElement {
   set forecastData(data) {
      this._hourlyData = data;
      this._localTime = getTimeData('localTime');
      this._fixedLocalTime = getTimeData('fixedLocalTime');
      this.renderHourlyItem();
   }

   async renderHourlyItem() {
      const fragments = document.createElement('div');

      for (const [i, data] of this._hourlyData.entries()) {
         const hourlyItem = await document.createElement('hourly-item').renderItemData(data, i, this._localTime);
         fragments.appendChild(hourlyItem);

         // Setiap kali melakukan render hourly-item, variabel localTime ditambah 3600000 (1 jam)
         if (i !== 1) {
            this._localTime += 3600000;
         }
      }

      this.innerHTML = fragments.innerHTML;
      document.querySelector('main-loading').setLoadedItem('hourly');
      finisihLoadItem('hourly-item>*');
      checkDayOrNight(changeThemeToLight, changeThemeToDark, this._fixedLocalTime);
   }
}

customElements.define('hourly-data', HourlyData);