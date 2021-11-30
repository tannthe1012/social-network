import renderPost from './renderPost';
import { api } from '../../../helper/axios.js';
import '../../common/comment';

customElements.define('my-post',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const templateEl = document.createElement("template");

      templateEl.innerHTML = renderPost().html;

      api.get('/my-posts', {
        params: {
          offset: 0, limit: 10,
        }
      }).then((res) => {
        console.log(res.data);

        templateEl.innerHTML = res.data.map(postInfo => (
          renderPost(postInfo).html
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