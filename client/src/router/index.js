import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Trainers from "../views/Trainers.vue";
import Shop from "../views/Shop.vue";
import Index from "../views/Index.vue";
import Store from "../store";
import AdminPage from "../views/Admin/Index";
import Blog from "../views/Blog.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/trainers",
    name: "trainers",
    component: Trainers,
  },
  {
    path: "/shop",
    name: "shop",
    component: Shop,
  },
    {
    path: "/blog",
    name: "blog",
    component: Blog,
  },
  {
    path: "/member",
    name: "member",
    component: AdminPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (!Store.state.currentUser && to.name !== "index") return "/";
  if (Store.state.currentUser) {
    if (
      (new Date() - new Date(Store.state.currentUser.loggedIn)) /
        (1000 * 60 * 60) >
      6
    ) {
      Store.commit("logout", null);
    }
    if (Store.state.currentUser.role != 1 && to.path.includes("admin")) {
      return "/home";
    }
  }
});

export default router;
