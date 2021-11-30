import template from "./template.js";
import likePostType from '../../../enums/likePostType';

// LIKE: 1,
// HAHA: 2,
// ANGRY: 3,
// SAD: 4,
// LOVE: 5,
// WOW: 6,
// UNLIKE: 7,

export default class HomeRoot extends HTMLDivElement {
  static get route() { return ""; }
  static get is() { return "my-page" }

  constructor() {
    super();
  }

  connectedCallback() {
    const templateEl = document.createElement("template");
    
    const script = document.createElement('script');
    script.textContent = `
      const renderType = {
        1:'<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Thích</p>',
        2:'<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Ha ha</p>',
        3:'<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Tức giận</p>',
        4:'<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Buồn</p>',
        5:'<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Yêu thích</p>',
        6:'<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Wow</p>', 
      }
      const likePost = (postId, type) => {
        const btnLike = document.getElementById("like-btn-" + postId);
        const actionPost = document.getElementById("action-post-" + postId);
        actionPost.setAttribute("me", JSON.stringify({ type }));
        
        actionPost.reset();

        btnLike.innerHTML = renderType[type];
        
        api.post('/posts/like', {
          postId, type,
        }).then((res) => {
          console.log(res);
        }).catch((error) => {
          alert(error.response.data ? error.response.data.message : 'Có lỗi xảy ra vui lòng thử lại');
        })
      }
      const updateInfo = () => {
        const email = document.getElementByName('email').value;
        const fullName = document.getElementByName('full_name').value;
        const mssv = document.getElementByName('MSSV').value;
        const province = document.getElementsByName("province").value;
        const district = document.getElementByName('district').value;
        const slogan = document.getElementByName('slogan').value;
        document.getElementById("submitBtn").disabled = true;
        document.getElementById("submitBtn").setAttribute (value,'Loading');
        console.log(document.getElementById("submitBtn"));
      
        api.post('/my-page', {
          email, fullName, mssv, province, district, slogan,
        }).then((result) => {
          console.log(result);
          // window.location.href = '/'
        }).catch((error) => {
          document.getElementById("submitBtn").disabled = false;
          document.getElementById("submitBtn").innerHTML = 'Update';
          alert(error.response.data ? error.response.data.message : 'Có lỗi xảy ra vui lòng thử lại');
        })

        return false;
      }

      const callUpdateInfo = () =>{
        document.getElementById("updateInfoContainer").style.display = "block";
      }

      const closeUpdateInfo = () => {
        document.getElementById("updateInfoContainer").style.display = "none";
      }
    `
    this.appendChild(script);

    templateEl.innerHTML = template().html;

    this.append(templateEl.content.cloneNode(true));

    // api.get('/my-posts').then((e) => {
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