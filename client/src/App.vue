<template>
  <div>
    <Header v-if="showHeader"></Header>
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import store from "./store";
import { useStore } from "vuex";
export default {
  data() {
    return {
      store: useStore(),
      user: store.getters.getCurrentUser,
      showHeader: false,
    };
  },
  watch: {
    $route: function (to, from) {
      if (to.name === "index") this.showHeader = false;
      else this.showHeader = true;
    },
  },
  components: {
    Header,
  },
};
</script>

<style>
.container-body {
  padding: 20px 50px 20px 50px;
}

@import url("./assets/css/index.css");
</style>
