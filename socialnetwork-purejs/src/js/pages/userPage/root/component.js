import template from "./template.js";
import friendRequestStatus from '../../../enums/friendRequestStatus';

// LIKE: 1,
// HAHA: 2,
// ANGRY: 3,
// SAD: 4,
// LOVE: 5,
// WOW: 6,
// UNLIKE: 7,


export default class HomeRoot extends HTMLDivElement {
  static get route() { return "/(\\d+)"; }
  static get is() { return "user-page" }

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

      const newFriendRequest = (userId, myId) => {
        document.getElementById("btnAddFriend").disabled = true;
        
        socket.emit('newFriendRequest', {
          token: localStorage.getItem('USER_TOKEN'),
          userId,
        }, (isSuccess) => {
          if (isSuccess) {
            Swal.fire(
              'Thành công',
              'Đã gửi lời mời kết bạn',
              'success'
            )
            const friendRT= document.getElementById("friendRequestTemplate");
            friendRT.setAttribute('data', JSON.stringify({
              status: ${friendRequestStatus.REQUEST},
              sender_id: myId,
            }));
            friendRT.reset();
          } else {
            document.getElementById("btnAddFriend").disabled = false;
          }
        })
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

    `
    this.appendChild(script);

    templateEl.innerHTML = template(this.params[0]).html;

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