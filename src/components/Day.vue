<template>
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
.boundingBox {
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  color: #000;
  flex: 1 1 auto;
}
.boundingBox:first-child {
  border-left: 1px solid #e0e0e0;
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
.btn-date {
  height: 56px;
  width: 56px;
  background-color: transparent!important;
  border-color: transparent!important;
}
.btn-date-selected {
  background-color: #1867c0 !important;
  border-radius: 50%;
  font-color: white;
}
</style>
