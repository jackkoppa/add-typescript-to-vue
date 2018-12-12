<template>
  <div class="home">
    <h1 class="home__header">Search for Greenhouse Gas Emissions by City</h1>
    <Search/>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'home',
	components: {
		Search
	}
})
</script>

<style lang="scss">
@import '@/styles/_variables.scss';

.home__header {
	max-width: 75%;
	margin: $spacer * 2 auto;
}
</style>
