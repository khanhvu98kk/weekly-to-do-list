<template>
  <div class="container" v-if="selected">

    <!-- list name  -->
    <div class="row flex-container">
      <div v-if="!isEditingName" class="col-12" @click="editName()">
        <h4>{{ this.name }}</h4>
      </div>
      <form v-else class="name-form"  @submit.prevent="submitName()">
        <input type="text" class="form-control name-input" v-model="newName" />
      </form>
    </div>

    <!-- list of to-do items  -->
    <div class="row flex-container">
      <div class="col-lg-6">
        <Draggable
          v-model="todoItems"
          :disabled="!enabled"
          class="list-group"
          ghost-class="ghost"
          @start="dragging = true"
          @end="dragging = false"
        >
          <ToDoItem
            v-for="(item, index) in todoItems"
            :key="index"
            :description="item.desc"
            :isCompleted="item.done"
            @on-delete="onDelete(item)"
            @on-edit="onEdit(item, $event)"
            @on-complete="onComplete(item, $event)"
          />
        </Draggable>
      </div>
    </div>

    <!-- list of completed items  -->
    <div class="row flex-container">
      <div class="col-lg-6">
        <Draggable
          v-model="completedItems"
          :disabled="!enabled"
          class="list-group"
          ghost-class="ghost"
          @start="dragging = true"
          @end="dragging = false"
        >
          <ToDoItem
            v-for="(item, index) in completedItems"
            :key="index"
            :description="item.desc"
            :isCompleted="item.done"
            @on-delete="onDelete(item)"
            @on-edit="onEdit(item, $event)"
            @on-complete="onComplete(item, $event)"
          />
        </Draggable>
      </div>
    </div>

    <!-- form to add new item  -->
    <div class="row flex-container">
      <div class="col-lg-6">
        <NewToDo @on-add="onAdd($event)" />
      </div>
    </div>

  </div>
</template>

<script>
import ToDoItem from "@/components/ToDoItem.vue";
import NewToDo from "@/components/NewToDo.vue";
import Draggable from "vuedraggable";

const WEEK_DAYS_LONG = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];

export default {
  name: "ToDoList",
  components: {
    ToDoItem,
    NewToDo,
    Draggable
  },
  props: {
    weekday: Number,
    selected: Boolean,
  },
  created() {
    var item = { desc: "", done: false };
    var weekday = WEEK_DAYS_LONG[this.weekday]
    item.desc = "Task for " + weekday;

    this.name = "Name Your " + weekday + " To-do List!";
    this.todoItems = [item];
  },
  data() {
    return {
      enabled: true,
      isEditingName: false,
      dragging: false,
      todoItems: [],
      completedItems: [],
      name: ""
    };
  },
  // watch: {
  //   weekdate(newVal) {
  //     this.listName = this.getDefaultName(newVal);
  //   }
  // },
  methods: {
    onDelete(deletedItem) {
      if (!deletedItem.done) { // todoItems
        this.todoItems = this.todoItems.filter(item => item !== deletedItem);
      } else {  // completedItems
        this.completedItems = this.completedItems.filter(item => item !== deletedItem);
      }
    },
    onEdit(item, newItemDesc) {
      item.desc = newItemDesc;
    },
    onComplete(chosenItem, newComplete) {
      chosenItem.done = newComplete;
      if (newComplete) {  // move to completedItems
        this.todoItems = this.todoItems.filter(item => item !== chosenItem); // rm item from todoItems
        this.completedItems.push(chosenItem);
      } else { // move back to todoItems
        this.completedItems = this.completedItems.filter(item => item !== chosenItem); // rm item from todoItems
        this.todoItems.push(chosenItem);
      }
    },
    onAdd(newDesc) {
      this.todoItems.push({ desc: newDesc, done: false });
    },
    submitName() {
      this.isEditingName = false;
      this.name = this.newName;
    },
    editName() {
      this.isEditingName = true;
      this.newName = this.name;
    },
  }
};
</script>

<style scoped>
.name-input {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}
.flex-container {
    height: 100%;
    padding: 10px;
    margin: 10px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
}
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
