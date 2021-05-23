import {
   getTimeData
} from './../script/main.js';

import {
   checkDayOrNight,
   changeThemeToLight,
   changeThemeToDark
} from './../script/library.js';

class MainLoading extends HTMLElement {
   connectedCallback() {
      this.className = 'active';
      this.loadElement = {};
      this.elementToLoad = this.getAttribute('load').split(' ');
      this.elementToLoad.forEach(elem => {
         this.loadElement[elem] = false;
      });
      this._fixedLocalTime = getTimeData('fixedLocalTime');
      this.renderContent();
      this.renderCSS();
   }

   renderContent() {
      this.innerHTML += `
      <span class="loader"></span>
      `;
   }

   renderCSS() {
      this.innerHTML += `
      <style>
         main-loading {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: none;
            justify-content: center;
            align-items: center;
         }

         main-loading.active {
            display: flex;
         }

         main-loading .loader {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            animation: loading 1.5s linear infinite;
         }
      </style>
      `;
   }

   setLoadedItem(elem) {
      this.loadElement[elem] = true;
      this.loadingConfigure();
   }

   loadingConfigure() {
      let isLoaded = [];
      for (const elem in this.loadElement) {
         if (this.loadElement[elem]) {
            isLoaded.push(true);
         } else {
            isLoaded.push(false);
         }
      }

      if (!isLoaded.includes(false)) {
         this.finishLoading();
      }
   }

   finishLoading() {
      checkDayOrNight(changeThemeToLight, changeThemeToDark, this._fixedLocalTime);
      this.classList.remove('active');
   }

   startLoading() {
      // Mengembalikan properti dari object this.loadElement mnejadi false, agar loading selanjutnya bisa berjalan
      this.elementToLoad.forEach(elem => {
         this.loadElement[elem] = false;
      });
      this.className = 'active';
   }
}

customElements.define('main-loading', MainLoading);