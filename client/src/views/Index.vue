<template>
  <div class="container">
    <div class="login-container">
      <div class="login-icon">
        <img src="@/assets/img/main2.jpg" alt="" class="center" style="margin-top: 15%;margin-bottom: 20px" />
        <h1 class="login-title">CROSSFIT LANKA</h1>
      </div>
      <div class="loginOptions">
        <center>
          <div id="googleBtn"></div>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router/index";
import { useStore } from "vuex";
import store from "../store";
export default {
  setup: () => {},
  data() {
    return {
      store: useStore(),
      user: store.getters.getCurrentUser,
    };
  },
  methods: {},
  mounted: function () {
    if (this.user) {
      if (this.user.token) router.push("/home");
    } else {
      google.accounts.id.initialize({
        client_id:
          "280820313619-hfdvj118o6snfvoaa3hd28qbbovq9faq.apps.googleusercontent.com",
        callback: onSignIn,
      });
      google.accounts.id.prompt();
      google.accounts.id.renderButton(document.getElementById("googleBtn"), {
        theme: "outline",
        size: "large",
        text: "signin_with",
        type: "standard",
        shape: "pill",
        logo_alignment: "left",
      });
      function onSignIn(googleUser) {
        axios
          .get(
            `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleUser.credential}`
          )
          .then((response) => {
            axios
              .post(`http://localhost:8070/user/login`, {name: response.data.name, email: response.data.email, googleId: response.data.sub})
              .then((res) => {
                if (!res.data.error) {
                  store.dispatch("updateCurrentUser", {
                    email: response.data.email,
                    name: response.data.name,
                    sub: response.data.sub,
                    token: res.data.data.token,
                    id: res.data.data.user._id,
                    role: res.data.data.user.role,
                    loggedIn: new Date(),
                  });
                  router.push("/home");
                }
              });
          });
      }
    }
  },
};
</script>

<style>
.login-title{
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    font-size: 3rem
}

.loginOptions{
    margin-top: 2%;
}
</style>