<template>
  <div class="date-and-arrow">
    <div class="boundingBox">
      <div class="weekDay">{{ this.weekDay }}</div>
      <div class="calendarDate">
        <button
          type="button"
          :class="[ 'btn-date', { 'btn-date-selected': this.thisDate.selected }]"
          @click="select()"
        >{{ this.thisDate.date }}</button>
      </div>
    </div>
    <i class="fas fa-caret-down fa-2x caret" v-show="this.thisDate.selected"></i>
  </div>
</template>

<script>
const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

export default {
  name: "Day",
  props: {
    thisDate: Object,
    orderIndex: Number,
  },
  computed: {
    weekDay() {
      return WEEK_DAYS[this.thisDate.weekday];
    }
  },
  methods: {
    select() {
      this.$emit("on-select", this.orderIndex);
    }
  }
}
</script>

<style>
.date-and-arrow {
  flex: 1 1 auto;
}
.boundingBox {
  border: 1px solid #e0e0e0;
  color: #000;
  flex: 1 1 auto;
}
.weekDay {
  padding: 15px 5px 5px 5px;
  font-size: 11px;
  text-transform: uppercase;
}
.calendarDate {
  padding: 5px 0 15px 0;
  min-height: 70px;
}
.calendarDate div:hover {
  background-color: #808080;
  border-radius: 50%;
}
.btn-date {
  height: 56px;
  width: 56px;
  background-color: transparent!important;
  border-color: transparent!important;
}
.btn-date-selected {
  background-color: #1867c0 !important;
  border-radius: 50%;
  color: white;
}
.caret {
  color: #1867c0;
}
</style>
