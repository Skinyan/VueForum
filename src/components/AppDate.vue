<template>
  <span :title="humanFriendlyDate()">
    {{ diffForHumans() }}
  </span>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export default {
  props: {
    timestamp: {
      required: true,
      type: Number,
    },
  },
  methods: {
    diffForHumans() {
      return dayjs.unix(this.timestamp).fromNow();
    },

    humanFriendlyDate() {
      return dayjs.unix(this.timestamp).format("llll");
    },
  },
};
</script>

<style lang="scss" scoped></style>