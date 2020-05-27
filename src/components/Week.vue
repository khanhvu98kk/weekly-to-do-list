<template>
  <div>
    <div class="row week-block">
      <!-- <form @submit.prevent="checkDate()">
        <input type="text" class="form-control" @blur="checkDate()" v-model="dateString" />
      </form> -->
      <Day
        v-for="(date, index) in weekDates"
        :key="index"
        :this-date="date"
        :order-index="index"
        @on-select="onSelect($event)"
      ></Day>
    </div>
    <ToDoList
      :list="this.selectedList"
      :weekdate="this.selectedWeekDay"
      @on-update-name="onUpdateName($event)"
    />
  </div>
</template>

<script>
import Day from "@/components/Day.vue";
import ToDoList from "@/components/ToDoList.vue";

const DAYS_IN_WEEK = 7;
const SHORT_MONTHS = [4,6,9,11];
const LONG_MONTHS = [1,3,5,7,8,10,12];
const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

export default {
  name: "Week",
  components: {
    Day,
    ToDoList
  },
  data() {
    return {
      selectedIndex: 0,
      weekDates: [],
      selectedList: {},
      selectedWeekDay: '',
    }
  },
  created: function() {
    this.weekDates = this.weekDatesComp();
    this.selectedList = this.selectedListComp();
    this.selectedWeekDay = this.selectedWeekDayComp();
  },
  computed: {
  },
  methods: {
    // checkDate() {
    //   var nums = this.dateString.split('/');
    //   var m = parseInt(nums[0], 10);
    //   var d = parseInt(nums[1], 10);
    //   var y = parseInt(nums[2], 10);
    //   var nextDate = this.getNextDate(d, m, y);
    // },
    selectedWeekDayComp() {
      return WEEK_DAYS[this.weekDates[this.selectedIndex].weekday];
    },
    selectedListComp() {
        return this.weekDates[this.selectedIndex].list;
    },
    weekDatesComp() {
      const date = new Date();
      if (this.selectedIndex == undefined)
        this.selectedIndex = 0;

      var dates = [];
      for (var i = 0; i < DAYS_IN_WEEK; i++) {
        var nextDate, item;
        if (i == 0) {
          nextDate = { weekday: date.getDay(), date: date.getDate(), month: date.getMonth(), year: date.getFullYear(), selected: this.selectedIndex == 0};
        } else {
          var currDate = dates[i-1];
          nextDate = this.getNextDate(currDate.weekday, currDate.date, currDate.month, currDate.year);
          nextDate.selected = (i == this.selectedIndex);
        }
        item = { desc: "", done: false };
        var weekday = WEEK_DAYS[nextDate.weekday]
        item.desc = "Task for " + weekday;

        nextDate.list = { name: "Name Your " + weekday + " To-do List!", items: [item] };

        dates.push(nextDate);
      }
      console.log("created: ", dates);
      return dates;
    },
    onSelect(newSelectedIndex) {
      if (this.selectedIndex != newSelectedIndex) {
        this.weekDates[this.selectedIndex].selected = false;
        this.selectedIndex = newSelectedIndex;
        this.weekDates[this.selectedIndex].selected = true;
        // this.$emit("on-select-day", this.selectedIndex);

        this.selectedList = this.weekDates[newSelectedIndex].list;
        this.selectedWeekDay = WEEK_DAYS[this.weekDates[newSelectedIndex].weekday];
        // console.log("onSelect: ", newSelectedIndex, this.selectedWeekDay);
      }
    },
    onUpdateName(newListName) {
        // this.selectedList.name = newListName;
        // this.selectedList = { ...this.selectedList, name: newListName };
        this.selectedList = Object.assign({}, this.selectedList, { name: newListName });
        console.log("onUpdateName(): ", this.weekDates[this.selectedIndex].list);
        // = this.weekDates[newSelectedIndex].list;
    },
    isLeapYear(year) {
      if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
        return true;
      return false;
    },
    getNextDate(w, d, m, y) {
      var nextDate = d;
      var nextMonth = m;
      var nextYear = y;
      var nextWeekday = w+1;

      if (w == 6)
        nextWeekday = 0;

      if (d == 31) {
        if (m == 12) {
          nextDate = 1;
          nextMonth = 1;
          nextYear = y+1;
        } else if (LONG_MONTHS.includes(m)) {
          nextDate = 1;
          nextMonth = m+1;
        }
      } else if (d == 30) {
        if (SHORT_MONTHS.includes(m)) {
          nextDate = 1;
          nextMonth = m+1;
        } else {
          nextDate = d+1;
        }
      } else if (d == 29 && m == 2) {
        nextDate = 1;
        nextMonth = m+1;
      } else if (d == 28 && m == 2) {
        if (this.isLeapYear(y)) {
          nextDate = d+1;
        } else {
          nextDate = 1;
          nextMonth = m+1;
        }
      } else {
        nextDate = d+1;
      }
      return { weekday: nextWeekday, date: nextDate, month: nextMonth, year: nextYear };
    }
  }
}
</script>

<style scoped>
.week-block {
  margin: 20px;
}
</style>
