<template>
  <div class="header">
    <p id="header-text">Click a day to view diary entry</p>
    <div>
      <button id="button" @click="changeMonth(-1)">‹</button> 
      <span>{{ currentMonthName }} {{ currentYear }}</span>
      <button id="button" @click="changeMonth(1)">›</button>
    </div>

  </div>
  <div class="calendar">
    <div class="weekdays">
      <div class="days2" v-for="day in weekdays" :key="day">{{ day }}</div>
    </div>
    <div class="days">
      <div
        class="day"
        v-for="(day, index) in numberOfDaysInMonth"
        :key="index"
        :class="{ selected: isDaySelected(day), current: isCurrentDay(day) }"
        @click="selectDay(day)"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const today = new Date();
    return {
      currentDate: today,
      selectedDate: null,
      weekdays: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    };
  },
  computed: {
    firstDayOfWeek() {
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
      return firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)
    },
    currentYear() {
      return this.currentDate.getFullYear();
    },
    currentMonth() {
      return this.currentDate.getMonth();
    },
    currentMonthName() {
      return this.currentDate.toLocaleString("default", { month: "long" });
    },
    numberOfDaysInMonth() {
      const year = this.currentYear;
      const month = this.currentMonth;
      const numberOfDays = new Date(year, month + 1, 0).getDate();

      // Placeholder days for the start of the month
      const placeholders = new Array(this.firstDayOfWeek).fill("");

      // Days of the month
      const days = new Array(numberOfDays).fill(null).map((e, i) => i + 1);

      // Combine placeholders with actual days
      return placeholders.concat(days);
    },
  },
  methods: {
    changeMonth(step) {
      const currentYear = this.currentDate.getFullYear();
      const currentMonth = this.currentDate.getMonth();
      const newDate = new Date(currentYear, currentMonth + step, 1);

      if (this.currentDate.getDate() > newDate.getDate()) {
        this.currentDate = new Date(currentYear, currentMonth + step + 1, 0);
      } else {
        this.currentDate = newDate;
      }
    },
    selectDay(day) {
      this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
      this.$emit('date-selected', this.selectedDate);
      console
    },
    isDaySelected(day) {
      return (
        this.selectedDate &&
        this.selectedDate.getDate() === day &&
        this.selectedDate.getMonth() === this.currentMonth &&
        this.selectedDate.getFullYear() === this.currentYear
      );
    },
    isCurrentDay(day) {
      const today = new Date();
      return (
        day === today.getDate() &&
        this.currentMonth === today.getMonth() &&
        this.currentYear === today.getFullYear()
      );
    },
  },
};
</script>

<style>
.calendar {
  width: 100%;
  margin: 0 auto;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.header {
  text-align: center;
  padding: 20px;
  background: #333;
  color: white;
}

.weekdays {
  display: flex;
  background: #eee;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}

.day {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.day:last-child {
  border-right: none;
}

.selected {
  background-color: #4caf50;
  color: white;
}

.current {
  border: 2px solid #4caf50;
}
</style>