import logo from '../../../assets/img/logo.png';
import { api } from '../../helper/axios';
import { getFuckingAwesomeDate } from '../../helper/dayjs';

import './renderFriendNotification';

const render = (user, friendReq) => {
  return ({
    html: /*html*/`
      <style type="text/css">
        #logo {
          max-width: 100px;
          object-fit: cover;
        }

        .containerHeader {
          display: flex;
          flex: 1;
          z-index: 1000;
          justify-content: center;
          position: sticky;
          top: 0;
          background-color: #fff;
          box-shadow: 0 4px 2px -2px pink;
        }
        .maxContainerHeader {
          padding: 20px;
          display: flex;
          flex: 1;
          justify-content: space-between;
        }
        .site-header__start {
          display: flex;
        }
        .search {
          margin-left: 20px;
          display: flex;
        }
        .search input {
          height: 100%;
        }
        #inputSearch {
          border-radius: 5px;
          border-color: pink;
        }
        .search__toggle {
          margin-left: 10px;
          background-color: pink;
          border: none;
          border-radius: 5px;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
        }

        .avatarHeader {
          height: 38px;
          width: 38px;
          object-fit: cover;
          background-color: pink;
          border-radius: 100%;
        }

        .friendNotificationContainer {
          position: relative;
          margin-right: 20px;
        }

        .friendNotification {
          cursor: pointer;
          font-size: 25px;
          color: pink;
        }
        .badge {
          position: absolute;
          background-color: red;
          color: #fff;
          border-radius: 100%;
          padding: 4px 8px;
          top: -18px;
          right: -10px;
        }
        .friendNotificationDisplay {
          min-height: 40px;
          width: 300px;
          position: absolute;
          right: 0;
          background-color: #f0f2f5;
          padding: 10px;
        }
        #friendNotificationDisplay {
          display: none;
        }
        .friendReq {
          background-color: #fff;
          padding: 5px;
          border-radius: 5px;
        }
        .displayTime {
          color: #65676b
        }
        .signOutIcon {
          color: pink;
          font-size: 25px;
          cursor: pointer;
        }
      </style>

      <div class="containerHeader">
        <div class="maxContainerHeader alignCenter">
          <div class="site-header__start">
            <a href="/" class="brand" is="router-link">
              <img src="${logo}" id="logo">  
            </a>
          
            <div class="search">
              <input type="search" dir="ltr" role="combobox" placeholder="Tìm kiếm" autocomplete="off" spellcheck="false" aria-invalid="false" value="" id="inputSearch">
              <button class="search__toggle" onclick="submitSearch()">
                Search
              </button>
            </div>
          </div>
      
          <div class="flex alignCenter">
            <friend-request-notification ${friendReq ? `data='${JSON.stringify(friendReq)}'` : ''} id="friend-request-notification"></friend-request-notification>
            
            <a is="router-link" href="/me" class="flex alignCenter">
              <img src="data:image/jpeg;base64,${user.avatar_name}" class="avatarHeader" />
              <div class="ml-1 bold">${user.full_name}</div>
            </a>

            <i class="fa fa-sign-out ml-1 signOutIcon" aria-hidden="true" onclick="signOut()"></i>
          </div>
        </div>
      </div>
    `,
  })
}

customElements.define('header-template',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      if (!localStorage.getItem('user')) {
        window.location.href = '/sign-in';
      }
      const user = JSON.parse(localStorage.getItem('user'));

      const templateEl = document.createElement("template");
      const script = document.createElement('script');

      script.textContent = `
        const submitSearch = () => {
          const keyword = document.getElementById("inputSearch").value;
          window.location.href = '/search?keyword=' + keyword;
        }

        const openFriendNotification = () => {
          console.log(document.getElementById("friendNotificationDisplay").style.display);
          if (document.getElementById("friendNotificationDisplay").style.display === "none") {
            document.getElementById("friendNotificationDisplay").style.display = "block";
          } else {
            document.getElementById("friendNotificationDisplay").style.display = "none";
          }
        };

        const acceptRequest = (userId, index) => {
          console.log(userId)
          document.getElementById("acceptFriendRequestBtn" + userId).disabled = true;

          socket.emit('acceptFriendRequest', {
            token: localStorage.getItem('USER_TOKEN'),
            userId,
          }, (isSuccess) => {
            console.log(isSuccess);
            if (isSuccess) {
              Swal.fire(
                'Thành công',
                'Đã gửi chấp nhận lời mời kết bạn',
                'success'
              )
              const notificationContainer = document.getElementById("friend-request-notification");
              const data = notificationContainer.getAttribute('data');
              if (data) {
                const parseData =JSON.parse(data);
                parseData.splice(index, 1);
                notificationContainer.setAttribute('data', JSON.stringify(parseData));
                notificationContainer.reset(); 
              }
            } else {
              document.getElementById("acceptFriendRequestBtn" + userId).disabled = false;
            }
          })
        }

        const signOut = () => {
          localStorage.clear();
          window.location.href = '/sign-in'
        }
      `;
      templateEl.innerHTML = render(user).html;
      this.appendChild(templateEl.content.cloneNode(true));
      
      api.get('/friends/request').then((res) => {
        this.removeChild(this.firstElementChild);
        this.removeChild(this.firstElementChild);

        templateEl.innerHTML = render(user, res.data.friendRequest).html;
        this.appendChild(templateEl.content.cloneNode(true));
      }).catch((err) => {
        console.log(err);
      })
      this.appendChild(script);
    }
  }
);