<template>
  <div>
    <ForumList
      v-for="category in categories"
      :key="category.id"
      :forums="getForumsForCategory(category)"
      :category-name="category.name"
      :category-id="category.id"
    />
  </div>
</template>

<script>
import ForumList from "./ForumList";

export default {
  props: {
    categories: {
      required: true,
      type: Array,
    },
  },
  components: {
    ForumList,
  },

  methods: {
    getForumsForCategory(category) {
      return this.$store.state.forums.filter(
        (forum) => forum.categoryId === category.id
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
