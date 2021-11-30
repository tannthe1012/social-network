import '../../../components/common/header.js';
import '../../../components//myPage/coverImage/index.js';
import '../../../components//myPage/post/createPost.js';
import '../../../components//myPage/post/post.js';
import '../../../components/myPage/FriendInfo/index.js';
import '../../../components/myPage/userInfo/index.js';
import '../../../components/myPage/updateInfo/index.js';
import '../../../components/myPage/userInfo/userInfo.js';

const myPage = () => {
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
        #update{
          display:none;
         
        }
      </style>
      
      <header-template></header-template>
      
      <div id="main_page">
        <div>
          <cover-image></cover-image>
        </div>
      
        <div class="container_page">
          <div class="page_main_container">
            <div class="user_friend_info">
              <div class="modal" id="updateInfoContainer">
                <div class="modal-content">
                  <update-info></update-info>
                </div>
              </div>
              <my-info></my-info>
              <friend-list></friend-list>
            </div>
         
            <div class="w-5">
              <create-post></create-post>
              <div class="mt-2">
                <my-post></my-post>
              </div>
            </div>
        
          </div>
        </div>
      </div>
      <div id="update">
        <update-info></update-info>
      </div>
    `,
    script: /*html*/`
      <!-- const onClick = () => {
        alert(' hello ')
      } -->
    `,
  })
}

export default myPage;
