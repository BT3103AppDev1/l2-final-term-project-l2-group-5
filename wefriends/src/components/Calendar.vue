<template>
  <div class="header">
    <p id="header-text">Click a day to view diary entry</p>
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
      const placeholders = new Array(this.firstDayOfWeek).fill("");
      const days = new Array(numberOfDays).fill(null).map((e, i) => i + 1);

      return placeholders.concat(days);
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
  width: 100%;
  margin: 0 auto;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  text-align: center;
  padding: 20px;
  background: transparent;
  color: #12372a;
  justify-content: space-between;
}

#header-text {
  font-weight: bold;
}

.weekdays {
  display: flex;
  background: #f9f9f9;
  justify-content: space-evenly
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

#calendarDetails {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  width: 250px;
}

#buttonback,
#button {
  flex: 0 0 auto;
}

#dateName {
  flex: 1 0 auto;
  text-align: center;
}

.selected {
  background-color: #4caf50;
  color: white;
}

.current {
  border: 2px solid #4caf50;
}

#button {
  border-radius: 50%;
}

#button {
  border-radius: 50%;
  padding: 10px 12px;
  border: transparent;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

#button:hover {
  background-color: #12372a;
  color: #fff;
}

.select-container {
  position: relative;
  display: inline-block;
  width: 70px;
}

.select-container select {
  border: transparent;
  background-color: white;
  padding: 5px 10px;
  border-radius: 5px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  width: 70px;
}

.select-container::after {
  content: "▼";
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 12px;
}

.select-container option {
  padding: 5px;
  background: white;
  border: none;
}

.select-container option:hover {
  background-color: #f2f2f2;
}
</style>
