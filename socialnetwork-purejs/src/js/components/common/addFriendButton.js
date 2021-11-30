import friendRequestStatus from '../../enums/friendRequestStatus';

const render = (data, id, user) => {
  if (!data) return (
    `
      <button class="mainBtnCustom blueBg" onclick="newFriendRequest(${id}, ${user.id})" id="btnAddFriend">
        Gửi lời mời kết bạn
      </button>
    `
  )
  if (data.status == friendRequestStatus.ACCEPTED) return "<div>Bạn Bè</div>"

  if (user.id == data.sender_id) {
    if (data.status == friendRequestStatus.REQUEST)
      return (
        "<div>Đã gửi lời mời kết bạn</div>"
      )
  }

  if (user.id == data.receiver_id) {
    if (data.status == friendRequestStatus.REQUEST)
      return (
        `
          <button class="mainBtnCustom blueBg">
            Chấp nhận
          </button>
          <button class="mainBtnCustom ml-2 redBg">
            Từ chối
          </button>
        `
      )
  }
  return "";
}

customElements.define('friend-request-template',
  class extends HTMLElement {
    constructor() {
      super();
      this.reset = () => {
        this.removeChild(this.firstElementChild);
        const user = JSON.parse(localStorage.getItem('user'));
        const data = this.getAttribute('data') ? JSON.parse(this.getAttribute('data')) : null;
        const id = Number(this.getAttribute('userId'));

        const templateEl = document.createElement("template");
        templateEl.innerHTML = render(data, id, user);
        
        this.appendChild(templateEl.content.cloneNode(true));
      }
    }

    connectedCallback() {
      const user = JSON.parse(localStorage.getItem('user'));
      const data = this.getAttribute('data') ? JSON.parse(this.getAttribute('data')) : null;
      const id = Number(this.getAttribute('userId'));

      const templateEl = document.createElement("template");

      templateEl.innerHTML = render(data, id, user);

      this.appendChild(templateEl.content.cloneNode(true));
    }
  }
);