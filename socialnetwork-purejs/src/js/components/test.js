customElements.define('test-here-1',
  class extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      const testHere = () => {
        return ({
          html: /*html*/`
          <style>
            .red {
              color: blue;
            }
          </style>
  
          <div class="red">
            <h1 class="haha">0</h1>
            <p>You don't need a JS framework anymore</p>

            <button onclick="onClick()">
              hello 1
            </button>
          </div>
        `,
          script: `
            const onClick = () => {
              alert(' hello 1')
            }
          `,
        })
      }

      const templateEl = document.createElement("template");
      const script = document.createElement('script');
      script.textContent = testHere().script;
      this.shadowRoot.appendChild(script);

      templateEl.innerHTML = testHere().html;

      this.shadowRoot.append(templateEl.content.cloneNode(true));
    }
  }
);