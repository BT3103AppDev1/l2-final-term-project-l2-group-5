<template>
    <div id="view">
        <Navbar id="navbar" />
        <div id="right-side">
            <TopBar :pageName = "pageName" id="topbar"/>
            <div id="content">
                <h1>Profile Information</h1>
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
    background-color: #ADBC9F;
    height: 90%;
}
</style>

<script>
import Navbar from '@/components/Navbar.vue'
import TopBar from '@/components/TopBar.vue'

export default {
    data() {
        return {
            pageName: "Profile"
        }
    },
    components: {
        Navbar,
        TopBar
    }
}
</script>