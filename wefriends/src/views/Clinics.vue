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
                    <li v-for="clinic in clinics" :key="clinic.place_id" @click="zoomToClinic(clinic)">
                        <div class="box">
                        <h3>{{ clinic.name }}</h3>
                        <p>{{ clinic.vicinity }}</p>
                        <p v-if="clinic.distance"><i>Distance: {{ clinic.distance }} away</i></p>
                        <p v-else>Distance: Calculating...</p>
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
            distanceMatrixService: null,
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
            this.distanceMatrixService = new google.maps.DistanceMatrixService();
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
            this.clinics = []; // clear previous clinic data
            this.geocoder.geocode({ 'address': this.postalCode + ', Singapore' }, (geocodeResults, geocodeStatus) => {
            if (geocodeStatus === 'OK') {
                this.map.setCenter(geocodeResults[0].geometry.location);

                const locationMarker = new google.maps.Marker({
                    map: this.map,
                    position: geocodeResults[0].geometry.location,
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    title: 'Your Location',
                    });

                this.markers.push(locationMarker);

                const request = {
                    location: geocodeResults[0].geometry.location,
                    radius: '2000', // within 2000m
                    type: ['hospital'],
                };

                this.service.nearbySearch(request, (searchResults, searchStatus) => {
                if (searchStatus === google.maps.places.PlacesServiceStatus.OK) {
                    this.clinics = searchResults;

                    const origins = [geocodeResults[0].geometry.location];
                    const destinations = searchResults.map(clinic => clinic.geometry.location);

                    // getting the distance from nearby clinics to origin
                    this.distanceMatrixService.getDistanceMatrix({ 
                            origins: origins,
                            destinations: destinations,
                            travelMode: google.maps.TravelMode.DRIVING,
                        }, (distanceResults, distanceStatus) => {
                            if (distanceStatus === 'OK') {
                                const distanceData = distanceResults.rows[0].elements;

                                this.clinics.forEach((clinic, index) => {
                                    const element = distanceData[index];
                                    if (element.status === 'OK') {
                                        // distance text for display
                                        clinic.distance = element.distance.text;
                                        // transform to value for sorting purpose
                                        clinic.distanceValue = element.distance.value;
                                    } else {
                                        clinic.distance = 'Distance not available';
                                        // to sort last if distance not available
                                        clinic.distanceValue = Number.MAX_VALUE;
                                    }
                                });

                                // sort nearby clinics according to distance
                                this.clinics.sort((a, b) => a.distanceValue - b.distanceValue);

                                // trigger reactivity
                                this.clinics = [...this.clinics];
                            } else {
                                console.error('Error with distance matrix:', distanceStatus);
                            }
                        });

                    searchResults.forEach((place, index) => {
                    const marker = new google.maps.Marker({
                        position: place.geometry.location,
                        map: this.map,
                        title: place.name,
                    });

                    marker.addListener('click', () => {
                        alert(`Place name: ${place.name}`);
                    });
                    this.markers.push(marker);
                    });
                }});
            } else {
                alert('Geocode was not successful for the following reason: ' + geocodeStatus);
            }});
        },
        zoomToClinic(clinic) {
            const clinicLocation = clinic.geometry.location;
            this.map.setZoom(17);
            this.map.panTo(clinicLocation);
        },
    }}
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
    transition: box-shadow 0.1s ease-out;
}

#content button:hover {
    background-color: #12372A;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
}

#locations {
    width: 20%;
    height: 75vh;
    overflow-y: auto; /* enable vertical scrolling */
    font-size: 10px;
}

#locations-map {
    display: flex;
}

#map {
    margin: 0px 0px 0px 20px;
    width: 85%;
    height: 74vh;
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
    box-shadow: 2px 2px 2px rgba(37, 80, 27, 0.5);
    transition: box-shadow 0.2s ease-in-out;
}

.box:hover {
  /* Box shadow for "pop up" effect on hover */
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.6);
}
</style>