import { getFuckingAwesomeDate } from '../../helper/dayjs';

const render = (friendReq) => {
  return (
/*html*/`
      <div class="friendNotificationContainer">
        <i class="fa fa-users friendNotification" aria-hidden="true" onclick="openFriendNotification()"></i>
        <div class="badge">${friendReq ? friendReq.length : 0}</div>

        <div class="friendNotificationDisplay custom_box" id="friendNotificationDisplay">
          ${friendReq ? friendReq.map((req, index) => (
            `
              <div class="mb-1 friendReq" id="friendNotificationDisplay${req.sender_id}">
                <div class="flex">
                  <img class="avatar_main" src=${req.sender.avatar_name} />
                  <div>
                    <div>
                      <b class="displayContent">${req.sender.full_name}</b> đã gửi cho bạn lời mời kết bạn
                      <div class="displayTime">
                        ${getFuckingAwesomeDate(req.created_at)}
                      </div>
                                                
                      <div class="mt-1">
                        <button class="mainBtnCustom blueBg" id="acceptFriendRequestBtn${req.sender_id}" onclick="acceptRequest(${req.sender_id}, ${index})">
                          Chấp nhận
                        </button>
                        <button class="mainBtnCustom ml-2 redBg">
                          Từ chối
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `
          )).join("") : ''}
        </div>
      </div>
    `
  )
}

customElements.define('friend-request-notification',
  class extends HTMLElement {
    constructor() {
      super();
      this.reset = () => {
        this.removeChild(this.firstElementChild);
        const data = this.getAttribute('data') ? JSON.parse(this.getAttribute('data')) : null;

        const templateEl = document.createElement("template");
        templateEl.innerHTML = render(data);

        this.appendChild(templateEl.content.cloneNode(true));
      }
    }

    connectedCallback() {
      console.log(this.getAttribute('data'));
      const data = this.getAttribute('data') ? JSON.parse(this.getAttribute('data')) : null;
      const templateEl = document.createElement("template");

      templateEl.innerHTML = render(data);

      this.appendChild(templateEl.content.cloneNode(true));
    }
  }
);