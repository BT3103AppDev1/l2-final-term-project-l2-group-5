<template>
    <div class="mainContainer">
      <div id="top">
        <div id="brand">
          <img src="../assets/logo.png" class="logo">
          <h1 class="name">WeFriends</h1>
        </div>
        <div id="topBar">
          <div id="navLinks">
            <router-link to="/login" id="login">Log in</router-link>
          </div>
          <div id="signUpContainer">
            <router-link to="/signup" id="signUpButton">Sign Up</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="main">
        <div class="content">
            <span class="heading">Your mental health is a <span class="emphasis"><em><b>priority</b></em></span>, not an afterthought.</span>
            <span class="subHeading">You deserve to feel supported and understood. Join our community to see what we can offer.</span>
        </div>
        <div class="img"></div>
    </div>
    <router-view/>
    <div class="bottomBorder"></div>
  </template>
  
<style scoped>
.main {
    display: flex;
    justify-content: space-between;
}

.content {
    width: 55%;
    text-align: left;
}

.img {
  height: 650px; /* Adjust the height as needed */
  width: 100%; /* Adjust the width as needed */
  background: url("../assets/landing.png") center/cover;
  object-fit: cover; /* This property ensures the image covers the entire container without distortion */
}

.heading {
    font-size: 5vw;
    line-height: 1.2;
    display: inline-block; /* Set to inline-block to appear on the same line */
    padding-top: 7%;
    margin-left: 5%;
}

.subHeading {
    display: inline-block; /* Set to inline-block to appear on the same line */
    font-size: 2vw;
    color: rgba(0, 0, 0, 1);
    line-height: 1.4;
    margin-top: 2%;
    margin-bottom: 15%;
    margin-left: 5%;
}

.emphasis {
    color: #C11F1F;
}

#brand {
    display: flex;
    align-items: center;
}

#top {
    width: 100%;
    display: flex;
    justify-content: space-between;
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
    height: 8vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#topBar {
    float: right;
    display: flex;
    align-items: center;
    justify-content: center;
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