<template>
    <div id="topbar">
        <h3 id="pageName">{{ pageName }}</h3>
        <div id="brand">
            <img src="@/assets/logo.png" id="logo">
            <h3 id="name">WeFriends</h3>
        </div>
    </div>
</template>

<style scoped>
#topbar {
    background-color: white;
    display: flex;
}
#pageName {
    margin-left: 2%;
    margin-top: 0;
    margin-bottom: 0;
    align-self: center;
    width: 20%;
}
#brand {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 65%;
}
#logo {
    width: 80%;
    height: 80%;
    margin-right: 2%;
}
#name {
    margin: 0;
}
</style>

<script>
export default {
    props: {
        pageName: String
    }
}
</script>
