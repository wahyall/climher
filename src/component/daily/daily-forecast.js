import {
   setLoadItem
} from './../../script/library.js';

class DailyForecast extends HTMLElement {
   connectedCallback() {
      this.title = this.getAttribute('title') || null;
      this.renderContent();
      this.renderCSS();
   }

   renderContent() {
      const h3Title = document.createElement('h3');
      h3Title.textContent = this.title;
      h3Title.className = 'py-2';
      this.appendChild(h3Title);

      this.renderDummyData();
   }

   renderDummyData() {
      const dailyData = document.createElement('daily-data');
      dailyData.innerHTML = `
      <daily-item>
         <div class="daily-date" style="visibility: visible;">Fri, 2 Apr</div>
         <i class="daily-icon wi wi-day-rain" style="visibility: visible; color: var(--dayText);"></i>
         <div class="daily-temperature" style="visibility: visible;">24~30°C</div>
      </daily-item>
      <daily-item>
         <div class="daily-date" style="visibility: visible;">Fri, 2 Apr</div>
         <i class="daily-icon wi wi-day-rain" style="visibility: visible; color: var(--dayText);"></i>
         <div class="daily-temperature" style="visibility: visible;">24~30°C</div>
      </daily-item>
      <daily-item>
         <div class="daily-date" style="visibility: visible;">Fri, 2 Apr</div>
         <i class="daily-icon wi wi-day-rain" style="visibility: visible; color: var(--dayText);"></i>
         <div class="daily-temperature" style="visibility: visible;">24~30°C</div>
      </daily-item>
      <daily-item>
         <div class="daily-date" style="visibility: visible;">Fri, 2 Apr</div>
         <i class="daily-icon wi wi-day-rain" style="visibility: visible; color: var(--dayText);"></i>
         <div class="daily-temperature" style="visibility: visible;">24~30°C</div>
      </daily-item>
      <daily-item>
         <div class="daily-date" style="visibility: visible;">Fri, 2 Apr</div>
         <i class="daily-icon wi wi-day-rain" style="visibility: visible; color: var(--dayText);"></i>
         <div class="daily-temperature" style="visibility: visible;">24~30°C</div>
      </daily-item>
      <daily-item>
         <div class="daily-date" style="visibility: visible;">Fri, 2 Apr</div>
         <i class="daily-icon wi wi-day-rain" style="visibility: visible; color: var(--dayText);"></i>
         <div class="daily-temperature" style="visibility: visible;">24~30°C</div>
      </daily-item>
      <daily-item>
         <div class="daily-date" style="visibility: visible;">Fri, 2 Apr</div>
         <i class="daily-icon wi wi-day-rain" style="visibility: visible; color: var(--dayText);"></i>
         <div class="daily-temperature" style="visibility: visible;">24~30°C</div>
      </daily-item>
      `
      this.appendChild(dailyData);
      setLoadItem('daily-item>*');
   }

   renderCSS() {
      this.innerHTML += `
      <style>
         daily-data::-webkit-scrollbar {
            width: 4px;
            height: 4px;
            border-radius: 4px;
         }

         daily-data {
            overflow: auto;
            display: block;
            margin-top: 5px;
         }

         daily-item {
            display: flex;
            justify-content: space-between;
            padding: 1rem 0;
            margin: 0 4px;
         }

         daily-icon {
            font-size: 1.2rem;
            transform: translateY(5px);
         }

         daily-date,
         daily-temperature {
            font-weight: 500;
         }

         daily-item>* {
            visibility: hidden;
         }
      </style>
      `;
   }
}

customElements.define('daily-forecast', DailyForecast);