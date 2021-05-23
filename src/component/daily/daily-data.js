import {
   getTimeData
} from './../../script/main.js';
import {
   finisihLoadItem,
   checkDayOrNight,
   changeThemeToLight,
   changeThemeToDark,
} from './../../script/library.js';

class DailyData extends HTMLElement {
   set forecastData(data) {
      this._dailyData = data;
      this._fixedLocalTime = getTimeData('fixedLocalTime');
      this.renderDailyItem();
   }

   async renderDailyItem() {
      const fragments = document.createElement('div');

      for (const data of this._dailyData) {
         const dailyItem = await document.createElement('daily-item').renderItemData(data);
         fragments.appendChild(dailyItem);
      }

      this.innerHTML = fragments.innerHTML;
      document.querySelector('main-loading').setLoadedItem('daily');
      finisihLoadItem('daily-item>*');
      checkDayOrNight(changeThemeToLight, changeThemeToDark, this._fixedLocalTime);
   }
}

customElements.define('daily-data', DailyData);