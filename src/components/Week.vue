<template>
  <div>
    <div class="all-week-header">
      <div class="month-year-header">
        <h2>{{ this.selectedMonth }}, {{ this.selectedYear }}</h2>
      </div>
      <div class="row week-block">
        <Day
          v-for="(date, index) in weekDates"
          :key="index"
          :this-date="date"
          :order-index="index"
          @on-select="onSelect($event)"
        ></Day>
      </div>
    </div>
    <ToDoList
      v-for="(date, index) in weekDates"
      :key="index"
      :weekday="date.weekday"
      :selected="date.selected"
    />
  </div>
</template>

<script>
import Day from "@/components/Day.vue";
import ToDoList from "@/components/ToDoList.vue";

const DAYS_IN_WEEK = 7;
const SHORT_MONTHS = [4,6,9,11];
const LONG_MONTHS = [1,3,5,7,8,10,12];
const MONTH_NAMES = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

export default {
  name: "Week",
  components: {
    Day,
    ToDoList
  },
  data() {
    return {
      selectedMonth: "",
      selectedYear: 0,
      selectedIndex: 0,
      weekDates: [],
    }
  },
  created: function() {
    var date = new Date();
    this.weekDates = this.weekDatesComp(date);
    this.selectedMonth = MONTH_NAMES[date.getMonth()]; // convert from num to string
    this.selectedYear = date.getFullYear();
  },
  computed: {
  },
  methods: {
    weekDatesComp(date) {
      // const date = new Date();
      if (this.selectedIndex == undefined)
        this.selectedIndex = 0;

      var dates = [];
      for (var i = 0; i < DAYS_IN_WEEK; i++) {
        var nextDate;
        if (i == 0) {
          nextDate = { weekday: date.getDay(), date: date.getDate(), month: date.getMonth(), year: date.getFullYear(), selected: this.selectedIndex == 0 }; // { weekday: date.getDay(), date: date.getDate(), month: date.getMonth(), year: date.getFullYear(), selected: this.selectedIndex == 0 };
        } else {
          var currDate = dates[i-1];
          nextDate = this.getNextDate(currDate.weekday, currDate.date, currDate.month, currDate.year);
          nextDate.selected = (i == this.selectedIndex);
        }
        dates.push(nextDate);
      }
      // console.log("created: ", dates);
      return dates;
    },
    onSelect(newSelectedIndex) {
      if (this.selectedIndex != newSelectedIndex) { // new index not the same as old
        this.weekDates[this.selectedIndex].selected = false;
        this.selectedIndex = newSelectedIndex;
        this.weekDates[this.selectedIndex].selected = true;

        this.selectedMonth = MONTH_NAMES[this.weekDates[this.selectedIndex].month];
        this.selectedYear = this.weekDates[this.selectedIndex].year;
      }
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
      return { weekday: nextWeekday, date: nextDate, month: nextMonth, year: nextYear, selected: false };
    }
  }
}
</script>

<style scoped>
.all-week-header {
  padding: 0 200px; 
}
.month-year-header {
  /* background-image: linear-gradient(to right, #e0caca, #d4b8ca, #c7a3b5); */
  padding: 20px 0 15px 0;
  margin: 0 20px;
  background-color: #1867c0;
  border-radius: 30px 30px 0 0;
  color: white;
}
.week-block {
  margin: 0 20px;
}
</style>
