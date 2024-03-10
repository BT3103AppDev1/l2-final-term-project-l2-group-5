<template>
    <div class="mainContainer">
        <div id="top">
            <div id="brand">
                <img src="../assets/logo.png" class="logo">
                <h1 class="name">WeFriends</h1>
            </div>
            <div id="topBar">
                <router-link to="/">Landing</router-link> |
                <router-link to="/login" id="login">Log in</router-link>
                <div id="signUpContainer">
                    <router-link to="/signup" id="signUpButton">Sign Up</router-link>
                </div>
            </div>
        </div>
    </div>
    <router-view/>
    
    <div class="bottomBorder">
    </div>
</template>

<style scoped>
#brand {
    float: left;
    display: flex;
    align-items: center;
}
#top{
    align-items: center; 
}
.logo {
    display: inline-block;
    margin-left: 30px;
}
.name {
    display: inline-block;
    margin-left: 12px;
    font-size: 28px;
}
.mainContainer {
    background-color: #FBFAF0;
    height: 90vh;
    width: 100vw;
}
#topBar {
    float: right;
    display: flex;
    align-items: center;
}
.bottomBorder {
    background-color: #436850;
    height: 8vh;
}

#signUpContainer {
    display: inline-block;
    background-color: #12372A; /* Green background */
    padding: 10px 30px; /* Top/bottom and left/right padding for the oval shape */
    border-radius: 30px; /* Makes the background oval or circular */
    transition: transform 0.3s ease; /* Smooth transition for hover effect */
    margin-right: 30px;

  }

#signUpContainer:hover {
    transform: scale(1.05); /* Slightly enlarges the button on hover */
  }

#signUpButton {
    border: none; /* Removes button border */
    background-color: transparent; /* Makes the button transparent to show the container's background */
    color: white; /* Text color */
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
    cursor: pointer;
}
#login {
    margin-right: 10px;
    color: black;
    font-size: 20px;
}
</style>

<script>

</script>