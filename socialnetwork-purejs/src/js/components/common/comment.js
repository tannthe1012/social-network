import { api } from '../../helper/axios';

const renderCommentPost = (me, id, data) => {
  if (!data) {
    return ({
      html: /*html*/`
        <div class="mt-2 flex justifyCenter">
          <div class="progress-5"></div>
        </div>
      `
    })
  }
  return ({
    html:  /*html*/`
      ${data.reverse().map((comment) => (
        `
          <div class="mt-1 flex alignCenter">
            <img src="${comment.user.avatar_name}" class="smallAvatar" />
            <div class="commentContent">
              <div class="bold">${comment.user.full_name}</div>
              ${comment.content}
            </div>
          </div>
        `
      )).join("")}
      <div id="commentPostFirst${id}">
        </div>
      <div class="mt-1 flex alignCenter">
        <img src="data:image/jpeg;base64,${me.avatar_name}" class="smallAvatar" />
        <input class="searchUserInput inputComment flex-1" placeholder="Viết bình luận..." onkeypress="newComment(event, ${id})">
      </div>
    `
  })
}

class CommentPost extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const templateEl = document.createElement("template");
    const postId = JSON.parse(this.getAttribute('postId'));
    const me = JSON.parse(localStorage.getItem('user'));

    templateEl.innerHTML = renderCommentPost(me, postId).html;
    this.appendChild(templateEl.content.cloneNode(true));

    api.get(`/posts/${postId}/comment`).then((res) => {
      console.log(res);
      templateEl.innerHTML = renderCommentPost(me, postId, res.data).html;
      this.replaceWith(templateEl.content.cloneNode(true));
    }).catch((err) => {
      console.log(err);
    })
  }
}

customElements.define('comment-post', CommentPost);