import renderUserInfo from './userInfo';
import { api } from '../../../helper/axios.js';
customElements.define('my-info',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const templateE1 = document.createElement("template");
      // const script = document.createElement('script');
      // script.textContent = render().script;
      // this.shadowRoot.appendChild(script);

      templateE1.innerHTML = renderUserInfo().html;

      api.get('/my-page').then((res) => {
        console.log(res.data);
        templateE1.innerHTML = renderUserInfo(res.data).html;
        this.replaceWith(templateE1.content.cloneNode(true));
      }).catch((e) => {
        console.log(e);
      });

      this.append(templateE1.content.cloneNode(true));
    }
  }
);