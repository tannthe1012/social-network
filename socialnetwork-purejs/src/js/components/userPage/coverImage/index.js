import renderBanner from './banner';
import { api } from '../../../helper/axios.js';

customElements.define('cover-image-user',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const templateEl = document.createElement("template");
      // const script = document.createElement('script');
      // script.textContent = render().script;
      // this.shadowRoot.appendChild(script);
      const userId = this.getAttribute("userId");

      templateEl.innerHTML = renderBanner().html;
      this.append(templateEl.content.cloneNode(true));

      api.get(`/users/${userId}/page`).then((res) => {
        templateEl.innerHTML = renderBanner(res.data).html;
        this.replaceWith(templateEl.content.cloneNode(true));
      }).catch((e) => {
        console.log(e);
      });
    }
  }
);