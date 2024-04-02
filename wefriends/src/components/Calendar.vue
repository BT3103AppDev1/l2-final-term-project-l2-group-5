<template>
  <div class="header">
    <h2 id="header-text">Click a day to view diary entry</h2>
    <div id="calendarDetails">
      <button id="button" @click="changeMonth(-1)">‹</button>
      <div class="select-container">
        <select v-model="selectedMonth" @change="updateCalendar">
          <option v-for="(month, index) in months" :key="index" :value="index">
            {{ month }}
          </option>
        </select>
      </div>
      <div class="select-container">
        <select v-model="selectedYear" @change="updateCalendar">
          <option v-for="year in yearRange" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
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
  emits: ["date-selected"],
  data() {
    const today = new Date();
    return {
      currentDate: today,
      selectedDate: null,
      selectedMonth: today.getMonth(),
      selectedYear: today.getFullYear(),
      weekdays: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },
  computed: {
    firstDayOfWeek() {
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
      return firstDayOfMonth.getDay();
    },
    yearRange() {
      const currentYear = new Date().getFullYear();
      // IMPORTANT !! CHANGE THE RANGE OF THE YEAR HERE!!
      return Array.from({ length: 10 }, (_, index) => currentYear - 5 + index);
    },
    currentMonthName() {
      return this.months[this.selectedMonth];
    },
    currentYear() {
      return this.selectedYear;
    },
    currentMonth() {
      return this.selectedMonth;
    },
    numberOfDaysInMonth() {
    const year = this.currentYear;
    const month = this.currentMonth;
    const numberOfDays = new Date(year, month + 1, 0).getDate();
    const placeholdersBefore = new Array(this.firstDayOfWeek).fill("");
    const days = new Array(numberOfDays).fill(null).map((e, i) => i + 1);
    
    // Calculate how many trailing placeholders we need to fill the last week
    const totalSlots = placeholdersBefore.length + days.length;
    const placeholdersAfterLength = totalSlots % 7 === 0 ? 0 : 7 - (totalSlots % 7);
    const placeholdersAfter = new Array(placeholdersAfterLength).fill("");
    
    return placeholdersBefore.concat(days, placeholdersAfter);
  },
  },
  methods: {
    updateCalendar() {
      this.currentDate = new Date(this.selectedYear, this.selectedMonth);
    },
    changeMonth(step) {
      let newMonth = this.selectedMonth + step;
      let newYear = this.selectedYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }

      this.selectedMonth = newMonth;
      this.selectedYear = newYear;
      this.updateCalendar();
    },
    selectDay(day) {
      this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
      this.$emit("date-selected", this.selectedDate);
      console;
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

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  background: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: transparent;
  color: #12372a;
  font-weight: bolder;
}

.weekdays, .days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;

}

.weekdays div, .days .day {
  padding: 15px 0;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.weekdays div:last-child, .days .day:last-child {
  border-right: none;
}

.days {
  background-color: white;
}

.day {
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.day.empty {
  background-color: #f9f9f9; /* different background for empty cells */
}

.selected {
  background-color: #12372a;
  color: white;
}

/* Target all cells that are multiples of 7 to remove the right border */
.days .day:nth-child(7n) {
  border-right: none;
}

#calendarDetails {
  display: flex;
  justify-content: space-evenly;
  align-items: right;
  width: 30%; /* Adjust to fit header width */
}

.button {
  border: none;
  background-color: #fff;
  cursor: pointer;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px; /* Rounded corners for buttons */
  transition: background-color 0.3s, transform 0.2s; /* Smooth transition for interaction */
}

.button:hover {
  background-color: #12372a;
  color: #fff;
  transform: scale(1.05); /* Slight increase in size on hover */
}

.select-container {
  display: inline-flex;
  border-radius: 5px;
  overflow: hidden; /* Ensures select arrows match the container's rounding */
  background-color: white; /* Match button background for consistency */
}

.select-container select {
  border: none;
  background: transparent;
  padding: 5px 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  outline: none;
}
</style>
