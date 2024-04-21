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
    width: 50%;
}

#brand {
    display: flex;
    align-items: center;
    justify-content: right;
    margin-left: 35%;
}

#logo {
    width: 2vw;
    height: 4vh;
    margin-right: 2%;
}

#name {
    padding-right: 1%;
}
</style>

<script>
export default {
    props: {
        pageName: String
    }
}
</script>
