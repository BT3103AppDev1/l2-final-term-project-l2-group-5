<template>
    <div id="top">
        <div id="brand">
            <img src="../assets/logo.png" class="logo">
            <h2>WeFriends</h2>
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

    <div id="content">
        <div id="headline">
            <div class="text-container">
                <h1>Where Mental Wellness Finds Its Tribe</h1>
                <p>Embrace social support and take charge of your mental well-being with WeFriends.</p>
            </div>
            <div class="image-container">
                <img src="../assets/landing/illus.jpg" alt="Mental Illustration">
            </div>
        </div>
        <div id="feature">
            <div class="text-container">
                <h1>How we can help you in your first steps</h1>
                <p>Embarking on your health journey with WeFriends is as simple as 1, 2, 3!</p>
            </div>
            <div class="feature-cards-container">
                <FeatureCard imageSrc="../src/assets/landing/book.png" altText="Diary Icon" title="Diary"
                    subtitle="Intuitive diary entries empowering you to be more introspective, and witness the power of your commitment to wellness." />
                <FeatureCard imageSrc="../src/assets/landing/users.png" altText="Forum Icon" title="Forum"
                    subtitle="A community and support system of anonymised people who want to help each other through mental health challenges." />
                <FeatureCard imageSrc="../src/assets/landing/pin.png" altText="Clinics Icon" title="Clinics"
                    subtitle="Clinics near you are displayed based on search of a postal code or location, for quick, easy and convenient access and information." />
                <FeatureCard imageSrc="../src/assets/landing/info.png" altText="Education Icon" title="Education"
                    subtitle="Learn more about what mental wellness is about, how to prevent it and catch up on the latest research." />
                <FeatureCard imageSrc="../src/assets/landing/bell.png" altText="Daily Prompts Icon" title="Daily Prompts"
                    subtitle="Answer a new daily prompt that encourages you to reflect and think about your day or a certain feeling and mood." />
                <FeatureCard imageSrc="../src/assets/landing/chart.png" altText="Analysis Icon" title="Analysis"
                    subtitle="WeFriends generates statistics and analysis on your behaviour, providing you with insights on how you use our app." />
            </div>
        </div>

        <div id="video">
            <h1>How WeFriends Work</h1>
            <p>Watch our demo below</p>
            <iframe class="video-youtube" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0"
                allowfullscreen></iframe>
        </div>

        <div id="contact">
            <div class="contact-container">
                <h1>Stay Updated on Mental Health Awareness</h1>
                <p>Sign up to be a part of our growing mental health awareness community</p>
                <br>
                <hr>
                <br>
                <div id="signup-bottom">
                    <router-link to="/signup" id="signUpButton">Sign Up</router-link>
                </div>
            </div>
        </div>
    </div>
    <router-view />
</template>
  
<style scoped>
#content {
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("../assets/landing/background-img.png") center/cover;
    height: auto;
    position: relative;
    flex-direction: column;
}

.contact-container {
    color: white;
    text-align: center;
}

.feature-cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

#headline {
    text-align: center;
    background-color: #dae4dd;
    width: 100%;
}

#feature {
    width: 90%;
    border-radius: 2.4rem;
    padding: 60px;
    margin-top: 1%;
}

#video {
    background-color: #e3e3e3;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 5%;
    padding-top: 3%;
}

.video-youtube {
    width: 70%;
    height: 550px;
    align-items: center;
}

#video h1 {
    margin-top: 0px;
    font-size: 48px;
    color: #000000;
    text-align: center;
    margin-bottom: 1.5%;
}

#video p {
    margin-top: 0px;
    font-size: 20px;
    color: #8C8D8C;
    text-align: center;
    margin-bottom: 3%;
}

#contact {
    background-color: #012f2c;
    width: 100%;
    padding: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

body {
    background-color: #FDFCF9;
}

.image-container {
    width: 70%;
    opacity: 0;
    margin: 0 auto;
    padding-bottom: 50px;
    transform: translateY(50px);
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.image-container.show {
    opacity: 1;
    transform: translateY(0);
}

.text-container h1 {
    font-size: 60px;
    color: #12372A;
    text-align: center;
    width: 50%;
    margin: 0 auto;
    padding: 30px;
}

.text-container p {
    font-size: 20px;
    color: #8C8D8C;
    text-align: center;
    margin-top: 0px;
}


.image-container {
    display: flex;
    align-items: center;
}

.image-container img {
    width: 100%;
    height: 50%;
    border-radius: 1000px;
    transform: scale(0.9);
}

#brand {
    display: flex;
    align-items: center;
}

#top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: white;
}

.logo {
    display: inline-block;
    margin-left: 20px;
    width: 50px;
    margin-right: 10px;
}

#topBar {
    display: flex;
    align-items: center;
}

.bottomBorder {
    background-color: #436850;
    height: 8vh;
}

#signUpContainer {
    display: inline-block;
    background-color: #12372A;
    padding: 10px 30px;
    border-radius: 30px;
    transition: transform 0.3s ease;
    margin-right: 30px;
}

#signup-bottom {
    display: inline-block;
    background-color: #158a81;
    padding: 10px 30px;
    border-radius: 30px;
    transition: transform 0.3s ease;
    margin-right: 30px;
}

#signUpContainer:hover {
    transform: scale(1.05);
}

#signUpButton {
    border: none;
    background-color: transparent;
    color: white;
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

import FeatureCard from '@/components/FeatureCard.vue';

export default {
    mounted() {
        setTimeout(() => {
            document.querySelector('.image-container').classList.add('show');
        }, 500)
    },
    methods: {
        scrollToFeature() {
            const featureContainer = document.getElementById('feature');
            if (featureContainer) {
                window.scrollTo({
                    top: featureContainer.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    },
    components: {
        FeatureCard
    },
}

</script>