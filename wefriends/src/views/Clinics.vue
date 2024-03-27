<template>
    <div id="view">
        <Navbar id="navbar" />
        <div id="content">
            <TopBar :pageName="pageName" id="topbar" />
            <div id="content-map">
                <h1>Find a Clinic</h1>
                <input type="text" v-model="postalCode" class="postal-input" placeholder="Enter Postal Code">
                <button @click="fetchNearbyClinics">Search</button>
                <div id="locations-map">
                <div id="locations">
                <ul class="clinic-list">
                    <li v-for="clinic in clinics" :key="clinic.place_id">
                        <div class="box">
                            <h3>{{ clinic.name }}</h3>
                            <p>{{ clinic.vicinity }}</p>
                        </div>
                    </li>
                </ul>
                </div>
                <div id="map"></div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import TopBar from '@/components/TopBar.vue'
import { toRaw } from 'vue';

export default {
    components: {
        Navbar,
        TopBar
    },
    data() {
        return {
            pageName: "Clinics Near Me",
            postalCode: '',
            map: null,
            service: null, // to use with Places Library
            geocoder: null, // to use for geocoding
            markers: [],
            clinics: [], // list of nearby clinics
        }
    },
    mounted() {
        this.loadGoogleMapsApi();
    },
    methods: {
        loadGoogleMapsApi() {
            if (!window.google) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCiIKBd-C6EXBfOD-ijyiKHTSdn7O8WhzY&libraries=places&callback=initMap`;
                script.async = true;
                script.defer = true;
                window.initMap = this.initMap;
                document.head.appendChild(script);
            } else {
                this.initMap();
            }
        },
        initMap() {
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 1.3521, lng: 103.8198 }, // singapore coodinates
                zoom: 12,
            });
            this.service = new google.maps.places.PlacesService(this.map);
            this.geocoder = new google.maps.Geocoder();
        },
        clearMarkers() {
            this.markers.forEach((marker) => {
                const rawMarker = toRaw(marker);
                rawMarker.setMap(null);
            });
            this.markers = [];
        },
        fetchNearbyClinics() {
            this.clearMarkers();
            this.clinics = [];
            this.$nextTick(() => {
            this.geocoder.geocode({ 'address': this.postalCode + ', Singapore' }, (results, status) => {
                if (status === 'OK') {
                    this.map.setCenter(results[0].geometry.location);

                    // marker for current location
                    const locationMarker = new google.maps.Marker({
                        map: this.map,
                        position: results[0].geometry.location,
                        icon: {                             
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        },
                        title: 'Your Location'
                    });
                    this.markers.push(locationMarker);

                    const request = {
                        location: results[0].geometry.location,
                        radius: '2000', // 2 km radius
                        type: ['hospital']
                    };
                    this.service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    this.clinics = results;

                    results.forEach(place => {
                        
                        const marker = new google.maps.Marker({
                            position: place.geometry.location,
                            map: this.map,
                            title: place.name
                        });
    
                        marker.addListener('click', () => {
                            // show place details when clicked
                            alert(`Place name: ${place.name}`);
                        });
                        this.markers.push(marker);
                        });
                    }});
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        });
        }
    },
}
</script>

<style scoped>
#view {
    display: flex;
    justify-content: space-around;
    height: 100%;
}

#navbar {
    width: 20%;
}

#content {
    width: 80%;
    background-color: #ADBC9F;
    display: flex;
    flex-direction: column;
}

#content h1 {
    margin-left: 15px;
}

#content button {
    padding: 6px;
    background-color: #12372A;
    color: white;
    border: 0;
    border-radius: 5px;
}

#locations {
    width: 20%;
    height: 500px;
    overflow-y: auto; /* enable vertical scrolling */
    font-size: 10px;
}

#locations-map {
    display: flex;
}

#map {
    margin: 50px 20px 70px 20px;
    width: 75%;
    height: 420px;
}

.clinic-list {
    list-style-type: none; /* removes the bullets */
    padding: 0; /* removes default padding */
    margin-left: 10px;
}

.postal-input {
    margin: 0px 7px 20px 15px;
    border-radius: 5px;
    padding: 6px;
    width: 12%;
    border: 0px;
}

.box {
    background-color: white;
    border-radius: 5px;
    margin: 0px 0px 10px 6px;
    padding: 1px 9px 1px 9px;
}
</style>