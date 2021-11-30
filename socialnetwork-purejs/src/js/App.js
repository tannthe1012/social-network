import { Router } from "./Router.js";
// import { RouterChat } from "./RouterChat.js";
import './components/chat/chatting.js';

import homeModule from "./pages/home/index.js"
import myPageModule from "./pages/myPage/index.js"
import userPageModule from "./pages/userPage/index.js"
import signInModule from "./pages/signIn/index.js"
import signUpModule from "./pages/signUp/index.js"
import searchModule from "./pages/search/index.js"

import StoreModule from "./pages/store/index.js"

Router.addModule("/sign-in", signInModule);
Router.addModule("/sign-up", signUpModule);

Router.addModule("/search", searchModule);

Router.addModule("/", homeModule);
Router.addModule("/me", myPageModule);
Router.addModule("/users", userPageModule);

Router.addModule("/store", StoreModule);

const div = document.querySelector("#app");
Router.setContainer(div);
Router.open(window.location.pathname);

