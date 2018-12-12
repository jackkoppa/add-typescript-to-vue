<template>
  <div class="search">
    <SearchBar :cities="cities" @cityAdded="addCity"/>
    <SearchResultChart :cities="cities" @cityDeleted="deleteCity"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import SearchBar from '@/components/SearchBar'
import SearchResultChart from '@/components/SearchResultChart'

const defaultNationalCity = {
	slug: 'national',
	name: 'National Average',
	ghg: null
}

export default {
	name: 'Search',
	components: {
		SearchBar,
		SearchResultChart
	},
	data() {
		return {
			cities: []
		}
	},
	computed: {
		...mapGetters('national', ['nationalAverageGhg'])
	},
	watch: {
		nationalAverageGhg() {
			this.addNationalAverageToCities()
		}
	},
	methods: {
		...mapActions('national', ['fetchNationalAverages']),
		addNationalAverageToCities() {
			if (!this.cities.find(city => city.slug === 'national')) {
				this.cities.push(
					Object.assign(defaultNationalCity, { ghg: this.nationalAverageGhg })
				)
			}
		},
		addCity(newCityResponse) {
			this.cities.push(newCityResponse)
		},
		deleteCity(slug) {
			this.cities = this.cities.filter(city => city.slug !== slug)
		}
	},
	mounted() {
		if (this.nationalAverageGhg == null) {
			this.fetchNationalAverages()
		} else {
			this.addNationalAverageToCities()
		}
	}
}
</script>

<style scoped lang="scss">
</style>
