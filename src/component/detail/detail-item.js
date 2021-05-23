class DetailItem extends HTMLElement {
   connectedCallback() {
      this._name = this.getAttribute('name') || null;
      this._icon = this.getAttribute('icon') || null;
      this._data = this.getAttribute('data') || null;
      this.renderContent();
      this.renderCSS();
   }

   renderContent() {
      this.innerHTML = `
         <i class="detail-icon ${this._icon}"></i>
         <div>
            <div class="detail-name">${this._name}</div>
            <div class="detail-data">${this._data}</div>
         </div>
      `;
   }

   renderCSS() {
      this.style = `
         display: flex;
         align-items: center;
         width: auto;
         margin-bottom: 2rem;
      `;
      this.querySelector('.detail-name').style = `
         font-weight: 500;
         font-size: .8rem;
         opacity: .6;
      `;
      this.querySelector('.detail-data').style = `
         font-weight: 600;
         font-size: 1rem;
      `;
      this.querySelector('.detail-icon').style = `
         font-size: 1.5rem;
         margin-right: 8px;
      `;
   }
}

customElements.define('detail-item', DetailItem);