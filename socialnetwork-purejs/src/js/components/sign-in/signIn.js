customElements.define('sign-in',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const testHere = () => {
        return ({
          html: /*html*/`
            <style type="text/css">
              *{
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body{
              font-size: 14px;
              background-color: #f0f2f5;
            }
            .container{
              max-width: 1000px;
              margin: auto;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .row{
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .facebook h1{
              font-size: 50px;
              font-family: sans-serif;
              color: #ff33ff;
              margin-bottom: 15px;
            }
            .facebook p{
              font-family: -apple-system, 
              BlinkMacSystemFont, sans-serif;
              font-size: 2em;
              margin-left: 10px;
              color: #9933ff;
            }
            .contact{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: stretch;
              font-family: 'Helvetica';
              padding: 20px 20px;
              text-align: center;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
            }
            .contact h2{
              font-size: 2.2em;
              margin: 15px;
              color: #ff33ff;
            }
            .form {
              display: flex;
              flex-direction: column;
            }
            .form input{
              padding: 14px 16px;
              font-size: 17px;
              border-radius: 6px;
              border:1px solid #dddfe2;
              color: #1d2d29;
              line-height: 16px;
              margin-bottom: 10px;
            }

            /*BUTTON*/

            .btn{
              padding: 16px;
              border-radius: 6px;
              border: none;
              font-size: 20px;
              font-family: 'Helvetica';
              font-weight: bold;
              color: #fff;
              margin: 10px 0;
              cursor: pointer;

            }
            .btn-blue{
              background-color: #ff4dd2;
            }

            .btn-new{
              background-color: #cc00ff;
              font-size: 17px;
              margin: 15px 0;

            }
            .question p{
              color:  #ff00ff;
              font-size: 14px;
              font-weight: 500;
              margin: 10px 0;
            }
            .question div{
              display: block;
              overflow: hidden;
            }

            .or{
              color: #ff1ac6;
              font-size: 12px;
              position: relative;
            }

            .or::before, .or::after{
              content: "";
              position: absolute;
              top: 50%;
              height: 1px;
              width: 999px;
              background-color: #d7dade;
            }

            .or::before{
              margin-right: 15px;
              right: 100%;

            }

            .or::after{
              margin-left: 15px;
              left: 100%;
            }

            a {
              display: block;
              text-decoration: none;
            }

            button:disabled {
              background-color: #bbbec1;
            }

            /*Media Query*/

            @media (max-width: 1024px) {
              .row{
                flex-direction: column;
              }
              .facebook{
                text-align: center;
                margin-bottom: 15px;
              }
              .facebook p{
                display: none;
              }
            }

            @media (min-width: 600px){
              .facebook {
                width: 600px;
              }

              .contact{
                width: 396px;
              }
            }
            </style>

            <div class="container">
              <div class="row">
                <!--<div class="facebook">
                  <h1>BK-N-20</h1>
                  <p>BK-N-20 help you connect and share with your friend in your University.</p>
                </div> -->
                <div class="contact">
                  <h2>Login to BK-N-20</h2>
                  <form class="form" onsubmit="return signIn()">
                    <input type="email" placeholder="Enter your email" id="email" required>
                    <input type="password" placeholder="Password" id="password" required>
                    <button class="btn btn-blue" id="loginButton">Login</button>
                  </form>
                  <div class="question">
                    <p>Forgot password ?</p>
                    <div><span class="or">or</span></div>
                  </div>
                  <div class="new">
                    <a is="router-link" class="btn btn-new" href="/sign-up">Create New Account</a>
                </div>
              </div>
            </div>
        `,
        })
      }

      const templateEl = document.createElement("template");
      const script = document.createElement('script');
      script.textContent = testHere().script;
      this.appendChild(script);

      templateEl.innerHTML = testHere().html;

      this.append(templateEl.content.cloneNode(true));
    }
  }
);