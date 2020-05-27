<template>
  <div class="container">

    <!-- list name  -->
    <div class="row flex-container">
      <div v-if="!isEditingName" class="col-12" @click="editName()">
        <h3>{{ this.listName }}</h3>
      </div>
      <form v-else class="name-form"  @submit.prevent="submitName()">
        <input type="text" class="form-control name-input" v-model="newName" />
      </form>
    </div>

    <!-- list of to-do items  -->
    <div class="row flex-container">
      <div class="col-lg-6">
        <Draggable
          v-model="items"
          :disabled="!enabled"
          class="list-group"
          ghost-class="ghost"
          :move="checkMove"
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
          v-model="items"
          :disabled="!enabled"
          class="list-group"
          ghost-class="ghost"
          :move="checkMove"
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

export default {
  name: "ToDoList",
  components: {
    ToDoItem,
    NewToDo,
    Draggable
  },
  props: {
    list: Object,
    weekdate: String,
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      items: this.list.items, // [{ desc: "First to-do item!", done: false }],
      isEditingName: false,
      listName: this.list.name, //this.getDefaultName(this.weekdate), // "Name Your " + this.weekdate + " To-do List!"
    };
  },
  computed: {
    todoItems: function() {
      return this.items.filter(item => !item.done);
    },
    completedItems: function() {
      return this.items.filter(item => item.done);
    }
  },
  watch: {
    weekdate(newVal) {
      this.listName = this.getDefaultName(newVal);
    }
  },
  methods: {
    getDefaultName(weekday) {
      return "Name Your " + weekday + " To-do List!";
    },
    onDelete(deleted) {
      this.items = this.items.filter(item => item !== deleted);
    },
    onEdit(item, newItemDesc) {
      item.desc = newItemDesc;
    },
    onComplete(item, newComplete) {
      item.done = newComplete;
    },
    onAdd(newDesc) {
      this.items.push({ desc: newDesc, done: false });
    },
    submitName() {
      this.isEditingName = false;
      // this.listName = this.newName;
      console.log("submitName(): ", this.listName, this.newName);
      this.$emit('on-update-name', this.newName);
    },
    editName() {
      this.isEditingName = true;
      this.newName = this.listName;
    },
    checkMove: function(e) {
      console.log("Future index: " + e.draggedContext.futureIndex);
    }
  }
};
</script>

<style scoped>
.name-input {
  font-size: 30px;
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
