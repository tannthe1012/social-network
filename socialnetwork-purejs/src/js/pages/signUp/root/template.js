import '../../../components/sign-up/index.js';

const SignUp = () => {
  const states = {
    count: 1,
  }

  return ({
    states,
    html: /*html*/`
      <style>
        .sign_up{
          position: absolute;
          background-color: #f7e6fa;
          left: 50%;
          top: 50%;
          transform:translate(-50%, -40%);
        }
      </style>
      <div class="sign_up">
        <sign-up></sign-up>
      </div>
    `,
    script: /*html*/`
      <!-- const onClick = () => {
        alert(' hello ')
      } -->
    `,
  })
}

export default SignUp;
