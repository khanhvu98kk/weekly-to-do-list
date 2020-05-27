<template>
    <form class="d-flex" @submit.prevent="addItem()">
      <input
        type="text"
        class="form-control"
        v-model="description"
        placeholder="Add a new item"/>
    </form>
</template>

<script>
export default {
  name: "NewToDo",
  props: {},
  data() {
    return {
      description: "",
    };
  },
  methods: {
    addItem() {
      if (this.description.length > 0) {
        this.$emit("on-add", this.description);
      }
      this.description = "";
    }
  }
};
</script>

<style scoped></style>
