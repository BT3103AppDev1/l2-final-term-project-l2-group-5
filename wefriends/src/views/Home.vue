<template>
    
    <div id="main">
        <div id="top-bar">
            <h1>Home</h1>
            <div id="brand">
                <img src="../assets/logo.png" class="logo">
                <h1 class="name">WeFriends</h1>
            </div>
        </div>
        <div id="section">
            <div class="quote-container">
                <p class="quote">When you feel sad, just feel happy.</p>
            </div>
            <div id="content-container">
                <div id="prompt-container">
                    <h1>Today's Prompt</h1>
                    <img src="../assets/diary-prompt-img.png" alt="Diary prompt image" class="prompt-img">
                    <p id="prompt-title">Pet Power</p>
                    <p id="prompt-desc">Did you know that having pets can increase our dopamine levels by over 70%? Write about your pet(s) or your dream pet!</p>
                    <div class="text-input" >
                        <form id="text-form">
                            <textarea placeholder="Type Here..."></textarea>
                            <button type="button" id="submit-button">></button>
                        </form>
                    </div>
                </div>
                <div id="post-container">
                    <div id="trending-post">
                        <div id="post-header">
                            <h1 id="heading-text">Trending Discussion </h1>
                            <select v-model="selectedOption" id="dropdown">
                                <option v-for="option in options" :value="option.value" :key="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>
</template>

<style>

#brand {
    display: flex;
    align-items: center;
    justify-content: right;
    margin-right: 2.5%;
}

#main {
    position: absolute;
    width: 85%;
    height: 100%;
    right: 0;
}

#top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 2.5%;
}

#section {
    position: absolute;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #adbc9f;
}

.quote-container {
    position: relative;
    max-width: 90%; 
    background-color: #fffee5; 
    padding: 5px;
    border-radius: 25px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    margin: 50px auto; 
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

#content-container {
    display: flex;
    justify-content: space-between;
}

#prompt-container {
    flex: 1;
    margin-left: 5%;
    margin-right: 2.5%;
    padding: 0px 20px 20px 20px;
    background-color: white;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#prompt-title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
    color: #ADBC9F;
}

#prompt-desc {
    margin-top: -20px;
    font-size: 16px;
    color: #436850;
    text-align: justify;
}

#post-container {
    flex: 2;
    margin-right: 5%;
    padding: 20px;
    background-color: #ADBC9F;
    border-radius: 25px;
    text-align: center;
}

.prompt-img {
    width: 100%;
    height: auto;
}

.text-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    border-radius: 10px;
    border: 1px solid black;
}

.text-input textarea {
    background-color: white;
    height: 60px;
}

#text-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
}

textarea {
    width: 95%;
    border: none;
    border-radius: 10px;
    outline: none; 
    padding-left: 10px; 
    padding-top: 10px;
    font-family: Arial, sans-serif; /* Change the font */
}

#submit-button {
    background-color: #acd4e7; 
    color: white; 
    text-align: center; 
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 1%;
    border: none;
    font-weight: bold;
    font-size: 16px;
}

#submit-button:hover {
    background-color: #88b6d1; 
}

textarea {
    overflow-wrap: break-word;
    resize: none; 
    margin: 1%;
}

button {
    align-self: flex-end;
}

#post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#dropdown {
    padding: 10px 15px;
    border-radius: 10px; /* Round the corners */
    border: 1px solid #ccc; /* Add a border */
    background-color: #fff; /* Change the background color */
}

</style>

<script>
export default {
    data() {
        return {
            selectedOption: 'option1',
            options: [
                { value: 'option1', text: 'Past 24 Hours' },
                { value: 'option2', text: 'Past 1 Day' },
                // Add more options as needed
            ]
        }
    },
    // ...
}
</script>