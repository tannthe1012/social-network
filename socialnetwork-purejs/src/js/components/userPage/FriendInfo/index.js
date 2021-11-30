import renderFriendList from './friendinfo';
import { api } from '../../../helper/axios.js';

customElements.define('friend-list-user',
  class extends HTMLElement {
    constructor() {
      super();
    }

   
    connectedCallback() {
      const templateE2 = document.createElement("template");
      // const script = document.createElement('script');
      // script.textContent = render().script;
      // this.shadowRoot.appendChild(script);
      const userId = this.getAttribute("userId");

      templateE2.innerHTML = renderFriendList().html;
      this.appendChild(templateE2.content.cloneNode(true));

      api.get(`/users/${userId}/page`).then((res) => {
        templateE2.innerHTML = renderFriendList(res.data).html;
        this.replaceWith(templateE2.content.cloneNode(true));
      }).catch((e) => {
        console.log(e);
      });
    }
  }
);