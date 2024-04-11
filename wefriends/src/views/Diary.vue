<template>
  <div id="view">
    <Navbar id="navbar" />
    <div id="right-side">
      <TopBar :pageName="pageName" id="topbar" />
      <div id="content">
        <div class="quote-header">
          <img src="../assets/diary/img1.png" alt="Left Image" class="left-image">
          <h1 class="title">{{ quote }}</h1>
          <img src="../assets/diary/img2.png" alt="Right Image" class="right-image">
        </div>
        <div id="diary-container">
          <div id="entry">
            <Calendar id="calendar" @date-selected="handleDateSelected" />
          </div>
          <div id="current-entry">
            <div id="date-header">
              <h3>Selected Date: {{ formatDate(selectedDate) }}</h3>
            </div>
            <div id="inner-container">
              <div v-if="entry" id="entries-list">
                <h3>Reflections for the Day:</h3>
                <p id="entryContainer">{{ entry }}</p>
                <div id="buttonsContainer">
                  <button id="edit-button" @click="edit">Edit</button>
                  <button id="delete-button" @click="confirmDelete">
                    Delete
                  </button>
                </div>
                <Confirmation
                  v-if="showDeleteModal"
                  :isVisible="showDeleteModal"
                  title="Confirm Delete"
                  message="Are you sure you want to delete this entry?"
                  @confirm="remove"
                  @cancel="cancelDelete"
                />
                <Confirmation
                v-if="showSaveModal"
                :isVisible="showSaveModal"
                title="Confirm Save"
                message="Are you sure you want to save this entry?"
                @confirm="save"
                @cancel="cancelSave"
              />
              </div>
              <div v-else>
                <h3>How was your day?</h3>
                <div class="text-input">
                  <form id="text-form">
                    <textarea
                      placeholder="Type Here..."
                      v-model="description"
                    ></textarea>
                  </form>
                </div>
                <button id="add-button" @click="proceedSave">Save</button>
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
  height: 95%;
}

#add-button,
#edit-button {
  background-color: #436850;
  border: none;
  border-radius: 10px;
  width: 20%;
  padding: 10px;
  color: white;
  text-align: center;
  display: block;
  margin: 10px auto;
  cursor: pointer;
}

#delete-button {
  background-color: #c82828;
  border: none;
  border-radius: 10px;
  height: 40px;
  padding: 10px;
  color: white;
  text-align: center;
  display: block;
  margin: 10px auto;
  cursor: pointer;
}

.quote-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin: auto;
  background-color: #436850;
  border-radius: 19px;
  height: 30%;
  margin-top: 2.5%;
}

.title {
  text-align: center;
  color: white;
  font-size: 32px;
  line-height: 1.1;
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
  height: 60%;
}

#entry {
  flex: 2;
  padding-left: 2.5%;
  padding-right: 2.5%;
}

#current-entry {
  flex: 1;
  background-color: white;
  border-top-right-radius: 25px;
  margin-right: 2.5%;
  text-align: left;
  margin-top: 1.5%;
  padding: 2.5%;
  height: 90%;
}

.left-image,
.right-image {
    margin-left: 5%;
    width: auto;
    height: 100px;
    margin-right: 5%;
}

#entryContainer {
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: #fbfada;
  height: 20vh;
  overflow-y: auto;
}

#inner-container {
  padding: 20px;
  background-color: #fbfada;
  border-top-right-radius: 25px;
  height: 75%;
}

.text-input {
  border-radius: 10px;
  border: 1px solid black;
}

.text-input textarea {
  background-color: #fbfada;
  height: 25vh;
}

#text-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

textarea {
  width: 95%;
  border: none;
  border-radius: 10px;
  outline: none;
  padding-left: 10px;
  padding-top: 10px;
  font-family: Arial, sans-serif;
  align-self: center;
}

#buttonsContainer {
  display: flex;
  justify-content: center;
}
</style>

<script>
import Navbar from "@/components/Navbar.vue";
import TopBar from "@/components/TopBar.vue";
import DiaryTest from "@/components/DiaryTest.vue";
import Calendar from "@/components/Calendar.vue";
import firebaseApp from "@/firebase";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import Confirmation from "@/components/Confirmation.vue";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      pageName: "Diary",
      quote:
        "“Divide each difficulty into as many parts as is feasible and necessary to resolve it.”",
      selectedDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      entry: "",
      userId: "",
      docId: "",
      tempEntry: "",
      entryId: "",
      showDeleteModal: false,
      showSaveModal: false,
      description: "",
    };
  },

  watch: {
    async selectedDate() {
      this.entry = await this.checkUserPost();
    },
  },

  components: {
    Navbar,
    TopBar,
    DiaryTest,
    Calendar,
    Confirmation,
  },

  methods: {
    confirmDelete() {
      this.showDeleteModal = true;
    },
    confirmSave() {
      console.log("confirming save");
      this.showSaveModal = true;
      console.log(this.showSaveModal);

    },
    cancelSave() {
      this.entry = this.tempEntry;
      this.tempEntry = "";
      this.showSaveModal = false;
    },
    handleDateSelected(date) {
      this.selectedDate = date;
    },
    proceedSave() {
      this.save();
      this.tempEntry = "";
    },

    formatDate(value) {
      if (!value) return "";

      const date = new Date(value);

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },

    formatDateFirebase(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;

      const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

      return formattedDate;
    },
    async save() {
      console.log("saving");
      const diaryEntry = {
        Title: this.formatDateFirebase(this.selectedDate),
        Description: this.description,
      };

      const db = getFirestore();
      const diaryCollectionRef = collection(
        db,
        "usernames",
        this.docId,
        "diary"
      );

      if (this.entryId) {
        const diaryEntryRef = doc(
          db,
          "usernames",
          this.docId,
          "diary",
          this.entryId
        );
        try {
          await updateDoc(diaryEntryRef, diaryEntry);
          console.log("Entry updated successfully");
          this.entry = this.description;
          this.description = "";
          await this.checkUserPost();
          return;
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      } else {
        try {
          await addDoc(diaryCollectionRef, diaryEntry);
          console.log("Entry saved successfully");
          this.entry = this.description;
          this.description = "";
          await this.checkUserPost();
        } catch (error) {
          console.error("Error saving document: ", error);
        }
      }
    },

    async remove() {
      console.log("deleting");
      this.showDeleteModal = false;
      const diaryEntriesRef = collection(db, "usernames", this.docId, "diary");
      const q = query(
        diaryEntriesRef,
        where("Title", "==", this.formatDateFirebase(this.selectedDate))
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log("Document found with the specified criteria.");

        const documentToDelete = querySnapshot.docs[0];
        const subDocId = documentToDelete.id;
        const toBeDeleted = doc(db, "usernames", this.docId, "diary", subDocId);
        console.log("HGELP");
        try {
          await deleteDoc(toBeDeleted);
          this.entry = "";
          console.log("Document deleted successfully");
        } catch (error) {
          console.error("Error deleting document: ", error);
        }
      } else {
        console.log("No document found with the specified criteria.");
      }
    },

    async edit() {
      this.tempEntry = this.entry;
      this.description = this.entry;
      this.entry = "";
    },
    cancelDelete() {
      this.showDeleteModal = false;
    },

    async checkUserPost() {
      this.description = "";
      const currentUser = getAuth().currentUser;
      if (currentUser) {
        const db = getFirestore();
        const usernamesCollection = collection(db, "usernames");
        const userId = currentUser.uid;
        const q = query(usernamesCollection, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const entryDoc = querySnapshot.docs[0];
          this.docId = entryDoc.id;
          const subcollectionRef = query(
            collection(entryDoc.ref, "diary"),
            where("Title", "==", this.formatDateFirebase(this.selectedDate))
          );
          const subcollectionSnapshot = await getDocs(subcollectionRef);
          if (!subcollectionSnapshot.empty) {
            const diaryEntry = subcollectionSnapshot.docs[0];
            this.entryId = diaryEntry.id;
            console.log(this.entryId);
            return diaryEntry.data().Description;
          }
        } else {
          this.entryId = "";
          console.log(this.entryId);
          return null;
        }
      }
      this.entryId = "";
      console.log(this.entryId);
      return null;
    },
  },
  async mounted() {
    try {
      this.entry = await this.checkUserPost();
    } catch (error) {
      console.error("Failed to load user post:", error);
    }
  },
};
</script>
