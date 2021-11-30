import renderBanner from './banner';
import { api } from '../../../helper/axios.js';

customElements.define('cover-image',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const templateEl = document.createElement("template");
      // const script = document.createElement('script');
      // script.textContent = render().script;
      // this.shadowRoot.appendChild(script);

      templateEl.innerHTML = renderBanner().html;

      api.get('/my-page').then((res) => {
        console.log(res.data);
        templateEl.innerHTML = renderBanner(res.data).html;
        this.replaceWith(templateEl.content.cloneNode(true));
      }).catch((e) => {
        console.log(e);
      });

      this.append(templateEl.content.cloneNode(true));
    }
  }
);