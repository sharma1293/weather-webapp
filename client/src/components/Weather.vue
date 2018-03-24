<template>
<div>
  <h1>Weather</h1>
  <input
  type="text"
  name="city"
  v-model="city"
  placeholder="zipcode"
/>
<br>
<button 
@click = "getLocation">Get Current Location</button>
<br>
<button 
@click = "getWeatherDetails">Search</button>
<p id="weatherDetails"></p>
</div>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationServices'
var x = document.getElementById("weatherDetails");
export default {
  data () {
    return {
      zipcode: ''
    }
  },
  methods: {
    async getWeatherDetails () {
      console.log('Geting weather details');
      const response = await AuthenticationServices.register({
        zipcode: this.zipcode
      })
      // console.log(response.data);
    },
    getLocation() {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationFound);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    },
    locationFound (position) {
      console.log(position);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
