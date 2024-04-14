<template>
    <div id="view">
        <Navbar id="navbar" />
        <div id="right-side">
            <TopBar :pageName="pageName" id="topbar" />
            <div id="content">
                <div class="scrollable-content">
                    <div class="top-banner">
                        <img src="../assets/edu-ban1.png" alt="Left Image" class="left-image">
                        <h1 class="title">
                            <span>Your</span><br>
                            <span>Mental Health</span><br>
                            <span>Matters</span>
                        </h1>
                        <img src="../assets/edu-ban2.png" alt="Right Image" class="right-image">
                    </div>

                    <div class="dropdown-container">
                        <div class="box" :class="{ active: activeBox === 'about' }" data-box="about">
                            <div class="header" @click="toggleBox('about')" :class="{ active: activeBox === 'about' }">
                                <span>About Mental Health</span>
                                <svg class="chevron-icon"
                                    :class="{ 'chevron-rotated': activeBox === 'about', 'white-chevron': activeBox === 'about' }"
                                    @click.stop="toggleBox('about')" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 15L12 8L19 15" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div class="content" v-show="activeBox === 'about'">
                                <p class="information">{{ aboutMentalHealthContent }}</p>
                            </div>
                            <hr class="line">
                        </div>

                        <div class="box" :class="{ active: activeBox === 'prevention' }">
                            <div class="header" :class="{ active: activeBox === 'prevention' }"
                                @click="toggleBox('prevention')">
                                <span>Prevention</span>
                                <svg class="chevron-icon"
                                    :class="{ 'chevron-rotated': activeBox === 'prevention', 'white-chevron': activeBox === 'prevention' }"
                                    @click.stop="toggleBox('prevention')" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 15L12 8L19 15" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div class="content" v-show="activeBox === 'prevention'">
                                <!-- Content for 'Prevention' box goes here -->
                                <p class="information">Prevention plays a crucial role in mental health, benefiting everyone
                                    regardless of their
                                    current mental well-being. Our mental health is dynamic, influenced by various factors
                                    in
                                    our lives.</p>
                                <p class="information">There are three key types of prevention:</p>
                                <ol><b>1. Primary Prevention:</b> This focuses on halting the onset of mental health issues
                                    before
                                    they manifest. Its goal is to promote good mental health for all individuals within a
                                    community. Initiatives like Mental Health Awareness Week and educational programs
                                    targeting emotional well-being in schools are examples of primary prevention efforts.
                                </ol>
                                <ol><b>2. Secondary Prevention:</b> This involves providing support to individuals at a
                                    higher
                                    risk of
                                    developing mental health problems due to either inherent characteristics or past
                                    experiences. This includes marginalized groups such as LGBTQIA+ individuals, survivors
                                    of
                                    trauma, people with chronic physical health conditions, and victims of hate crimes. By
                                    offering targeted support, secondary prevention aims to mitigate risk factors and
                                    promote
                                    resilience.
                                </ol>
                                <ol><b>3. Tertiary Prevention:</b> Tertiary prevention focuses on assisting individuals
                                    already
                                    living
                                    with mental health conditions to maintain their well-being and enhance their quality of
                                    life. It involves strategies to manage symptoms effectively, empower individuals in
                                    self-care practices, and minimize the likelihood of relapse.
                                </ol>
                                <hr>
                                <p class="information"><b>Ways to Enhance Your Mental Well-being</b></p>
                                <br>
                                <li class="information"><b>Express Yourself:</b> Sharing your thoughts and emotions with
                                    someone who
                                    listens can
                                    provide invaluable support and alleviate feelings of loneliness.
                                </li>
                                <li class="information"><b>Prioritize Sleep:</b> Cultivate healthy sleep habits as quality
                                    rest
                                    is
                                    essential for maintaining good mental health. Addressing sleep issues can positively
                                    impact
                                    your overall well-being.
                                </li>
                                <li class="information"><b>Nourish Your Body:</b> Pay attention to your diet, as what you
                                    eat
                                    can
                                    influence your mood and energy levels. Aim for a balanced diet to boost your sense of
                                    well-being.
                                </li>
                                <li class="information"><b>Stay Active:</b> Engaging in regular physical activity not only
                                    benefits
                                    your physical health but also enhances your mental clarity and mood.
                                </li>
                                <li class="information"><b>Practice Mindfulness:</b> Embrace mindfulness techniques to stay
                                    grounded in
                                    the present moment, fostering a sense of calm and clarity amidst life's challenges.
                                </li>
                                <li class="information"><b>Stay Connected:</b> Maintain meaningful connections with
                                    supportive
                                    friends
                                    and loved ones. Sharing experiences and receiving support from others can help alleviate
                                    stress and foster a sense of belonging.
                                </li>
                                <li class="information"><b>Engage in Acts of Kindness:</b>Cultivate compassion and empathy
                                    by
                                    caring for others, whether
                                    through nurturing relationships, letting go of grudges, or volunteering. These acts of
                                    kindness can bring fulfillment and meaning to your life.

                                </li>
                                <p class="information">By incorporating these practices into your daily routine, you can
                                    nurture
                                    your mental
                                    well-being and cultivate resilience in the face of life's challenges.
                                </p>
                            </div>
                        </div>
                        <hr class="line">

                        <div class="box" :class="{ active: activeBox === 'research' }">
                            <div class="header" @click="toggleBox('research')"
                                :class="{ active: activeBox === 'research' }">
                                <span>Latest Research</span>
                                <svg class="chevron-icon"
                                    :class="{ 'chevron-rotated': activeBox === 'research', 'white-chevron': activeBox === 'research' }"
                                    @click.stop="toggleBox('prevention')" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 15L12 8L19 15" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div class="content" v-show="activeBox === 'research'">
                                <div class="research-cards">
                                    <div class="research-card">
                                        <img src="https://media.springernature.com/lw685/springer-static/image/art%3A10.1186%2Fs13033-024-00630-0/MediaObjects/13033_2024_630_Fig1_HTML.png"
                                            alt="Research Image" class="research-image">
                                        <a class="research-title"
                                            href="https://ijmhs.biomedcentral.com/articles/10.1186/s13033-024-00630-0">Community-based
                                            rehabilitation for people with psychosocial disabilities in low- and
                                            middle-income
                                            countries: a systematic review of the grey literature</a>
                                    </div>
                                    <div class="research-card">
                                        <img src="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7364393/bin/cureus-0012-00000008627-i01.jpg"
                                            alt="Research Image" class="research-image">
                                        <a class="research-title"
                                            href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7364393/">Social Media Use
                                            and
                                            Its Connection to Mental Health: A Systematic Review
                                        </a>
                                    </div>
                                    <div class="research-card">
                                        <img src="https://media.springernature.com/lw685/springer-static/image/art%3A10.1186%2Fs13033-024-00623-z/MediaObjects/13033_2024_623_Fig1_HTML.png"
                                            alt="Research Image" class="research-image">
                                        <a class="research-title"
                                            href="https://ijmhs.biomedcentral.com/articles/10.1186/s13033-024-00623-z">Can
                                            computer simulation support strategic service planning? Modelling a large
                                            integrated
                                            mental health system on recovery from COVID-19
                                        </a>
                                    </div>
                                    <div class="research-card">
                                        <img src="https://media.springernature.com/lw685/springer-static/image/art%3A10.1186%2Fs13033-024-00627-9/MediaObjects/13033_2024_627_Fig1_HTML.png"
                                            alt="Research Image" class="research-image">
                                        <a class="research-title"
                                            href="https://ijmhs.biomedcentral.com/articles/10.1186/s13033-024-00627-9">Mapping
                                            awareness-raising and capacity-building materials on
                                            developmental disabilities for non-specialists: a review of the academic and
                                            grey
                                            literature
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Navbar from '@/components/Navbar.vue'
import TopBar from '@/components/TopBar.vue'
import firebaseApp from "../firebase.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            pageName: "Education",
            title: "Your Mental Health Matters",
            activeBox: null,
            aboutMentalHealthContent: ""
        }
    },
    components: {
        Navbar,
        TopBar
    },
    methods: {
        toggleBox(box) {
            if (this.activeBox === box) {
                this.activeBox = null;
            } else {
                this.activeBox = box;
            }
        },
        async getAbout() {
            try {
                const db = getFirestore();
                const docRef = doc(db, "education", "about mental health"); // Assuming "about mental health" is the document ID
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    // Access the "about" field from the document data
                    const aboutContent = data.about;
                    console.log("About Mental Health Content:", aboutContent);
                    // Display the content on the frontend
                    this.aboutMentalHealthContent = aboutContent; // Assuming you have a data property named aboutMentalHealthContent to store the content
                } else {
                    console.log("Document does not exist!");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
        checkOverflow() {
            // Check if the container is overflowing horizontally
            const container = document.querySelector('.research-container');
            if (container.scrollWidth > container.clientWidth) {
                this.showChevron = true;
            } else {
                this.showChevron = false;
            }
        }
    },
    mounted() {
        // Call getAbout method when the component is mounted
        this.getAbout();
        this.$nextTick(() => {
            this.checkOverflow(); // Check for overflow after component is mounted
        });
        window.addEventListener('resize', this.checkOverflow); // Listen for window resize to check overflow
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkOverflow); // Remove resize listener to prevent memory leaks
    }
}
</script>
  
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
    flex: 1;
}

.top-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    margin: auto;
    background-color: #436850;
    border-radius: 19px;
    height: 30%;
    margin-top: 2%;
}

.title {
    text-align: center;
    color: white;
    font-size: 60px;
    line-height: 1.1;
}

.left-image,
.right-image {
    margin-left: 5%;
    width: auto;
    height: 100px;
    margin-right: 5%;
}

.dropdown-container {
    flex: 1;
    width: 95%;
    margin: 0 auto;
    margin-top: 2%;
}

.box {
    width: 100%;
    background-color: #F0F0F0;
}

.box[data-box="about"] {
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
}

.header {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-size: 23px;
    font-weight: 600;
}

/* Hover styles for the header when box is active */
.header.active {
    background-color: #436850;
    color: white;
}

/* Styles for rotated chevron icon */
.chevron-icon {
    transition: transform 0.3s;
    width: 24px;
    height: 24px;
}

/* Styles for rotated chevron icon */
.chevron-rotated {
    transform: rotate(180deg);
}

/* Change stroke color to white */
.white-chevron path {
    stroke: white;
}

.content {
    padding: 10px;
    display: none;
}

.content p {
    margin: 0;
}

.box.active .content {
    display: block;
}

.information {
    font-size: 15px;
    padding: 5px;
    font-weight: 200;
}

.line {
    width: 100%;
    border-top: 0.5px solid #436850;
    margin: 0px;
}

.research-cards {
    display: flex;
    overflow-x: auto;
    flex-wrap: nowrap;
    /* Enable horizontal scrolling */
}

.research-card {
    width: 500px;
    height: 300px;
    /* Adjust width as needed */
    border: 1px solid #ccc;
    border-radius: 18px;
    margin: 15px;
    padding: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    flex: 0 0 auto;
}

.research-image {
    width: 100%;
    height: 70%;
    /* Maintain aspect ratio */
}

.research-title {
    margin-top: 30px;
    text-align: center;
    font-weight: bold;
}

.scrollable-content {
    max-height: calc(100% - 50px);
    /* Adjust the max-height as needed */
}
</style>