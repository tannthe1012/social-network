const render = () => {
  return ({
    html: /*html*/`
      <style>
        .avatar-upload {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .avatar-preview {
          width: 192px;
          height: 192px;
          position: relative;
          border-radius: 100%;
          border: 6px solid #F8F8F8;
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
        }

        .avatar-preview  > div {
          width: 100%;
          height: 100%;
          border-radius: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }
        #imagePreview {
          background-color: #fbcae399;
        }
        .labelUpload {
          cursor: pointer;
          padding: 5px 10px;
          background-color: pink;
          border-radius: 5px;
          color: #fff;
          font-size: 16px;
          font-weight: bold;
        }
        .btnModal {
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }
        .uploadBtn:disabled {
          background-color: #0000ff8f;
        }
        .uploadBtn {
          background-color: blue;
        }
      </style>
      <i data-visualcompletion="css-img" class="camera_icon" onclick="openUploadAvatarModal()"
      style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/aV84dwOO9N0.png&quot;); background-position: 0px -88px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
     
      <div class="modal" id="modalUploadAvatar">
        <div  class="modal-content max500">
          <div class="avatar-upload">
            <div class="avatar-edit">
              <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg"  class="display-none" onchange="changeFile(this)"/>
              <label for="imageUpload" class="labelUpload">
                Tải ảnh lên
              </label>
            </div>

            <div class="avatar-preview mt-2">
              <div id="imagePreview">
              </div>
            </div>

            <div class="flex mt-2">
              <button class="btnModal uploadBtn" disabled id="uploadAvatarBtn" onClick="uploadAvatar()">
                Tải lên
              </button>
              <button class="ml-1 btnModal" onClick="closeUploadAvatarModal()">
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  })
}

customElements.define('change-avatar',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const templateEl = document.createElement("template");

      templateEl.innerHTML = render().html;

      const script = document.createElement('script');
      script.textContent = `
        const changeFile = (input) => {
          if (input.files && input.files[0]) {
            const reader = new FileReader();
            const imagePreview = document.getElementById("imagePreview");
            document.getElementById("uploadAvatarBtn").disabled = false;

            reader.onload = function(e) {
              imagePreview.style.backgroundImage = 'url('+e.target.result +')';
            }
            reader.readAsDataURL(input.files[0]);
          }
        }

        const uploadAvatar = () => {
          const img = document.getElementById("imageUpload").files[0];
          let formData = new FormData();
          document.getElementById("uploadAvatarBtn").disabled = true;

          formData.append("mainAvatar", img);
          api.post('/me/update-avatar', formData).then((res) => {
            window.location.href = '/me';
          }).catch((err) => {
            console.log(err);
            document.getElementById("uploadAvatarBtn").disabled = false;

            Swal.fire(
              'Lỗi',
              'Update avatar không thành công',
              'error'
            )
          });
        }

        const closeUploadAvatarModal = () => {
          document.getElementById("modalUploadAvatar").style.display = "none";
        }

        const openUploadAvatarModal = () => {
          document.getElementById("modalUploadAvatar").style.display = "block";
        }
      `;
      this.appendChild(script);

      this.appendChild(templateEl.content.cloneNode(true));
    }
  }
);