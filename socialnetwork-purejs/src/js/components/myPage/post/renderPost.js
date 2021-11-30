import { formatLocalDateTime } from '../../../helper/dayjs';
import likePostType from '../../../enums/likePostType';
import './actionTemplate';

const renderPost = (data) => {
  if (data) {
    const user = JSON.parse(localStorage.getItem('user'));
    const avatar = user.avatar_name;
    const name = user.full_name;
  
    const renderType = {
      1: '<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Thích</p>',
      2: '<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Ha ha</p>',
      3: '<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Tức giận</p>',
      4: '<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Buồn</p>',
      5: '<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Yêu thích</p>',
      6: '<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control blue-color">Wow</p>',
      7: '<i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i><p class="text-control">Thích</p>',
    }
    const defaultType = data.me ? data.me.type : 7;
    
    return ({
      html: /*html*/`
        <style type="text/css">

        </style>

        <div class="custom_box p20 mb-2">
          <div class="flex alignCenter">
            <img src="data:image/jpeg;base64,${avatar}" class="avatar_main" />
            <div class="flex-column">
              <div class="bold">
                ${name}
              </div>

              <div class="mt-1 secondary-text">
                ${formatLocalDateTime(data.created_at)}
              </div>
            </div>
          </div>
  
          <div class="mt-1">
            <div class="breakContent mt-1">${data.content || ''}</div>
            <div>
              ${data.image_name
                ? `<img src="${data.image_name}" alt="img" class="imgPost_main mt-1" />`
                : ''}
            </div>
          </div>

          <action-post likes='${JSON.stringify(data.likes)}'  ${data.me ? `me='${JSON.stringify(data.me)}'` : ''} id='action-post-${data.id}'></action-post>

          <hr class="mt-1 mb-1">

          <div class="flex alignCenter justify-around relative">
            <div id="likePost" class="flex alignCenter justifyCenter flex-1 icon_btn_custom">
              <div class="reactionContainer custom_box p2">
                ${likePostType.getValueExcept([likePostType.UNLIKE]).map((val) => (
                  `
                    <img src="${likePostType.getLikePostLink(val)}" class="reactionIcon" onclick="likePost(${data.id}, ${val})">
                  `
                )).join("")}
              </div>
              <div id="like-btn-${data.id}" class="flex alignCenter">
                ${renderType[defaultType]}
              </div>
            </div>

            <div class="flex alignCenter justifyCenter flex-1 icon_btn_custom" onclick="displayComment(${data.id})">
              <i class="fa fa-comments-o fa-lg mr-1" aria-hidden="true"></i>
              <p class="text-control">Bình luận</p>
            </div>

            <div id="sharePost${data.id}" class="flex alignCenter justifyCenter flex-1 icon_btn_custom">
              <i class="fa fa-share-square-o fa-lg mr-1" aria-hidden="true"></i>
              <p class="text-control">Chia sẻ</p>
            </div>
          </div>

          <div id="commentPost${data.id}">
          </div>
        </div>
      `
    })
  }

  return ({
    html: /*html*/`
      <style type="text/css">
        .inter_draw_top {
          background: #FFF;
          width: 20px;
          height: 100px;
          position: absolute;
          left: 100px;
        }

        .inter_draw_top_2 {
          background:  #FFF;
          width: 100%;
          height: 20px;
          position: absolute;
          left: 100px;
          top: 40px;
        }

        .inter_draw {
          background:  #FFF;
          width: 100%;
          height: 20px;
          position: absolute;
          top: 100px;
        }

        .p2 {
          padding: 20px;
        }
        .h500 {
          height: 500px;
        }
      </style>

      <div class="custom_box p2">
        <div class="loading_placeholder h500">
          <div class="inter_draw_top"></div>
          <div class="inter_draw_top_2"></div>
          <div class="inter_draw"></div>
        </div>
      </div>
    `,
  })
}

export default renderPost;