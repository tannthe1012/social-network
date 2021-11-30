import renderUserInfo from './userInfo';
import { api } from '../../../helper/axios.js';
customElements.define('user-info',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const templateE3 = document.createElement("template");
      // const script = document.createElement('script');
      // script.textContent = render().script;
      // this.shadowRoot.appendChild(script);
      
      const userId = this.getAttribute("userId");
      templateE3.innerHTML = renderUserInfo().html;

      api.get(`/users/${userId}/page`).then((res) => {
        console.log(res.data);
        templateE3.innerHTML = renderUserInfo(res.data).html;
        this.replaceWith(templateE3.content.cloneNode(true));
      }).catch((e) => {
        console.log(e);
      });

      this.append(templateE3.content.cloneNode(true));
    }
  }
);