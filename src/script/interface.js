// Konfigurasi tampilan dan interaksi lebih lanjut
export const configureInterface = () => {
   setInterval(() => {
      // Menyesuaikan tinggi .main-container terhadap tinggi .container
      const containerHeight = getComputedStyle(document.querySelector('.container')).height
      if (window.matchMedia('(min-width: 767.98px)').matches) {
         document.querySelector('.main-container').style.height = `calc(${containerHeight}*100/80)`
      } else if (window.matchMedia('(min-width: 991.98px)').matches) {
         document.querySelector('.main-container').style.height = `calc(${containerHeight}*100/75)`
      } else {
         document.querySelector('.main-container').style.height = `calc(${containerHeight}*100/85)`
      }

      // Menyesuaikan tinggi .main-wrapper terhadap jumlah tinggi child element nya
      const cityHeight = getComputedStyle(document.querySelector('.city')).height
      const headerHeight = getComputedStyle(document.querySelector('.header-info')).height
      const temperatureHeight = getComputedStyle(document.querySelector('.temperature-info')).height
      const mainWrapperGap = getComputedStyle(document.querySelector('.main-wrapper')).rowGap
      if (window.matchMedia('(min-width: 767.98px)').matches) {
         document.querySelector('.main-wrapper').style.height = `calc((${cityHeight} + ${headerHeight} + ${temperatureHeight}) * 1.35)`
      } else {
         document.querySelector('.main-wrapper').style.height = `calc((${cityHeight} + ${temperatureHeight} + ${mainWrapperGap} + 15px))`
      }

      // Menyesuaikan font-size .main-temperature .number terhadap lebar .main-temperature
      const mainTemperatureWidth = getComputedStyle(document.querySelector('.main-temperature')).width
      if (window.matchMedia('(min-width: 1199.98px)').matches) {
         document.querySelector('.main-temperature .number').style.fontSize = `calc(${mainTemperatureWidth}*55/100)`
         document.querySelector('.main-temperature .number').style.lineHeight = `calc(${mainTemperatureWidth}*55/100)`
      } else if (window.matchMedia('(min-width: 991.98px)').matches) {
         document.querySelector('.main-temperature .number').style.fontSize = `calc(${mainTemperatureWidth}*52/100)`
         document.querySelector('.main-temperature .number').style.lineHeight = `calc(${mainTemperatureWidth}*52/100)`
      } else if (window.matchMedia('(min-width: 767.98px)').matches) {
         document.querySelector('.main-temperature .number').style.fontSize = `calc(${mainTemperatureWidth}*45/100)`
         document.querySelector('.main-temperature .number').style.lineHeight = `calc(${mainTemperatureWidth}*45/100)`
      }

      // Menyamakan tinggi .daily-data dengan tinggi .hourly-data
      if (document.querySelector('hourly-data') && document.querySelector('daily-data')) {
         const hourlyDataStyles = getComputedStyle(document.querySelector('hourly-data'))
         document.querySelector('daily-data').style.height = `calc(${hourlyDataStyles.height} + ${hourlyDataStyles.marginTop})`
      }

   }, 1);

   // Saat .city di click maka .selected-city akan berganti menjadi .input-city
   document.querySelector('.city').addEventListener('click', function (ev) {
      document.querySelector('.selected-city').classList.remove('done')
      document.querySelector('.input-city').style.display = 'flex'
      document.querySelector('.input-city').focus()
   })

   document.querySelector('.input-city').addEventListener('blur', function (ev) {
      document.querySelector('.selected-city').classList.add('done')
      document.querySelector('.input-city').style.display = 'none'
   })

   // Draggable overflow
   // Membuat element yang overflow bisa draggable di PC
   const draggableOverflow = (el) => {
      const dragElem = document.querySelector(el);
      dragElem.style.cursor = 'grab';

      let dragElemPos = {
         top: 0,
         left: 0,
         x: 0,
         y: 0
      };

      const mouseDownHandler = (e) => {
         dragElem.style.cursor = 'grabbing';
         dragElem.style.userSelect = 'none';

         dragElemPos = {
            left: dragElem.scrollLeft,
            top: dragElem.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
         };

         document.addEventListener('mousemove', mouseMoveHandler);
         document.addEventListener('mouseup', mouseUpHandler);
      };

      const mouseMoveHandler = (e) => {
         // How far the mouse has been moved
         const dx = e.clientX - dragElemPos.x;
         const dy = e.clientY - dragElemPos.y;

         // Scroll the element
         dragElem.scrollTop = dragElemPos.top - dy;
         dragElem.scrollLeft = dragElemPos.left - dx;
      };

      const mouseUpHandler = () => {
         dragElem.style.cursor = 'grab';
         dragElem.style.removeProperty('user-select');

         document.removeEventListener('mousemove', mouseMoveHandler);
         document.removeEventListener('mouseup', mouseUpHandler);
      };

      // Attach the handler
      dragElem.addEventListener('mousedown', mouseDownHandler);
   }

   draggableOverflow('hourly-data')
   draggableOverflow('daily-data')
}