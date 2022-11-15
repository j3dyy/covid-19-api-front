<template>

  <Navbar />

  <template v-if="this.country">

    <div class="container">
      <div class="row ">

        <div class="col-12 py-4 statistic-panel">

        <div class="row">
          <div class="col-2 d-flex justify-content-start flex-column">
            <h4 class="py-3">{{localizedName(this.country.name)}}</h4>

            <router-link to="/dashboard" class="btn btn-outline-secondary">  {{$t('message.back')}}</router-link>
          </div>

          <CounterWidget
              :percent-amount="getPercentSumOf('confirmed')"
              :sum-amount="summaryData.confirmed"
              :name="$t('message.confirmed')"
              color="l-bg-blue-dark"
          />

          <CounterWidget
              :percent-amount="getPercentSumOf('recovered')"
              :sum-amount="summaryData.recovered"
              :name="$t('message.recovered')"
              color="l-bg-green-dark"
          />
          <CounterWidget
              :percent-amount="getPercentSumOf('deaths')"
              :sum-amount="summaryData.deaths"
              :name="$t('message.death')"
              color="l-bg-cherry"
          />

        </div>
        </div>

        <div class="col-12 content">
          <table class="table table-striped ">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" @click.prevent="sortBy('confirmed')">
                {{$t('message.confirmed')}}
                <template v-if="isFilteredBy('confirmed')">
                  <font-awesome-icon :icon="['fa' ,this.currentFilter.icon]" />
                </template>
              </th>
              <th scope="col" @click.prevent="sortBy('recovered')">
                {{$t('message.recovered')}}
                <template v-if="isFilteredBy('recovered')">
                  <font-awesome-icon :icon="['fa' ,this.currentFilter.icon]" />
                </template>
              </th>
              <th scope="col" @click.prevent="sortBy('deaths')">
                {{$t('message.death')}}
                <template v-if="isFilteredBy('deaths')">
                  <font-awesome-icon :icon="['fa' ,this.currentFilter.icon]" />
                </template>
              </th>
              <th>
                {{$t('message.created_at')}}
              </th>
            </tr>
            </thead>
            <tbody>
            <template v-for="statistic in this.filteredStatistics" :key="statistic.id">
              <tr>
                <th scope="row" >{{statistic.id}}</th>
                <td>{{ statistic.confirmed  }}</td>
                <td>{{  statistic.recovered }}</td>
                <td>{{   statistic.deaths  }}</td>
                <td>{{ formatCreationDate(statistic.created_at) }}</td>
              </tr>
            </template>

            </tbody>
          </table>

          <template v-if="this.statistics.current_page <= this.statistics.last_page ">
            <v-pagination
                v-model="this.statistics.current_page"
                :pages="this.statistics.last_page - 1"
                :range-size="1"
                active-color="#DCEDFF"
              @update:modelValue="updatePagination"
            />
          </template>

        </div>

      </div>
    </div>

  </template>

</template>

<script>
import Navbar from "./Partials/Navbar.vue";
import CounterWidget from "./Partials/CounterWidget.vue";
import moment from "moment";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  name: "CountryView",
  components: {Navbar,CounterWidget,VPagination},
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    country() {
      if (this.$store.state.statistics.selectedCountry){
        return this.$store.state.statistics.selectedCountry.country
      }
    },
    statistics() {
      if (this.$store.state.statistics.selectedCountry){
        return this.$store.state.statistics.selectedCountry.data
      }
    },
    summaryData() {
      if (this.$store.state.statistics.selectedCountry){
        return this.$store.state.statistics.selectedCountry.summaryData
      }
    },
    filteredStatistics(){
      const SEARCH_INPUT = this.searchInput

      return this.statistics.data.filter(function (item){
        //if search input length is greater than
        if (SEARCH_INPUT.length >= 1) {
          return  (item.id+'').includes(SEARCH_INPUT)
              || (item.confirmed+'').includes(SEARCH_INPUT)
              || (item.recovered+'').includes(SEARCH_INPUT)
              ||  (item.death+'').includes(SEARCH_INPUT)
              ||  moment(item.created_at).format('MM/DD/YYYY HH:mm').includes(SEARCH_INPUT)
        }
        return item
      })
    },
  },
  methods:{
    getPercentSumOf(key){
      let fullSum = this.summaryData.recovered + this.summaryData.deaths + this.summaryData.confirmed
      let currentKeySum = this.summaryData[key]

      if (fullSum === 0){
        return 0
      }

      return (currentKeySum / fullSum *100).toFixed(2)
    },
    localizedName(jsonString){
      let parsed = JSON.parse(jsonString)
      return parsed[this.$i18n.locale]
    },
    formatCreationDate(date){
      return moment(date).format('MM/DD/YYYY HH:mm');
    },

    isFilteredBy(key){
      return this.currentFilter.key === key
    },
    //todo მიქსინ-ებში
    sortBy(key){
      if (this.currentFilter.icon === 'sort-up'){
        this.currentFilter.icon = 'sort-down'
        this.currentFilter.ascending = false
      }else{
        this.currentFilter.icon = 'sort-up'
        this.currentFilter.ascending = true
      }
      //update key
      this.currentFilter.key = key

      //nested key support like foo.bar
      let splitedKey = key.split('.')

      this.statistics.data.sort((a, b) => {

        let tmpObj = a[splitedKey[0]]
        let tmpObjB = b[splitedKey[0]]

        for ( let i = 1; i < splitedKey.length; i++ ){
          if (tmpObj !== null){
            tmpObj = tmpObj[splitedKey[i]]
            tmpObjB = tmpObjB[splitedKey[i]]
          }
        }
        let comparableA = tmpObj
        let comparableB = tmpObjB

        if (!this.currentFilter.ascending){
          return  comparableA > comparableB ? 1 : -1
        }
        return  comparableA < comparableB ? 1 : -1
      });
    },
    updatePagination(page){
      this.$store.dispatch('statistics/country',{
        "code":this.$route.params.country_code,
        "page": page
      })
    }
  },
  data(){
    let currentFilter = {
      key:null,
      ascending: true,
      icon: 'sort-up'
    }

    let searchInput = ""
    return{
      currentFilter,searchInput
    }
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.$store.dispatch('statistics/country',{
      "code":this.$route.params.country_code,
      "page":1
    })
  }
};
</script>

<style scoped>




</style>