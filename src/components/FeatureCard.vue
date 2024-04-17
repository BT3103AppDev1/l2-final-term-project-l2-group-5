<template>
    <div class="feature-card">
        <div class="vertical-line"></div>
        <div class="icon">
            <img :src="imageSrc" :alt="altText">
        </div>
        <div class="content">
            <h2 class="header">{{ title }}</h2>
            <p class="subheader">{{ subtitle }}</p>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'FeatureCard',
    props: {
        imageSrc: String,
        altText: String,
        title: String,
        subtitle: String
    },
}
</script>
  
<style scoped>
.feature-card {
    border: 2px solid #65B583;
    margin: 10px;
    padding: 20px;
    width: calc(30% - 15px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: rgb(255, 254, 255);
}

.vertical-line {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 6px;
    background-color: #65B583;
}

.icon {
    margin-bottom: 10px;
}

.content {
    text-align: center;
}

.header {
    font-size: 26px;
    margin-bottom: 2px;
    color: #2B2F2D
}

.subheader {
    font-size: 17px;
    color: #8C8D8C;
    text-align: center;
    min-height: 4.5em;
    white-space: normal;
}
</style>
  