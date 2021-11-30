import '../../../components/common/header.js';
import '../../../components/home/homePost.js';

const test = () => {
  const states = {
    count: 1,
  }

  return ({
    states,
    html: /*html*/`
      <style>
        .homePostContainer {
          width: 90%;
          min-width: 500px;
          max-width: 700px;
          margin-top: 50px;
        }
        .watchMoreBtn {
          width: 200px;
          padding: 10px;
          background-color: pink;
          border: 10px;
          border-radius: 10px;
          cursor: pointer;
        }
      </style>

      <header-template></header-template>

      <div class="flex-column alignCenter">
        <div class="homePostContainer">
          <home-post id="home-post"></home-post>
        </div>

        <div class="mt-2 mb-2">
          <!-- <div class="watchMoreBtn flex alignCenter justifyCenter">
            Xem thêm
          </div> -->
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

export default test;
