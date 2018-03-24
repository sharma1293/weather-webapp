<template>
<div>
  <h1>Weather</h1>
  <input
  type="text"
  name="zipcode"
  v-model="zipcode"
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
export default {
  data () {
    return {
      zipcode: ''
    }
  },
  methods: {
    async getWeatherDetails () {
      console.log('Geting weather details')
      const response = await AuthenticationServices.register({
        zipcode: this.zipcode
      })
      const x = document.getElementById("weatherDetails")
      x.innerHTML

      // console.log(response.data);
    },
    getLocation() {
        if (navigator.geolocation) {
          console.log('getting Location')
          navigator.geolocation.getCurrentPosition(function locationFound (position){
          var head= document.getElementsByTagName('head')[0],script= document.createElement('script');
          script.src= '//maps.googleapis.com/maps/api/js?sensor=false';
          head.appendChild(script);
          // console.log(x);
          script.onload = function() {
          // geocoder = new google.maps.Geocoder()
          var mylat = position.coords.latitude
          var mylng = position.coords.longitude
          var latlng = new google.maps.LatLng(mylat, mylng)
          new google.maps.Geocoder().geocode({'latLng': latlng}, function (res, status) {
                    if (status == google.maps.GeocoderStatus.OK && typeof res[0] !== 'undefined') {
                        var zip = res[0].formatted_address.match(/,\s\w{2}\s(\d{5})/);
                        if (zip) {
                          console.log(zip[1]);
                          this.zipcode = zip[1]
                            // a.value = zip[1];
                        } else fail('Unable to look-up postal code');
                    } else {
                        fail('Unable to look-up geolocation');
                    }
                })}
          // console.log("Lattidue:" + position.address.postalCode)
          // x.innerHTML = "Lattidue:" + position.address.postalCode
        // this.position = position.coords
        // console.log(position);
        // console.log();
      },function errorHandler(err){
        console.log('Error happened :'+err)
      })
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
