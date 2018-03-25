<template>
<div>
  <h1>Weather Data</h1>
  <b-form-input v-model="filter" placeholder="Type to Search" />
<b-table striped hover :items="weatherDatas" :fields= "fields" :filter="filter" @filtered="onFiltered" @row-clicked="myRowClickHandler" v-if="weatherDatas.length > 0">Weather Data</b-table>

<b-modal v-model = "modelShowBool" ref="myModalRef" id="modalData" @hide="resetModal" ok-only>
      <pre>The weather details for {{modalData.city}} is {{modalData.weather}} and temperature is {{modalData.temperature}} observed at time {{modalData.ObservationTime}}</pre>
    </b-modal>

</div>
</template>

<script>
import Api from '@/services/Api'
export default {
  data () {
    return {
      filter: null,
      modelShowBool: false,
      weatherDatas: [],
      fields: [ 'city', 'weather', 'temperature', 'observationTime'],
      modalData: {'city':'', 'weather':'','temperature':'','ObservationTime':'' }
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
    },
    async myRowClickHandler(items){
      console.log(this);
      var self = this;
      this.modelShowBool = !this.modelShowBool 
      this.modalData.city = items.city
      this.modalData.weather = items.weather
      this.modalData.temperature = items.weather
      this.modalData.ObservationTime = items.observationTime
      // console.log(self.$ref)
      
      // .myModalRef.show()
      // console.log(self);
      // this.showModal = true
      // console.log(modalData.city)
    },
    resetModal () {
      this.modalData.city = ''
      this.modalData.weather = ''
      this.modalData.temperature = ''
      this.modalData.ObservationTime = ''
      this.modelShowBool = !this.modelShowBool  }
  }, mounted(){
    this.initialize()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
