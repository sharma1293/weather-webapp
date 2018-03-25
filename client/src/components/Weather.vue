<template>
<div onload="initialize()">
  <b-form>
  <h1>Weather</h1>
  <b-form-group id = "User input" >
    <b-form-input id="zipcode"
                      size = "sm"
                      type="text"
                      v-model="zipcode"
                      placeholder="Enter Zipcode">
        </b-form-input>
        <b-button size = "sm" variant = "secondary" 
@click = "getLocation">Get Current Location</b-button>
<b-button size = "sm" variant = "primary"button 
@click = "getWeatherDetails">Search</b-button>
  </b-form-group>
  </b-form>
  
  <!--<b-form-input :size  = "sm"
  type="text"
  name="zipcode"
  v-model="zipcode"
  placeholder="Enter Zipcode"
/>
<b-button :size = "sm" :variant = "secondary" 
@click = "getLocation">Get Current Location</b-button>
<br>
<b-button :size = "sm" :variant = "primary"button 
@click = "getWeatherDetails">Search</b-button>
-->
<b-table striped hover :items="weatherDatas" :fields= "fields" v-if="weatherDatas.length > 0">Weather Data</b-table>
<template slot="City" slot-scope="weatherDatas">
      {{weatherDatas.city}}
    </template>
    <b-button size = "sm" variant = "primary"button v-if="weatherDatas.length > 0" @click = "proceed">Proceed</b-button>
<!--<ul id="weatherDetais" list-style-type: none>
  <li v-for="weatherData of weatherDatas">
    City: {{weatherData.city}} Weather: {{weatherData.weather}} Temperature: {{weatherData.temperature}} Observation Time: {{weatherData.observationTime}}
    </li>
</ul>-->
</div>
</template>
<script>
import AuthenticationServices from '@/services/AuthenticationServices'
import Api from '@/services/Api'
export default {
  data () {
    return {
      zipcode: '',
      fields: [ 'city', 'weather', 'temperature', 'observationTime'],
      weatherDatas: []
    }
  },
  methods: {
    async getWeatherDetails () {
      console.log('Getting weather details for: '+this.zipcode)
      Api().get('/zipcode/'+this.zipcode) .then(response => {
      this.weatherDatas = response.data
    }).catch(() => this.noDataFound())

    },
    async getLocation() {
      var self = this
      // this.zipcode = this.loadLocation(this)
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
                          self.zipcode = zip[1]
                          // self.getWeatherDetails()
                          console.log(zip[1]);
                          // self.zipcode = zip[1]
                          self.getWeatherDetails()
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
    },initialize() {
    var geocoder = new google.maps.Geocoder();
  }, proceed(){
    this.$router.replace(this.$route.query.redirect || '/AllData')
  }, noDataFound(){
    alert("No data found for provided zipcode, Please enter a valid zipcode")
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
