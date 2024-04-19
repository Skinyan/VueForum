import HomePage from "@/Pages/HomePage";
import ThreadShow from "@/Pages/ThreadShow";
import ThreadCreate from "@/Pages/ThreadCreate";
import ThreadEdit from "@/Pages/ThreadEdit";
import { createRouter, createWebHistory } from "vue-router";
import Category from "@/Pages/CategoryPage";
import ForumShow from "@/Pages/ForumShow";
import NotFound from "@/Pages/NotFound";
import ProfilePage from "@/Pages/ProfilePage";
import { Store } from "vuex";
import { findById } from "@/helpers";

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
    path: "/forum/:forumId/thread/create",
    name: "ThreadCreate",
    component: ThreadCreate,
    props: true,
  },
  {
    path: "/thread/:id/edit",
    name: "ThreadEdit",
    component: ThreadEdit,
    props: true,
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
      const threadExists = findById(Store.state.threads, to.params.id);
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
