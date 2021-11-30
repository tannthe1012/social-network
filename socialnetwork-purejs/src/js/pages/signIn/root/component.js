import template from "./template.js";

export default class SignInRoot extends HTMLDivElement {
  static get route() { return ""; }
  static get is() { return "sign-root" }

  constructor() {
    super();
  }

  connectedCallback() {
    const templateEl = document.createElement("template");
    const script = document.createElement('script');

    script.textContent = `
      const signIn = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        document.getElementById('loginButton').disabled = true;
        document.getElementById('loginButton').innerHTML = 'Loading';

        api.post('/sign-in', {
          email, password
        }).then(res => {
          setToken(res.data.accessToken);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          window.location.href = '/me';
        }).catch(error => {
          document.getElementById('loginButton').innerHTML = 'Login';
          document.getElementById('loginButton').disabled = false;
          Swal.fire(
            'Lỗi',
            error.response.data ? error.response.data.message : 'Có lỗi xảy ra vui lòng thử lại',
            'error',
          )
        }) 

        return false;
      }
    `;

    // api.get('/me').then((e) => {
    //   console.log(e)
    // }).catch((e) => {
    //   templateEl.innerHTML = `<h1>Fail</h1>`;
    //   this.replaceWith(templateEl.content.cloneNode(true));
    // });


    this.appendChild(script);

    templateEl.innerHTML = template().html;

    this.append(templateEl.content.cloneNode(true));
    // const state = template().states;
    // const keys = Object.keys(state);
    // keys.forEach(key => this.setAttribute(key, state[key], true));
  }
}