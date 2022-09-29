<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="nav-item" to="/home"
        ><a class="nav-link" href="#">
          <img
            src="../assets/img/crossfit.jpg"
            width="120"
            height="40"
            alt=""
          /> </a
      ></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span></button
      >&nbsp;&nbsp;
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link class="nav-item" to="/about"
            ><a class="nav-link" href="#">ABOUT US</a></router-link
          >&nbsp;&nbsp;
          <router-link class="nav-item" to="/shop"
            ><a class="nav-link" href="#">SHOP</a></router-link
          >&nbsp;&nbsp;
          <router-link class="nav-item" to="/blog"
            ><a class="nav-link" href="#">BLOG</a></router-link
          >&nbsp;&nbsp;
          <router-link class="nav-item" to="/trainers"
            ><a class="nav-link" href="#">TRAINERS</a></router-link
          >&nbsp;&nbsp;
          <router-link class="nav-item" to="/member" v-if="user.role == 1"
            ><a class="nav-link" href="#">MEMBERS</a></router-link
          >
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" v-text="user.name"></a>
          </li>
          <li class="nav-item" @click="$store.commit('logout', null)">
            <a class="nav-link" href="#" id="logout">LOGOUT</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style>
.nav-item {
  text-decoration: none !important;
}
</style>

<script>
import store from "../store";
import { useStore } from "vuex";
export default {
  data() {
    return {
      store: useStore(),
      user: store.getters.getCurrentUser,
      isAdd: true,
    };
  },
  watch: {
    user: function () {
      if (!this.user) this.$router.push("/");
    },
  },
};
</script>
