<template>

  <router-view v-slot="{ Component, route }" :key="$route.fullPath">
    <transition name="fade" mode="out-in" >
      <div class="full-container" :key="route.name">
        <component :is="Component"> </component>
      </div>
    </transition>
  </router-view>


</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
#app{
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0 auto;

}

.full-container{
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-left: 0;
  padding-right: 0;
}
</style>