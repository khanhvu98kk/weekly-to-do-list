<template>
  <div class="date-and-arrow">
    <div class="boundingBox" :style="{ 'border-radius': (orderIndex == 0) ? '0 0 0 30px' : ( (orderIndex == 6) ? '0 0 30px 0' : '') }" >
      <div class="weekDay">{{ this.weekDay }}</div>
      <div class="calendarDate">
        <button
          type="button"
          @mouseover="hover = true"
          @mouseleave="hover = false"
          :class="[ {'btn-date': !this.hover }, { 'btn-date-selected': this.thisDate.selected }, { 'btn-date-hover': this.hover }]"
          @click="select()"
        >{{ this.thisDate.date }}</button>
      </div>
    </div>
    <i class="fas fa-caret-down fa-3x caret" v-show="this.thisDate.selected"></i>
  </div>
</template>

<script>
const WEEK_DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default {
  name: "Day",
  props: {
    thisDate: Object,
    orderIndex: Number,
  },
  data() {
    return {
      hover: false,
      // styleObject: {
      //   border-radius: '0 0 0 10px',
      // },
    };
  },
  computed: {
    weekDay() {
      return WEEK_DAYS_SHORT[this.thisDate.weekday];
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
.btn-date-hover {
  height: 56px;
  width: 56px;
  border-color: transparent!important;
  background-color: #f5f5f5;
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
