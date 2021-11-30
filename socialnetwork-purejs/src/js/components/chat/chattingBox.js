import { api } from '../../helper/axios';
import { getFuckingAwesomeDate, getDifferencePerMinute } from '../../helper/dayjs';

const LONG_MINUTE = 5;

const renderUserChat = (withImg, content, userInfo) => (/*html*/`
    <div class="w100 flex w100 mb-05 alignCenter">
      <div>
        ${withImg && userInfo
          ? `<img src=${userInfo.avatar_name} alt="avatar" class="avatar_main avatarSmall" />`
          : `<div class="avatar_main avatarSmall bgNone"></div>`}
      </div>

      <div class="chatContent flex alignCenter w100">${content}</div>
    </div>
  `);

const renderMyChat = (content) => (/*html*/`
    <div class="flex mb-05 w100 justify-flexEnd mb-05">
      <div class="chatContent flex alignCenter w100">${content}</div>
    </div>
  `);

const renderTime = (time) => (/*html*/`
    <div class="flex justifyCenter mb-05 timeText">${getFuckingAwesomeDate(time)}</div>
  `);

const renderChatRow = (currentMessage, prevMessage, userId, userInfo) => {
  const result = [];

  if (prevMessage
    && getDifferencePerMinute(currentMessage.created_at, prevMessage.created_at) > LONG_MINUTE) {

    result.push(renderTime(currentMessage.created_at));
  }

  if (currentMessage.sender_id === Number(userId)) {
    const withImg = !prevMessage
      || (prevMessage.sender_id !== currentMessage.sender_id)
      || getDifferencePerMinute(currentMessage.created_at, prevMessage.created_at) > LONG_MINUTE;

    result.push(renderUserChat(withImg, currentMessage.content, userInfo));
  } else {
    result.push(renderMyChat(currentMessage.content));
  }

  return result.join("");
};

const render = (data, userId) => {
  if (data) {
    return ({
      html: /*html*/`
      <div class="chattingBox mr-1">
        <div class="flex justify-between">
          <div class="flex alignCenter">
            <img class="avatar_main" src="${data.userInfo.avatar_name}">
            <div>
              ${data.userInfo.full_name}
            </div>
          </div>

          <i class="fa fa-times pointer" aria-hidden="true" onclick="closeChattingUser(${data.userInfo.id})"></i>
        </div>

        <hr class="mt-1 mb-1 w100">

        <div class="flex-column-reverse flex-1 scrollAuto">
          <div class="flex-column-reverse" id="chattingMessages${userId}">
            ${data.messages.map((message, index) => (
              `
                ${renderChatRow(message, index > 0 && data.messages[index - 1], userId, data.userInfo)}
              `
            )).join("")}
          </div>
        </div>

        <div class="flex">
          <input class="inputChattingUser" onkeypress="addNewMessage(event)">
        </div>
      </div>
    `,
    })
  }
  
  return ({
    html: /*html*/`
      <div class="chattingBox mr-1">
        <div class="avatar_main">
        </div>
      </div>
    `,
  })
}

customElements.define('chatting-user',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const templateEl = document.createElement("template");
      const script = document.createElement('script');
      const userId = this.getAttribute('userId');

      script.textContent = `
        const closeChattingUser = (id) => {
          const chatContainer = document.getElementById("chatting-user" + id);
          console.log(chatContainer);
          if (chatContainer) {
            const container = document.getElementById("userChatting");
            container.removeChild(chatContainer);
          }
        }
        const addNewMessage = (e) => {
          if (e.keyCode == 13 && e.target.value.length > 0) {
            const myChat = document.createElement("div");
            myChat.innerHTML = '<div class="flex mb-05 w100 justify-flexEnd mb-05"><div div class="chatContent flex alignCenter w100">' + e.target.value + '</div ></div>'
            const chattingContainer = document.getElementById("chattingMessages${userId}");
            chattingContainer.insertBefore(myChat, chattingContainer.firstChild);

            socket.emit('new message',
              { token: localStorage.getItem('USER_TOKEN'), userId: ${userId}, message: e.target.value},
              (isSuccess) => {
                if (!isSuccess) {
                  Swal.fire(
                    'Lỗi',
                    'Tin nhắn: "' + e.target.value + '" gửi đi không thành công',
                    'error'
                  )
                  chattingContainer.removeChild(myChat);
                }
              }
            );
            e.target.value = '';
          }
        }
      `;

      templateEl.innerHTML = render().html;
      this.appendChild(templateEl.content.cloneNode(true));

      api.get(`/messages/friends/${userId}`, {
        params: {
          limit: 10,
        }
      }).then((res) => {
        console.log(res)
        this.removeChild(this.firstElementChild);

        templateEl.innerHTML = render(res.data, userId).html;
        this.appendChild(templateEl.content.cloneNode(true));
      }).catch((err) => {
        console.log(err);
      })

      this.appendChild(script);
    }
  }
);