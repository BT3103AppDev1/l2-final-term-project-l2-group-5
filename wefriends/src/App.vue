<template>
  <div id="nav">
    <router-link to="/">Landing</router-link> |
    <router-link to="/home">Home</router-link> |
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
body {
  font-family: 'Nunito Sans', sans-serif;
  margin: 0;
  padding: 0;
}
.router-link-active, .router-link-exact-active, a{
  text-decoration: none;
}
</style>