import '../../../components/sign-in/signIn.js';

const SignIn = () => {
  const states = {
    count: 1,
  }

  return ({
    states,
    html: /*html*/`
      <sign-in></sign-in>
    `,
    script: /*html*/`
      <!-- const onClick = () => {
        alert(' hello ')
      } -->
    `,
  })
}

export default SignIn;
