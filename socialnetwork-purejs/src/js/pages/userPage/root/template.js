import '../../../components/common/header.js';
import '../../../components//userPage/coverImage/index.js';
import '../../../components//userPage/post/post.js';
import '../../../components/userPage/FriendInfo/index.js';
import '../../../components/userPage/userInfo/index.js';

const userPage = (id) => {
  const states = {
    count: 1,
  }

  return ({
    states,
    html: /*html*/`
      <style type="text/css">
        .page_main_container {
          width: 100%;
          margin-top: 20px;
          max-width: 1000px;
          display: flex;
          justify-content: space-between;
        }
        .container_page {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }
        .user_friend_info{
          width:50%;
        }
        .w-5 {
          width: 50%;
        }
      </style>
      
      <header-template></header-template>
      <div>
        <cover-image-user userId="${id}"></cover-image-user>
      </div>
      
      <div class="container_page">
        <div class="page_main_container">
          <div class="user_friend_info">
            <user-info  userId="${id}"></user-info>
            <friend-list-user  userId="${id}"></friend-list-user>
          </div>
         
          <div class="w-5">
            <div class>
              <user-post userId="${id}"></user-post>
            </div>
          </div>
        
        </div>
      </div>
    `,
    script: /*html*/`
      <!-- const onClick = () => {
        alert(' hello ')
      } -->
    `,
  })
}

export default userPage;
