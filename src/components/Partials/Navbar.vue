<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/dashboard" class="navbar-brand" >{{$t('message.navTitle')}}</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#" @click="logOut">{{$t('message.logOut')}}</a>
          </li>
        </ul>

        <div class="form-group locale-changer px-2">
          <select class="form-select" v-model="$i18n.locale">
            <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
          </select>
        </div>

        <div class="form-group">
          <form class="d-flex">
            <input class="form-control me-2" type="search" :placeholder="$t('message.search')" aria-label="Search"
                   v-model="this.inputValue"
            >
          </form>
        </div>


      </div>
    </div>
  </nav>

</template>

<script>

export default {
  name: "Navbar",
  methods:{
    logOut(){
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
      document.location = '/login'

    },
  },
  watch: {
    inputValue(newVal, oldVal){
      this.$parent.searchInput = newVal
    }
  },
  data(){
    let inputValue = ''

    return{
      inputValue
    }
  }
}
</script>

<style scoped>
</style>