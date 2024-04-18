import HomePage from "@/Pages/HomePage";
import ThreadShow from "@/Pages/ThreadShow";
import { createRouter, createWebHistory } from "vue-router";
import Category from "@/Pages/CategoryPage";
import ForumShow from "@/Pages/ForumShow";
import NotFound from "@/Pages/NotFound";
import ProfilePage from "@/Pages/ProfilePage";
import { Store } from "vuex";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/me",
    name: "ProfilePage",
    component: ProfilePage,
    meta: { toTop: true, smoothScroll: true },
  },
  {
    path: "/me/edit",
    name: "ProfileEdit",
    component: ProfilePage,
    props: { edit: true },
  },

  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: ThreadShow,
    props: true,
  },
  {
    path: "/category/:id",
    name: "Category",
    component: Category,
    props: true,
  },
  {
    path: "/forum/:id",
    name: "Forum",
    component: ForumShow,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Not Found",
    component: NotFound,
    beforeEnter(to, from, next) {
      // Check if thread exists
      const threadExists = Store.state.threads.find(
        (thread) => thread.id === to.params.id
      );
      // If exists continue
      if (threadExists) {
        return next();
      } else {
        next({
          name: "NotFound",
          params: { pathMatch: to.path.substring(1).split("/") },
          query: to.query,
          hash: to.hash,
        });
      }
      // If doesn't exist, redirect to not found
    },
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    const scroll = {};
    if (to.meta.toTop) scroll.top = 0;
    if (to.meta.smoothScroll) scroll.behavior = "smooth";

    return scroll;
  },
});
