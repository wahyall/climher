import {
   getTimeData
} from './../../script/main.js';

class ForecastDetail extends HTMLElement {
   renderDetailItem(data) {
      // Mengambil variabel sunsriseTime dan sunsetTime dari main.js
      this._sunriseTime = getTimeData('sunriseTime');
      this._sunsetTime = getTimeData('sunsetTime');

      // Konfigurasi data-data yang akan dipakai
      const wind = `${Math.round(data.wind.speed)} km/h`;
      const visibility = `${data.visibility / 1000} km`;
      const pressure = `${data.main.pressure}hPa`;
      const humidity = `${data.main.humidity}%`;

      const sunriseHour = new Date(this._sunriseTime).getHours() <= 12 ? new Date(this._sunriseTime).getHours() : new Date(this._sunriseTime).getHours() - 12;
      const sunriseMinute = new Date(this._sunriseTime).getMinutes() < 10 ? `0${new Date(this._sunriseTime).getMinutes()}` : new Date(this._sunriseTime).getMinutes();
      const sunrise = `${sunriseHour}.${sunriseMinute}am`;

      const sunsetHour = new Date(this._sunsetTime).getHours() <= 12 ? new Date(this._sunsetTime).getHours() : new Date(this._sunsetTime).getHours() - 12;
      const sunsetMinute = new Date(this._sunsetTime).getMinutes() < 10 ? `0${new Date(this._sunsetTime).getMinutes()}` : new Date(this._sunsetTime).getMinutes();
      const sunset = `${sunsetHour}.${sunsetMinute}pm`;

      this.innerHTML = `
         <detail-item name="wind" icon="fas fa-wind" data="${wind}"></detail-item>
         <detail-item name="sunrise" icon="wi wi-sunrise" data="${sunrise}"></detail-item>
         <detail-item name="sunset" icon="wi wi-sunset" data="${sunset}"></detail-item>
         <detail-item name="humidity" icon="wi wi-humidity" data="${humidity}"></detail-item>
         <detail-item name="visibility" icon="fas fa-eye" data="${visibility}"></detail-item>
         <detail-item name="pressure" icon="wi wi-barometer" data="${pressure}"></detail-item>
      `;
   }
}

customElements.define('forecast-detail', ForecastDetail);