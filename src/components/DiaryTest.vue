<template>
    <form id="brian">
        <div>
            <label for="title">Title</label>
            <input type="text" id="title" placeholder="title"><br>
            <label for="description">Description</label>
            <input type="text" id="description" placeholder="description"><br>

            <button id="diary" type="button" v-on:click="save">Save</button>
        </div>
    </form>
</template>


<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
const db = getFirestore(firebaseApp);

export default {
    methods: {
        async save() {
            console.log("saving")
            let title = document.getElementById("title").value
            let description = document.getElementById("description").value

            alert("posting diary entry")
            try {
                const docRef = await setDoc(doc(db, "Diary", title),{
                    Title: title, Description: description
                })
                console.log(docRef)
                document.getElementById('brian').reset();
                // somehow this is very very important guys
                this.$emit("added")
            } catch(error) {
                console.log("Error1!!:", error);
            }
        }
    }
}
</script>



