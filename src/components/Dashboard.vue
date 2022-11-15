<template>

  <Navbar />

  <div class="container-fluid">

  <div class="row">
    <div class="title">
      <h1 class="text-start">{{$t('message.dashboardTitle')}}</h1>
    </div>

    <div class="col-12 content">
      <table class="table table-striped ">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{{$t('message.name')}}</th>
          <th scope="col" class="sortable" @click.prevent="sortBy('latest_statistic.confirmed')">
            {{$t('message.confirmed')}}
            <template v-if="isFilteredBy('latest_statistic.confirmed')">
              <font-awesome-icon :icon="['fa' ,this.currentFilter.icon]" />
            </template>
          </th>
          <th scope="col" class="sortable" @click.prevent="sortBy('latest_statistic.recovered')">
            {{$t('message.recovered')}}
            <template v-if="isFilteredBy('latest_statistic.recovered')">
              <font-awesome-icon :icon="['fa' ,this.currentFilter.icon]" />
            </template>
          </th>
          <th scope="col" class="sortable" @click.prevent="sortBy('latest_statistic.death')">
            {{$t('message.death')}}
            <template v-if="isFilteredBy('latest_statistic.death')">
              <font-awesome-icon :icon="['fa' ,this.currentFilter.icon]" />
            </template>
          </th>
        </tr>
        </thead>
        <tbody>
        <template v-for="country in this.countries" :key="country.id">
          <tr @click="goToCountry(country.code)">
            <th scope="row" >{{country.id}}</th>
            <td >{{localizedName(country.name)}}</td>
            <td>{{ country.latest_statistic !== null ? country.latest_statistic.confirmed : 0 }}</td>
            <td>{{ country.latest_statistic !== null ? country.latest_statistic.recovered : 0 }}</td>
            <td>{{ country.latest_statistic !== null ?  country.latest_statistic.deaths : 0 }}</td>
          </tr>
        </template>

        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<script>
import Navbar from "./Partials/Navbar.vue";
import {ref} from "vue";

export default {
  name: "Dashboard",
  components: {Navbar},
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    countries() {
      const SEARCH_INPUT = this.searchInput
      const LOCALIZED_NAME = this.localizedName


      return this.$store.state.statistics.countries.filter(function (item){
        //if search input length is greater than
        if (SEARCH_INPUT.length >= 1) {
          let name = LOCALIZED_NAME(item.name)
          return name.toLowerCase().includes(SEARCH_INPUT)
         || (item.id+'').includes(SEARCH_INPUT)
         || (item.latest_statistic !== null && (item.latest_statistic.confirmed+'').includes(SEARCH_INPUT))
         || (item.latest_statistic !== null && (item.latest_statistic.recovered+'').includes(SEARCH_INPUT))
         || (item.latest_statistic !== null && (item.latest_statistic.deaths+'').includes(SEARCH_INPUT))
        }
        return item
      })
    }
  },
  methods:{
    goToCountry(country_code){
      this.$router.push(`country/${country_code}`)
    },
    localizedName(jsonString){
      let parsed = JSON.parse(jsonString)
      return parsed[this.$i18n.locale]
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

      this.$store.state.statistics.countries.sort((a, b) => {

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
    this.$store.dispatch('statistics/countries')
  }
};
</script>

<style scoped>

.title{
  padding-top: 10px;
}

.content{
  padding: 10px;
}

.table thead th.sortable:hover{
  cursor: pointer;
}
.table tbody tr:hover{
  cursor: pointer;
  background: #f7f7f7;
}
</style>