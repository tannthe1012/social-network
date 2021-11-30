import angry from '../../assets/img/angry.gif';
import haha from '../../assets/img/haha.gif';
import sad from '../../assets/img/sad.gif';
import like from '../../assets/img/like.gif';
import love from '../../assets/img/love.gif';
import wow from '../../assets/img/wow.gif';

const Enum = require('./Enum.js');

class LikePostType extends Enum {
  getLikePostTitle(key) {
    switch (key) {
      case this.LIKE:
        return 'Thích';
      case this.HAHA:
        return 'Ha Ha';
      case this.ANGRY:
        return 'Tức giận';
      case this.SAD:
        return 'Buồn';
      case this.LOVE:
        return 'Yêu Thích';
      case this.WOW:
        return 'Wowy';
      default:
        return '';
    }
  }

  getLikePostLink(key) {
    switch (key) {
      case this.LIKE:
        return like;
      case this.HAHA:
        return haha;
      case this.ANGRY:
        return angry;
      case this.SAD:
        return sad;
      case this.LOVE:
        return love;
      case this.WOW:
        return wow;
      default:
        return '';
    }
  }

  renderLike(ke) {
    switch (key) {
      case this.LIKE:
        return `
          <i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i>
          <p class="text-control blue-color">Thích</p>
        `;
      case this.HAHA:
        return `
          <i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i>
          <p class="text-control blue-color">Ha Ha</p>
        `;
      case this.ANGRY:
        return `
          <i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i>
          <p class="text-control blue-color">Tức giận</p>
        `;
      case this.SAD:
        return `
          <i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i>
          <p class="text-control blue-color">Buồn</p>
        `;
      case this.LOVE:
        return `
          <i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i>
          <p class="text-control blue-color">Yêu thích</p>
        `;
      case this.WOW:
        return `
          <i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i>
          <p class="text-control blue-color">Wow</p>
        `;
      default:
        return `
          <i class="fa fa-thumbs-o-up fa-lg mr-1" aria-hidden="true"></i>
          <p class="text-control">Thích</p>
        `;
    }
  }
}

const a = new LikePostType({
  LIKE: 1,
  HAHA: 2,
  ANGRY: 3,
  SAD: 4,
  LOVE: 5,
  WOW: 6,
  UNLIKE: 7,
});

export default a;
