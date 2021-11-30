import '../../common/changeAvatar';

const banner = (data) => {
  if (data) return ({
    html: /*html*/`
      <style type="text/css">
        #profile-upper {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          flex: 1;
          box-shadow: 0 4px 2px -2px pink;
          padding-bottom: 30px;
          background: linear-gradient(#eea4b7, #fff);
        }

        #profile-d {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        #profile-banner-image {
          width: 100%;
          height: 360px;
          max-width: 1200px;
        }

        #profile-banner-image img {
          width: 100%;
          object-fit: cover;
          height: 360px;
        }

        #profile-pic {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          margin-top: 28px;
          display: flex;
          position: relative;
          box-shadow: 0 0 0 5px #fff;
          justify-content: center;
          align-items: center;
          background-color: pink;
        }

        .picture {
          height: 0px;
          margin-top: 20px;
          display: flex;
          align-items: flex-end;
        }

        .picture i {
          position: absolute;
          color: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          right: 40px;
          bottom: 12px;
        }

        #profile-pic img {
          width: 90%;
          height: 90%;
          border-radius: 100%;
          object-fit: cover;
        }

        #u-name {
          color: black;
          font-size: 36px;
          font-weight: bold;
        }

        #edit-profile {
          position: relative;
          left: inherit;
          bottom: 25%;
          line-height: 1;
          cursor: pointer;
        }

        #edit-profile i {
          display: block;
          color: rgba(255, 255, 255, 0.3);
        }
      </style>

      <div id="profile-upper">
        <div id="profile-banner-image">
          <img src="${data.cover_name}" alt="Banner image">

        </div>
        <div id="profile-d">
          <div class="picture">
            <div id="profile-pic">
              <img src="${data.avatar_name}">
              <change-avatar></change-avatar>
            </div>
          </div>
          <div id="u-name">${data.full_name}</div>
        </div>
      </div>
    `,
  })

  return ({
    html: /*html*/`
      <style type="text/css">
        #profile-upper {
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          flex: 1;
          box-shadow: 0 4px 2px -2px pink;
        }

        #profile-d {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        #profile-banner-image {
          width: 100%;
          height: 360px;
          max-width: 1200px;
        }

        #profile-banner-image .img {
          width: 100%;
        }

        #profile-pic {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          margin-top: 28px;
          display: flex;
          position: relative;
          box-shadow: 0 0 0 5px #fff;
          justify-content: center;
          align-items: center;
        }

        .picture {
          height: 0px;
          margin-top: 20px;
          display: flex;
          align-items: flex-end;
        }

        .picture i {
          position: absolute;
          color: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          right: 40px;
          bottom: 12px;
        }

        #profile-pic .img {
          width: 90%;
          height: 90%;
          border-radius: 100%
        }

        #u-name {
          color: black;
          font-size: 36px;
          font-weight: bold;
        }

        #edit-profile {
          position: relative;
          left: inherit;
          bottom: 25%;
          line-height: 1;
          cursor: pointer;
        }

        #edit-profile i {
          display: block;
          color: rgba(255, 255, 255, 0.3);
        }

        .emptyDiv {
          height: 100px;
        }
      </style>

      <div id="profile-upper">
        <div id="profile-banner-image">
          <div class="img loading_placeholder"></div>
        </div>

        <div id="profile-d">
          <div class="picture">
            <div id="profile-pic">
              <div class="img loading_placeholder"></div>
              <i data-visualcompletion="css-img" class="camera_icon"
              style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/aV84dwOO9N0.png&quot;); background-position: 0px -88px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
            </div>
          </div>
        </div>

        <div class="emptyDiv">
        </div>
      </div>
    `,
  })
}

export default banner;