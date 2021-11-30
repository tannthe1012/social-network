import likePostType from '../../../enums/likePostType';

const renderActionPost = (data, me) => {
  let defaultDisplayUser = [];

  const formatLikes = {};
  const clonedDefaultDisplayUser = [...defaultDisplayUser];
  if (me !== null) {
    me.user =  {
      full_name: 'Bạn',
    }
    data.push(me);
  }

  data.forEach((like) => {
    if (clonedDefaultDisplayUser.length < 2) {
      clonedDefaultDisplayUser.push(like.user);
    }

    if (formatLikes[`${like.type}`]) {
      formatLikes[`${like.type}`].push(like.user);
    } else {
      formatLikes[`${like.type}`] = [like.user];
    }
  });

  defaultDisplayUser = clonedDefaultDisplayUser;


  const renderUserLike = () => {
    let total = 0;

    Object.keys(formatLikes).forEach((key) => {
      total += formatLikes[key].length;
    });

    if (total == 0) return '';
    return `${defaultDisplayUser.map((user) => user.full_name)} ${total - defaultDisplayUser.length > 0 ? `và ${total - defaultDisplayUser.length} người khác` : ''}`;
  };

    const sortKey = () => (
      Object.keys(formatLikes).sort((a, b) => (formatLikes[b].length - formatLikes[a].length))
    );

    const formatUserLike = (key) => (
      formatLikes[key].map((user) => ( 
        `
          <div>
            ${user.full_name}
          </div>
        `
      )).join("")
    );
  return ({
    html:  /*html*/`
      <div class="mt-1 flex alignCenter">
        ${sortKey().map((key) => (`<div class="tooltip mr-1"><div class="tooltiptext">${formatUserLike(key)}</div><img src="${likePostType.getLikePostLink(Number(key))}" class="smallIcon"></div>`)).join("")}
        <div class="secondary-text">
          ${renderUserLike()}
        </div>
      </div>
    `
  })
}

class ActionPost extends HTMLElement {
  constructor() {
    super();
    this.reset = () => {
      this.removeChild(this.firstElementChild);
      const templateEl = document.createElement("template");
      const data = JSON.parse(this.getAttribute('likes'));
      const me = JSON.parse(this.getAttribute('me'));

      templateEl.innerHTML = renderActionPost(data, me).html;
      this.appendChild(templateEl.content.cloneNode(true));
    };
  }

  connectedCallback() {
    const templateEl = document.createElement("template");
    const data = JSON.parse(this.getAttribute('likes'));
    const me = JSON.parse(this.getAttribute('me'));

    templateEl.innerHTML = renderActionPost(data, me).html;

    this.appendChild(templateEl.content.cloneNode(true));
  }
}

customElements.define('action-post', ActionPost);