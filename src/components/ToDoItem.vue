<template>
  <li
    class="d-flex align-items-center list-group-item"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    :class="{ completed: isCompleted, hovered: isHovered }"
  >
    <!-- mark-as-complete button  -->
    <button
      class="btn border-0 ml-2 mr-2 checkbox"
      @click="complete()"
    >
      <span v-if="!isCompleted" class="far fa-square"></span>
      <span v-else class="fa fa-check" style="color:green"></span>
    </button>

    <!-- description form  -->
    <div
      class="border-0 flex-grow-1 text-left shadow-none"
      v-if="!isEditing"
    >
      <span>{{ description }}</span>
    </div>
    <form v-else class="flex-grow-1" @submit.prevent="submit()">
      <input
        type="text"
        class="form-control"
        @blur="submit()"
        v-model="newDescription"
        ref="newTodo"
      />
    </form>

    <!-- star button  -->
    <button
      class="btn btn-outline-warning border-0"
      @click="star()"
    >
      <span v-if="!isStarred" class="far fa-star"></span>
      <span v-else class="fas fa-star"></span>
    </button>
    <!-- edit button  -->
    <button
      class="btn btn-outline-primary border-0"
      @click="edit()"
    >
      <span class="far fa-edit"></span>
    </button>
    <!-- delete button  -->
    <button
      class="btn btn-outline-danger border-0"
      @click="$emit('on-delete')"
    >
      <span class="far fa-trash-alt"></span>
    </button>
  </li>
</template>

<script>
export default {
  name: "ToDoItem",
  data() {
    return {
      isEditing: false,
      newDescription: "",
      isStarred: false,
      isHovered: false,
    };
  },
  props: {
    description: String,
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submit() {
      this.isEditing = false;
      // this.description = this.newDescription;
      this.$emit("on-edit", this.newDescription);
    },
    star() {
      this.isStarred = !this.isStarred;
    },
    edit() {
      this.newDescription = this.description;
      this.isEditing = !this.isEditing;
    },
    complete() {
      // this.isCompleted = !this.isCompleted;
      this.$emit("on-complete", !this.isCompleted);
    }
  }
};
</script>

<style scoped>
.completed {
  background-color: #dbffeb;
}
.hovered {
  background-color: #f5f5f5;
}
.checkbox {
  width: 40px;
}
.btn-right {
  padding: 0.375rem 0.5rem;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>
