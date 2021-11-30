customElements.define('banner-template',
  class extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      const render = () => {
        return ({
          html: /*html*/`
            <style type="text/css">
              #profile-upper {
                position: relative;
              }

              #profile-d {
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
              }

              #profile-banner-image {
                height: 360px;
                overflow: hidden;
                z-index: 1;
              }

              #profile-banner-image img {
                width: 100%;
                margin-top: -20%;
              }

              #profile-pic {
                width: 180px;
                height: 180px;
                border-radius: 50%;
                margin-top: 28px;
                overflow: hidden;
                display: flex;
                position: relative;
                flex-direction: row;
                justify-content: flex-end;
                box-shadow: 0 0 0 5px #fff;

              }

              .picture {
                height: 0px;
                margin-top: 20px;
                display: flex;
                align-items: flex-end;
              }

              .picture i {
                position: relative;
                color: rgba(255, 255, 255, 0.3);
                cursor: pointer;
                right: 40px;
                bottom: 12px;


              }

              #profile-pic img {
                width: 100%;
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
                <img src="../images/nen1.jpg" alt="Banner image">

              </div>
              <div id="profile-d">
                <div class="picture">
                  <div id="profile-pic">
                    <img src="../images/logo1.png">
                  </div>
                  <i data-visualcompletion="css-img" class="camera_icon"
                    style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/aV84dwOO9N0.png&quot;); background-position: 0px -88px; background-size: auto; width: 20px; height: 20px; background-repeat: no-repeat; display: inline-block;"></i>
                </div>
                <div id="u-name">Himalaya Singh</div>
              </div>
            </div>
          `,
        })
      }

      const templateEl = document.createElement("template");
      // const script = document.createElement('script');
      // script.textContent = render().script;
      // this.shadowRoot.appendChild(script);

      templateEl.innerHTML = render().html;

      this.shadowRoot.append(templateEl.content.cloneNode(true));
    }
  }
);