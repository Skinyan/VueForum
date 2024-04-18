import { createStore } from "vuex";
import sourceData from "@/data";

export default createStore({
  state: {
    ...sourceData,
    authId: "L664y3qZSubDbT1R6npC0EEybJ73",
  },
  getters: {
    authUser: (state) => {
      const user = state.users.find((user) => user.id === state.authId);
      if (!user) return null;
      return {
        ...user,
        computed: {
          get posts() {
            return state.posts.filter((post) => post.userId === user.id);
          },
          get postCount() {
            return this.posts.length;
          },
          get threads() {
            return state.threads.filter(
              (threads) => threads.userId === user.id
            );
          },
          get threadsCount() {
            return this.threads.length;
          },
        },
      };
    },
  },
  actions: {
    createPost(context, post) {
      post.id = "ggggg" + Math.random();
      context.commit("setPost", { post }); // set the post
      context.commit("appendPostToThread", {
        postId: post.id,
        threadId: post.threadId,
      }); //append post to thread
    },
    updateUser({ commit }, user) {
      commit("setUser", { user, userId: user.id });
    },
  },

  mutations: {
    setPost(state, { post }) {
      state.posts.push(post); // set the post
    },
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex((user) => user.id === userId);
      state.users[userIndex] = user;
    },

    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads.find((thread) => thread.id === threadId);
      thread.posts.push(postId);
    },
  },
});
