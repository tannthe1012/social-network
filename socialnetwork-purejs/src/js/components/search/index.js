customElements.define('search-template',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const render = (data) => {
        if (!data) return ({
          html: /*html*/`
            <div class="flex alignCenter justifyCenter vh100">
              <div class="progress-5"></div>
            </div>
          `,
          script: /*html*/`
          `,
        })

        return ({
          html: /*html*/`
            <style>
              .max500 {
                max-width: 500px;
                width: 100%;
              }
            </style>
            <div class="mt-2 flex justifyCenter mb-2">
              <div class="max500">
                <h2 class="title text-control">Mọi người</h2>
                ${data.map((users) => {
                  const avatar = users.avatar_name;
                  const name = users.full_name;
                  const id = users.id;
                  return (`
                  <div class="custom_box p20 flex alignCenter justify-between mt-2">
                    <a href="/users/${id}" class="image-contain link-control flex" is="router-link">
                      <img src="${avatar}" class="avatar_main"/>
                      <div class="infor">
                        <div class="name text-control">${name}</div>
                        <div class="relation text-control">MSSV: ${users.mssv}</div>
                        <div class="relation text-control">Email: ${users.email}</div>
                      </div>
                    </a>

                    <div class="icon-contain">

                    </div>
                  </div>`)
                }).join("")}
              </div>
            </div>
          `
        })
      }

      const templateEl = document.createElement("template");

      const urlParams = new URLSearchParams(window.location.search);
      const keyword = urlParams.get('keyword');

      templateEl.innerHTML = render().html;

      this.append(templateEl.content.cloneNode(true));

      api.get('/suggest/users', {
        params: {
          offset: 0,
          limit: 10,
          keyword,
        }
      }).then((result) => {
        this.removeChild(this.firstElementChild);
        templateEl.innerHTML = render(result.data).html;
        this.appendChild(templateEl.content.cloneNode(true));
      }).catch((e) => {
        // templateEl.innerHTML = `<h1>Fail</h1>`;
        // this.replaceWith(templateEl.content.cloneNode(true));
      });
    }
  }
);