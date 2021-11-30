import './chattingBox';

customElements.define('chatting-template',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const render = () => {
        return ({
          html: /*html*/`
            <style type="text/css">
              .newChatBtn {
                cursor: pointer;
                border-radius: 100%;
                width: 50px;
                height: 50px;
                background-color: #fff;
                box-shadow: 0 0 1px 0 #ffb6c1, 0 3px 4px -2px #ffb6c1;
              }
              .chattingContainer {
                position: fixed;
                bottom: 0;
                right: 30px;
                display: flex;
                align-items: flex-end;
              }
              .chattingBox {
                box-shadow: 0 0 1px 0 #ffb6c1, 0 3px 4px -2px #ffb6c1;
                width: 365px;
                height: 455px;
                background-color: #fff;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                padding: 20px 15px 10px 15px;
                display: flex;
                flex-direction: column;
              }
              #newChatting {
                display: none;
              }
              .searchUserInput, .searchUserInput:focus {
                border: none;
                line-height: 40px;
                border-bottom: solid 1px pink;
                outline: none;
              }
              #userChattingResult {
                padding: 10px 0px;
              }
              #userChattingResult {
                overflow: auto;
              }
              .inputChattingUser, .inputChattingUser:focus {
                width: 100%;
                background-color: #f3e1f5;
                border: none;
                line-height: 40px;
                border-bottom: solid 1px pink;
                outline: none;
                border-radius: 100px;
                padding-left: 15px;
                padding-right: 15px;
              }
              .chatContent {
                background-color: pink;
                padding-left: 10px;
                padding-right: 10px;
                border-radius: 10px;
                max-width: 60%;
                line-break: anywhere;
                white-space: pre-wrap;
                line-height: 2rem;
                height: fit-content;
              }
              .timeText {
                color: #65676b;
              }
              .avatarSmall {
                width: 2.5rem;
                height: 2.5rem;
              }
              .mb-05 {
                margin-bottom: 4px;
              }
            </style>

            <div class="chattingContainer">
              <div id="userChatting" class="flex">
              </div>

              <div id="newChatting" class="chattingBox mr-1">
                <div class="flex justify-between">
                  Tin nhắn mới
                  <i class="fa fa-times pointer" aria-hidden="true" onclick="closeNewChatting()"></i>
                </div>

                <hr class="mt-2 mb-2 w100">

                <input class="searchUserInput" placeholder="Tìm kiếm" onkeypress="searchUserChat(event)">

                <div class="flex-column alignCenter" id="userChattingResult">
                </div>
              </div>

              <div class="flex-column">
                <div class="newChatBtn flex alignCenter justifyCenter mb-2" onclick="openNewChatting()">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          `,
        })
      }

      const templateEl = document.createElement("template");
      const script = document.createElement('script');
      
      script.textContent = `
        const closeNewChatting = () => {
          document.getElementById("newChatting").style.display = "none";
        }

        const openNewChatting = () => {
          document.getElementById("newChatting").style.display = "flex";
        }

        const renderUserChatting = (data) => {
          return data.map((user) => (
            "<div class='w100 flex alignCenter mt-2 pointer' onclick='addChatting(" + user.id + ")'><img class='avatar_main' src=" + user.avatar_name + "></img><div>"
            + user.full_name +"</div></div>"
          )).join("")
        }

        const searchUserChat = (e) => {
          if (e.keyCode == 13) {
            const node = document.createElement("div");
            node.setAttribute("class", "progress-5 mt-2");
  
            const container = document.getElementById("userChattingResult");
            container.innerHTML = 'Loading...';
            container.appendChild(node);
  
            api.get('/suggest/users', {
              params: {
                offset: 0,
                limit: 10,
                keyword: e.target.value,
              }
            }).then((result) => {
              container.innerHTML = renderUserChatting(result.data);
            })
          }
        }

        const addChatting = (id) => {
          const hasChat = document.getElementById("chatting-user" + id);
          if (!hasChat) {
            const container = document.getElementById("userChatting");
            const newChat = document.createElement("chatting-user");
            newChat.setAttribute("userId", id);
            newChat.setAttribute("id", "chatting-user" + id);
            container.appendChild(newChat);
          }
        }
      `;

      this.appendChild(script);

      templateEl.innerHTML = render().html;

      this.append(templateEl.content.cloneNode(true));
    }
  }
);