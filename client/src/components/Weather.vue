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
<button type="" 
@click = "getWeatherDetails">Get Weather</button>
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
      const response = await AuthenticationServices.register({
        zipcode: this.zipcode
      })
      // console.log(response.data);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
