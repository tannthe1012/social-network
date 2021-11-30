import renderHomePost from './renderHomePost.js';
import '../common/comment';

class HomePost extends HTMLElement {
  constructor() {
    super();
    this.reset = () => {
      this.removeChild(this.firstElementChild);
      const templateEl = document.createElement("template");
      const data = JSON.parse(this.getAttribute('data'));
      templateEl.innerHTML = renderHomePost(data).html;
      this.appendChild(templateEl.content.cloneNode(true));
    };
  }

  connectedCallback() {
    const templateEl = document.createElement("template");
    const data = JSON.parse(this.getAttribute('data'));


    templateEl.innerHTML = renderHomePost(data).html;

    this.appendChild(templateEl.content.cloneNode(true));
  }
}

customElements.define('home-post', HomePost);