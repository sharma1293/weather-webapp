<template>
<div>
  <h1>Weather Data</h1>
  <b-form-input v-model="filter" placeholder="Type to Search" />
<b-table striped hover :items="weatherDatas" :fields= "fields" :filter="filter" @filtered="onFiltered" v-if="weatherDatas.length > 0">Weather Data</b-table>
</div>
</template>

<script>
import Api from '@/services/Api'
export default {
  data () {
    return {
      filter: null,
      weatherDatas: [],
      fields: [ 'city', 'weather', 'temperature', 'observationTime']
    }
  },
  methods: { initialize() {

      console.log('Getting weather details')
      Api().get('/allData') .then(response => {
      this.weatherDatas = response.data
    }).catch(() => this.noDataFound())

    
  },noDataFound(){
    alert("No data found for provided zipcode, Please enter a valid zipcode")
  },
    onFiltered (filteredItems) {
      console.log('filetering rows');
      // Trigger pagination to update the number of buttons/pages due to filtering
      // this.totalRows = filteredItems.length
      // this.currentPage = 1
    }
  }, mounted(){
    this.initialize()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
