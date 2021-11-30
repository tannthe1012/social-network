customElements.define('create-post',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const render = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const avatar = user.avatar_name;
        const name = user.full_name;
        return ({
          html: /*html*/`
            <style type="text/css">
              textarea {
                  outline: none;
                  resize: none;
              }

              #create-post {
                font-size: 18px;  
                display: block;
                background-color: var(--background-color);
                width: 500px;
                height: auto;
                padding: 0 15px;
                margin: auto;
                border-radius: 8px;
                border: 1px solid #D8DADF;
                color: #5B626A;
                /* visibility: hidden; */
              }

              .form-control {
                width: 100%;
                display: flex;
                padding: 10px 0 15px 0;
                margin: 2px;
              }

              .avatar-control {
                  width: 50px;
                  height: 50px;
                  margin-left: 20px;
                }


              .avatar {
                  background: pink;
                  margin-right: 10px;
                  border-radius: 50%;
                  padding: 0;
                  width: 50px;
                  height: 50px;
                  object-fit: cover;
              }

              .status-control {
                  margin-left: 10px;
                  margin-right: 20px;
                  width: 100%;
                  padding: 10px;
                  background-color: #F0F2F5;
                  border-radius: 20px;
                  cursor: pointer;
              }

              .status-control > span {
                  padding: 0 10px;   
              }

              .option {
                  display: flex;
                  height: 40px;
                  font-size: smaller;
                  padding: 5px 0;
              }

              .other-option {
                  width: 30%;
                  display: flex;
                  padding: 15px 5px;
                  align-items: center;
                  margin: 5px;
                  border-radius: 8px;
                  justify-content: center;
              }

              .text-control {
                  margin: 9px 0;
              }

              .icon-control {
                  margin: 2px 5px;
                  font-size: 25px;
              }
                
              .fa-video-camera {
                  color: #E42645;
              }

              .fa-file-image-o{
                  color: #41B35D;
              }

              .fa-flag {
                  color: #36A6CA;
              }

              .fa-tags {
                  color: #36A6CA;
              }


              #input-post {
                  position: absolute;
                  top: 75px;
                  left: 425px;
                  width: 500px;
                  height: 428px;
                  background-color: var(--background-color);
                  visibility: hidden;
              }

              #title {
                  position: relative;
                  display: flex;
                  width: 100%;
                  border-bottom:1px solid var(--focus) ;
              }

              #title > h2{
                  text-align: center;
                  width: 100%;
                  margin-top: 15px;
              }

              .exit-icon {
                  width: 35px;
                  height: 35px;
                  margin: 0;
                  position: absolute;
                  top: 8px;
                  right: 20px;
                  border-radius: 50%;
                  background-color: var(--hover);
              }

              .exit-icon::before {
                  position: inherit;
                  top: 5px;
                  left: 8px;
              }

              #form-post {
                  flex-direction: column;
              }

              #content {
                  max-height: 240px;
              }
              .infor {
                  display: flex;
                  flex-direction: row;
                  position: inherit;
                  padding: 10px;
              }

              #name {
                  margin: 0;
                  font-size: 20px;
                  font-weight: bold;
              }
              #privacy-post {
                  background-color: var(--hover);
                  display: flex;
                  font-size: smaller;
                  border-radius: 10px;
                  padding: 0 5px;
                  max-height: 25px;
              }

              .fa-lock {
                  font-size: 15px;
                  margin: 5px 5px;
              }

              .privacy-status {
                  margin: 5px 0;
              }

              .fa-arrow-down {
                  margin: 7px 0 5px 4px;
              }

              .writing-status {
                  max-height: 160px;
                  max-width: 480px;
                  position: relative;
              }

              #newPostTextArea {
                  height: 80px;
                  width: 430px;
                  border: none;
                  margin: 5px 15px;
                  padding: 10px;
                  font-size: larger;
                  border-style: hidden;
              }

              .fa-smile-o {
                  position: absolute;
                  right: 10px;
                  margin: 5px 0;
                  padding: 3px 5px;
                  color: var(--hover);
                  bottom: -30px;
                  border-radius: 50%;
              }

              .add-utili {
                  display: flex;
                  margin: 35px 10px 10px 8px;
                  padding: 5px;
                  border: 2px solid var(--hover);
                  border-radius: 10px;
                  justify-content: space-between;
              }

              .add-title {
                  margin-left: 20px;
              }

              .icon-utili > i{
                padding: 7px;
                margin: 0 5px;
                border-radius: 50%;
              }

              #upload {
                margin: 10px;
              }

              #newPostBtn {
                width: 100%;
                padding: 10px;
                background-color: pink;
                border: none;
                border-radius: 6px;
                font-weight: bold;
                cursor: pointer;
                color: #fff;
              }

              #newPostBtn:disabled {
                background-color: #E4E6EB;
              }

              /* Xử lý hover của create post */

              .other-option:hover {
                background-color: var(--hover);
                transition: var(--trans);
                transition-timing-function: var(--trans-timing);
                cursor: pointer;
              }

              .status-control:hover {
                cursor: pointer;
              }

              /* Xử lý hover của input post */

              .icon-control:hover {
                  background-color: var(--focus);
                  transition: var(--trans);
                  transition-timing-function: var(--trans-timing);
                  cursor: pointer;
              }

              #privacy-post:hover {
                  background-color: var(--focus);
                  transition: var(--trans);
                  transition-timing-function: var(--trans-timing);
                  cursor: pointer;
              }

              .max500 {
                max-width: 500px;
              }
            </style>

            <div class="custom_box">
              <form class="form-control">
                <a href="" class="avatar-control form-component-control"><img
                    src=data:image/jpeg;base64,${avatar} alt="avatar"
                    class="avatar" /></a>
                <div class="status-control form-component-control" role="button" onclick="newMessage()">
                  <span id='previewPost'>Bạn đang nghĩ gì ?</span>
                </div>
              </form>
              <div class="option">
                <div class="other-option">
                  <i class="fa fa-video-camera icon-control" aria-hidden="true"></i>
                  <p class="text-control">Video trực tiếp</p>
                </div>
                <div class="other-option">
                  <i class="fa fa-file-image-o icon-control" aria-hidden="true"></i>
                  <p class="text-control">Ảnh/Video</p>
                </div>
                <div class="other-option">
                  <i class="fa fa-flag icon-control" aria-hidden="true"></i>
                  <p class="text-control">Sự kiện trong đời</p>
                </div>
              </div>
            </div>

            <div class="modal" id="newPostModal">
              <div class="modal-content max500">
                <div id="title">
                  <h2 class="text-control">Tạo bài viết</h2>
                  <i class="fa fa-times icon-control exit-icon" aria-hidden="true" onclick="closeModal()"></i>
                </div>
                <form action="" class="form-control" id="form-post">
                  <div id="content">
                    <div class="infor">
                      <img src="data:image/jpeg;base64,${avatar}"
                        alt="avatar" class="avatar" />
                      <div class="name-privacy-control">
                        <p id="name" class="text-control ">${name}</p>
                        <div id="privacy-post">
                          <p class="privacy-status text-control">Công khai</p>
                          <i class="fa fa-globe icon-control" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                    <div class="writing-status">
                      <textarea id="newPostTextArea" placeholder="Bạn đang nghĩ gì?"></textarea>
                      <i class="fa fa-smile-o icon-control" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div class="add-utili">
                    <p class="add-title text-control">Thêm vào bài viết</p>
                    <div class="icon-utili">
                      <i class="fa fa-file-image-o icon-control" aria-hidden="true"></i>
                      <i class="fa fa-tags icon-control" aria-hidden="true"></i>
                      <i class="fa fa-video-camera icon-control" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div id="upload">
                    <input type="button" value="Đăng" disabled id="newPostBtn">
                  </div>
                </form>
              </div>
            </div>
          `,
        })
      }

      const templateEl = document.createElement("template");
      const script = document.createElement('script');
      script.textContent = `
        const newMessage = () => {
          document.getElementById('newPostModal').style.display= "block";

          const textArea = document.getElementById('newPostTextArea');
          const newPostBtn = document.getElementById('newPostBtn');

          textArea.addEventListener('input', () => {
            const value = textArea.value;
            document.getElementById('previewPost').innerHTML = value;
              if (value.length > 0) {
                newPostBtn.disabled = false;
              
              } else {
                newPostBtn.disabled = true;
              }
          })

          newPostBtn.addEventListener('click', () => {
              newPostBtn.disabled = true;
              const value = textArea.value;

              api.post('/posts', {
                type: 2,
                content: value,
              }).then((res) => {
                window.location = '/me';
              }).catch((error) => {
                alert(error.response.data ? error.response.data.message : 'Có lỗi xảy ra vui lòng thử lại');
              });
          })
        }

        const closeModal = () => {
          document.getElementById('newPostModal').style.display= "none";
        }

        const displayComment = (id) => {
          const container = document.getElementById('commentPost' + id);
          console.log(container);
          container.innerHTML = '<comment-post postId="' + id + '"></comment-post>';
        }

        const newComment = (e, id) => {
          if (e.keyCode == 13 && e.target.value.length > 0) {
            const container = document.getElementById('commentPostFirst' + id);
            const myComment = document.createElement("div");
            myComment.setAttribute("class", "w100 flex alignCenter");
            myComment.innerHTML = "Loading....";
            container.appendChild(myComment);

            api.post('/posts/comment', {
              postId: id,
              content: e.target.value,
            }).then((res) => {
              const user = JSON.parse(localStorage.getItem('user'));
              myComment.innerHTML = '<div class="mt-1 flex alignCenter"><img src="data:image/jpeg;base64,' + user.avatar_name +'" class="smallAvatar" /><div class="commentContent"><div class="bold">' + user.full_name + '</div>' + e.target.value +'</div></div>';
            }).catch((e) => {
              container.removeChild(myComment);
            })
          }
        }
      `;

      this.appendChild(script);

      templateEl.innerHTML = render().html;

      this.append(templateEl.content.cloneNode(true));
    }
  }
);