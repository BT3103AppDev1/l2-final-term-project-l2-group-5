<template>
    <div id="view">
        <Navbar id="navbar" />
        <div id="content">
            <h1>Profile</h1>
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
#content {
    width: 80%;
    background-color: #ADBC9F;
}
</style>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
    components: {
        Navbar
    }
}
</script>