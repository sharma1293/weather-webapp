<template>
<div onload="initialize()">
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
<ul id="weatherDetais" list-style-type: none>
  <li v-for="weatherData of weatherDatas">
    City: {{weatherData.city}} Weather: {{weatherData.weather}} Temperature: {{weatherData.temperature}} Observation Time: {{weatherData.observationTime}}
    </li>
</ul>
</div>
</template>
<script>
import AuthenticationServices from '@/services/AuthenticationServices'
import Api from '@/services/Api'
export default {
  data () {
    return {
      zipcode: '',
      weatherDatas: []
    }
  },
  methods: {
    async getWeatherDetails () {
      console.log('Getting weather details for: '+this.zipcode)
      Api().get('/zipcode/'+this.zipcode) .then(response => {
      this.weatherDatas = response.data
    })

    },
    async getLocation() {
      this.zipcode = this.loadLocation(this)
       // = currentZipcode
      // var isComplete = false
      // loadLocation()
  //     .then(zipId =>{ 
  //       console.log('Current Value'+zipId);
  //   this.zipcode = zipId  
  // }
  //     )
      // }
      // var currentZipcode = function 
  // console.log('Current Value'+currentZipcode);
   // .then(function(){
    // if(isComplete){
    
  // }
  // })
    },loadLocation(self){
        var currentZip = ''
        if (navigator.geolocation) {
          console.log('getting Location')
          navigator.geolocation.getCurrentPosition(function locationFound (position){
          // var head= document.getElementsByTagName('head')[0],script= document.createElement('script');
          // script.src= '//maps.googleapis.com/maps/api/js?sensor=false';
          // head.appendChild(script);
          // console.log(x);
          // script.onload = function() {
          // const geoLoc = new google.maps()
          console.log('Getting location for');
          // var geocoder = new google.maps.Geocoder()
          // geocoder  = geoLoc.Geocoder()
          var mylat = position.coords.latitude
          var mylng = position.coords.longitude
          console.log(this);
          var latlng = new google.maps.LatLng(mylat, mylng);
          new google.maps.Geocoder().geocode({'latLng': latlng}, function (res, status) {
                    if (status == google.maps.GeocoderStatus.OK && typeof res[0] !== 'undefined') {
                        var zip = res[0].formatted_address.match(/,\s\w{2}\s(\d{5})/);
                        if (zip) {
                          console.log(typeof zip[1]);
                          self.zipcode = '14222'
                          currentZip = '14211'
                          console.log(currentZip);
                          // zip[1]
                          console.log(zip[1]);
                          // this.getWeatherDetails()
                            // a.value = zip[1];
                        } else fail('Unable to look-up postal code');
                    } else {
                        fail('Unable to look-up geolocation');
                    }
                })

                //}
          // console.log("Lattidue:" + position.address.postalCode)
          // x.innerHTML = "Lattidue:" + position.address.postalCode
        // this.position = position.coords
        // console.log(position);
        // console.log();
      },function errorHandler(err){
        console.log('Error happened :'+err)
      })
          // isComplete = true
    } else { 
      console.log('Geolocation is not supported by this browser.');
        // x.innerHTML = "Geolocation is not supported by this browser.";
    }
    return currentZip
  },initialize() {
    var geocoder = new google.maps.Geocoder();
  }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
    list-style: none; /* Remove HTML bullets */
    padding: 40;
    margin: 10;
}
</style>
