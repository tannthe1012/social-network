import template from "./template.js";

export default class SignInRoot extends HTMLDivElement {
  static get route() { return "" }
  static get is() { return "search-page" }

  constructor() {
    super();
  }

  connectedCallback() {
    const templateEl = document.createElement("template");
    const script = document.createElement('script');
    script.textContent = template().script;
    this.appendChild(script);

    templateEl.innerHTML = template().html;

    this.append(templateEl.content.cloneNode(true));
    // const state = template().states;
    // const keys = Object.keys(state);
    // keys.forEach(key => this.setAttribute(key, state[key], true));
  }
}