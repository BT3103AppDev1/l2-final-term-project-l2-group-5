<template>
  <div id="nav">
    <router-link to="/">Landing</router-link> |
    <router-link to="/home">Home</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/signup">SignUp</router-link> |
    <router-link to="/forgot">Forgot</router-link> |
    <router-link to="/education">Education</router-link> |
    <router-link to="/diary">Diary</router-link> |
    <router-link to="/clinics">Clinics</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/forum">Forum</router-link>
  </div>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#nav {
  padding: 30px
}
#nav a{
  font-weight: bold;
  color:midnightblue
}
</style>