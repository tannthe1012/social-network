import renderPost from './renderPost';
import { api } from '../../../helper/axios.js';
import '../../common/comment';

customElements.define('user-post',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const templateEl = document.createElement("template");
      const userId = this.getAttribute("userId");

      templateEl.innerHTML = renderPost().html;
      api.get(`/users/${userId}/posts`, {
        params: {
          offset: 0, limit: 10,
        }
      }).then((res) => {
        console.log(res.data);

        templateEl.innerHTML = res.data.data.map(postInfo => (
          renderPost(postInfo, res.data.userInfo).html
        )).join("");

        this.replaceWith(templateEl.content.cloneNode(true));
        
        const script = document.createElement('script');
          script.textContent = `
        `;

        this.appendChild(script);
      }).catch((e) => {
        console.log(e);
      });

      this.append(templateEl.content.cloneNode(true));
    }
  }
);