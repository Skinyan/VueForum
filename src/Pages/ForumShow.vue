<template>
  <div class="col-full push-top">
    <div class="forum-header" v-if="forum">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <router-link
        :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }"
        class="btn-green btn-small"
      >
        Create a Thread
      </router-link>
    </div>
    <div v-else>
      <p>Loading forum details...</p>
    </div>
  </div>

  <div class="col-full push-top">
    <ThreadList :threads="threads" />
    <v-pagination v-model="page" :pages="totalPages" active-color="#57AD8D" />
  </div>
</template>

<script>
import { findById } from "@/helpers";
import ThreadList from "../components/ThreadList";

export default {
  components: { ThreadList },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  computed: {
    forum() {
      return findById(this.$store.state.forums, this.id);
    },
    threads() {
      return this.$store.state.threads.filter(
        (thread) => thread.forum?.id === this.id
      );
    },
  },
};
</script>
