import Store from "../model.js";
import template from "./template.js";

export default class StoreOne extends HTMLDivElement {

  static get route() { return "/(\\d+)"; }
  static get is() { return "store-one"; }

  constructor() {
    super()
  }

  connectedCallback() {
    const store = Store.findById(this.params[0]);
    setTimeout(() => {
      this.appendChild(templateEl.content.cloneNode(true));
    }, 1000);
    const templateEl = document.createElement("template");
    templateEl.innerHTML = template(store);
    this.appendChild(templateEl.content.cloneNode(true));
  }
}