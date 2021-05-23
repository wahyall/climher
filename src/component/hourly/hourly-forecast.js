import {
   setLoadItem
} from './../../script/library.js';

class HourlyForecast extends HTMLElement {
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
      const hourlyData = document.createElement('hourly-data');
      hourlyData.innerHTML = `
         <hourly-item>
            <h5 class="hourly-time" style="visibility: visible;">9am</h5>
            <i class="hourly-icon wi wi-day-cloudy" style="visibility: visible; color: var(--dayText);"></i>
            <h2 class="hourly-temperature" style="visibility: visible;">29<span style="font-size: .8rem;">°C</span></h2>
         </hourly-item>
         <hourly-item class="now">
            <h5 class="hourly-time" style="visibility: visible;">9am</h5>
            <i class="hourly-icon wi wi-day-cloudy" style="visibility: visible; color: var(--dayText);"></i>
            <h2 class="hourly-temperature" style="visibility: visible;">29<span style="font-size: .8rem;">°C</span></h2>
         </hourly-item>
         <hourly-item>
            <h5 class="hourly-time" style="visibility: visible;">9am</h5>
            <i class="hourly-icon wi wi-day-cloudy" style="visibility: visible; color: var(--dayText);"></i>
            <h2 class="hourly-temperature" style="visibility: visible;">29<span style="font-size: .8rem;">°C</span></h2>
         </hourly-item>
         <hourly-item>
            <h5 class="hourly-time" style="visibility: visible;">9am</h5>
            <i class="hourly-icon wi wi-day-cloudy" style="visibility: visible; color: var(--dayText);"></i>
            <h2 class="hourly-temperature" style="visibility: visible;">29<span style="font-size: .8rem;">°C</span></h2>
         </hourly-item>
         <hourly-item>
            <h5 class="hourly-time" style="visibility: visible;">9am</h5>
            <i class="hourly-icon wi wi-day-cloudy" style="visibility: visible; color: var(--dayText);"></i>
            <h2 class="hourly-temperature" style="visibility: visible;">29<span style="font-size: .8rem;">°C</span></h2>
         </hourly-item>
         <hourly-item>
            <h5 class="hourly-time" style="visibility: visible;">9am</h5>
            <i class="hourly-icon wi wi-day-cloudy" style="visibility: visible; color: var(--dayText);"></i>
            <h2 class="hourly-temperature" style="visibility: visible;">29<span style="font-size: .8rem;">°C</span></h2>
         </hourly-item>
         <hourly-item>
            <h5 class="hourly-time" style="visibility: visible;">9am</h5>
            <i class="hourly-icon wi wi-day-cloudy" style="visibility: visible; color: var(--dayText);"></i>
            <h2 class="hourly-temperature" style="visibility: visible;">29<span style="font-size: .8rem;">°C</span></h2>
         </hourly-item>
         <hourly-item>
            <h5 class="hourly-time" style="visibility: visible;">9am</h5>
            <i class="hourly-icon wi wi-day-cloudy" style="visibility: visible; color: var(--dayText);"></i>
            <h2 class="hourly-temperature" style="visibility: visible;">29<span style="font-size: .8rem;">°C</span></h2>
         </hourly-item>
         <hourly-item>
            <h5 class="hourly-time" style="visibility: visible;">9am</h5>
            <i class="hourly-icon wi wi-day-cloudy" style="visibility: visible; color: var(--dayText);"></i>
            <h2 class="hourly-temperature" style="visibility: visible;">29<span style="font-size: .8rem;">°C</span></h2>
         </hourly-item>
         <hourly-item>
            <h5 class="hourly-time" style="visibility: visible;">9am</h5>
            <i class="hourly-icon wi wi-day-cloudy" style="visibility: visible; color: var(--dayText);"></i>
            <h2 class="hourly-temperature" style="visibility: visible;">29<span style="font-size: .8rem;">°C</span></h2>
         </hourly-item>
      `;
      this.appendChild(hourlyData);
      setLoadItem('hourly-item>*');
   }

   renderCSS() {
      this.innerHTML += `
      <style>
         hourly-data::-webkit-scrollbar {
            width: 4px;
            height: 4px;
            border-radius: 4px;
         }
         
         hourly-data {
            margin: 1rem 0;
            overflow: auto;
            display: flex;
            cursor: grab;
         }

         hourly-item {
            padding: 1.5rem 1rem;
            border-radius: 70px;
            display: grid;
            grid-template-rows: auto auto auto;
            gap: 25px;
            text-align: center;
            justify-items: center;
            width: 60px;
            margin-bottom: 8px;
         }

         hourly-item {
            margin-right: 1rem;
         }

         hourly-item:last-child {
            margin-right: 0;
         }

         hourly-item>* {
            display: inline-block;
            margin: 0;
         }

         hourly-item .hourly-time {
            font-size: 1rem;
            font-weight: 500;
            opacity: .6;
         }

         hourly-item .hourly-icon {
            font-size: 2rem;
            transform: translateY(5px);
         }

         hourly-item .hourly-temperature {
            font-size: 1.4rem;
            font-weight: 600;
            display: flex;
            align-items: flex-start;
         }

         hourly-item>* {
            visibility: hidden;
         }

         @media (max-width: 575.98px) {
            hourly-item .hourly-icon {
               font-size: 1.6rem;
            }

            hourly-item .hourly-time {
               font-size: .9rem;
            }

            hourly-item .hourly-temperature {
               font-size: 1.2rem;
            }
         }
      </style>
      `;
   }
}

customElements.define('hourly-forecast', HourlyForecast);