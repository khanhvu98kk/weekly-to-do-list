<template>
  <div>
    <div id="calendar-app">
      <h1>date picker 1</h1>
      <SingleDatePicker @select-date="printDate($event)" />
    </div>
    <div id="calendar-app">
      <h1>date picker 2</h1>
      <CalendarView />
    </div>
  </div>
</template>

<script>
import CalendarView from '@/components/CalendarView.vue';
import SingleDatePicker from 'vue-single-date-picker';

export default {
  name: 'CalendarApp',
  components: {
    CalendarView,
    SingleDatePicker
  },
  methods: {
    printDate(selectedDate) {
      if (selectedDate) {
        console.log("SingleDatePicker: ", selectedDate.date, selectedDate.month, selectedDate.year);
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  color: #0d1e44;
  margin: auto;
  padding: 30px;
  text-align: center;
}
#single-date-picker {
  margin: auto;
}
h1 {
  color: #c7a3b5;
  background: linear-gradient(to right, #e0caca, #d4b8ca, #c7a3b5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 60px;
  font-weight: 300;
  font-family: 'Lato', Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
