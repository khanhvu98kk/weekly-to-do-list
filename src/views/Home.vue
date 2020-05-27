<template>
  <div class="home">
    <Week @on-select-day="onSelectDay($event)" />
    <ToDoList/>
  </div>
</template>

<script>
// @ is an alias to /src
import ToDoList from "@/components/ToDoList.vue";
import Week from "@/components/Week.vue";

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

export default {
  name: "Home",
  components: {
    ToDoList,
    Week
  },
  data() {
    return {
      itemsByDay: this.createEmptyList(),
      selectedList: [],
    };
  },
  methods: {
    onSelectDay(newSelectedIndex) {
      this.selectedList = this.itemsByDay[newSelectedIndex];
      console.log("onSelectDay: ", newSelectedIndex, this.itemsByDay, this.selectedList);
    },
    createEmptyList() {
      var list = [];
      for (var i = 0; i < WEEK_DAYS.length; i++) {
        var item = { desc: "", done: false };
        item.desc = "Task for " + WEEK_DAYS[i];
        list.push([item]);
      }
      // console.log("created: ", list);
      return list;
    },
  },
};
</script>
