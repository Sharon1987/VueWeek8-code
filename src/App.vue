<template>
<Navbar></Navbar>
  <router-view/>
<FooterInfo></FooterInfo>
</template>

<script>

import Navbar from '@/components/FrontNavbar.vue'
import FooterInfo from '@/components/FooterInfo.vue'

export default {
  components: {
    Navbar,
    FooterInfo
  }
}
</script>

<style lang="scss">
@import "./assets/stylesheets/all";
</style>
