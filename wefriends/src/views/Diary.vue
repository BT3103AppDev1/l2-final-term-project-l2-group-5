<template>
  <div id="view">
    <Navbar id="navbar" />
    <div id="right-side">
      <TopBar :pageName="pageName" id="topbar" />
      <div id="content">
        <div id="quote-header">
          {{ quote }}
        </div>
        <div id="diary-container">
          <div id="entry">
            <Calendar id="calendar" @date-selected="handleDateSelected" />
          </div>
          <div id="current-entry">
            <div id="date-header">
              Selected Date: {{ formatDate(selectedDate) }}
            </div>
            <div id="inner-container">
              <div v-if="entries" id="entries-list">
                  <p>{{ entries.content }}</p>
              </div>
              <div v-else>
                How was your day?
                <button id="add-button" @click="handleAddClick">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#view {
  display: flex;
  justify-content: space-around;
  height: 100vh;
}
#navbar {
  width: 20%;
}
#right-side {
  width: 80%;
  display: flex;
  flex-direction: column;
}
#topbar {
  height: 5%;
}
#content {
  background-color: #adbc9f;
  height: 90%;
}

#add-button {
  background-color: #436850;
  border: none;
  border-radius: 10px;
  width: 20%;
  height: 40px;
  padding: 10px;
  color: white;
  text-align: center;
  display: block;
  margin: 10px auto;
  cursor: pointer;
}

#quote-header {
  position: relative;
  max-width: 90%;
  background-color: #436850;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
}

.quote {
  text-align: center;
  font-size: 32px;
  color: #12372a;
  font-style: italic;
  font-weight: bold;
}

#diary-container {
  display: flex;
  justify-content: space-between;
}

#entry {
  flex: 2;
  padding-left: 5%;
  padding-right: 5%;
}

#current-entry {
  flex: 1;
  background-color: white;
  border-top-right-radius: 25px;
  margin-right: 5%;
  text-align: left;
  padding: 2.5%;
}

#inner-container {
  padding: 20px;
  background-color: #fbfada;
  border-top-right-radius: 25px;
  margin-top: 5%;
}
</style>

<script>
import Navbar from "@/components/Navbar.vue";
import TopBar from "@/components/TopBar.vue";
import DiaryTest from "@/components/DiaryTest.vue";
import Calendar from "@/components/Calendar.vue";
import firebaseApp from "@/firebase";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  limit,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      pageName: "Diary",
      quote: "test",
      selectedDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      entries: null,
    };
  },
  components: {
    Navbar,
    TopBar,
    DiaryTest,
    Calendar,
  },
  methods: {
    handleDateSelected(date) {
      this.selectedDate = date; // Update the selected date when the event is received
    },
    formatDate(value) {
      if (!value) return "";

      // Assuming value is a Unix timestamp in seconds
      const date = new Date(value);

      // Format the date as "Mar 20 2024"
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    handleAddClick() {
      this.$router.push({ name: "DiaryTest" });
    },
  },
  async mounted() {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Diary"))
      );
      querySnapshot.forEach((doc) => {
        this.entries = {
          content: doc.data().content,
        };
      });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
