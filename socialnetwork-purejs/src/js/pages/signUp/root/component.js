import template from "./template.js";
// import { api } from '../../../helper/axios.js';

export default class SignUpRoot extends HTMLDivElement {
  static get route() { return ""; }
  static get is() { return "signup-root" }

  constructor() {
    super();
  }

  connectedCallback() {
    const templateEl = document.createElement("template");
    const script = document.createElement('script');
    script.textContent = `
    const signUp = () => {
      const email = document.getElementById('email').value;
      const fullName = document.getElementById('fullName').value;
      const mssv = document.getElementById('mssv').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const province = document.getElementById('province').value;
      const district = document.getElementById('district').value;
      const male = document.getElementById('dot-1').checked;
      const feMale = document.getElementById('dot-2').checked;
      const other = document.getElementById('dot-3').checked;
      let gender = 2;
      if(male) {
        gender = 0;
      }
      else if(feMale){
        gender = 1;
      }
      var filter = /^([a-zA-Z0-9_\.\-])+\@sis.hust.edu.vn/; 
      if (!filter.test(email)) { 
        Swal.fire(
          'Lỗi',
          'Hãy nhập email theo đúng định dạng. Ví dụ: miphong.ht183819@sis.hust.edu.vn',
          'error'
        )
        return false; 
      }
      if (password !== confirmPassword) {
        Swal.fire(
          'Lỗi',
          "Confirm Password not same",
          'error'
        )
        return false;
      }

      document.getElementById("submitBtn").disabled = true;
      document.getElementById("submitBtn").innerHTML = 'Loading';
      console.log(document.getElementById("submitBtn"));

      api.post('sign-up', {
        email, fullName, mssv, password, confirmPassword, gender
      }).then((result) => {
        window.location.href = '/sign-in';
      }).catch((error) => {
        document.getElementById("submitBtn").disabled = false;
        document.getElementById("submitBtn").innerHTML = 'Register';
        Swal.fire(
          'Lỗi',
          error.response.data ? error.response.data.message : 'Có lỗi xảy ra vui lòng thử lại',
          'error',
        )
      })
      return false;
    }`;
    this.appendChild(script);

    templateEl.innerHTML = template().html;

    this.append(templateEl.content.cloneNode(true));

    // api.get('/me').then((e) => {
    //   console.log(e)
    // }).catch((e) => {
    //   templateEl.innerHTML = `<h1>Fail</h1>`;
    //   this.replaceWith(templateEl.content.cloneNode(true));
    // });

    // const state = template().states;
    // const keys = Object.keys(state);
    // keys.forEach(key => this.setAttribute(key, state[key], true));
  }
}