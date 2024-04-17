import HomePage from "@/Pages/HomePage";
import ThreadShow from "@/Pages/ThreadShow";
import { createRouter, createWebHistory } from "vue-router";
import Category from "@/Pages/CategoryPage"
import ForumShow from "@/Pages/ForumShow";
import NotFound from "@/Pages/NotFound";


const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
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
      //check if thread exists
      const threadExists = this.$state.threads.find(
        (thread) => thread.id === to.params.id
      );
      //if exists continue
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
      //if doesn't exist, redirect to not found
    },
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
